import execa from "execa";

export const runScript = (binPath: string, args: string[]) => {
    try {
        const execution = execa(binPath, args, {
            stdio: "inherit",
        });

        execution.on("message", (message) => {
            console.log(message);
        });

        execution.on("error", (error) => {
            console.log(error);
        });

        execution.on("exit", (exitCode) => {
            console.log(`Application exited with code ${exitCode}`);
        });

        return execution;
    } catch (error: any) {
        throw new Error(error);
    }
};
