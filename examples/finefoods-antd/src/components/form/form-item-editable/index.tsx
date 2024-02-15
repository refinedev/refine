import { Form, FormItemProps, Input, InputProps } from "antd";
import { useStyles } from "./styled";

type Props = {
    inputProps?: InputProps;
    formItemProps?: FormItemProps;
    variant?: "default" | "title";
};

export const FormItemEditable = ({
    formItemProps,
    inputProps,
    variant = "title",
}: Props) => {
    const { styles, cx } = useStyles();

    return (
        <Form.Item
            {...formItemProps}
            className={cx(styles.formItem, styles[variant])}
        >
            <Input {...inputProps} />
        </Form.Item>
    );
};
