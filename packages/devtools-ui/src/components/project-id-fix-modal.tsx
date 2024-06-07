import React from "react";
import clsx from "clsx";
import { Modal } from "./modal";
import { CheckAltIcon } from "./icons/check-alt";
import { CopyIcon } from "./icons/copy";
import { Highlight } from "./highlight";

const getRefineComponentText = (projectId: string) => {
  return `
const App = () => {
    return (
        <Refine
            options={{
                projectId: "${projectId}",
            }}
        >
            {/* ... */}
        </Refine>
    );
}
    `.trim();
};

const getPackageJsonText = (projectId: string) => {
  return `
{
    "name": "your-project",
    "refine": {
        "projectId": "${projectId}"
    }
}
    `.trim();
};

type Props = {
  visible: boolean;
  onClose: () => void;
  projectId: string;
};

export const ProjectIdFixModal = ({ visible, onClose, projectId }: Props) => {
  const [copied, setCopied] = React.useState(false);

  const onCopy = React.useCallback(() => {
    if (projectId) {
      if (navigator.clipboard) {
        try {
          navigator.clipboard.writeText(projectId);
          setCopied(true);
        } catch (_) {
          //
        }
      }
    }
  }, [projectId]);

  React.useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 1000);
    }
  }, [copied]);

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      overlay
      header={
        <div
          className={clsx(
            "re-flex",
            "re-flex-col",
            "re-gap-4",
            "re-w-[calc(100%+20px)]",
          )}
        >
          <div
            className={clsx(
              "re-text-gray-300",
              "re-font-semibold",
              "re-text-sm",
              "re-leading-6",
            )}
          >
            Project ID
          </div>
          <div
            className={clsx(
              "re-rounded-lg",
              "re-py-2",
              "re-px-4",
              "re-text-gray-0",
              "re-text-sm",
              "re-leading-6",
              "re-font-mono",
              "re-bg-gray-700",
              "re-relative",
            )}
          >
            {projectId}
            <button
              type="button"
              onClick={onCopy}
              className={clsx(
                "re-w-8",
                "re-h-8",
                "re-rounded-lg",
                "re-flex",
                "re-items-center",
                "re-justify-center",
                "re-absolute",
                "re-right-1",
                "re-top-1",
                "re-bg-gray-800",
                "re-bg-opacity-75",
                "re-opacity-50",
                "hover:re-opacity-100",
                "re-transition-opacity",
                "re-ease-in-out",
                "re-duration-150",
              )}
            >
              {copied ? (
                <CheckAltIcon className="re-text-alt-green" />
              ) : (
                <CopyIcon className="re-text-gray-300" />
              )}
            </button>
          </div>
          <div
            className={clsx("re-text-sm", "re-leading-6", "re-text-gray-400")}
          >
            We could not add the project id to your project due to an error. You
            can follow these steps to add project id yourself
          </div>
        </div>
      }
    >
      <div className={clsx("re-flex", "re-flex-col")}>
        <div
          className={clsx(
            "re-border-b",
            "re-border-b-gray-700",
            "re-p-5",
            "re-flex",
            "re-flex-col",
            "re-gap-2",
          )}
        >
          <div
            className={clsx(
              "re-text-base",
              "re-text-gray-400",
              "re-leading-7",
              "re-flex",
              "re-gap-1",
            )}
          >
            <span className="re-text-gray-300 re-font-semibold">{"1)"}</span>
            <span>Add it to your</span>
            <span
              className={clsx(
                "re-rounded",
                "re-text-sm",
                "re-leading-5",
                "re-bg-gray-700",
                "re-px-1.5",
                "re-py-1",
                "re-font-mono",
                "re-text-gray-300",
              )}
            >
              package.json
            </span>
          </div>
          <div className={clsx("re-p-4", "re-rounded-lg", "re-bg-gray-700")}>
            <Highlight
              language="json"
              size="12px"
              code={getPackageJsonText(projectId ?? "")}
            />
          </div>
        </div>
        <div
          className={clsx(
            "re-border-b",
            "re-border-b-gray-700",
            "re-p-5",
            "re-flex",
            "re-flex-col",
            "re-gap-2",
          )}
        >
          <div
            className={clsx(
              "re-text-base",
              "re-text-gray-400",
              "re-leading-7",
              "re-flex",
              "re-gap-1",
            )}
          >
            <span className="re-text-gray-300 re-font-semibold">{"2)"}</span>
            <span>Add it to your</span>
            <span
              className={clsx(
                "re-rounded",
                "re-text-sm",
                "re-leading-5",
                "re-bg-gray-700",
                "re-px-1.5",
                "re-py-1",
                "re-font-mono",
                "re-text-gray-300",
              )}
            >
              {"<Refine />"}
            </span>
            <span>component</span>
          </div>
          <div
            className={clsx(
              "re-p-4",
              "re-rounded-lg",
              "re-bg-gray-700",
              "re-text-xs",
            )}
          >
            <Highlight
              size="12px"
              language="jsx"
              code={getRefineComponentText(projectId ?? "")}
            />
          </div>
        </div>
        <div
          className={clsx(
            "re-p-5",
            "re-flex",
            "re-flex-col",
            "re-gap-2",
            "re-text-gray-400",
            "re-text-sm",
            "re-leading-6",
          )}
        >
          {
            "That's it! You're now ready for the upcoming features of the Refine Devtools!"
          }
        </div>
      </div>
    </Modal>
  );
};
