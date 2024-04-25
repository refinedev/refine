import React from "react";
import { useLogout } from "@refinedev/core";
import dayjs from "dayjs";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Button,
  Frame,
  MenuList,
  MenuListItem,
  Separator as SeparatorBase,
} from "react95";
import styled from "styled-components";

export const TaskBar = () => {
  const { pathname } = useLocation();
  const startMenuRef = React.useRef<HTMLDivElement>(null);

  const [startMenuIsOpen, setStartMenuIsOpen] = useState(false);

  const { mutate } = useLogout();

  const onLogoutClick = () => {
    mutate();
  };

  const firstPathName = pathname.split("/")[1];
  const pageIndicator = pathnameToIndicatorMap[firstPathName];
  const hour = dayjs().format("h:m A");

  React.useEffect(() => {
    if (!startMenuIsOpen) return;

    const handleClick = (e: MouseEvent) => {
      if (
        startMenuRef.current &&
        !startMenuRef.current.contains(e.target as Node)
      ) {
        setStartMenuIsOpen(false);
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [startMenuIsOpen]);

  return (
    <Container>
      <StartButton
        variant="raised"
        onClick={(event) => {
          event.stopPropagation();
          event.preventDefault();
          setStartMenuIsOpen((prev) => !prev);
        }}
        active={startMenuIsOpen}
      >
        <StartImage
          src="https://refine.ams3.cdn.digitaloceanspaces.com/win95/windows-logo.png"
          alt="start"
        />
        Start
      </StartButton>

      {startMenuIsOpen && (
        <StartMenuList ref={startMenuRef}>
          {menuItems.map((item) => (
            <StartMenuListItem key={item.label} size="md">
              <StartMenuListItemAnchor
                href={item.href}
                target="_blank"
                rel="noreferrer"
              >
                <StartMenuListItemImage src={item.icon} alt={item.label} />
                {item.label}
              </StartMenuListItemAnchor>
            </StartMenuListItem>
          ))}
          <Separator />
          <LogoffButton variant="thin" onClick={onLogoutClick}>
            <StartMenuListItemImage
              src="https://refine.ams3.cdn.digitaloceanspaces.com/win95/logoff.png"
              alt="log off"
            />
            Log Off
          </LogoffButton>
        </StartMenuList>
      )}

      {pageIndicator && (
        <PageIndicator active>
          <PageIndicatorImage
            src={pageIndicator.icon}
            alt={pageIndicator.label}
          />
          <PageIndicatorText>{pageIndicator.label}</PageIndicatorText>
        </PageIndicator>
      )}

      <Hour variant="well">{hour}</Hour>
    </Container>
  );
};

const Container = styled(Frame)`
  position: relative;
  width: 100%;
  height: 48px;
  padding: 0px 8px;
  margin-top: auto;
  margin-bottom: 0;
  display: flex;
  align-items: center;
  border-left: 0;
  border-right: 0;
  border-bottom: 0;
  box-shadow: rgb(254, 254, 254) 0px 1px 1px 0px inset, rgb(132, 133, 132) 0px 0px 0px 0px inset;
  border-color: rgb(223, 223, 223);
`;

const StartButton = styled(Button)``;

const StartImage = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 4px;
`;

const StartMenuList = styled(MenuList)`
  position: absolute;
  top:  6px;
  left: 4px;
  transform: translateY(-100%);
  z-index: 999;
`;

const StartMenuListItem = styled(MenuListItem)``;

const StartMenuListItemAnchor = styled.a`
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
`;

const StartMenuListItemImage = styled.img`
  width: 24px;
  height: 24px;
`;

const Separator = styled(SeparatorBase)`
  margin-top: 8px;
  margin-bottom: 8px;
`;

const LogoffButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 8px;
  gap: 8px;
  width: 100%;
`;

const PageIndicator = styled(Button)`
  margin-left: 12px;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const PageIndicatorImage = styled.img`
  width: 24px;
  height: 24px;
`;

const PageIndicatorText = styled.div`
   font-weight: 600;
`;

const Hour = styled(Frame)`
  user-select: none;
  margin-left: auto;
  margin-right: 0;
  padding: 4px 12px;
`;

const menuItems = [
  {
    icon: "https://refine.ams3.cdn.digitaloceanspaces.com/win95/refine-pixelated.png",
    label: "Refine Home",
    href: "https://refine.dev",
  },
  {
    icon: "https://refine.ams3.cdn.digitaloceanspaces.com/win95/book.png",
    label: "Documentation",
    href: "https://refine.dev/docs",
  },
  {
    icon: "https://refine.ams3.cdn.digitaloceanspaces.com/win95/notepad.png",
    label: "Tutorial",
    href: "https://refine.dev/tutorial/essentials/intro",
  },
  {
    icon: "https://refine.ams3.cdn.digitaloceanspaces.com/win95/earth.png",
    label: "Templates",
    href: "https://refine.dev/templates",
  },
  {
    icon: "https://refine.ams3.cdn.digitaloceanspaces.com/win95/paper-with-pencil.png",
    label: "Blog",
    href: "https://refine.dev/blog",
  },
  {
    icon: "https://refine.ams3.cdn.digitaloceanspaces.com/win95/github-pixelated.png",
    label: "GitHub",
    href: "https://github.com/refinedev/refine",
  },
  {
    icon: "https://refine.ams3.cdn.digitaloceanspaces.com/win95/discord-pixelated.png",
    label: "Discord",
    href: "https://discord.gg/refine",
  },
  {
    icon: "https://refine.ams3.cdn.digitaloceanspaces.com/win95/x-pixelated.png",
    label: "X",
    href: "https://twitter.com/refine_dev",
  },
];

const pathnameToIndicatorMap: Record<
  string,
  {
    icon: string;
    label: string;
  }
> = {
  "video-club": {
    icon: "https://refine.ams3.cdn.digitaloceanspaces.com/win95/refine-video-club-app-icon-pixelated.png",
    label: "Refine Video Club",
  },
  "rvc-website": {
    icon: "https://refine.ams3.cdn.digitaloceanspaces.com/win95/rvc-website-app-icon.png",
    label: "RVC Website",
  },
};
