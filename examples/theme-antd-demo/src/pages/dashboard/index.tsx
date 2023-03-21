import {
    ListButton,
    ShowButton,
    CreateButton,
    EditButton,
    CloneButton,
    DeleteButton,
    SaveButton,
    RefreshButton,
    ExportButton,
    ImportButton,
    UrlField,
    TagField,
    useImport,
} from "@refinedev/antd";
import { Space } from "antd";

const DashboardPage = () => {
    const importProps = useImport();

    return (
        <Space size="large" direction="vertical">
            <CreateButton />
            <ShowButton />
            <EditButton />
            <CloneButton />
            <DeleteButton />
            <SaveButton />
            <RefreshButton />
            <ListButton />
            <ExportButton />
            <ImportButton {...importProps} />
            <UrlField value="https://refine.dev/" />
            <TagField value="refine" />
        </Space>
    );
};

export default DashboardPage;
