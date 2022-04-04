import React from "react";
import Layout from "@theme/Layout";
import { useForm } from "react-hook-form";
import axios from "axios";

import {
    IoIosCheckmarkCircleOutline,
    IoIosCloseCircleOutline,
} from "react-icons/io";

import styles from "./styles.module.css";

const Contact: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { isSubmitSuccessful, isSubmitting, isSubmitted },
    } = useForm();

    const onSubmit = async (data) => {
        await axios.post(
            "https://getform.io/f/d499c25d-0c5c-45d6-8dc3-6352d87e1751",
            data,
            { headers: { Accept: "application/json" } },
        );

        location.href =
            "https://www.youtube.com/watch?v=oHg5SJYRHA0&ab_channel=cotter548";
    };

    return (
        <Layout title="refine Headset">
            <div className={styles.wrapper}>
                <div className="container">
                    <div className="row row--justify--center row--no-gutters row--align--center">
                        <h1
                            style={{
                                marginBottom: 50,
                                fontSize: 62,
                            }}
                            className={styles.descriptionTitle}
                        >
                            <span>Happy</span>
                            {` April's`} fool day 🎉
                        </h1>

                        <div
                            style={{
                                filter: "grayscale(1)",
                            }}
                            className="col col--6"
                        >
                            <img src="/contact-page/contact_rise.png" />
                        </div>
                        <div
                            style={{
                                filter: "grayscale(1)",
                            }}
                            className="col col--6"
                        >
                            <div className={styles.descriptionContainer}>
                                <h1 className={styles.descriptionTitle}>
                                    build the <br /> <span>Future</span>
                                </h1>
                                <p className={styles.descriptionBody}>
                                    Soon {`you'll`} be able to build apps
                                    <br />
                                    with Refine just by connecting yourself to a
                                    <br />
                                    <span>headset! </span>
                                    <br />
                                    <br />
                                    <span>
                                        Join the waiting list
                                    </span> <br /> to <span>get one</span> of
                                    the first batches of <span>headsets</span>!
                                    <br />
                                </p>
                            </div>
                        </div>
                    </div>
                    <div
                        style={{
                            filter: "grayscale(1)",
                        }}
                        className={styles.contactContainer}
                    >
                        <h2>
                            Request more information about{" "}
                            <span>refine Headset.</span>
                        </h2>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="row row--justify--center">
                                <div className="col col--6">
                                    <div className="row">
                                        <div className="col col--6">
                                            <div
                                                className={
                                                    styles.inputContainer
                                                }
                                            >
                                                <label htmlFor="firstName">
                                                    First Name
                                                </label>
                                                <input
                                                    id="firstName"
                                                    placeholder="First name"
                                                    name="firstName"
                                                    required
                                                    {...register("firstName")}
                                                />
                                            </div>
                                        </div>
                                        <div className="col col--6">
                                            <div
                                                className={
                                                    styles.inputContainer
                                                }
                                            >
                                                <label htmlFor="lastName">
                                                    Last Name
                                                </label>
                                                <input
                                                    id="lastName"
                                                    placeholder="Last name"
                                                    name="lastName"
                                                    required
                                                    {...register("lastName")}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.inputContainer}>
                                        <label htmlFor="companyName">
                                            Company Name
                                        </label>
                                        <input
                                            id="companyName"
                                            placeholder="Company name"
                                            name="companyName"
                                            required
                                            {...register("companyName")}
                                        />
                                    </div>
                                    <div className={styles.inputContainer}>
                                        <label htmlFor="email">Email</label>
                                        <input
                                            id="email"
                                            type="email"
                                            placeholder="Email"
                                            name="email"
                                            required
                                            {...register("email")}
                                        />
                                    </div>
                                    <div className={styles.inputContainer}>
                                        <label htmlFor="organization">
                                            What type of organization do you
                                            work for?
                                        </label>
                                        <select
                                            id="organization"
                                            required
                                            name="organization"
                                            defaultValue=""
                                            {...register("organization")}
                                        >
                                            <option disabled value="">
                                                Please select
                                            </option>
                                            <option value="Freelance">
                                                Freelance
                                            </option>
                                            <option value="Agency">
                                                Agency
                                            </option>
                                            <option value="Startup (<500 employees)">
                                                Startup ({"<"}500 employees)
                                            </option>
                                            <option value="Enterprise (>500 employees)">
                                                Enterprise ({">"}500 employees)
                                            </option>
                                            <option value="University">
                                                University
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col col--6">
                                    <div className={styles.inputContainer}>
                                        <label htmlFor="jobTitle">
                                            Your job title in your company?
                                        </label>
                                        <input
                                            id="jobTitle"
                                            placeholder="Job title"
                                            name="jobTitle"
                                            required
                                            {...register("jobTitle")}
                                        />
                                    </div>
                                    <div className={styles.inputContainer}>
                                        <label htmlFor="message">
                                            Your Address
                                        </label>
                                        <textarea
                                            id="message"
                                            required
                                            {...register("message")}
                                            rows={10}
                                            name="message"
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="row row--justify--center">
                                <div className="col col--6">
                                    <p className={styles.subDescription}>
                                        By submitting this form you consent to
                                        us emailing you occasionally. You can
                                        unsubscribe from emails at any time, and
                                        we will never pass your email onto third
                                        parties.{" "}
                                        <a href="/privacy-policy">
                                            Privacy Policy
                                        </a>
                                    </p>
                                </div>
                                <div className="col col--6">
                                    <div className="row">
                                        <div className="col col--5 col--offset-7">
                                            <button
                                                className={styles.submitButton}
                                                type="submit"
                                                disabled={isSubmitting}
                                            >
                                                Submit
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                        {!isSubmitting && isSubmitSuccessful && (
                            <div className={styles.messageContainer}>
                                <IoIosCheckmarkCircleOutline
                                    style={{ color: "#389e0d" }}
                                />
                                <h3 className={styles.successMessage}>
                                    Your message sent successfully.
                                </h3>
                            </div>
                        )}
                        {!isSubmitting && isSubmitted && !isSubmitSuccessful && (
                            <div className={styles.messageContainer}>
                                <IoIosCloseCircleOutline
                                    style={{ color: "#cf1322" }}
                                />
                                <h3 className={styles.errorMessage}>
                                    Your message {"couldn't"} be sent.
                                </h3>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Contact;
