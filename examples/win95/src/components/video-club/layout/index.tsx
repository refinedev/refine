import { PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { Link } from "react-router-dom";
import { Frame } from "react95";
import { AppLayout } from "../../layout";
import { VideoClubTodayDate } from "../today-date";
import { useNotification } from "@refinedev/core";

export const VideoClubLayout = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();
  const { open } = useNotification();

  return (
    <StyledAppLayout
      title="Refine Video Club"
      iconURL="https://refine.ams3.cdn.digitaloceanspaces.com/win95/refine-video-club-app-icon-pixelated.png"
      onClose={() => navigate("/")}
      onMinimize={() => navigate("/")}
      menu={[
        {
          label: "Tapes",
          children: [
            { label: "Rent Tape", onClick: () => alert("Rent Tape") },
            { label: "Return Tape", onClick: () => alert("Return Tape") },
          ],
        },
        {
          label: "Titles",
          children: [
            { label: "Add Title", onClick: () => navigate("titles/new") },
            { label: "Browse Titles", onClick: () => navigate("titles") },
          ],
        },
        {
          label: "Members",
          children: [
            { label: "Add Member", onClick: () => alert("Add Member") },
            { label: "Browse Members", onClick: () => alert("Browse Member") },
          ],
        },
        {
          label: "Help",
          children: [
            { label: "Documentation", onClick: () => alert("Documentation") },
            { label: "About", onClick: () => alert("About") },
          ],
        },
      ]}
    >
      <Container>
        <TodayDate />
        <Logo
          src="https://refine.ams3.cdn.digitaloceanspaces.com/win95/refine-video-club-emboss-logo.png"
          alt="refine video club logo"
        />

        <Links>
          {links.map((link) => (
            <LinkItemContainer key={link.label}>
              <LinkItem to={link.href}>
                <LinkItemImg src={link.icon} alt={link.label} />
                <LinkItemLabel>{link.label}</LinkItemLabel>
              </LinkItem>
            </LinkItemContainer>
          ))}
        </Links>

        {children}

        <BgImage
          src="https://refine.ams3.cdn.digitaloceanspaces.com/win95/noisy-gray.png"
          alt="background"
        />
      </Container>
    </StyledAppLayout>
  );
};

const StyledAppLayout = styled(AppLayout)`
  width: 100%;
  height: 100%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;
`;

const BgImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
`;

const Logo = styled.img`
  margin-top: 170px;
  margin-right: auto;
  margin-left: auto;
  width: 476px;
  height: 200px;
`;

const TodayDate = styled(VideoClubTodayDate)`
  margin-left: auto;
  margin-right: 8px;
  margin-top: 8px;
`;

const Links = styled.div`
  max-width: 608px;
  margin-top: 32px;
  margin-left: auto;
  margin-right: auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
`;

const LinkItemContainer = styled(Frame)`
  padding: 8px;
`;

const LinkItem = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const LinkItemImg = styled.img`
  width: 80px;
  height: 80px;
`;

const LinkItemLabel = styled.div``;

const links = [
  {
    icon: "https://refine.ams3.cdn.digitaloceanspaces.com/win95/rent-tape.png",
    label: "Rent Tape",
    href: "tape/rent",
  },
  {
    icon: "https://refine.ams3.cdn.digitaloceanspaces.com/win95/return-tape.png",
    label: "Return Tape",
    href: "tape/return",
  },
  {
    icon: "https://refine.ams3.cdn.digitaloceanspaces.com/win95/add-title.png",
    label: "Add Title",
    href: "titles/new",
  },
  {
    icon: "https://refine.ams3.cdn.digitaloceanspaces.com/win95/browse-titles.png",
    label: "Browse Titles",
    href: "titles",
  },
  {
    icon: "https://refine.ams3.cdn.digitaloceanspaces.com/win95/add-member.png",
    label: "Add Member",
    href: "member/new",
  },
  {
    icon: "https://refine.ams3.cdn.digitaloceanspaces.com/win95/browse-members.png",
    label: "Browse Members",
    href: "members",
  },
  {
    icon: "https://refine.ams3.cdn.digitaloceanspaces.com/win95/report.png",
    label: "Report",
    href: "report",
  },
  {
    icon: "https://refine.ams3.cdn.digitaloceanspaces.com/win95/settings.png",
    label: "Settings",
    href: "settings",
  },
];
