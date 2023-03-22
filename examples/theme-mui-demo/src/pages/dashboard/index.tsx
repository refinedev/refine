import { Stack } from "@mui/material";
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
    UrlField,
    TagField,
} from "@refinedev/mui";

const DashboardPage = () => {
    return (
        <Stack>
            <CreateButton />
            <ShowButton />
            <EditButton />
            <CloneButton />
            <DeleteButton />
            <SaveButton />
            <RefreshButton />
            <ListButton />
            <ExportButton />
            <UrlField value="https://refine.dev/" />
            <TagField value="refine" />
        </Stack>
    );
};

export default DashboardPage;
