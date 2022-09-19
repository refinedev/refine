import React from "react";
import { listTagsByLetters } from "@docusaurus/theme-common";
import Tag from "@theme/Tag";

import styles from "./styles.module.css";

function TagLetterEntryItem({ letterEntry }) {
    return (
        <article>
            <h2 className="font-montserrat">{letterEntry.letter}</h2>
            <ul className="padding--none">
                {letterEntry.tags.map((tag) => (
                    <li key={tag.permalink} className={styles.tag}>
                        <Tag {...tag} />
                    </li>
                ))}
            </ul>
            <hr />
        </article>
    );
}
export default function TagsListByLetter({ tags }) {
    const letterList = listTagsByLetters(tags);
    return (
        <section className="margin-vert--lg">
            {letterList.map((letterEntry) => (
                <TagLetterEntryItem
                    key={letterEntry.letter}
                    letterEntry={letterEntry}
                />
            ))}
        </section>
    );
}
