import { useRef, useEffect, useCallback, PropsWithChildren } from "react";
import { disableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";

import { Cross } from "@components/icons";

import s from "./Modal.module.css";

interface ModalProps {
    className?: string;
    onClose: () => void;
    onEnter?: () => void | null;
}

export const Modal: React.FC<PropsWithChildren<ModalProps>> = ({
    children,
    onClose,
}) => {
    const ref = useRef() as React.MutableRefObject<HTMLDivElement>;

    const handleKey = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                return onClose();
            }
        },
        [onClose],
    );

    useEffect(() => {
        const modal = ref.current;

        if (modal) {
            disableBodyScroll(modal, { reserveScrollBarGap: true });
            window.addEventListener("keydown", handleKey);
        }
        return () => {
            clearAllBodyScrollLocks();
            window.removeEventListener("keydown", handleKey);
        };
    }, [handleKey]);

    return (
        <div className={s.root}>
            <div className={s.modal} role="dialog" ref={ref}>
                <button
                    onClick={() => onClose()}
                    aria-label="Close panel"
                    className={s.close}
                >
                    <Cross className="h-6 w-6" />
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
