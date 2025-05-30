"use client";

import React from "react";
import {
  useMenu,
  useLink,
  useRefineOptions,
  type ITreeMenu,
  useLogout,
} from "@refinedev/core";
import {
  Sidebar as ShadcnSidebar,
  SidebarContent as ShadcnSidebarContent,
  SidebarHeader as ShadcnSidebarHeader,
  useSidebar as useShadcnSidebar,
  SidebarTrigger as ShadcnSidebarTrigger,
} from "@/registry/default/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/registry/default/ui/dropdown-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/registry/default/ui/collapsible";
import { Button } from "@/registry/default/ui/button";
import { Separator } from "@/registry/default/ui/separator";
import { UserInfo } from "@/registry/default/refine-ui/user/user-info";
import { ChevronRight, ChevronUp, ListIcon, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const { open } = useShadcnSidebar();
  const { menuItems, selectedKey } = useMenu();

  return (
    <ShadcnSidebar
      collapsible="icon"
      className={cn("border-r", "border-sidebar-border")}
    >
      <SidebarHeader />
      <ShadcnSidebarContent
        className={cn(
          "transition-discrete",
          "duration-200",
          "flex",
          "flex-col",
          "gap-2",
          "pt-2",
          "pb-2",
          {
            "px-3": open,
            "px-1": !open,
          },
        )}
      >
        {menuItems.map((item: ITreeMenu) => (
          <SidebarItem
            key={item.key || item.name}
            item={item}
            selectedKey={selectedKey}
          />
        ))}
        <div
          className={cn(
            "absolute",
            "bottom-[81px]",
            "left-0",
            "w-full",
            "h-16",
            "bg-gradient-to-b",
            "from-white/0",
            "dark:from-black/0",
            "to-sidebar",
          )}
        />
      </ShadcnSidebarContent>
      <div
        className={cn("mt-auto", "pb-1", {
          "px-2": open,
          "px-1": !open,
        })}
      >
        <Separator />
        <SidebarFooter />
      </div>
    </ShadcnSidebar>
  );
}

type MenuItemProps = {
  item: ITreeMenu;
  selectedKey?: string;
};

function SidebarItem({ item, selectedKey }: MenuItemProps) {
  const { open } = useShadcnSidebar();

  if (item.meta?.group) {
    return <SidebarItemGroup item={item} selectedKey={selectedKey} />;
  }

  if (item.children && item.children.length > 0) {
    if (open) {
      return <SidebarItemCollapsible item={item} selectedKey={selectedKey} />;
    }
    return <SidebarItemDropdown item={item} selectedKey={selectedKey} />;
  }

  return <SidebarItemLink item={item} selectedKey={selectedKey} />;
}

