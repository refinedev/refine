import { Button, Stack } from "@mui/material";
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
        <Stack spacing={2}>
            <Button variant="contained">Default contained MUI Button</Button>
            <Button variant="outlined">Default outlined MUI Button</Button>
            <Button variant="text">Default text MUI Button</Button>
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
