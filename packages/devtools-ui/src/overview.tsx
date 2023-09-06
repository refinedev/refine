import React from "react";

export const Overview = () => {
    const [count, setCount] = React.useState(0);

    return (
        <div className="re-text-gray-0">
            <h2 className="re-text-pink-900 re-font-bold re-text-2xl">
                Dev Tools Overview
            </h2>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>Increment</button>
            <button onClick={() => setCount(count - 1)}>Decrement</button>
        </div>
    );
};
