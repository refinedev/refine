#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { glob } = require("glob");

/**
 * Updates package.json scripts to add -- after refine commands
 * This allows users to pass flags without needing npm run dev -- --host
 * Instead they can just use: npm run dev --host
 */

async function updatePackageJsonScripts() {
  const packageJsonFiles = await glob("examples/**/package.json", {
    cwd: path.join(__dirname, ".."),
    absolute: true,
    ignore: ["**/node_modules/**"],
  });

  console.log(`Found ${packageJsonFiles.length} package.json files to check`);

  let updatedCount = 0;

  for (const file of packageJsonFiles) {
    const content = fs.readFileSync(file, "utf8");
    const pkg = JSON.parse(content);

    if (!pkg.scripts) continue;

    let hasChanges = false;

    // Update dev script
    if (pkg.scripts.dev && pkg.scripts.dev === "refine dev") {
      pkg.scripts.dev = "refine dev --";
      hasChanges = true;
    }

    // Update start script
    if (pkg.scripts.start && pkg.scripts.start === "refine start") {
      pkg.scripts.start = "refine start --";
      hasChanges = true;
    }

    // Update build script
    if (pkg.scripts.build && pkg.scripts.build === "refine build") {
      pkg.scripts.build = "refine build --";
      hasChanges = true;
    }

    if (hasChanges) {
      fs.writeFileSync(file, `${JSON.stringify(pkg, null, 2)}\n`);
      updatedCount++;
      console.log(
        `✓ Updated: ${path.relative(path.join(__dirname, ".."), file)}`,
      );
    }
  }

  console.log(`\n✨ Updated ${updatedCount} files`);
}

updatePackageJsonScripts().catch(console.error);