function SidebarItemGroup({ item, selectedKey }: MenuItemProps) {
  const { children } = item;
  const { open } = useShadcnSidebar();

  return (
    <div className={cn("border-t", "border-sidebar-border", "pt-4")}>
      <span
        className={cn(
          "ml-3",
          "block",
          "text-xs",
          "font-semibold",
          "uppercase",
          "text-muted-foreground",
          "transition-all",
          "duration-200",
          {
            "h-8": open,
            "h-0": !open,
            "opacity-0": !open,
            "opacity-100": open,
            "pointer-events-none": !open,
            "pointer-events-auto": open,
          },
        )}
      >
        {getDisplayName(item)}
      </span>
      {children && children.length > 0 && (
        <div className={cn("flex", "flex-col")}>
          {children.map((child: ITreeMenu) => (
            <SidebarItem
              key={child.key || child.name}
              item={child}
              selectedKey={selectedKey}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function SidebarItemCollapsible({ item, selectedKey }: MenuItemProps) {
  const { name, children } = item;

  const chevronIcon = (
    <ChevronRight
      className={cn(
        "h-4",
        "w-4",
        "shrink-0",
        "text-muted-foreground",
        "transition-transform",
        "duration-200",
        "group-data-[state=open]:rotate-90",
      )}
    />
  );

  return (
    <Collapsible key={`collapsible-${name}`} className={cn("w-full", "group")}>
      <CollapsibleTrigger asChild>
        <SidebarButton item={item} rightIcon={chevronIcon} />
      </CollapsibleTrigger>
      <CollapsibleContent className={cn("ml-6", "flex", "flex-col", "gap-2")}>
        {children?.map((child: ITreeMenu) => (
          <SidebarItem
            key={child.key || child.name}
            item={child}
            selectedKey={selectedKey}
          />
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}

function SidebarItemDropdown({ item, selectedKey }: MenuItemProps) {
  const { children } = item;
  const Link = useLink();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarButton item={item} />
      </DropdownMenuTrigger>
      <DropdownMenuContent side="right" align="start">
        {children?.map((child: ITreeMenu) => {
          const { key: childKey } = child;
          const isSelected = childKey === selectedKey;

          return (
            <DropdownMenuItem key={childKey || child.name} asChild>
              <Link
                to={child.route || ""}
                className={cn("flex w-full items-center gap-2", {
                  "bg-accent text-accent-foreground": isSelected,
                })}
              >
                <ItemIcon
                  icon={child.meta?.icon ?? child.icon}
                  isSelected={isSelected}
                />
                <span>{getDisplayName(child)}</span>
              </Link>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function SidebarItemLink({ item, selectedKey }: MenuItemProps) {
  const isSelected = item.key === selectedKey;

  return <SidebarButton item={item} isSelected={isSelected} asLink={true} />;
}

function SidebarHeader() {
  const { title } = useRefineOptions();
  const { open, isMobile } = useShadcnSidebar();

  return (
    <ShadcnSidebarHeader
      className={cn(
        "p-0",
        "h-16",
        "border-b",
        "border-sidebar-border",
        "flex-row",
        "items-center",
        "justify-between",
        "overflow-hidden",
      )}
    >
      <div
        className={cn(
          "whitespace-nowrap",
          "flex",
          "flex-row",
          "h-full",
          "items-center",
          "justify-start",
          "gap-2",
          "transition-discrete",
          "duration-200",
          {
            "pl-3": !open,
            "pl-5": open,
          },
        )}
      >
        <div>{title.icon}</div>
        <h2
          className={cn(
            "text-sm",
            "font-bold",
            "transition-opacity",
            "duration-200",
            {
              "opacity-0": !open,
              "opacity-100": open,
            },
          )}
        >
          {title.text}
        </h2>
      </div>

      <ShadcnSidebarTrigger
        className={cn("text-muted-foreground", "mr-1", {
          "opacity-0": !open,
          "opacity-100": open || isMobile,
          "pointer-events-auto": open || isMobile,
          "pointer-events-none": !open && !isMobile,
        })}
      />
    </ShadcnSidebarHeader>
  );
}

function getDisplayName(item: ITreeMenu) {
  return item.meta?.label ?? item.label ?? item.name;
}

type IconProps = {
  icon: React.ReactNode;
  isSelected?: boolean;
};

function ItemIcon({ icon, isSelected }: IconProps) {
  return (
    <div
      className={cn("w-4", {
        "text-muted-foreground": !isSelected,
        "text-sidebar-primary-foreground": isSelected,
      })}
    >
      {icon ?? <ListIcon />}
    </div>
  );
}

type SidebarButtonProps = React.ComponentProps<typeof Button> & {
  item: ITreeMenu;
  isSelected?: boolean;
  rightIcon?: React.ReactNode;
  asLink?: boolean;
  onClick?: () => void;
};

function SidebarButton({
  item,
  isSelected = false,
  rightIcon,
  asLink = false,
  className,
  onClick,
  ...props
}: SidebarButtonProps) {
  const Link = useLink();

  const buttonContent = (
    <>
      <ItemIcon icon={item.meta?.icon ?? item.icon} isSelected={isSelected} />
      <span
        className={cn("tracking-[-0.00875rem]", {
          "flex-1": rightIcon,
          "text-left": rightIcon,
          "line-clamp-1": !rightIcon,
          truncate: !rightIcon,
          "font-normal": !isSelected,
          "font-semibold": isSelected,
          "text-sidebar-primary-foreground": isSelected,
          "text-foreground": !isSelected,
        })}
      >
        {getDisplayName(item)}
      </span>
      {rightIcon}
    </>
  );

  return (
    <Button
      asChild={!!(asLink && item.route)}
      variant="ghost"
      size="lg"
      className={cn(
        "flex w-full items-center justify-start gap-2 py-2 !px-3 text-sm",
        {
          "bg-sidebar-primary": isSelected,
          "hover:!bg-sidebar-primary/90": isSelected,
          "text-sidebar-primary-foreground": isSelected,
          "hover:text-sidebar-primary-foreground": isSelected,
        },
        className,
      )}
      onClick={onClick}
      {...props}
    >
      {asLink && item.route ? (
        <Link to={item.route} className={cn("flex w-full items-center gap-2")}>
          {buttonContent}
        </Link>
      ) : (
        buttonContent
      )}
    </Button>
  );
}

function SidebarFooter() {
  const { mutate: logout, isLoading: logoutIsLoading } = useLogout();

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
            "w-full",
            "text-left",
            "focus:outline-none",
          )}
        >
          <UserInfo />
          <ChevronUp
            className={cn(
              "h-4",
              "w-4",
              "ml-auto",
              "text-muted-foreground",
              "transition-transform",
              "duration-200",
              "group-data-[state=open]:rotate-180",
            )}
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className={cn("w-60", "shadow-xl")}>
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

Sidebar.displayName = "Sidebar";
