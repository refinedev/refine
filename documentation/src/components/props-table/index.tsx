import React from "react";
import { useDynamicImport } from "../../hooks/use-dynamic-import";
import PropTag from "../prop-tag";

type Props = {
    module: string;
};

const PropsTable = ({ module }: Props): JSX.Element => {
    const data = useDynamicImport(module);
    console.log("DATA", data);

    if (!data) {
        return null;
    }

    return (
        <div>
            <h1>{module}</h1>
            <div>
                renderButton
                <PropTag deprecated />
            </div>
            <div>
                resource
                <PropTag required />
            </div>
            <div>
                resource
                <PropTag asterisk />
            </div>
            <div>
                renderContent
                <PropTag>custom</PropTag>
            </div>
            <div>
                footerProps
                <PropTag featured />
            </div>
            <code>{JSON.stringify(data)}</code>
        </div>
    );
};

export default PropsTable;
