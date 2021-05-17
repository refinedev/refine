import React from "react";
import { Card, Button } from "@pankod/refine";
import { useAuth0 } from "@auth0/auth0-react";

export const Dashboard: React.FC = () => {
    const { user, logout } = useAuth0();

    return (
        <Card>
            <strong>Welcome, </strong> {user?.name}
            <Button onClick={() => logout()} type="link">
                Logout
            </Button>
        </Card>
    );
};
