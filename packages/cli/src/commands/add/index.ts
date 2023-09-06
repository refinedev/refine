import { Argument, Command } from "commander";
import { Provider, createProvider, providerArgs } from "./create-provider";
import { createResources } from "./create-resource";
import { getPreferedPM } from "@utils/package";

const load = (program: Command) => {
    return program
        .command("add")
        .allowExcessArguments(false)
        .addArgument(
            new Argument("[provider]", "Create a new provider")
                .choices([...providerArgs, "resource"])
                .argOptional(),
        )
        .addArgument(
            new Argument(
                "[resource...]",
                "Create a new resource files",
            ).argOptional(),
        )
        .option("-p, --path [path]", "Path to generate files")
        .option(
            "-a, --actions [actions]",
            "Only generate the specified resource actions. (ex: list,create,edit,show)",
            "list,create,edit,show",
        )
        .action(action);
};

const action = async (
    _provider: string,
    _resource: string,
    options: { actions: string; path?: string },
    command: Command,
) => {
    const args = command?.args;
    if (!args.length) {
        await printNoArgs();
        return;
    }

    const { providers, resources } = getGroupedArgs(args);

    if (providers.length) {
        createProvider(providers, options?.path);
    }

    if (args.includes("resource")) {
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
            providers: getValidProviders(args as Provider[]),
            resources: [],
        };

    const providers = getValidProviders(
        args.slice(0, resourceIndex) as Provider[],
    );

    const resources = args.slice(resourceIndex + 1);

    return { providers, resources };
};

const printNoArgs = async () => {
    const { name } = await getPreferedPM();

    console.log("❌ Please provide a feature name");
    console.log(
        `For more information please use: "${name} run refine add help"`,
    );
};

const getValidProviders = (providers: Provider[]) => {
    return providers.filter((provider) => {
        if (providerArgs.includes(provider)) return true;

        console.log(`❌ "${provider}" is not a valid provider`);
        return false;
    });
};

export default load;
