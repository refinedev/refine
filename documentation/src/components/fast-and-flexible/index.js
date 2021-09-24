import React from "react";
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/nightOwl";
import clsx from "clsx";

import styles from "./styles.module.css";

const exampleCode = `
import { Refine, Resource } from "@pankod/refine";
import dataProvider from "@pankod/refine-simple-rest";
import "@pankod/refine/dist/styles.min.css";

import { PostList, PostCreate, PostEdit, PostShow } from "pages/posts";

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

export const FastAndFlexible = () => {
    return (
        <section className={styles.section}>
            <div className="container">
                <div className="row row--justify--center row--no-gutters">
                    <div className="col col--4">
                        <h2 className={styles.title}>
                            Fast and Flexible <br /> Solution
                        </h2>
                        <p className={styles.description}>
                            Higher-level frontend frameworks can save you a lot
                            time, but they typically offer you a{" "}
                            <strong>
                                trade-off between speed and flexibility.
                            </strong>
                        </p>
                        <p className={styles.description}>
                            After <strong>many years of experience</strong> in
                            developing B2B frontend applications and working
                            with popular frameworks, we came up with{" "}
                            <strong>a new approach</strong> to tackle this
                            dilemma. This is how refine is born.
                        </p>
                    </div>
                    <div className="col col--1">
                        <div className={styles.imgContainer}>
                            <img
                                className={styles.arrowImg}
                                src="/landing-page/fast-flexible-arrow.png"
                                alt="Arrow"
                            />
                        </div>
                    </div>
                    <div className="col col--7">
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
                </div>
            </div>
        </section>
    );
};
