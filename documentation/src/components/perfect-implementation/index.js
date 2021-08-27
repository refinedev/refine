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
                    <div className="col col--5">
                        <Highlight
                            {...defaultProps}
                            theme={theme}
                            code={exampleCode}
                            language="jsx"
                        >
                            {({
                                className,
                                style,
                                tokens,
                                getLineProps,
                                getTokenProps,
                            }) => (
                                <pre
                                    className={clsx("pre", className)}
                                    style={style}
                                >
                                    {tokens.map((line, i) => (
                                        <div
                                            className="code-line"
                                            key={i}
                                            {...getLineProps({ line, key: i })}
                                        >
                                            <span className="code-line-no">
                                                {i + 1}
                                            </span>
                                            <span className="code-line-content">
                                                {line.map((token, key) => (
                                                    <span
                                                        key={key}
                                                        {...getTokenProps({
                                                            token,
                                                            key,
                                                        })}
                                                    />
                                                ))}
                                            </span>
                                        </div>
                                    ))}
                                </pre>
                            )}
                        </Highlight>
                    </div>
                    <div className={clsx("col", "col--1", styles.arrowCol)}>
                        <img
                            className={styles.arrowImg}
                            src="/landing-page/implementation-arrow.png"
                            alt="Arrow"
                        />
                    </div>
                    <div className="col col--5">
                        <img
                            className={styles.screen}
                            src="/landing-page/preview-screen.png"
                            alt="Preview Screen"
                        />
                    </div>
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
