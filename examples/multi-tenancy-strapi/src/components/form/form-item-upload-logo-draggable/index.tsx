import { API_URL, TOKEN_KEY } from "@/constants";
import { axiosInstance } from "@/lib/axios";
import type { Media, UploadResponse } from "@/types";
import { getValueProps } from "@refinedev/strapi-v4";
import { Form, Typography, Upload } from "antd";
import { createStyles } from "antd-style";
import type { RcFile, UploadChangeParam } from "antd/lib/upload";
import { Image, UploadCloud } from "lucide-react";
import { useMemo } from "react";

type Props = {
  name?: string;
  onUpload?: (params: UploadResponse) => void;
};

export const FormItemUploadLogoDraggable = ({
  name = "image",
  onUpload,
}: Props) => {
  const { styles } = useStyles();

  const form = Form.useFormInstance();
  const fieldValue = Form.useWatch(name, form) as Media | UploadResponse;

  const src = useMemo(() => {
    if (!fieldValue) return null;

    if ("url" in fieldValue) {
      return fieldValue?.url;
    }

    if (fieldValue.file?.response?.[0]?.url) {
      return fieldValue?.file?.response?.[0]?.url;
    }

    return null;
  }, [fieldValue]);

  const onChange = (info: UploadChangeParam) => {
    if (info.file.status === "error") {
    }

    if (info.file.status === "done") {
      onUpload?.(info);
    }
  };

  const customRequest = async ({
    file,
    onSuccess,
  }: {
    file: string | RcFile | Blob;
    onSuccess:
      | ((body: any, xhr?: XMLHttpRequest | undefined) => void)
      | undefined;
  }) => {
    const formData = new FormData();
    formData.append("files", file);
    form.setFields([{ name: name, errors: [] }]);

    try {
      const response = await axiosInstance.post(
        `${API_URL}/api/upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
          },
        },
      );

      onSuccess?.(response?.data, response?.request);
    } catch (error: any) {
      if (error.request.status === 0 || error.request.status === 413) {
        form.setFields([{ name: name, errors: ["File is too large"] }]);
        return;
      }

      form.setFields([
        { name: name, errors: [error?.message || "Something went wrong"] },
      ]);

      return;
    }
  };

  return (
    <div className={styles.container}>
      <Form.Item
        name={name}
        valuePropName="fileList"
        getValueProps={(data) => {
          return getValueProps(data, API_URL);
        }}
        noStyle
      >
        <Upload.Dragger
          name="files"
          listType="picture"
          accept="image/*"
          multiple={false}
          showUploadList={false}
          style={{
            padding: 0,
          }}
          onChange={onChange}
          customRequest={(options) => {
            customRequest({
              file: options.file,
              onSuccess: options.onSuccess,
            });
          }}
        >
          {src && (
            <img
              src={src}
              alt="preview"
              style={{
                width: "240px",
                height: "240px",
                objectFit: "cover",
                borderRadius: "12px",
              }}
            />
          )}
          {!src && (
            <Image
              style={{
                width: "54px",
                height: "54px",
                color: "#D9D9D9",
              }}
            />
          )}
        </Upload.Dragger>
      </Form.Item>
      <div className={styles.label}>
        <UploadCloud />
        <Typography.Text type="secondary">Upload image</Typography.Text>
      </div>
    </div>
  );
};

const useStyles = createStyles(({ token }) => {
  return {
    container: {
      position: "relative",
      width: "240px",
      height: "240px",
      borderRadius: "12px",
      border: `1px dashed ${token.colorBorder}`,
      background: token.colorBorderSecondary,

      ".ant-upload-wrapper .ant-upload-drag .ant-upload": {
        padding: 0,
        width: "240px",
        height: "240px",
      },

      ".ant-upload-drag": {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
    },
    label: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "12px",
      position: "absolute",
      bottom: "20px",
      left: "50%",
      transform: "translateX(-50%)",
      whiteSpace: "nowrap",

      ".ant-typography": {
        color: "#000",
        fontSize: "16px",
      },
    },
  };
});
