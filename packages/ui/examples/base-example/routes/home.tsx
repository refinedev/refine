import { CloneButton } from "@/registry/default/refine-ui/buttons/clone";
import { CreateButton } from "@/registry/default/refine-ui/buttons/create";
import { DeleteButton } from "@/registry/default/refine-ui/buttons/delete";
import { EditButton } from "@/registry/default/refine-ui/buttons/edit";
import { ListButton } from "@/registry/default/refine-ui/buttons/list";
import { RefreshButton } from "@/registry/default/refine-ui/buttons/refresh";
import { ShowButton } from "@/registry/default/refine-ui/buttons/show";
import { Separator } from "@/registry/default/ui/separator";
import { useOne } from "@refinedev/core";

export const HomePage = () => {
  const { data } = useOne({
    resource: "posts",
    id: "123",
  });

  return (
    <div className="flex flex-col items-start justify-start gap-6">
      <div className="flex flex-col items-start justify-start gap-2">
        <h2>Navigation Buttons</h2>
        <div className="flex flex-col items-start justify-start gap-6">
          <ListButton resource="posts" />

          <CreateButton resource="posts" />

          <EditButton resource="posts" recordItemId="123" />

          <ShowButton resource="posts" recordItemId="123" />

          <CloneButton resource="posts" recordItemId="123" />
        </div>
      </div>

      <Separator />

      <div className="flex flex-col items-start justify-start gap-2">
        <h2>Action Buttons</h2>
        <div className="flex flex-col items-start justify-start gap-6">
          <DeleteButton resource="posts" recordItemId="123" />
          <RefreshButton resource="posts" recordItemId="123" />
        </div>
      </div>
    </div>
  );
};
