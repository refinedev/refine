import { Avatar, Upload } from "antd";
import { getNameInitials } from "../../utils/get-name-initials";
import { getRandomColorFromString } from "../../utils/get-random-color";
import { CloudUploadOutlined } from "@ant-design/icons";
import { API_URL, TOKEN_KEY } from "../../utils/constants";

type Props = {
  src?: string;
  name?: string;
};

export const UploadAvatar = ({ name, src }: Props) => {
  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <Upload
        name="files"
        action={`${API_URL}/api/upload`}
        headers={{
          Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
        }}
        listType="picture"
        multiple={false}
        showUploadList={false}
        style={{
          zIndex: 3,
          display: "block",
          width: "100%",
          height: "100%",
          border: "none",
        }}
      >
        <Avatar
          size={96}
          shape="square"
          src={src}
          style={{
            zIndex: 1,
            cursor: "pointer",
            backgroundColor: name
              ? "transparent"
              : getRandomColorFromString(name || ""),
          }}
        >
          {getNameInitials(name || "")}
        </Avatar>
        <div
          style={{
            cursor: "pointer",
            zIndex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            bottom: 0,
            right: 0,
            height: "50%",
            width: "96px",
            backgroundColor: "rgba(0, 0, 0, 0.45)",
            borderBottomLeftRadius: "6px",
            borderBottomRightRadius: "6px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.25)",
              width: "32px",
              height: "32px",
              borderRadius: "50%",
            }}
          >
            <CloudUploadOutlined
              style={{
                color: "white",
                width: "16px",
                height: "16px",
              }}
            />
          </div>
        </div>
      </Upload>
    </div>
  );
};
