const fs = require("fs");
const path = require("path");

const { REFINE_CE_TITLE, REFINE_ENTERPRISE_TITLE } = require("./constants");

function validateChangesetReleaseComments(type) {
  if (!["enterprise", "community"].includes(type)) {
    console.error(
      `\n ❌ Invalid type: ${type}. Please use "enterprise" or "community".`,
    );
    process.exit(1);
  }

  const isEnterprise = type === "enterprise";

  console.log(
    `\n 🔍 Validating changesets for ${
      isEnterprise ? "Enterprise" : "Community"
    } Edition`,
  );

  const changesetDir = path.join(process.cwd(), ".changeset");

  const files = fs.readdirSync(changesetDir);
  const mdFiles = files.filter(
    (file) => file !== "README.md" && file.endsWith(".md"),
  );

  if (mdFiles.length === 0) {
    console.log(`⚠️ No changeset files found in ${changesetDir}`);
    process.exit(0);
  }

  console.log(` ✅ Found ${mdFiles.length} changeset files to validate\n`);

  let hasError = false;
  let validFiles = 0;

  mdFiles.forEach((file) => {
    console.log(` ⚠️ Checking file: ${file}`);
    const content = fs.readFileSync(path.join(changesetDir, file), "utf-8");

    const hasEnterpriseTag = content.includes(REFINE_ENTERPRISE_TITLE);
    const hasCommunityTag = content.includes(REFINE_CE_TITLE);

    let isValid = true;

    const enterpriseMatches = content.match(
      new RegExp(REFINE_ENTERPRISE_TITLE, "g"),
    );

    if (enterpriseMatches && enterpriseMatches.length > 1) {
      console.error(
        `❌ Error: Changeset "${file}" has duplicate Enterprise release titles`,
      );
      hasError = true;
      isValid = false;
    }

    const communityMatches = content.match(new RegExp(REFINE_CE_TITLE, "g"));

    if (communityMatches && communityMatches.length > 1) {
      console.error(
        `❌ Error: Changeset "${file}" has duplicate Community release titles`,
      );
      hasError = true;
      isValid = false;
    }

    if (isEnterprise) {
      if (!hasEnterpriseTag) {
        console.error(
          `❌ Error: Changeset "${file}" is missing "${REFINE_ENTERPRISE_TITLE}" comment`,
        );
        hasError = true;
        isValid = false;
      }
      if (hasCommunityTag) {
        console.error(
          `❌ Error: Enterprise changeset "${file}" should not include "${REFINE_CE_TITLE}" comment`,
        );
        hasError = true;
        isValid = false;
      }
    } else {
      if (!hasCommunityTag) {
        console.error(
          `❌ Error: Changeset "${file}" is missing "${REFINE_CE_TITLE}" comment`,
        );
        hasError = true;
        isValid = false;
      }
      if (hasEnterpriseTag) {
        console.error(
          `❌ Error: Community changeset "${file}" should not include "${REFINE_ENTERPRISE_TITLE}" comment`,
        );
        hasError = true;
        isValid = false;
      }
    }

    if (hasEnterpriseTag === hasCommunityTag) {
      console.error(
        `❌ Error: Changeset "${file}" must have exactly one release tag (Enterprise or Community)`,
      );
      hasError = true;
      isValid = false;
    }

    if (isValid) {
      console.log(`✅ File "${file}" is valid`);
      validFiles++;
    }
  });

  console.log(
    `\n ✅ Validation complete: ${validFiles}/${mdFiles.length} files passed`,
  );

  if (hasError) {
    console.error("\n❌ Validation failed - see errors above");
    process.exit(1);
  } else {
    console.log("\n✅ All changesets are valid");
  }
}

validateChangesetReleaseComments(process.argv[2]);
