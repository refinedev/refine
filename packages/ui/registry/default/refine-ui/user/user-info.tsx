import { useGetIdentity } from "@refinedev/core";
import { Skeleton } from "@/registry/default/ui/skeleton";
import { UserAvatar } from "@/registry/default/refine-ui/user/user-avatar";
import { cn } from "@/lib/utils";

type User = {
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  avatar?: string;
};

export function UserInfo() {
  const { data: user, isLoading: userIsLoading } = useGetIdentity<User>();

  if (userIsLoading || !user) {
    return <Skeleton className={cn("h-4", "w-24")} />;
  }

  const { firstName, lastName, email } = user;

  return (
    <div className={cn("flex", "items-center", "gap-x-2")}>
      <UserAvatar />
      <div
        className={cn(
          "flex",
          "flex-col",
          "justify-between",
          "h-10",
          "text-left",
        )}
      >
        <span className={cn("text-sm", "font-medium", "text-muted-foreground")}>
          {firstName} {lastName}
        </span>
        <span className={cn("text-xs", "text-muted-foreground")}>{email}</span>
      </div>
    </div>
  );
}

UserInfo.displayName = "UserInfo";
