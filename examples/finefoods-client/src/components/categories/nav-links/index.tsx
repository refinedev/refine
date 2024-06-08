"use client";

import { type GetListResponse, useNavigation } from "@refinedev/core";
import Link from "next/link";
import type { Category } from "@/types";
import cn from "classnames";

type Props = {
  categories: GetListResponse<Category>;
  selectedCategoryId: string;
};

export const CategoriesNavLinks = ({
  categories,
  selectedCategoryId,
}: Props) => {
  const { showUrl } = useNavigation();

  return (
    <div className="bg-white rounded-t-[36px] rounded-b-[20px]">
      <div className="flex flex-wrap items-center justify-center gap-2 p-4 border-b border-[#DEDEDE]">
        {categories.data.map((category) => {
          return (
            <Link href={showUrl("categories", category.id)} key={category.id}>
              <div
                className={cn(
                  "px-4 py-2 text-sm font-bold rounded-full transition-colors ease-in-out duration-100 whitespace-nowrap",
                  category.id === Number(selectedCategoryId)
                    ? "bg-primary text-white"
                    : "text-black hover:bg-primary/50",
                )}
              >
                {category.title}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
