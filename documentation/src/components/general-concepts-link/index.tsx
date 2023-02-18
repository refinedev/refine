import React from "react";
import ReactMarkdown from "react-markdown";
import Admonition from "@theme/Admonition";

const md = `
All the data related hooks(useTable, useForm, useList etc.) of refine can be given some common properties like \`resource\`, \`meta\` etc.
> Please refer to [General Concepts](/docs/api-reference/general-concepts) for more information.
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
