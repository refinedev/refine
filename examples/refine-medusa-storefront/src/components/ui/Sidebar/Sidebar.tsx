import cn from "clsx";
import s from "./Sidebar.module.css";
import { useEffect, useRef } from "react";
import { disableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";
interface SidebarProps {
    children: any;
    onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ children, onClose }) => {
    const sidebarRef = useRef() as React.MutableRefObject<HTMLDivElement>;
    const contentRef = useRef() as React.MutableRefObject<HTMLDivElement>;

    const onKeyDownSidebar = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.code === "Escape") {
            onClose();
        }
    };

    useEffect(() => {
        if (sidebarRef.current) {
            sidebarRef.current.focus();
        }

        const contentElement = contentRef.current;

        if (contentElement) {
            disableBodyScroll(contentElement, { reserveScrollBarGap: true });
        }

        return () => {
            clearAllBodyScrollLocks();
        };
    }, []);

    return (
        <div
            className={cn(s.root)}
            ref={sidebarRef}
            onKeyDown={onKeyDownSidebar}
            tabIndex={1}
        >
            <div className="absolute inset-0 overflow-hidden">
                <div className={s.backdrop} onClick={onClose} />
                <section className="absolute inset-y-0 right-0 w-full md:w-auto max-w-full flex outline-none md:pl-10">
                    <div className="h-full w-full md:w-screen md:max-w-md">
                        <div className={s.sidebar} ref={contentRef}>
                            {children}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Sidebar;
