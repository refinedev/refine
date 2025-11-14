import React from "react";
import {
  Card,
  Grid,
  Title,
  Text,
  Tab,
  TabList,
  TabGroup,
  TabPanel,
  TabPanels,
} from "@tremor/react";

import { useApiUrl, useCustom } from "@refinedev/core";
import dayjs from "dayjs";

const query = {
  start: dayjs().subtract(7, "days").startOf("day"),
  end: dayjs().startOf("day"),
};

import { KpiCard } from "./kpiCard";
import { ChartView } from "./chartView";
import { Details } from "./details";

const calculatePercentage = (total: number, target: number): number => {
  return Math.round((total / target) * 100 * 100) / 100;
};

export const DashboardPage: React.FC = () => {
  const API_URL = useApiUrl("metrics");

  const { query: dailyRevenueQuery } = useCustom({
    url: `${API_URL}/dailyRevenue`,
    method: "get",
    config: {
      query,
    },
  });

  const { query: dailyOrdersQuery } = useCustom({
    url: `${API_URL}/dailyOrders`,
    method: "get",
    config: {
      query,
    },
  });

  const { query: newCustomersQuery } = useCustom({
    url: `${API_URL}/newCustomers`,
    method: "get",
    config: {
      query,
    },
  });

  const dailyRevenue = dailyRevenueQuery.data?.data;
  const dailyOrders = dailyOrdersQuery.data?.data;
  const newCustomers = newCustomersQuery.data?.data;

  return (
    <main className="m-2">
      <Title>Dashboard</Title>
      <Text>View core metrics on the state of your company.</Text>
      <TabGroup className="mt-6">
        <TabList>
          <Tab>Overview</Tab>
          <Tab>Details</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Grid numItemsMd={2} numItemsLg={3} className="mt-6 gap-6">
              <KpiCard
                title="Weekly Revenue"
                total={`$ ${dailyRevenue?.total ?? 0}`}
                trend={dailyRevenue?.trend ?? 0}
                target="$ 10,500"
                percentage={calculatePercentage(
                  dailyRevenue?.total ?? 0,
                  10_500,
                )}
              />
              <KpiCard
                title="Weekly Orders"
                total={`${dailyOrders?.total ?? 0}`}
                trend={dailyOrders?.trend ?? 0}
                target="500"
                percentage={calculatePercentage(dailyOrders?.total ?? 0, 500)}
              />
              <KpiCard
                title="New Customers"
                total={`${newCustomers?.total ?? 0}`}
                trend={newCustomers?.trend ?? 0}
                target="200"
                percentage={calculatePercentage(newCustomers?.total ?? 0, 200)}
              />
            </Grid>
            <div className="mt-6">
              <ChartView
                revenue={dailyRevenue?.data ?? []}
                orders={dailyOrders?.data ?? []}
                customers={newCustomers?.data ?? []}
              />
            </div>
          </TabPanel>
          <TabPanel>
            <div className="mt-6">
              <Details />
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </main>
  );
};
