import React, { FC } from "react";

import { HttpError, useUpdate } from "@refinedev/core";

import cn from "classnames";

import { Quote, QuoteUpdateInput } from "@/graphql/schema.types";

import { QUOTES_UPDATE_QUOTE_MUTATION } from "../../queries";
import styles from "./index.module.css";

interface Props {
    id: string;
    status: Quote["status"];
    style?: React.CSSProperties;
}

export const StatusIndicator: FC<Props> = ({ id, status, style }) => {
    const { mutate } = useUpdate<Quote, HttpError, QuoteUpdateInput>();

    const onStatusChange = (newStatus: Quote["status"]) => {
        mutate({
            resource: "quotes",
            id,
            values: {
                status: newStatus,
            },
            mutationMode: "optimistic",
            invalidates: [],
            meta: {
                gqlMutation: QUOTES_UPDATE_QUOTE_MUTATION,
            },
        });
    };

    const step = {
        DRAFT: 0,
        SENT: 1,
        ACCEPTED: 2,
    } as const;
    const currentStep = step[status];

    return (
        <div style={style}>
            <div
                className={styles[status.toLocaleLowerCase()]}
                style={{
                    display: "flex",
                    position: "relative",
                }}
            >
                <ButtonDraft
                    fill={"currentColor"}
                    textColor={"#fff"}
                    onClick={() => onStatusChange("DRAFT")}
                />
                <ButtonSent
                    fill={currentStep > 0 ? "currentColor" : "#fff"}
                    textColor={currentStep > 0 ? "#fff" : "#000"}
                    onClick={() => onStatusChange("SENT")}
                />
                <ButtonAccepted
                    fill={currentStep > 1 ? "currentColor" : "#fff"}
                    textColor={currentStep > 1 ? "#fff" : "#000"}
                    onClick={() => onStatusChange("ACCEPTED")}
                />
            </div>
        </div>
    );
};

const ButtonDraft = (props: {
    fill: string;
    textColor: string;
    onClick: () => void;
}) => (
    <svg
        role="button"
        onClick={() => props.onClick()}
        className={cn(styles.button, styles.first)}
        xmlns="http://www.w3.org/2000/svg"
        width={126}
        height={44}
        fill="none"
    >
        <path
            fill={props.fill}
            stroke="#F0F2F5"
            strokeWidth={2}
            d="M22 1C10.402 1 1 10.402 1 22s9.402 21 21 21h87.735a5 5 0 0 0 4.288-2.428l9.6-16a5 5 0 0 0 0-5.145l-9.6-16A5 5 0 0 0 109.735 1H22Z"
        />
        <text x="42" y="27" fill={props.textColor}>
            Draft
        </text>
    </svg>
);

const ButtonSent = (props: {
    fill: string;
    textColor: string;
    onClick: () => void;
}) => (
    <svg
        role="button"
        onClick={() => props.onClick()}
        className={cn(styles.button, styles.second)}
        xmlns="http://www.w3.org/2000/svg"
        width={126}
        height={44}
        fill="none"
    >
        <path
            fill={props.fill}
            stroke="#F0F2F5"
            strokeWidth={2}
            d="M2 1H1v42h108.735a5 5 0 0 0 4.288-2.428l9.6-16a5 5 0 0 0 0-5.145l-9.6-16A5 5 0 0 0 109.735 1H2Z"
        />
        <text x="42" y="27" fill={props.textColor}>
            Sent
        </text>
    </svg>
);

const ButtonAccepted = (props: {
    fill: string;
    textColor: string;
    onClick: () => void;
}) => (
    <svg
        role="button"
        onClick={() => props.onClick()}
        className={cn(styles.button, styles.third)}
        xmlns="http://www.w3.org/2000/svg"
        width={126}
        height={44}
        fill="none"
    >
        <path
            fill={props.fill}
            stroke="#F0F2F5"
            strokeWidth={2}
            d="M2 1H1v42h103c11.598 0 21-9.402 21-21s-9.402-21-21-21H2Z"
        />
        <text x="28" y="27" fill={props.textColor}>
            Accepted
        </text>
    </svg>
);
