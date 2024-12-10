const { mkdirSync, readdirSync, readFileSync, writeFileSync } = require("fs");
const { join } = require("path");

function copyChangesetFiles() {
  const sourceDir = join(process.cwd(), ".changeset");
  const targetDir = join(process.cwd(), "_changeset");

  try {
    try {
      mkdirSync(targetDir, { recursive: true });
    } catch (error) {
      if (error.code !== "EEXIST") {
        throw error;
      }
    }

    const files = readdirSync(sourceDir);

    for (const file of files) {
      const sourcePath = join(sourceDir, file);
      const targetPath = join(targetDir, file);

      try {
        const content = readFileSync(sourcePath);
        writeFileSync(targetPath, content);
        console.log(`Copied: ${file}`);
      } catch (error) {
        console.error(`Failed to copy ${file}:`, error.message);
      }
    }

    console.log(`✅ Successfully copied ${files.length} files to _changeset`);
  } catch (error) {
    console.error("Error during changeset files copy operation:", error);
    process.exit(1);
  }
}

function updateChangesetFiles() {
  const TITLE_TO_ADD = "# Refine Community Edition Release\n";
  const changesetDir = join(process.cwd(), "_changeset");

  try {
    const files = readdirSync(changesetDir);
    const mdFiles = files.filter((file) => file.endsWith(".md"));

    let updatedFilesCount = 0;

    for (const file of mdFiles) {
      const filePath = join(changesetDir, file);
      const content = readFileSync(filePath, "utf-8");

      const [_, frontmatter, ...bodyParts] = content.split("---");
      if (!frontmatter) continue;

      const updatedFrontmatter = frontmatter.replace(
        /": minor|": major/g,
        '": patch',
      );

      const body = bodyParts.join("---").trim();

      const cleanBody = body
        .replace(/# Refine Enterprise Release\s*/g, "")
        .replace(/# Refine Community Edition Release\s*/g, "")
        .trim();

      const updatedContent = [
        "---",
        updatedFrontmatter.trim(),
        "---\n",
        TITLE_TO_ADD,
        cleanBody,
      ].join("\n");

      writeFileSync(filePath, updatedContent);
      console.log(`File updated: ${file}`);
      updatedFilesCount++;
    }

    console.log(`✅ Successfully updated ${updatedFilesCount} changeset files`);
  } catch (error) {
    console.error("Error updating changeset files:", error);
    process.exit(1);
  }
}

copyChangesetFiles();

updateChangesetFiles();
