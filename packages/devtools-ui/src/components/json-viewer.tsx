import clsx from "clsx";
import React from "react";
import ReactJson from "react-json-view";
import { MaximizeIcon } from "./icons/maximize";
import { Modal } from "./modal";

export const JsonViewer = ({ data, label }: { data: any; label: string }) => {
  const [modalVisible, setModalVisible] = React.useState(false);

  return (
    <div className={clsx("re-relative")}>
      <ReactJson
        src={data}
        enableClipboard={false}
        displayDataTypes={false}
        theme="flat"
        style={{
          backgroundColor: "#303450",
          padding: "8px",
          borderRadius: "8px",
          overflow: "auto",
          maxHeight: "160px",
        }}
        collapsed={2}
        name={false}
      />
      <button
        type="button"
        onClick={() => setModalVisible(true)}
        className={clsx(
          "re-group",
          "re-absolute",
          "re-right-2",
          "re-top-2",
          "re-bg-gray-900",
          "re-bg-opacity-50",
          "hover:re-bg-opacity-75",
          "re-p-1",
          "re-rounded",
          "re-border-0",
          "re-outline-none",
          "re-appearance-none",
          "re-transition-colors",
          "re-duration-200",
          "re-ease-in-out",
        )}
      >
        <MaximizeIcon
          className={clsx(
            "re-w-4",
            "re-h-4",
            "group-hover:re-scale-110",
            "re-transition-transform",
            "re-duration-200",
            "re-ease-in-out",
            "re-text-gray-400",
          )}
        />
      </button>
      <Modal
        overlay
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        className={clsx("re-min-w-[520px]", "re-w-3/4", "re-max-w-[90%]")}
        header={
          <span className={clsx("re-capitalize", "re-font-semibold")}>
            {label}
          </span>
        }
      >
        <div className={clsx("re-p-2")}>
          <ReactJson
            src={data}
            enableClipboard={false}
            displayDataTypes={false}
            theme="flat"
            style={{
              backgroundColor: "#303450",
              padding: "8px",
              borderRadius: "8px",
              overflow: "auto",
              maxHeight: "calc(100vh - 96px - 65px - 16px - 2px)",
              minHeight: "calc(100vh - 96px - 65px - 16px - 2px)",
            }}
            collapsed={2}
            name={false}
          />
        </div>
      </Modal>
    </div>
  );
};
