import { useState } from "react";
import { Avatar, Form, Upload } from "antd";
import { getValueProps, mediaUploadMapper } from "@refinedev/strapi-v4";
import { CloudUploadOutlined } from "@ant-design/icons";
import { getNameInitials } from "../../../utils/get-name-initials";
import { getRandomColorFromString } from "../../../utils/get-random-color";
import { API_URL, TOKEN_KEY } from "../../../utils/constants";
import { useStyles } from "./styled";
import { ILogo } from "../../../interfaces";

type Props = {
  name?: string;
};

export const FormItemUploadLogo = ({ name = "logo" }: Props) => {
  const [error, setError] = useState<string | null>(null);

  const form = Form.useFormInstance();
  const fieldValue = Form.useWatch(name, form) as ILogo | undefined;
  const src = fieldValue?.url ? `${API_URL}${fieldValue?.url}` : null;

  const { styles } = useStyles();

  return (
    <div className={styles.container}>
      <Form.Item
        name="logo"
        valuePropName="fileList"
        getValueProps={(data) => {
          return getValueProps(data, API_URL);
        }}
        noStyle
      >
        <Upload
          className={styles.upload}
          name="file"
          action={`${API_URL}/api/upload`}
          onChange={(info) => {
            if (info.file.status === "done") {
              const media = mediaUploadMapper(info);
            }
          }}
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
      </Form.Item>
    </div>
  );
};
