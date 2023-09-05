import { Command } from "commander";
import { Provider, createProvider, providerArgs } from "./create-provider";
import { createResources } from "./create-resource";
import { getPreferedPM } from "@utils/package";

const load = (program: Command) => {
    return program
        .command("add")
        .allowExcessArguments(true)
        .description("Creates new feature")
        .argument("[auth]", "Creates demo Auth provider")
        .argument("[live]", "Creates demo Live provider")
        .argument("[data]", "Creates demo Data provider")
        .argument("[access-control]", "Creates demo Access Control provider")
        .argument("[audit-log]", "Creates demo Audit Log provider")
        .argument("[i18n]", "Creates demo i18n provider")
        .argument("[notification]", "Creates demo nNtification provider")
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
    _arg5: string,
    _arg6: string,
    _arg7: string,
    _arg8: string,
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
