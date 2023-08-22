import React, { useMemo } from "react";
import { useApiUrl, useCustom } from "@refinedev/core";
import dayjs from "dayjs";
import { KpiCard } from "../../components/dashboard/kpiCard";
import { ResponsiveAreaChart } from "../../components/dashboard/ResponsiveAreaChart";
import { ResponsiveBarChart } from "../../components/dashboard/ResponsiveBarChart";
import { TabView } from "../../components/dashboard/TabView";
import { TTab } from "../../interfaces";

const query = {
    start: dayjs().subtract(7, "days").startOf("day"),
    end: dayjs().startOf("day"),
};

export const Dashboard: React.FC = () => {
    const API_URL = useApiUrl();

    const { data: dailyRevenue } = useCustom<any>({
        url: `${API_URL}/dailyRevenue`,
        method: "get",
        config: {
            query,
        },
    });

    const { data: dailyOrders } = useCustom<any>({
        url: `${API_URL}/dailyOrders`,
        method: "get",
        config: {
            query,
        },
    });

    const { data: newCustomers } = useCustom<any>({
        url: `${API_URL}/newCustomers`,
        method: "get",
        config: {
            query,
        },
    });

    const useMemoizedChartData = (d: any) => {
        return useMemo(() => {
            return d?.data?.data?.map((item: any) => ({
                date: new Intl.DateTimeFormat("en-US", {
                    month: "short",
                    year: "numeric",
                    day: "numeric",
                }).format(new Date(item.date)),
                value: item?.value,
            }));
        }, [d]);
    };

    const memoizedRevenueData = useMemoizedChartData(dailyRevenue);
    const memoizedOrdersData = useMemoizedChartData(dailyOrders);
    const memoizedNewCustomersData = useMemoizedChartData(newCustomers);

    const tabs: TTab[] = [
        {
            id: 1,
            label: "Daily Revenue",
            content: (
                <ResponsiveAreaChart
                    kpi="Daily revenue"
                    data={memoizedRevenueData}
                    colors={{
                        stroke: "rgb(54, 162, 235)",
                        fill: "rgba(54, 162, 235, 0.2)",
                    }}
                />
            ),
        },
        {
            id: 2,
            label: "Daily Orders",
            content: (
                <ResponsiveBarChart
                    kpi="Daily orders"
                    data={memoizedOrdersData}
                    colors={{
                        stroke: "rgb(255, 159, 64)",
                        fill: "rgba(255, 159, 64, 0.7)",
                    }}
                />
            ),
        },
        {
            id: 3,
            label: "New Customers",
            content: (
                <ResponsiveAreaChart
                    kpi="New customers"
                    data={memoizedNewCustomersData}
                    colors={{
                        stroke: "rgb(76, 175, 80)",
                        fill: "rgba(54, 162, 235, 0.2)",
                    }}
                />
            ),
        },
    ];

    return (
        <>
            {/* <KpiCard /> */}
            <TabView tabs={tabs} />
        </>
    );
};
