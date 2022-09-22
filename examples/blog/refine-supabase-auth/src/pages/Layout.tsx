import { LayoutProps, useLogout } from '@pankod/refine-core';
import { Button } from 'react-daisyui';

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    const { mutate: logout } = useLogout();
    return (
        <div className="flex min-h-screen flex-col">
            <div className="mb-2 py-3 bg-gray">
                <div className="container mx-auto flex">
                    <Button
                        color="accent"
                        size="sm"
                        className="ml-auto shadow"
                        onClick={() => logout()}
                    >
                        Logout
                    </Button>
                </div>
            </div>
            <div className="container bg-white mx-auto py-4">{children}</div>
        </div>
    );
};
