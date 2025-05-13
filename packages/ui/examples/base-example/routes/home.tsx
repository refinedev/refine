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
          <ListButton
            refineCoreProps={{
              resource: "posts",
            }}
          >
            List Posts
          </ListButton>

          <CreateButton
            refineCoreProps={{
              resource: "posts",
            }}
          >
            Create Post
          </CreateButton>
          <EditButton
            refineCoreProps={{
              resource: "posts",
              recordItemId: "123",
            }}
          >
            Edit Post
          </EditButton>
          <ShowButton
            refineCoreProps={{
              resource: "posts",
              recordItemId: "123",
            }}
          >
            Show Post
          </ShowButton>
          <CloneButton
            refineCoreProps={{
              resource: "posts",
              recordItemId: "123",
            }}
          >
            Clone Post
          </CloneButton>
        </div>
      </div>

      <Separator />

      <div className="flex flex-col items-start justify-start gap-2">
        <h2>Action Buttons</h2>
        <div className="flex flex-col items-start justify-start gap-6">
          <DeleteButton
            refineCoreProps={{
              resource: "posts",
              recordItemId: "123",
            }}
          >
            Delete Post
          </DeleteButton>
          <RefreshButton
            refineCoreProps={{
              resource: "posts",
              recordItemId: "123",
            }}
          >
            Refresh
          </RefreshButton>
        </div>
      </div>
    </div>
  );
};
