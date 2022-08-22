import React, { ElementType, RefObject, PropsWithChildren } from 'react';
import { OverlayTriggerState } from '@react-stately/overlays';
import {
    useOverlay,
    usePreventScroll,
    useModal,
    OverlayContainer,
} from '@react-aria/overlays';
import { useDialog } from '@react-aria/dialog';
import { FocusScope } from '@react-aria/focus';
import { AriaButtonProps, OverlayProvider } from 'react-aria';

function ModalDialog(props: AriaButtonProps<ElementType> | any) {
    const { title, children } = props;
    const ref: RefObject<any> = React.useRef();
    const { overlayProps, underlayProps } = useOverlay(props, ref);

    usePreventScroll();
    const { modalProps } = useModal();
    const { dialogProps, titleProps } = useDialog(props, ref);

    return (
        <div
            style={{
                position: 'fixed',
                zIndex: 100,
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                background: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
            {...underlayProps}
        >
            <FocusScope contain restoreFocus autoFocus>
                <div
                    {...overlayProps}
                    {...dialogProps}
                    {...modalProps}
                    ref={ref}
                    className="w-full bg-white text-black p-7 max-w-xl"
                >
                    <h3
                        {...titleProps}
                        className="mt-0 pb-4 border-b border-slate-200 border-solid text-xl mb-6 font-bold"
                    >
                        {title}
                    </h3>
                    {children}
                </div>
            </FocusScope>
        </div>
    );
}

type ModalProps = {
    title: string;
    overlayState: OverlayTriggerState;
};
export default function Modal(props: PropsWithChildren<ModalProps>) {
    const {
        title,
        overlayState: { close, isOpen },
        children,
    } = props;
    return (
        <OverlayProvider>
            {isOpen && (
                <OverlayContainer>
                    <ModalDialog
                        title={title}
                        isOpen
                        onClose={close}
                        isDismissable
                    >
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'column',
                            }}
                        >
                            {children}
                        </div>
                    </ModalDialog>
                </OverlayContainer>
            )}
        </OverlayProvider>
    );
}
