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
} from "@refinedev/chakra-ui";
import { VStack, Button } from "@chakra-ui/react";

const DashboardPage = () => {
    return (
        <>
            <VStack>
                <Button colorScheme="brand">Default Default Button</Button>
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
            </VStack>
        </>
    );
};

export default DashboardPage;
