const fs = require("fs");
const { execSync } = require("child_process");

// Script to report biome linter issues.
// Temporarily added to review / fix linter rules during the migration.
// Goes through linter rules one-by-one
// Sets rule to "warning"
// Prints warnings to the file at `./biome/group/rule`
// Turns the rule off again.

const getBiomeConfig = () =>
  JSON.parse(fs.readFileSync("./biome.json").toString());

const originalBiomeConfig = getBiomeConfig();

const lintRules = originalBiomeConfig.linter.rules;

const lintGroups = Object.entries(lintRules);

function getModifiedConfig(group, rule) {
  const tempConfig = getBiomeConfig();

  tempConfig["linter"]["rules"][group][rule] = "warn";

  return tempConfig;
}

const disabledRules = [
  "noForEach",
  "noStaticOnlyClass",
  "noUselessFragments",
  "useSingleVarDeclarator",
];

for (const [group, rules] of lintGroups) {
  if (group === "recommended") continue;

  for (const [rule, value] of Object.entries(rules)) {
    if (value === "error") continue;
    if (disabledRules.includes(rule)) continue;

    const modifiedConfig = JSON.stringify(
      getModifiedConfig(group, rule),
      null,
      2,
    );

    fs.writeFileSync("./biome.json", modifiedConfig);

    execSync(`npm run biome lint . &> .biome/${group}/${rule}`);

    execSync("git checkout -- biome.json");
  }
}
