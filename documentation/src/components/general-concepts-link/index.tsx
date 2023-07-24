import Admonition from "@theme/Admonition";
import React from "react";
import ReactMarkdown from "react-markdown";

const md = `
All the data related hooks(useTable, useForm, useList etc.) of refine can be given some common properties like \`resource\`, \`meta\` etc.

For more information, refer to the [General Concepts documentation&#8594](/docs/api-reference/general-concepts).
`;

const GeneralConceptsLink = () => {
    return (
        <div>
            <Admonition type="tip">
                <ReactMarkdown>{md}</ReactMarkdown>
            </Admonition>
        </div>
    );
};

export default GeneralConceptsLink;
