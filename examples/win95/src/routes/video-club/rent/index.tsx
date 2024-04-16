import { useMemo, useState } from "react";
import { Button, Separator } from "react95";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IconChevronRight } from "../../../components/icons/chevron-right";
import { IconChevronLeft } from "../../../components/icons/chevron-left";
import { VideoClubLayoutSubPage } from "../subpage-layout";
import { VideoClubPageTapeRentMemberList } from "./member-list";
import { VideoClubPageTapeRentTitleList } from "./title-list";
import { VideoClubPageTapeRentConfirm } from "./confirm";
import { IExendedMember, IExtendedVideoTitle } from "../../../interfaces";
import { ArrowGreenPixelatedIcon } from "../../../components/icons/arrow-green-pixelated";

type Screen = "members" | "titles" | "confirm";

export const VideoClubPageTapeRent = () => {
  const navigate = useNavigate();

  const [selectedMember, setSelectedMember] = useState<IExendedMember | null>(
    null,
  );
  const [selectedTitle, setSelectedTitle] =
    useState<IExtendedVideoTitle | null>(null);
  const [screen, setScreen] = useState<Screen>("members");

  const handleBackClick = () => {
    switch (screen) {
      case "members":
        return;
      case "titles":
        setScreen("members");
        return;
      case "confirm":
        setScreen("titles");
        return;
    }
  };

  const handleNextClick = () => {
    if (!selectedMember) return;

    switch (screen) {
      case "members":
        setScreen("titles");
        return;
      case "titles":
        setScreen("confirm");
        return;
      case "confirm":
        return;
    }
  };

  const screenConfig = useMemo(() => {
    switch (screen) {
      case "members":
        return {
          title: "Select Member",
          help: "You can browse all the members in the Refine Video Club.",
          screenImage:
            "https://refine.ams3.cdn.digitaloceanspaces.com/win95/members.jpg",
          component: VideoClubPageTapeRentMemberList,
          nextButtonIcon: <IconChevronRight />,
          nextButtonText: "Next",
          isNextDisabled: !selectedMember,
          isBackDisabled: true,
        };
      case "titles":
        return {
          title: "Select Title",
          help: "You can browse all the titles in the Refine Video Club.",
          screenImage:
            "https://refine.ams3.cdn.digitaloceanspaces.com/win95/tape.jpg",
          component: VideoClubPageTapeRentTitleList,
          isNextDisabled: !selectedTitle,
          nextButtonIcon: <IconChevronRight />,
          nextButtonText: "Next",
          isBackDisabled: false,
        };
      case "confirm":
        return {
          title: "Rent tape",
          help: "Please confirm the rental.",
          screenImage: null,
          component: VideoClubPageTapeRentConfirm,
          nextButtonIcon: <ArrowGreenPixelatedIcon />,
          nextButtonText: "Confirm",
          isNextDisabled: false,
          isBackDisabled: false,
        };
    }
  }, [screen, selectedMember, selectedTitle]);

  return (
    <VideoClubLayoutSubPage
      title={screenConfig.title}
      help={screenConfig.help}
      onClose={() => navigate("/video-club")}
    >
      <Container>
        {screenConfig.screenImage && (
          <ScreenImage src={screenConfig.screenImage} alt="members" />
        )}

        {screen === "members" && (
          <VideoClubPageTapeRentMemberList
            selectedMember={selectedMember}
            onMemberSelect={(member) => setSelectedMember(member)}
          />
        )}
        {screen === "titles" && (
          <VideoClubPageTapeRentTitleList
            selectedTitle={selectedTitle}
            onTitleSelect={(title) => setSelectedTitle(title)}
          />
        )}
        {screen === "confirm" && (
          <VideoClubPageTapeRentConfirm
            member={selectedMember}
            title={selectedTitle}
          />
        )}
      </Container>

      <Separator />
      <ActionContainer>
        <ActionButton
          disabled={screenConfig.isBackDisabled}
          onClick={handleBackClick}
        >
          <IconChevronLeft />
          <span>Back</span>
        </ActionButton>
        <ActionButton
          disabled={screenConfig.isNextDisabled}
          onClick={handleNextClick}
          type={screen === "confirm" ? "submit" : "button"}
          form={screen === "confirm" ? "rent-tape-form" : undefined}
          style={{
            flexDirection: screen === "confirm" ? "row-reverse" : "row",
          }}
        >
          <span>{screenConfig.nextButtonText}</span>
          {screenConfig.nextButtonIcon}
        </ActionButton>
        <ActionButton
          style={{
            marginLeft: "12px",
          }}
        >
          Cancel
        </ActionButton>
      </ActionContainer>
    </VideoClubLayoutSubPage>
  );
};

const Container = styled.div`
  padding: 16px 24px;
  display: flex;
  gap: 24px;
`;

const ScreenImage = styled.img`
  max-width: 200px;
  max-height: 498px;
  aspect-ratio: 200 / 492;
`;

const ActionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 16px;
`;

const ActionButton = styled(Button)`
  width: 110px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
`;
