import { useCallback, useState } from "react";
import { ModalProps } from "@components/antd";

export type useModalReturnType = {
    modalProps: ModalProps;
    show: () => void;
    close: () => void;
};

export type useModalProps = {
    modalProps?: ModalProps;
};

export const useModal = ({
    modalProps = {},
}: useModalProps = {}): useModalReturnType => {
    const [visible, setVisible] = useState(modalProps.visible);

    const show = useCallback(() => setVisible(true), [visible]);
    const close = useCallback(() => setVisible(false), [visible]);

    const modalPropshede = {
        ...modalProps,
        visible,
    };
    console.log(visible, modalPropshede.visible);

    return {
        modalProps: {
            ...modalPropshede,
            onCancel: (e: React.MouseEvent<HTMLElement>) => {
                modalProps.onCancel?.(e);
                close();
            },
        },
        show,
        close,
    };
};
