import { useMemo, useState } from "react";
import { Avatar, Form, Upload } from "antd";
import { getValueProps } from "@refinedev/strapi-v4";
import { CloudUploadOutlined } from "@ant-design/icons";
import { getNameInitials } from "../../../utils/get-name-initials";
import { getRandomColorFromString } from "../../../utils/get-random-color";
import { API_URL, TOKEN_KEY } from "../../../utils/constants";
import { IMedia, UploadResponse } from "../../../interfaces";
import { useStyles } from "./styled";

type Props = {
  name?: string;
  onUpload?: (params: UploadResponse) => void;
};

export const FormItemUploadLogo = ({ name = "logo", onUpload }: Props) => {
  const [error, setError] = useState<string | null>(null);

  const form = Form.useFormInstance();
  const fieldValue = Form.useWatch(name, form) as IMedia | UploadResponse;

  // biome-ignore lint/correctness/useExhaustiveDependencies: false positive
  const src = useMemo(() => {
    if (!fieldValue) return null;

    if ("url" in fieldValue) {
      return `${API_URL}${fieldValue?.url}`;
    }

    if (fieldValue.file?.response?.[0]?.url) {
      return `${API_URL}${fieldValue?.file?.response?.[0]?.url}`;
    }

    return null;
  }, [fieldValue]);

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
          name="files"
          action={`${API_URL}/api/upload`}
          listType="picture"
          multiple={false}
          showUploadList={false}
          onChange={(info) => {
            if (info.file.status === "done") {
              onUpload?.(info);
            }
          }}
          headers={{
            Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
          }}
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
