import * as fs from "fs";

function extractDeclaredModules(filePath) {
  try {
    // Read the content of the index.d.ts file
    const content = fs.readFileSync(filePath, "utf-8");

    // Regular expression to match module declarations
    const moduleRegex = /declare\s+module\s+['"]([^'"]+)['"]\s*\{/g;

    // Array to store matched modules
    const declaredModules = [];

    // Extract all module declarations
    let match;
    while ((match = moduleRegex.exec(content)) !== null) {
      declaredModules.push(match[1]);
    }

    return declaredModules;
  } catch (err) {
    console.error("Error reading or parsing file:", err);
    return [];
  }
}

// Usage example:
const modules = extractDeclaredModules(
  "../build/mac/monosocket-dev.app/Contents/Resources/socket/index.d.ts"
);
console.table(modules);

await fs.promises.writeFile("externals.json", JSON.stringify(modules, null, 2));
