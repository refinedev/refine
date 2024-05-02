import { useState } from "react";
import { Button, Flex, Form, Input, Select, Upload, theme } from "antd";
import { API_URL, TOKEN_KEY } from "../../utils/constants";
import { CloudUploadOutlined, PictureOutlined } from "@ant-design/icons";

type Props = {
  onUpload: (url: string) => void;
};

export const AccountLogoUpload = ({ onUpload }: Props) => {
  const [previewImage, setPreviewImage] = useState<string | undefined>();

  const { token } = theme.useToken();

  return (
    <Flex gap={16} vertical>
      <div
        style={{
          width: "148px",
          height: "148px",
        }}
      >
        <Upload.Dragger
          name="files"
          action={`${API_URL}/api/upload`}
          listType="picture"
          multiple={false}
          showUploadList={false}
          style={{
            padding: 0,
          }}
          onChange={(info) => {
            if (info.file.status === "done") {
              const url = `${API_URL}${info?.file?.response?.[0]?.url}`;

              setPreviewImage(url);
              onUpload(url);
            }
          }}
          headers={{
            Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
          }}
        >
          {previewImage && (
            <img
              src={previewImage}
              alt="preview"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          )}
          {!previewImage && (
            <PictureOutlined
              style={{
                fontSize: "48px",
                color: token.colorTextTertiary,
              }}
            />
          )}
        </Upload.Dragger>
      </div>
      <Upload
        name="files"
        action={`${API_URL}/api/upload`}
        onChange={(info) => {
          if (info.file.status === "done") {
            const url = `${API_URL}${info?.file?.response?.[0]?.url}`;

            setPreviewImage(url);
            onUpload(url);
          }
        }}
        headers={{
          Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
        }}
        listType="picture"
        multiple={false}
        showUploadList={false}
      >
        <Button
          style={{
            width: "148px",
          }}
          icon={<CloudUploadOutlined />}
        >
          Upload Logo
        </Button>
      </Upload>
    </Flex>
  );
};
