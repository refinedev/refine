import { Button, Flex, Form, Upload, theme } from "antd";
import { CloudUploadOutlined, PictureOutlined } from "@ant-design/icons";
import { getValueProps } from "@refinedev/strapi-v4";
import { API_URL, TOKEN_KEY } from "../../../utils/constants";
import { IMedia, UploadResponse } from "../../../interfaces";
import { useMemo } from "react";

type Props = {
  name?: string;
  onUpload?: (params: UploadResponse) => void;
};

export const FormItemUploadLogoDraggable = ({
  name = "logo",
  onUpload,
}: Props) => {
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

  const { token } = theme.useToken();

  return (
    <Flex gap={16} vertical>
      <div
        style={{
          width: "148px",
          height: "148px",
        }}
      >
        <Form.Item
          name="logo"
          valuePropName="fileList"
          getValueProps={(data) => {
            return getValueProps(data, API_URL);
          }}
          noStyle
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
                onUpload?.(info);
              }
            }}
            headers={{
              Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
            }}
          >
            {src && (
              <img
                src={src}
                alt="preview"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            )}
            {!src && (
              <PictureOutlined
                style={{
                  fontSize: "48px",
                  color: token.colorTextTertiary,
                }}
              />
            )}
          </Upload.Dragger>
        </Form.Item>
      </div>
      <Form.Item
        name="logo"
        valuePropName="fileList"
        getValueProps={(data) => {
          return getValueProps(data, API_URL);
        }}
        noStyle
      >
        <Upload
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
          <Button
            style={{
              width: "148px",
            }}
            icon={<CloudUploadOutlined />}
          >
            Upload Logo
          </Button>
        </Upload>
      </Form.Item>
    </Flex>
  );
};
