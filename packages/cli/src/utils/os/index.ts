import envinfo from "envinfo";

export const getOS = async () => {
    // returns as a ['OS', 'macOS Mojave 10.14.5']
    const [_, OS] = (await envinfo.helpers.getOSInfo()) as unknown as string[];

    const parsed = OS.split(" ");
    const name = parsed.at(0) || "";
    const version = parsed.at(-1) || "";

    return {
        name,
        version,
    };
};
