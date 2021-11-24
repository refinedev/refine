import { AntdLayout, Radio } from "@pankod/refine";

interface HeaderProps {
    role: string;
    setRole: React.Dispatch<React.SetStateAction<string>>;
}

export const Header: React.FC<HeaderProps> = ({ role, setRole }) => {
    return (
        <AntdLayout.Header
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "48px",
                backgroundColor: "#FFF",
            }}
        >
            <Radio.Group
                value={role}
                onChange={(event) => setRole(event.target.value)}
            >
                <Radio.Button value="admin">Admin</Radio.Button>
                <Radio.Button value="editor">Editor</Radio.Button>
            </Radio.Group>
        </AntdLayout.Header>
    );
};
