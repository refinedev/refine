import { useState } from "react";
import { Avatar, Upload } from "antd";
import { getNameInitials } from "../../utils/get-name-initials";
import { getRandomColorFromString } from "../../utils/get-random-color";
import { CloudUploadOutlined } from "@ant-design/icons";
import { API_URL, TOKEN_KEY } from "../../utils/constants";
import { useStyles } from "./styled";

type Props = {
  src?: string;
  name?: string;
};

export const UploadAvatar = ({ name, src }: Props) => {
  const [error, setError] = useState<string | null>(null);

  const { styles } = useStyles();

  return (
    <div className={styles.container}>
      <Upload
        className={styles.upload}
        name="files"
        action={`${API_URL}/api/upload`}
        headers={{
          Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
        }}
        listType="picture"
        multiple={false}
        showUploadList={false}
      >
        <Avatar
          size={96}
          shape="square"
          src={src}
          alt={name}
          onError={() => {
            setError("Error loading image");
            return true;
          }}
          style={{
            zIndex: 1,
            cursor: "pointer",
            borderRadius: "6px",
            ...((error || !src) && {
              background: getRandomColorFromString(name || ""),
            }),
          }}
        >
          {getNameInitials(name || "")}
        </Avatar>
        <div className={styles.overlayContainer}>
          <div className={styles.overlayIconContainer}>
            <CloudUploadOutlined className={styles.overlayIcon} />
          </div>
        </div>
      </Upload>
    </div>
  );
};
