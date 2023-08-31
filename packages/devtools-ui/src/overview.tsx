import React from "react";
import { SidebarActiveIcon } from "./components/icons/sidebar-active";

export const Overview = () => {
    const [count, setCount] = React.useState(0);

    return (
        <div>
            <h2 className="re-text-pink-500 re-font-bold re-text-2xl">
                Dev Tools Overview
            </h2>
            <SidebarActiveIcon />
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>Increment</button>
            <button onClick={() => setCount(count - 1)}>Decrement</button>
        </div>
    );
};
