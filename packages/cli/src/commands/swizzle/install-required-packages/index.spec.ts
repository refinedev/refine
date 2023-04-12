import inquirer from "inquirer";
import { installPackages, getPreferedPM } from "@utils/package";

jest.mock("inquirer");
jest.mock("@utils/package");

const getPreferedPMMock = getPreferedPM as jest.MockedFunction<
    typeof getPreferedPM
>;
const inquirerMock = inquirer as jest.Mocked<typeof inquirer>;
const installPackagesMock = installPackages as jest.MockedFunction<
    typeof installPackages
>;

import * as installRequiredPackages from "./index";

describe("should prompt for package installation and install packages if confirmed", () => {
    afterEach(() => {
        jest.resetAllMocks();
        jest.restoreAllMocks();
    });

    it("should install required packages", async () => {
        inquirerMock.prompt.mockResolvedValueOnce({
            installRequiredPackages: true,
        });

        const requiredPackages = ["react", "react-dom"];

        const installRequiredPackagesSpy = jest.spyOn(
            installRequiredPackages,
            "installRequiredPackages",
        );
        const promptForPackageInstallationSpy = jest.spyOn(
            installRequiredPackages,
            "promptForPackageInstallation",
        );
        const displayManualInstallationCommandSpy = jest.spyOn(
            installRequiredPackages,
            "displayManualInstallationCommand",
        );

        await installRequiredPackages.installRequiredPackages(requiredPackages);

        expect(installRequiredPackagesSpy).toHaveBeenCalledTimes(1);
        expect(installRequiredPackagesSpy).toHaveBeenCalledWith(
            requiredPackages,
        );

        expect(promptForPackageInstallationSpy).toHaveBeenCalledTimes(1);
        expect(promptForPackageInstallationSpy).toHaveBeenCalledWith(
            requiredPackages,
        );

        expect(displayManualInstallationCommandSpy).toHaveBeenCalledTimes(0);

        expect(installPackagesMock).toHaveBeenCalledTimes(1);
        expect(installPackagesMock).toHaveBeenCalledWith(requiredPackages);
    });

    it("should display manual installation command if not confirmed", async () => {
        inquirerMock.prompt.mockResolvedValueOnce({
            installRequiredPackages: false,
        });
        getPreferedPMMock.mockResolvedValueOnce({
            name: "npm",
            version: "1",
        });

        const requiredPackages = ["react", "react-dom"];

        const installRequiredPackagesSpy = jest.spyOn(
            installRequiredPackages,
            "installRequiredPackages",
        );
        const promptForPackageInstallationSpy = jest.spyOn(
            installRequiredPackages,
            "promptForPackageInstallation",
        );
        const displayManualInstallationCommandSpy = jest.spyOn(
            installRequiredPackages,
            "displayManualInstallationCommand",
        );
        const consoleSpy = jest.spyOn(console, "log").mockImplementation();

        await installRequiredPackages.installRequiredPackages(requiredPackages);

        expect(installRequiredPackagesSpy).toHaveBeenCalledTimes(1);
        expect(installRequiredPackagesSpy).toHaveBeenCalledWith(
            requiredPackages,
        );

        expect(promptForPackageInstallationSpy).toHaveBeenCalledTimes(1);
        expect(promptForPackageInstallationSpy).toHaveBeenCalledWith(
            requiredPackages,
        );

        expect(displayManualInstallationCommandSpy).toHaveBeenCalledTimes(1);
        expect(displayManualInstallationCommandSpy).toHaveBeenCalledWith(
            requiredPackages,
        );
        expect(getPreferedPM).toHaveBeenCalledTimes(1);

        expect(installPackagesMock).toHaveBeenCalledTimes(0);

        expect(consoleSpy).toHaveBeenCalledWith(
            `\nYou can install them manually by running this command:`,
        );
    });
});
