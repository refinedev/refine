import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

import {
    Box,
    Button,
    Flex,
    FormLabel,
    Input,
    Spacer,
    Stack,
    VStack,
} from "@chakra-ui/react";

export function SignIn() {
    const auth = useAuth();
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const executeSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const result = await auth.signIn(username, password);
        if (result.success) {
            navigate({ pathname: "/success" });
        } else {
            alert(result.message);
        }
    };

    return (
        <Flex justify={"center"}>
            <VStack h={500} justify="center">
                <form noValidate onSubmit={executeSignIn}>
                    <Box>
                        <FormLabel htmlFor="username">User Name</FormLabel>
                        <Spacer height="15px" />
                        <Input
                            type="text"
                            placeholder="UserID"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            size="lg"
                        />
                    </Box>
                    <Spacer height="25px" />
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Input
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        size="lg"
                    />
                    <Spacer height="35px" />
                    <Stack align="center">
                        <Button type="submit" colorScheme="yellow" size="lg">
                            Login
                        </Button>
                    </Stack>
                </form>
            </VStack>
        </Flex>
    );
}
