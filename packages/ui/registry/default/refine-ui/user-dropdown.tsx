"use client";

import { useGetIdentity, useLogout } from "@refinedev/core";

import { ChevronUp, LogOut } from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/default/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/registry/default/ui/dropdown-menu";
import { Button } from "@/registry/default/ui/button";
import { Skeleton } from "@/registry/default/ui/skeleton";
import { cn } from "@/lib/utils";

type User = {
  id: number;
  name: string;
  email: string;
  avatar?: string;
};

type UserDropdownProps = {
  className?: string;
};

export function UserDropdown({ className }: UserDropdownProps) {
  const { mutate: logout, isLoading: logoutIsLoading } = useLogout();

  const { data: user, isLoading: userIsLoading } = useGetIdentity<User>();

  if (userIsLoading) {
    return (
      <div className={cn("flex", "items-center", "gap-x-2", className)}>
        <Skeleton className={cn("h-8", "w-8", "rounded-full")} />
        <div className={cn("flex", "flex-col", "gap-y-1")}>
          <Skeleton className={cn("h-4", "w-24")} />
          <Skeleton className={cn("h-3", "w-32")} />
        </div>
        <Skeleton className={cn("h-4", "w-4", "ml-auto")} />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const { name, email, avatar } = user;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "flex",
            "items-center",
            "gap-x-2",
            "py-3",
            "pr-2",
            "rounded-md",
            "hover:bg-accent",
            "focus:outline-none",
            "w-full",
            "text-left",
            "overflow-hidden",
            className,
          )}
        >
          <Avatar className={cn("h-10", "w-10")}>
            {avatar && <AvatarImage src={avatar} alt={name} />}
            <AvatarFallback>{getInitials(name)}</AvatarFallback>
          </Avatar>
          <div className={cn("flex", "flex-col", "gap-y-1")}>
            <span
              className={cn(
                "text-sm",
                "font-medium",
                "text-zinc-500",
                "dark:text-zinc-400",
              )}
            >
              {name}
            </span>
            <span
              className={cn("text-xs", "text-zinc-500", "dark:text-zinc-400")}
            >
              {email}
            </span>
          </div>
          <ChevronUp className={cn("h-5", "w-5", "ml-auto", "text-zinc-500")} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className={cn("w-60")}>
        <DropdownMenuItem className={cn("p-0")}>
          <Button
            variant="ghost"
            size="lg"
            onClick={() => logout()}
            disabled={logoutIsLoading}
            className={cn(
              "text-destructive",
              "hover:text-destructive",
              "w-full",
              "flex",
              "items-center",
              "justify-start",
              "gap-x-2",
            )}
          >
            <LogOut className={cn("h-4", "w-4", "text-destructive")} />
            Log out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const getInitials = (name = "") => {
  const names = name.split(" ");
  let initials = names[0].substring(0, 1).toUpperCase();

  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase();
  }
  return initials;
};

UserDropdown.displayName = "UserDropdown";
