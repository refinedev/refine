import execa from "execa";

export const runScript = (binPath: string, args: string[]) => {
    const execution = execa(binPath, args, {
        stdio: "pipe",
    });

    execution.stdout?.pipe(process.stdout);
    execution.stderr?.pipe(process.stderr);

    return execution;
};
