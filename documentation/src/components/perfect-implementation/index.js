import React from "react";
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/nightOwl";
import clsx from "clsx";

import styles from "./styles.module.css";

const exampleCode = `
import { Refine, Resource } from "@pankod/refine";
import dataProvider from "@pankod/refine-simple-rest";
import "@pankod/refine/dist/styles.min.css";

import { 
    PostList, 
    PostCreate, 
    PostEdit, 
    PostShow ,
} from "pages/posts";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    return (
        <Refine dataProvider={dataProvider(API_URL)}>
            <Resource
                name="posts"
                list={PostList}
                create={PostCreate}
                edit={PostEdit}
                show={PostShow}
            />
        </Refine>
    );
};

export default App;
`.trim();

export const PerfectImplementation = () => {
    return (
        <section className={styles.section}>
            <div className="container">
                <div
                    className={clsx(
                        "row",
                        "row--no-gutters",
                        "row--justify--center",
                        styles.row,
                    )}
                >
                    <iframe
                        src="https://codesandbox.io/embed/refine-tutorial-cmqrr?autoresize=1&fontsize=14&module=%2Fsrc%2FApp.tsx&theme=dark&hidenavigation=1"
                        style={{
                            width: "100%",
                            height: "70vh",
                            border: "0px",
                            borderRadius: "8px",
                            overflow: "hidden",
                        }}
                        title="refine-tutorial"
                        allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
                        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
                    ></iframe>
                </div>
                <div className="row row--justify--center">
                    <div className="col col--9">
                        <h2 className={styles.title}>Perfect Implementation</h2>
                        <p className={styles.description}>
                            <strong>
                                Refine is a collection of helper hooks,
                                components and providers.
                            </strong>
                            They are all decoupled from your UI components and
                            business logic, so they never keep you from
                            customizing your UI or coding your own flow.
                        </p>
                        <p className={styles.description}>
                            <strong>
                                Refine&apos;s strongly opinionated about three
                                parts of your application:
                            </strong>
                        </p>
                        <div className={styles.listContainer}>
                            <ol className={styles.orderList}>
                                <li>API Networking</li>
                                <li>State Management</li>
                                <li>Authentication & Authorization</li>
                            </ol>
                            <div className={styles.box}>
                                <p>
                                    Refine guarantees you a perfect
                                    implementation of these building blocks in
                                    your project, so you can focus on your
                                    development.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
