import React from "react";
import { acknowledgeRaffle, raffle } from "src/utils/me";
import { Modal } from "./modal";
import clsx from "clsx";
import { CalendarIcon } from "./icons/calendar";

const CALENDLY_URL = "#";

export const RaffleHandler = () => {
  const [ran, setRan] = React.useState(false);
  const [calendlyURL, setCalendlyURL] = React.useState("");
  const [raffleModal, setRaffleModal] = React.useState(false);

  const submitRaffle = React.useCallback(async () => {
    const response = await raffle();

    if (response.raffle) {
      setCalendlyURL(response.calendlyURL);
      setRaffleModal(true);
    } else {
      setRaffleModal(false);
    }
  }, []);

  const onCloseModal = React.useCallback(() => {
    acknowledgeRaffle();
    setRaffleModal(false);
  }, []);

  React.useEffect(() => {
    const time = 60 * 1000 * (ran ? 5 : 0.5);

    const interval = setInterval(() => {
      submitRaffle();
      if (!ran) {
        setRan(true);
      }
    }, time);

    return () => {
      clearInterval(interval);
    };
  }, [ran]);

  return (
    <Modal
      overlay
      visible={raffleModal}
      onClose={onCloseModal}
      header={
        <div className={clsx("re-flex")}>
          <h1
            className={clsx(
              "re-text-gray-300",
              "re-font-semibold",
              "re-text-lg",
            )}
          >
            {"Let's chat!"}
          </h1>
        </div>
      }
    >
      <div className={clsx("re-p-5", "re-flex", "re-flex-col", "re-gap-5")}>
        <img
          src="https://refine.ams3.cdn.digitaloceanspaces.com/devtools/refine-swag.webp"
          className={clsx(
            "re-hidden",
            "tall:re-block",
            "re-w-full",
            "re-h-auto",
            "re-object-cover",
            "re-rounded-lg",
            "re-border",
            "re-border-gray-700",
            "re-overflow-hidden",
          )}
        />
        <p className={clsx("re-text-base", "re-text-gray-300")}>
          At Refine, we believe in the power of small conversations with our
          users, your experiences shape our improvements.
        </p>
        <p className={clsx("re-text-base", "re-text-gray-300")}>
          Book a 15-minute meeting with Civan, our CEO, and recieve our swag Kit
          as a thank you gift!
        </p>
        <a
          href={calendlyURL}
          rel="noreferrer noopener"
          target="_blank"
          className={clsx(
            "re-flex",
            "re-items-center",
            "re-justify-center",
            "re-gap-4",
            "re-text-gray-0",
            "re-text-base",
            "re-w-full",
            "re-p-3",
            "re-rounded",
            "re-bg-brand-blue",
          )}
        >
          <CalendarIcon />
          <span>Book Now</span>
        </a>
      </div>
    </Modal>
  );
};
