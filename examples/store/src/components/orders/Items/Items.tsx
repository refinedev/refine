import Link from "next/link";
import { LineItem, Region } from "@medusajs/medusa";

import { CalculatedVariant } from "src/types/medusa";
import { useEnrichedLineItems } from "@lib/hooks";
import { LineItemOptions, LineItemPrice, Thumbnail } from "@components/common";
import { SkeletonLineItem } from "@components/skeletons";

interface ItemsProps {
    items: LineItem[];
    region: Region;
    cartId: string;
}

export const Items: React.FC<ItemsProps> = ({ cartId, items, region }) => {
    const enrichedItems = useEnrichedLineItems(items, cartId);

    return (
        <div className="border-accent-3 flex flex-col gap-y-4 border-b p-10">
            {enrichedItems?.length
                ? enrichedItems.map((item) => {
                      return (
                          <div
                              className="grid grid-cols-[122px_1fr] gap-x-4"
                              key={item.id}
                          >
                              <div className="w-[122px]">
                                  <Thumbnail
                                      thumbnail={item.thumbnail}
                                      size="full"
                                  />
                              </div>
                              <div className="flex flex-1 flex-col justify-between">
                                  <div className="text-small-regular flex flex-1 flex-col">
                                      <div className="flex items-start justify-between">
                                          <div>
                                              <h3 className="text-base-regular mr-4 overflow-hidden overflow-ellipsis whitespace-nowrap">
                                                  <Link
                                                      href={{
                                                          pathname:
                                                              "/product/[handle]",
                                                          query: {
                                                              handle: item
                                                                  .variant
                                                                  .product
                                                                  .handle,
                                                          },
                                                      }}
                                                  >
                                                      {item.title}
                                                  </Link>
                                              </h3>
                                              <LineItemOptions
                                                  variant={item.variant}
                                              />
                                              <span>
                                                  Quantity: {item.quantity}
                                              </span>
                                          </div>
                                          <div className="flex justify-end">
                                              <LineItemPrice
                                                  quantity={item.quantity}
                                                  region={region}
                                                  variant={
                                                      item.variant as CalculatedVariant
                                                  }
                                              />
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      );
                  })
                : Array.from(Array(items.length).keys()).map((i) => {
                      return <SkeletonLineItem key={i} />;
                  })}
        </div>
    );
};
