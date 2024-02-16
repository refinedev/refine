import chalk from "chalk";

interface IntegrationChoice {
    id: string;
    title: string;
    description: string;
    disabled?: string;
}

export const prettifyChoice = (choice: IntegrationChoice) => {
    const { id, title, description, disabled } = choice;

    if (disabled) {
        return {
            value: id,
            name: `${chalk.gray(title)}`,
            disabled: chalk.redBright(disabled),
        };
    }

    return {
        value: id,
        name: `${chalk.blueBright(title)} - ${description}`,
    };
};
