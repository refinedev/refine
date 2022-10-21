import { useAuth } from "../hooks/useAuth";
import PrivateRoute from "../components/PrivateRoute";

import { Box, Button, Text, VStack } from "@chakra-ui/react";

export function SuccessPage() {
    const auth = useAuth();

    if (auth.isLoading) {
        return <Box />;
    }

    return (
        <PrivateRoute>
            <VStack h={500} justify="center" spacing={8}>
                <Text fontSize="5xl">Welcome {auth.username}!!</Text>
                <Text fontSize="4xl">Login Succeed</Text>
                <Button
                    colorScheme="yellow"
                    size="lg"
                    onClick={() => auth.signOut()}
                >
                    Log out
                </Button>
            </VStack>
        </PrivateRoute>
    );
}
