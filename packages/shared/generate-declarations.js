const { execSync } = require("child_process");

const generateDeclarations = () => {
  execSync("tsc --project tsconfig.declarations.json", {
    stdio: "inherit",
  });
};

const getAllDtsFiles = (outDir) => {
  const files = execSync(`find ${outDir} -name "*.d.ts"`)
    .toString()
    .split("\n")
    .filter((file) => file.length > 0);

  return files;
};

const organizeExtensionsForDts = (dtsFile) => {
  const mapFile = dtsFile.replace(".d.ts", ".d.ts.map");

  const ctsFile = dtsFile.replace(".d.ts", ".d.cts");
  const ctsMapFile = mapFile.replace(".d.ts.map", ".d.cts.map");

  const mtsFile = dtsFile.replace(".d.ts", ".d.mts");
  const mtsMapFile = mapFile.replace(".d.ts.map", ".d.mts.map");

  execSync(`cp ${dtsFile} ${ctsFile}`);
  execSync(`cp ${mapFile} ${ctsMapFile}`);

  execSync(`cp ${dtsFile} ${mtsFile}`);
  execSync(`cp ${mapFile} ${mtsMapFile}`);
};

const main = () => {
  console.log("Generating declarations...");
  generateDeclarations();

  console.log("Generating d.mts and d.cts files...");
  getAllDtsFiles("dist").forEach((dtsFile) => {
    organizeExtensionsForDts(dtsFile);
  });

  console.log("✓ Declarations are generated.");
};

main();
