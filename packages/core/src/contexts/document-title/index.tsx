import React, {
    FC,
    PropsWithChildren,
    createContext,
    useEffect,
    useRef,
    useState,
} from "react";
import { IDocumentTitleContext } from "./IDocumentTitleContext";

export const DocumentTitleContext = createContext<IDocumentTitleContext>({
    title: "",
    updateTitle: () => undefined,
});

export const DocumentTitleProvider: FC<PropsWithChildren> = ({ children }) => {
    const [title, setTitle] = useState("");
    const prevPriority = useRef<0 | 1>(0); // used to prefer title updates from useDocumentTitle over the default title generator
    const prevPathname = useRef("");

    useEffect(() => {
        document.title = title;
    }, [title]);

    const updateTitle = (
        title: string,
        pathname: string,
        priority: 0 | 1 = 0,
    ) => {
        // update title only if pathname has changed or priority is higher than the previous priority
        if (
            pathname &&
            (pathname !== prevPathname.current ||
                priority >= prevPriority.current)
        ) {
            prevPriority.current = priority;
            prevPathname.current = pathname;
            setTitle(title);
        }
    };

    return (
        <DocumentTitleContext.Provider value={{ title, updateTitle }}>
            {children}
        </DocumentTitleContext.Provider>
    );
};
