import { ModalProps } from "../../../components/antd";
import {
    useModal as useCoreModal,
    useModalReturnType as useCoreModelReturnType,
} from "@pankod/refine-core";

export type useModalReturnType = {
    modalProps: ModalProps;
} & Omit<useCoreModelReturnType, "visible">;

export type useModalProps = {
    modalProps?: ModalProps;
};

export const useModal = ({
    modalProps = {},
}: useModalProps = {}): useModalReturnType => {
    const { show, close, visible } = useCoreModal({
        defaultVisible: modalProps.open,
    });

    return {
        modalProps: {
            ...modalProps,
            onCancel: (e: React.MouseEvent<HTMLElement>) => {
                modalProps.onCancel?.(e);
                close();
            },
            open: visible,
            visible,
        },
        show,
        close,
    };
};
