import { useState } from "react";

import { useShow } from "@refinedev/core";
import { GetFields } from "@refinedev/nestjs-query";

import {
    ApiOutlined,
    BankOutlined,
    ColumnWidthOutlined,
    DollarOutlined,
    EnvironmentOutlined,
    ShopOutlined,
} from "@ant-design/icons";
import { Card, Input, InputNumber, Select, Space } from "antd";

import { SingleElementForm, Text } from "@/components";
import { BusinessType, CompanySize, Industry } from "@/graphql/schema.types";
import { CompanyInfoQuery } from "@/graphql/types";
import { currencyNumber } from "@/utilities";

import { COMPANY_INFO_QUERY } from "./queries";

type Company = GetFields<CompanyInfoQuery>;

export const CompanyInfoForm = () => {
    const [activeForm, setActiveForm] = useState<
        | "totalRevenue"
        | "industry"
        | "companySize"
        | "businessType"
        | "country"
        | "website"
    >();

    const { queryResult } = useShow<Company>({
        meta: {
            gqlQuery: COMPANY_INFO_QUERY,
        },
    });

    const data = queryResult?.data?.data;
    const {
        totalRevenue,
        industry,
        companySize,
        businessType,
        country,
        website,
    } = data || {};

    const getActiveForm = (args: { formName: keyof Company }) => {
        const { formName } = args;

        if (activeForm === formName) {
            return "form";
        }

        if (!data?.[formName]) {
            return "empty";
        }

        return "view";
    };

    const loading = queryResult?.isLoading;

    return (
        <Card
            title={
                <Space size={15}>
                    <ShopOutlined className="sm" />
                    <Text>Company info</Text>
                </Space>
            }
            headStyle={{
                padding: "1rem",
            }}
            bodyStyle={{
                padding: "0",
            }}
            style={{
                maxWidth: "500px",
            }}
        >
            <SingleElementForm
                loading={loading}
                style={{
                    padding: "0.5rem 1rem",
                }}
                icon={<ColumnWidthOutlined className="tertiary" />}
                state={getActiveForm({ formName: "companySize" })}
                itemProps={{
                    name: "companySize",
                    label: "Company size",
                }}
                view={<Text>{companySize}</Text>}
                onClick={() => setActiveForm("companySize")}
                onUpdate={() => setActiveForm(undefined)}
                onCancel={() => setActiveForm(undefined)}
            >
                <Select
                    autoFocus
                    defaultValue={companySize}
                    options={companySizeOptions}
                    style={{
                        width: "100%",
                    }}
                />
            </SingleElementForm>
            <SingleElementForm
                loading={loading}
                style={{
                    padding: "0.5rem 1rem",
                }}
                icon={<DollarOutlined className="tertiary" />}
                state={getActiveForm({ formName: "totalRevenue" })}
                itemProps={{
                    name: "totalRevenue",
                    label: "Total revenue",
                }}
                view={<Text>{currencyNumber(totalRevenue || 0)}</Text>}
                onClick={() => setActiveForm("totalRevenue")}
                onUpdate={() => setActiveForm(undefined)}
                onCancel={() => setActiveForm(undefined)}
            >
                <InputNumber
                    autoFocus
                    addonBefore={"$"}
                    min={0}
                    placeholder="0,00"
                    defaultValue={totalRevenue || 0}
                    formatter={(value) =>
                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                />
            </SingleElementForm>
            <SingleElementForm
                loading={loading}
                style={{
                    padding: "0.5rem 1rem",
                }}
                icon={<BankOutlined className="tertiary" />}
                state={getActiveForm({ formName: "industry" })}
                itemProps={{
                    name: "industry",
                    label: "Industry",
                }}
                view={<Text>{industry}</Text>}
                onClick={() => setActiveForm("industry")}
                onUpdate={() => setActiveForm(undefined)}
                onCancel={() => setActiveForm(undefined)}
            >
                <Select
                    autoFocus
                    defaultValue={industry}
                    options={industryOptions}
                    style={{
                        width: "100%",
                    }}
                />
            </SingleElementForm>
            <SingleElementForm
                loading={loading}
                style={{
                    padding: "0.5rem 1rem",
                }}
                icon={<ApiOutlined className="tertiary" />}
                state={getActiveForm({ formName: "businessType" })}
                itemProps={{
                    name: "businessType",
                    label: "Business type",
                }}
                view={<Text>{businessType}</Text>}
                onClick={() => setActiveForm("businessType")}
                onUpdate={() => setActiveForm(undefined)}
                onCancel={() => setActiveForm(undefined)}
            >
                <Select
                    autoFocus
                    defaultValue={businessType}
                    options={businessTypeOptions}
                    style={{
                        width: "100%",
                    }}
                />
            </SingleElementForm>
            <SingleElementForm
                loading={loading}
                style={{
                    padding: "0.5rem 1rem",
                }}
                icon={<EnvironmentOutlined className="tertiary" />}
                state={getActiveForm({ formName: "country" })}
                itemProps={{
                    name: "country",
                    label: "Country",
                }}
                view={<Text>{country}</Text>}
                onClick={() => setActiveForm("country")}
                onUpdate={() => setActiveForm(undefined)}
                onCancel={() => setActiveForm(undefined)}
            >
                <Input
                    autoFocus
                    defaultValue={country || ""}
                    placeholder="Country"
                    style={{
                        width: "100%",
                    }}
                />
            </SingleElementForm>
            <SingleElementForm
                loading={loading}
                style={{
                    padding: "0.5rem 1rem",
                }}
                icon={<EnvironmentOutlined className="tertiary" />}
                state={getActiveForm({ formName: "website" })}
                itemProps={{
                    name: "website",
                    label: "Website",
                }}
                view={<Text>{website}</Text>}
                onClick={() => setActiveForm("website")}
                onUpdate={() => setActiveForm(undefined)}
                onCancel={() => setActiveForm(undefined)}
            >
                <Input
                    autoFocus
                    defaultValue={website || ""}
                    placeholder="Website"
                    style={{
                        width: "100%",
                    }}
                />
            </SingleElementForm>
        </Card>
    );
};

const companySizeOptions: {
    label: string;
    value: CompanySize;
}[] = [
    {
        label: "Enterprise",
        value: "ENTERPRISE",
    },
    {
        label: "Large",
        value: "LARGE",
    },
    {
        label: "Medium",
        value: "MEDIUM",
    },
    {
        label: "Small",
        value: "SMALL",
    },
];

const industryOptions: {
    label: string;
    value: Industry;
}[] = [
    { label: "Aerospace", value: "AEROSPACE" },
    { label: "Agriculture", value: "AGRICULTURE" },
    { label: "Automotive", value: "AUTOMOTIVE" },
    { label: "Chemicals", value: "CHEMICALS" },
    { label: "Construction", value: "CONSTRUCTION" },
    { label: "Defense", value: "DEFENSE" },
    { label: "Education", value: "EDUCATION" },
    { label: "Energy", value: "ENERGY" },
    { label: "Financial Services", value: "FINANCIAL_SERVICES" },
    { label: "Food and Beverage", value: "FOOD_AND_BEVERAGE" },
    { label: "Government", value: "GOVERNMENT" },
    { label: "Healthcare", value: "HEALTHCARE" },
    { label: "Hospitality", value: "HOSPITALITY" },
    { label: "Industrial Manufacturing", value: "INDUSTRIAL_MANUFACTURING" },
    { label: "Insurance", value: "INSURANCE" },
    { label: "Life Sciences", value: "LIFE_SCIENCES" },
    { label: "Logistics", value: "LOGISTICS" },
    { label: "Media", value: "MEDIA" },
    { label: "Mining", value: "MINING" },
    { label: "Nonprofit", value: "NONPROFIT" },
    { label: "Other", value: "OTHER" },
    { label: "Pharmaceuticals", value: "PHARMACEUTICALS" },
    { label: "Professional Services", value: "PROFESSIONAL_SERVICES" },
    { label: "Real Estate", value: "REAL_ESTATE" },
    { label: "Retail", value: "RETAIL" },
    { label: "Technology", value: "TECHNOLOGY" },
    { label: "Telecommunications", value: "TELECOMMUNICATIONS" },
    { label: "Transportation", value: "TRANSPORTATION" },
    { label: "Utilities", value: "UTILITIES" },
];

const businessTypeOptions: {
    label: string;
    value: BusinessType;
}[] = [
    {
        label: "B2B",
        value: "B2B",
    },
    {
        label: "B2C",
        value: "B2C",
    },
    {
        label: "B2G",
        value: "B2G",
    },
];
