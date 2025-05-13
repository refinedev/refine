import { cn } from "@/lib/utils";
import { useBack, useResource, useUserFriendlyName } from "@refinedev/core";
import type { PropsWithChildren } from "react";
import { Breadcrumb } from "@/registry/default/refine-ui/breadcrumb";
import { Separator } from "@/registry/default/ui/separator";
import { Button } from "@/registry/default/ui/button";
import { ArrowLeftIcon } from "lucide-react";

type CreateViewProps = PropsWithChildren<{
  className?: string;
}>;

export function CreateView({ children, className }: CreateViewProps) {
  return (
    <div className={cn("flex flex-col", "gap-4", className)}>{children}</div>
  );
}

type CreateHeaderProps = PropsWithChildren<{
  resource?: string;
  title?: string;
  hideBreadcrumb?: boolean;
  wrapperClassName?: string;
  headerClassName?: string;
}>;

export const CreateViewHeader = ({
  resource: resourceFromProps,
  title: titleFromProps,
  hideBreadcrumb,
  wrapperClassName,
  headerClassName,
}: CreateHeaderProps) => {
  const back = useBack();

  const getUserFriendlyName = useUserFriendlyName();

  const { resource, identifier } = useResource(resourceFromProps);

  const title =
    titleFromProps ??
    getUserFriendlyName(
      resource?.meta?.label ??
        resource?.options?.label ??
        resource?.label ??
        identifier,
      "plural",
    );

  return (
    <div className={cn("flex flex-col", "gap-4", wrapperClassName)}>
      {!hideBreadcrumb && (
        <div className="flex items-center relative gap-2">
          <div className="bg-background z-[2] pr-4">
            <Breadcrumb />
          </div>
          <Separator className={cn("absolute", "left-0", "right-0", "z-[1]")} />
        </div>
      )}
      <div
        className={cn(
          "flex",
          "gap-1",
          "items-center",
          "-ml-2.5",
          headerClassName,
        )}
      >
        <Button variant="ghost" size="icon" onClick={back}>
          <ArrowLeftIcon className="h-4 w-4" />
        </Button>
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>
    </div>
  );
};

export const CreateViewContent = (
  props: PropsWithChildren<{
    className?: string;
  }>,
) => {
  return <div className={cn(props.className)}>{props.children}</div>;
};
