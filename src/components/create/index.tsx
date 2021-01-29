import React from "react";

export interface CreateProps {
    resourceName?: string;
}

export const Create: React.FC<CreateProps> = ({ resourceName, children }) => {
    // const { getList } = useContext<IDataContext>(DataContext);
    // const history = useHistory();

    const childrenWithProps = React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, {
                resourceName,
            });
        }
        return child;
    });

    return <section>{childrenWithProps}</section>;
};
