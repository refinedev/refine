import React, { useEffect, useState } from "react";
import "./ai-landing-step-three.css";
import { useColorMode } from "@docusaurus/theme-common";
import { useTWBreakpoints } from "../hooks/use-tw-breakpoints";
import clsx from "clsx";

type Row = {
  id: string;
  customer: string;
  amount: string;
  date: string;
  amountValue: number;
};

const initialRows: Row[] = [
  {
    id: "144526",
    customer: "Rita McClure",
    amount: "$3.600,00",
    date: "25.03.2025",
    amountValue: 3600,
  },
  {
    id: "169220",
    customer: "Michael Ferry",
    amount: "$4.000,00",
    date: "20.03.2025",
    amountValue: 4000,
  },
  {
    id: "136388",
    customer: "Jerome Gerhold",
    amount: "$4.800,00",
    date: "12.03.2025",
    amountValue: 4800,
  },
  {
    id: "157345",
    customer: "Janis Ferry",
    amount: "$4.250,00",
    date: "21.03.2025",
    amountValue: 4250,
  },
  {
    id: "119065",
    customer: "Hugo Hackett",
    amount: "$2.250,00",
    date: "16.03.2025",
    amountValue: 2250,
  },
  {
    id: "181854",
    customer: "Toby Haag",
    amount: "$3.750,00",
    date: "27.02.2025",
    amountValue: 3750,
  },
  {
    id: "124806",
    customer: "Nichole Lueilwitz",
    amount: "$1.500,00",
    date: "24.03.2025",
    amountValue: 1500,
  },
  {
    id: "197532",
    customer: "Martin Franci",
    amount: "$3.900,00",
    date: "11.03.2025",
    amountValue: 3900,
  },
];

export const AiLandingStepThree = () => {
  const { colorMode } = useColorMode();
  const { sm, md, lg, xl } = useTWBreakpoints({ variant: "landing" });

  const [currentDirection, setCurrentDirection] = useState<1 | 2 | 3 | null>(2);

  const [showAddButton, setShowAddButton] = useState(false);
  const [showActionsColumn, setShowActionsColumn] = useState(false);
  const [borderRadiusChanged, setBorderRadiusChanged] = useState(false);

  const [rows, setRows] = useState<Row[]>(initialRows);

  useEffect(() => {
    const timeout1 = setTimeout(() => {
      setCurrentDirection(1);
    }, 100);

    return () => clearTimeout(timeout1);
  }, []);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (currentDirection === 1) {
      timeout = setTimeout(() => {
        const sortedRows = [...rows].sort(
          (a, b) => b.amountValue - a.amountValue,
        );
        setRows(sortedRows);

        setTimeout(() => {
          setCurrentDirection(2);
        }, 2000);
      }, 1000);
    }

    if (currentDirection === 2) {
      timeout = setTimeout(() => {
        setShowActionsColumn(true);
        setShowAddButton(true);
        setBorderRadiusChanged(true);

        setTimeout(() => {
          setCurrentDirection(3);
        }, 2000);
      }, 1000);
    }

    if (currentDirection === 3) {
      timeout = setTimeout(() => {
        setShowActionsColumn(false);
        setShowAddButton(false);
        setBorderRadiusChanged(false);
        setRows(initialRows);

        setTimeout(() => {
          setCurrentDirection(1);
        }, 2000);
      }, 1000);
    }

    return () => clearTimeout(timeout);
  }, [currentDirection, rows, initialRows]);

  const getContentWidth = () => {
    if (xl) return 508;
    if (lg) return 376;
    if (md) return 436;
    if (sm) return 508;
    return 300;
  };

  const contentWidth = getContentWidth();
  const scale = contentWidth / 556;
  const contentStyle = {
    width: `${contentWidth}px`,
    height: `${Math.round(488 * scale)}px`,
  };

  return (
    <div
      className={clsx(
        "ai-landing-step-three-animation",
        "flex",
        "justify-center",
        "landing-md:justify-start",
        "items-center",
        colorMode,
      )}
    >
      <div className="ai-landing-step-three-content" style={contentStyle}>
        <div className="ai-landing-step-three-header">
          <span>Invoices</span>
          <b className={showAddButton ? "ai-landing-step-three-show-add" : ""}>
            Add Invoice
          </b>
        </div>
        <div className="ai-landing-step-three-table">
          <div className="ai-landing-step-three-column ai-landing-step-three-id">
            <b>ID</b>
            {rows.map((row, index) => (
              <span
                key={`id-${row.id}`}
                className={`ai-landing-step-three-row${index + 1}`}
              >
                {row.id}
              </span>
            ))}
          </div>
          <div className="ai-landing-step-three-column ai-landing-step-three-customer">
            <b>Customer</b>
            {rows.map((row, index) => (
              <span
                key={`customer-${row.id}`}
                className={`ai-landing-step-three-row${index + 1} customer`}
              >
                {md ? row.customer : row.customer.split(" ")[0]}
              </span>
            ))}
          </div>
          <div className="ai-landing-step-three-column ai-landing-step-three-amount">
            <b>Amount</b>
            {rows.map((row, index) => (
              <span
                key={`amount-${row.id}`}
                className={`ai-landing-step-three-row${index + 1}`}
              >
                {row.amount}
              </span>
            ))}
          </div>
          <div className="ai-landing-step-three-column ai-landing-step-three-date">
            <b
              className={
                borderRadiusChanged
                  ? "ai-landing-step-three-border-radius-changed"
                  : ""
              }
            >
              Date
            </b>
            {rows.map((row, index) => (
              <span
                key={`date-${row.id}`}
                className={`ai-landing-step-three-row${index + 1}`}
              >
                {row.date}
              </span>
            ))}
          </div>
          <div
            className={`ai-landing-step-three-column ai-landing-step-three-actions ${
              showActionsColumn ? "ai-landing-step-three-show-actions" : ""
            }`}
          >
            <b>Actions</b>
            {rows.map((row, index) => (
              <span
                key={`actions-${row.id}`}
                className={`ai-landing-step-three-row${index + 1}`}
              />
            ))}
          </div>
        </div>
        <div className="ai-landing-step-three-directions">
          <b
            className={`ai-landing-step-three-direction1 ${
              currentDirection === 1 ? "ai-landing-step-three-direction-up" : ""
            } ${
              currentDirection !== null && currentDirection !== 1
                ? "ai-landing-step-three-direction-down"
                : ""
            }`}
          >
            Sort by amount, descending
          </b>
          <b
            className={`ai-landing-step-three-direction2 ${
              currentDirection === 2 ? "ai-landing-step-three-direction-up" : ""
            } ${
              currentDirection !== null && currentDirection > 2
                ? "ai-landing-step-three-direction-down"
                : ""
            }`}
          >
            Add actions
          </b>
          <b
            className={`ai-landing-step-three-direction3 ${
              currentDirection === 3 ? "ai-landing-step-three-direction-up" : ""
            } ${
              currentDirection !== null && currentDirection > 3
                ? "ai-landing-step-three-direction-down"
                : ""
            }`}
          >
            Revert
          </b>
        </div>
      </div>
    </div>
  );
};
