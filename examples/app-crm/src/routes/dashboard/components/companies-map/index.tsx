import { lazy, Suspense } from "react";

import { useNavigation } from "@refinedev/core";

import { GlobalOutlined, RightCircleOutlined } from "@ant-design/icons";
import { Button, Card } from "antd";

import { Text } from "@/components";

import Countries from "./countries.json";
import styles from "./index.module.css";

const Map = lazy(() => import("./map"));

export const CompaniesMap: React.FC = () => {
    const { list } = useNavigation();

    return (
        <Card
            style={{ height: "100%" }}
            bodyStyle={{
                padding: 0,
                overflow: "hidden",
            }}
            title={
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                    }}
                >
                    <GlobalOutlined />
                    <Text size="sm" style={{ marginLeft: ".5rem" }}>
                        Companies
                    </Text>
                </div>
            }
            extra={
                <Button
                    onClick={() => list("companies")}
                    icon={<RightCircleOutlined />}
                >
                    See all companies
                </Button>
            }
        >
            <div
                style={{
                    height: "318px",
                    marginTop: "2px",
                    position: "relative",
                }}
            >
                <Suspense>
                    <Map />
                </Suspense>
            </div>
            <div className={styles.countries}>
                {Countries.map((country) => {
                    return (
                        <div className={styles.item} key={country.id}>
                            <img
                                className={styles.flag}
                                src={country.flag}
                                alt={`${country.name} flag`}
                                width={14}
                                height={7}
                            />
                            <div>{country.shortName}</div>
                            {country.count}
                        </div>
                    );
                })}
            </div>
        </Card>
    );
};
