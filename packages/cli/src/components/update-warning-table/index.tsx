import React, { FC } from "react";
import Table from "ink-table";
import { Box, Text } from "ink";

interface UpdateWarningTableProps {
    data: Record<string, string | number>[];
}

const UpdateWarningTable: FC<UpdateWarningTableProps> = ({ data }) => {
    return (
        <Box
            width={"100%"}
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
        >
            <Text>Update Available</Text>
            <Table data={data} />
            <Text>
                To upgrade <Text bold>`refine`</Text> packages with the latest
                version
            </Text>
            <Text>
                Run to following command{" "}
                <Text color="yellowBright">`refine upgrade`</Text>
            </Text>
        </Box>
    );
};

export default UpdateWarningTable;
