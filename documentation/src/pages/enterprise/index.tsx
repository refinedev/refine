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
    };

    return (
        <Layout title="refine for Enterprise">
            <div className={styles.wrapper}>
                <div className="container">
                    <div className="row row--justify--center row--no-gutters row--align--center">
                        <div className="col col--6">
                            <img src="/contact-page/contact_rise.png" />
                        </div>
                        <div className="col col--6">
                            <div className={styles.descriptionContainer}>
                                <h1 className={styles.descriptionTitle}>
                                    refine for <br /> <span>Enterprise</span>
                                </h1>
                                <p className={styles.descriptionBody}>
                                    Your business may require{" "}
                                    <span>a tailor-made solution. </span>
                                    <br />
                                    Our team is <span>ready to help you. </span>
                                    <br />
                                    <span>Let us hear about some details.</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.contactContainer}>
                        <h2>
                            Request more information about{" "}
                            <span>refine Enterprise Edition.</span>
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
                                            Your Message
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
                                        <a href="./privacy-policy">
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
