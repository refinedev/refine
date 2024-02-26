import React from "react";
import clsx from "clsx";
import { WarningIcon } from "./icons/warning";
import { Button } from "./button";
import { HourglassIcon } from "./icons/hourglass";
import { CheckAltIcon } from "./icons/check-alt";
import {
  fetchNewProjectId,
  getCurrentProjectIdStatus,
  updateProjectId,
} from "src/utils/project-id";
import { ProjectIdFixModal } from "./project-id-fix-modal";

export const ProjectIdFixBanner = () => {
  const [projectId, setProjectId] = React.useState<string | null>(null);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [status, setStatus] = React.useState<
    "hidden" | "warning" | "fixing" | "success"
  >("hidden");

  const getProjectIdStatus = React.useCallback(async () => {
    getCurrentProjectIdStatus().then((s) => {
      if (s || typeof s === "undefined") {
        setStatus("hidden");
      } else {
        setStatus("warning");
      }
    });
  }, []);

  const getNewProjectId = React.useCallback(async () => {
    const newProjectId = await fetchNewProjectId();

    if (newProjectId) {
      setProjectId(newProjectId);
    }

    return newProjectId;
  }, []);

  const fixProjectId = React.useCallback(async () => {
    setStatus("fixing");
    const newProjectId = await getNewProjectId();
    if (!newProjectId) {
      setStatus("hidden");
      return;
    }

    const response = await updateProjectId(newProjectId);
    if (response) {
      setStatus("success");
      setTimeout(() => {
        setStatus("hidden");
      }, 2000);
    } else {
      setModalVisible(true);
    }
  }, [getNewProjectId]);

  React.useEffect(() => {
    getProjectIdStatus();
  }, [getProjectIdStatus]);

  return (
    <>
      <div
        className={clsx(
          status === "hidden" && "re-hidden",
          status === "warning" && "re-bg-project-id-warning",
          status === "fixing" && "re-bg-project-id-loading",
          status === "success" && "re-bg-project-id-success",
          "re-mb-4",
          "re-px-5",
          "re-h-14",
          "re-rounded-lg",
          "re-bg-gray-800",
          "re-flex",
          "re-items-center",
          "re-gap-3",
          "re-flex-shrink-0",
        )}
      >
        {status === "warning" && <WarningIcon className="re-text-alt-red" />}
        {status === "fixing" && (
          <HourglassIcon className="re-text-alt-blue re-w-4 re-animate-pulse-spin" />
        )}
        {status === "success" && <CheckAltIcon className="re-text-alt-green" />}
        <span className={clsx("re-text-xs", "re-text-gray-0")}>
          {status === "warning" &&
            "Project ID is missing. Fix it to not miss out any features of the devtools!"}
          {status === "fixing" && "Please wait while fixing..."}
          {status === "success" && "Fixing completed!"}
        </span>
        {status === "warning" && (
          <Button className={clsx("re-ml-3")} onClick={fixProjectId}>
            Fix it
          </Button>
        )}
      </div>
      <ProjectIdFixModal
        visible={modalVisible}
        projectId={projectId ?? ""}
        onClose={() => {
          setModalVisible(false);
          setStatus("hidden");
        }}
      />
    </>
  );
};
