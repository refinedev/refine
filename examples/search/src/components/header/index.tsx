import { AntdLayout, AutoComplete, Input } from "@pankod/refine";

export const Header: React.FC = () => {
    return (
        <AntdLayout.Header
            style={{
                padding: "0px 0px 0px 24px",
                height: "55px",
                backgroundColor: "#FFF",
            }}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    height: "100%",
                    alignItems: "center",
                }}
            >
                <AutoComplete
                    dropdownMatchSelectWidth={500}
                    style={{ width: 500 }}
                    options={[
                        {
                            label: "Demo Title",
                            options: [
                                { value: "demo value", label: "demo label" },
                            ],
                        },
                    ]}
                >
                    <Input.Search size="large" placeholder="input here" />
                </AutoComplete>
            </div>
        </AntdLayout.Header>
    );
};
