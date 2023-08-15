import { CreateButton, EditButton } from "@refinedev/antd";

type Props = React.PropsWithChildren<{}>;

export const KanbanPage = ({ children }: Props) => {
    return (
        <>
            <CreateButton type="default">Add new card</CreateButton>
            <EditButton type="default" recordItemId={15}>
                Edit Task
            </EditButton>
            {children}
        </>
    );
};
