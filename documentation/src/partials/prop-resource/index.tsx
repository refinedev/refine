import React from "react";
import ReactMarkdown from "react-markdown";

type Props = {
    method: {
        name: string;
        URL: string;
    };
    hook: {
        name: string;
        URL: string;
    };
    hasDefault?: boolean;
};

const PropResource: React.FC<Props> = ({ hook, method, hasDefault = true }) => {
    const md = `It will be passed to the [\`${method?.name}\`](${method?.URL}) method from the \`dataProvider\` as parameter via the [\`${hook?.name}\`](${hook?.URL}) hook. 
    The parameter is usually used as an API endpoint path.
    It all depends on how to handle the \`resource\` in the [\`${method?.name}\`](${method?.URL}) method. 
    See the [creating a data provider](/docs/api-reference/core/providers/data-provider/#creating-a-data-provider) section for an example of how resource are handled.`;

    return (
        <>
            <ReactMarkdown>{md}</ReactMarkdown>
            {hasDefault && (
                <ReactMarkdown>
                    By default, the `resource` value is determined from the
                    active route where the component or the hook is used. It can
                    be overridden by passing the `resource` prop.
                </ReactMarkdown>
            )}
        </>
    );
};

export default PropResource;
