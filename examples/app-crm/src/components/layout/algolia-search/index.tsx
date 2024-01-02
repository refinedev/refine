import { FC, useState } from "react";
import { useHits, useSearchBox } from "react-instantsearch";
import { Link } from "react-router-dom";

import { useNavigation, useResource } from "@refinedev/core";

import { SearchOutlined } from "@ant-design/icons";
import { Input, List, Popover, Tag, Typography } from "antd";
import cn from "classnames";

import {
    Company,
    Contact,
    Deal,
    Event,
    Quote,
    Task,
    User,
} from "@/graphql/schema.types";

import { CustomAvatar } from "../../custom-avatar";
import styles from "./index.module.css";

export const AlgoliaSearch: React.FC = () => {
    const [open, setOpen] = useState(false);
    const { query, refine } = useSearchBox();
    const [inputValue, setInputValue] = useState(query);

    const setQuery = (newQuery: string) => {
        setInputValue(newQuery);
        refine(newQuery);
    };

    return (
        <div className={styles.container}>
            <Popover
                overlayClassName={styles.popover}
                content={
                    <AlgoliaSearchResult
                        onHitClick={() => {
                            setOpen(false);
                            setInputValue("");
                        }}
                    />
                }
                trigger="click"
                open={!!inputValue || open}
                onOpenChange={(open) => {
                    setOpen(open);
                }}
            >
                <Input
                    className={styles.input}
                    size="large"
                    prefix={
                        <SearchOutlined
                            className={cn(
                                styles.inputPrefix,
                                "secondary",
                                "tertiary",
                            )}
                        />
                    }
                    suffix={<div className={styles.inputSuffix}>/</div>}
                    placeholder="Search"
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck={false}
                    maxLength={512}
                    type="search"
                    value={inputValue}
                    onChange={(event) => {
                        setQuery(event.currentTarget.value);
                    }}
                />
            </Popover>
        </div>
    );
};

type Hit = (User | Deal | Task | Company | Contact | Quote | Event) & {
    resource: string;
};

type SearchResultProps = {
    onHitClick: () => void;
};

export const AlgoliaSearchResult: FC<SearchResultProps> = ({ onHitClick }) => {
    const { showUrl, editUrl } = useNavigation();
    const { hits } = useHits() as { hits: Hit[] };
    const { select } = useResource();

    const getTitle = (item: Hit) => {
        if ("name" in item) {
            return item.name;
        }

        if ("title" in item) {
            return item.title;
        }

        return "";
    };

    const getDescription = (item: Hit) => {
        if ("description" in item) {
            return item.description;
        }

        if ("jobTitle" in item) {
            return item.jobTitle;
        }

        if ("email" in item) {
            return item.email;
        }

        if ("industry" in item) {
            return `${item.industry}`;
        }
    };

    const getResourceLabel = (resource: string) => {
        const label = select(resource).resource.meta?.label ?? resource;
        return label;
    };

    const getResourceLink = (item: Hit) => {
        if (["contacts", "quotes", "events", "user"].includes(item.resource)) {
            return showUrl(item.resource, item.id);
        }

        if (["tasks", "deals", "companies"].includes(item.resource)) {
            return editUrl(item.resource, item.id);
        }

        return "";
    };

    return (
        <List
            className={styles.list}
            style={{
                width: "400px",
            }}
            itemLayout="horizontal"
            dataSource={hits}
            renderItem={(item) => {
                return (
                    <Link to={getResourceLink(item)}>
                        <List.Item
                            className={styles.listItem}
                            onClick={onHitClick}
                        >
                            <List.Item.Meta
                                avatar={
                                    "avatarUrl" in item ? (
                                        <CustomAvatar
                                            src={item.avatarUrl}
                                            shape={
                                                item.resource === "companies"
                                                    ? "square"
                                                    : "circle"
                                            }
                                        >
                                            {item.name}
                                        </CustomAvatar>
                                    ) : null
                                }
                                title={
                                    <div className={styles.title}>
                                        <Typography.Text
                                            className="secondary"
                                            ellipsis={{
                                                tooltip: getTitle(item),
                                            }}
                                        >
                                            {getTitle(item)}
                                        </Typography.Text>
                                        <Tag
                                            className={styles.tag}
                                            color="default"
                                        >
                                            {getResourceLabel(item.resource)}
                                        </Tag>
                                    </div>
                                }
                                description={
                                    <Typography.Paragraph
                                        style={{
                                            margin: 0,
                                        }}
                                        className="secondary"
                                        ellipsis={{
                                            rows: 2,
                                        }}
                                    >
                                        {getDescription(item)}
                                    </Typography.Paragraph>
                                }
                            />
                        </List.Item>
                    </Link>
                );
            }}
        />
    );
};
