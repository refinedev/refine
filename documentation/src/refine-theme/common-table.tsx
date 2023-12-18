import React from "react";

export const Table = (props: React.ComponentProps<"table">) => (
    <div className="table-container">
        <table {...props} />
    </div>
);
