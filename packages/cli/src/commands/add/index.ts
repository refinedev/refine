import { Command } from "commander";
import { createProvider, providerArgs } from "./create-provider";
import { createResources } from "./create-resource";

const load = (program: Command) => {
    return program
        .command("add")
        .allowExcessArguments(true)
        .description("Creates new feature")
        .argument("[auth]", "Creates demo auth provider")
        .argument("[live]", "Creates demo live provider")
        .argument("[data]", "Creates demo data provider")
        .argument("[resource]", "Create a new resource files")
        .option("-p, --path [path]", "Path to generate files")
        .option(
            "-a, --actions [actions]",
            "Only generate the specified resource actions. (ex: list,create,edit,show)",
            "list,create,edit,show",
        )
        .action(action);
};

const action = async (
    _arg1: string,
    _arg2: string,
    _arg3: string,
    _arg4: string,
    options: { actions: string; path?: string },
    command: Command,
) => {
    const args = command.args;
    if (!args.length) {
        console.log("Please provide a feature name ❌");
        console.log("Example: add data");
        return;
    }

    const { providers, resources } = getGroupedArgs(args);

    if (providers.length) {
        createProvider(providers, options?.path);
    }

    if (resources.length) {
        createResources(
            {
                actions: options?.actions,
                path: options?.path,
            },
            resources,
        );
    }
};

// we need to group args.
// for example: add auth live resource user post data
// should be grouped like this:
// providers: [add, auth, live, data]. resource: [user, post]
export const getGroupedArgs = (args: string[]) => {
    const resourceIndex = args.findIndex((arg) => arg === "resource");
    if (resourceIndex === -1)
        return {
            providers: args.filter((arg) => providerArgs.includes(arg)),
            resources: [],
        };

    const providers = args
        .slice(0, resourceIndex)
        .filter((arg) => providerArgs.includes(arg));
    const resources = args.slice(resourceIndex + 1);

    return { providers, resources };
};

export default load;
