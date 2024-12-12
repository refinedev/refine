const fs = require("fs");
const path = require("path");

const packageJsonPath = path.join(
  process.cwd(),
  "packages/create-refine-app/package.json",
);

function addRegistry() {
  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

    packageJson.publishConfig = {
      ...packageJson.publishConfig,
      registry: "https://registry.refine.dev",
    };

    fs.writeFileSync(
      packageJsonPath,
      `${JSON.stringify(packageJson, null, 2)}\n`,
    );

    console.log("Registry configuration added successfully.");
  } catch (error) {
    console.error("Error adding registry:", error);
    process.exit(1);
  }
}

function removeRegistry() {
  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

    if (packageJson.publishConfig) {
      delete packageJson.publishConfig.registry;

      if (Object.keys(packageJson.publishConfig).length === 0) {
        delete packageJson.publishConfig;
      }
    }

    fs.writeFileSync(
      packageJsonPath,
      `${JSON.stringify(packageJson, null, 2)}\n`,
    );

    console.log("Registry configuration removed successfully.");
  } catch (error) {
    console.error("Error removing registry:", error);
    process.exit(1);
  }
}

const action = process.argv[2];

if (action === "add") {
  addRegistry();
} else if (action === "remove") {
  removeRegistry();
} else {
  console.error("Please specify either 'add' or 'remove' as an argument");
  process.exit(1);
}
