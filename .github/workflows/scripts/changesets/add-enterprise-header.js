const { readdirSync, readFileSync, writeFileSync } = require("fs");
const { join } = require("path");

function updateChangesetTitles() {
  const TITLE_TO_ADD = "# Refine Enterprise Release\n";
  const changesetDir = join(process.cwd(), ".changeset");

  try {
    const files = readdirSync(changesetDir);
    const mdFiles = files.filter(
      (file) => file !== "README.md" && file.endsWith(".md"),
    );

    if (!mdFiles.length) {
      console.log("✅ No changesets found");
      return;
    }

    let updatedFilesCount = 0;

    for (const file of mdFiles) {
      const filePath = join(changesetDir, file);
      const content = readFileSync(filePath, "utf-8");

      if (content.includes("# Refine Enterprise Release")) {
        continue;
      }

      const [_, frontmatter, ...bodyParts] = content.split("---");
      if (!frontmatter) continue;

      const body = bodyParts.join("---").trim();

      const updatedContent = [
        "---",
        frontmatter.trim(),
        "---\n",
        TITLE_TO_ADD,
        body,
      ].join("\n");

      writeFileSync(filePath, updatedContent);
      updatedFilesCount++;
    }

    console.log(`✅ Successfully updated ${updatedFilesCount} changeset files`);
  } catch (error) {
    console.error("Error updating changeset files:", error);
    process.exit(1);
  }
}

updateChangesetTitles();
