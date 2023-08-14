import React from "react";
import { EditButton, ShowButton } from "@refinedev/antd";

export const CalendarListPage = () => {
    return (
        <div>
            <div>list view</div>
            <EditButton recordItemId="12">Edit 12</EditButton>
            <ShowButton recordItemId="12">Show 12</ShowButton>
        </div>
    );
};
