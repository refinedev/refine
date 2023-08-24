import React, { useMemo } from "react";
import { useApiUrl, useCustom } from "@refinedev/core";
import dayjs from "dayjs";
import { KpiCard } from "../../components/dashboard/kpiCard";
import { ResponsiveAreaChart } from "../../components/dashboard/ResponsiveAreaChart";
import { ResponsiveBarChart } from "../../components/dashboard/ResponsiveBarChart";
import { TabView } from "../../components/dashboard/TabView";
import { IChartDatum, TTab } from "../../interfaces";
import { DollarIcon, ProductIcon, UserGroupIcon } from "../../components/icons";
import { RecentSales } from "../../components/dashboard/RecentSales";

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
            return d?.data?.data?.map((item: IChartDatum) => ({
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
            <div className="container mx-auto flex justify-center items-center">
                <div className="stats mr-8 mt-4 mb-8 shadow flex-shrink md:flex-none lg:flex-grow">
                    <KpiCard
                        title="Weekly Revenue"
                        data={dailyRevenue}
                        formatTotal={(value: number | string) => `$ ${value}`}
                        icon={
                            <DollarIcon
                                size={12}
                                colors={{
                                    stroke: "rgba(54, 162, 235, 0.6)",
                                    fill: "rgb(54, 162, 235)",
                                }}
                            />
                        }
                        colors={{
                            stroke: "rgb(54, 162, 235)",
                            fill: "rgba(54, 162, 235, 0.2)",
                        }}
                    />
                    <KpiCard
                        title="Weekly Orders"
                        data={dailyOrders}
                        icon={
                            <ProductIcon
                                size={12}
                                colors={{
                                    stroke: "rgb(255, 159, 64)",
                                    fill: "rgba(255, 159, 64, 0.6)",
                                }}
                            />
                        }
                        colors={{
                            stroke: "rgb(255, 159, 64)",
                            fill: "rgba(255, 159, 64, 0.7)",
                        }}
                    />
                    <KpiCard
                        title="New Customers"
                        data={newCustomers}
                        icon={
                            <UserGroupIcon
                                size={12}
                                colors={{
                                    stroke: "rgba(76, 175, 80, 0.6)",
                                    fill: "rgb(76, 175, 80)",
                                }}
                            />
                        }
                        colors={{
                            stroke: "rgb(76, 175, 80)",
                            fill: "rgba(76, 175, 80, 0.6)",
                        }}
                    />
                </div>
            </div>
            <TabView tabs={tabs} />
            <RecentSales />
        </>
    );
};
