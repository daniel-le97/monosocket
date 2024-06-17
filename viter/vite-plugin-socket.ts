// @ts-ignore
import * as fs from "fs";
import { Plugin } from "vite";
import importKeys from "./externals.json";

function extractDeclaredModules(filePath: string) {
  try {
    // Read the content of the index.d.ts file
    let content = "";
    if (fs.existsSync(filePath)) {
      content = fs.readFileSync(filePath, "utf-8");
    }
    // console.error("unable to find file: ", filePath);

    // Regular expression to match module declarations
    const moduleRegex = /declare\s+module\s+['"]([^'"]+)['"]\s*\{/g;

    // Array to store matched modules
    const declaredModules: string[] = [];

    // Extract all module declarations
    let match;
    while ((match = moduleRegex.exec(content)) !== null) {
      declaredModules.push(match[1]);
    }

    fs.writeFileSync(
      "./node_modules/.vite/externals.json",
      JSON.stringify(declaredModules, null, 2)
    );
    return declaredModules;
  } catch (err) {
    // @ts-ignore
    console.error("Error reading or parsing file:", err);
    return [];
  }
}

// https://github.com/vitejs/vite/issues/6582#issuecomment-1988662224
export function vitePluginSocket(): Plugin {
  // let importKeys: string[] = [];
  // if (fs.existsSync("./node_modules/.vite/externals.json")) {
  //   importKeys = JSON.parse(
  //     fs.readFileSync("./node_modules/.vite/externals.json", "utf-8")
  //   );
  // } else {
  //   importKeys = extractDeclaredModules("./node_modules/");
  // }

  const VALID_ID_PREFIX = `/@id/`;
  const reg = new RegExp(`${VALID_ID_PREFIX}(${importKeys.join("|")})`, "g");
  // console.log(importKeys);

  return {
    name: "vite-plugin-ignore-static-import",
    enforce: "pre",

    // 1. insert to optimizeDeps.exclude to prevent pre-transform
    config(userConfig) {
      const config = { ...userConfig };

      config.build = { ...config.build };
      config.build.rollupOptions = { ...config.build.rollupOptions };

      config.build.rollupOptions.external =
        config.build.rollupOptions.external || [];

      if (typeof config.build.rollupOptions.external === "string") {
        config.build.rollupOptions.external = [
          config.build.rollupOptions.external,
        ];
      }
      if (Array.isArray(config.build.rollupOptions.external)) {
        config.build.rollupOptions.external.push(/^socket:.*/);
      }
      config.optimizeDeps = {
        ...(config.optimizeDeps ?? {}),
        exclude: [...(config.optimizeDeps?.exclude ?? []), ...importKeys],
      };
      return config;
    },
    // 2. push a plugin to rewrite the 'vite:import-analysis' prefix
    configResolved(resolvedConfig) {
      // @ts-ignore
      resolvedConfig.plugins.push({
        name: "vite-plugin-ignore-static-import-replace-idprefix",
        transform: (code: string) =>
          reg.test(code)
            ? code.replace(reg, (m, s1) => {
                console.log("replacing: ", m);
                console.log("with: ", s1);
                return s1;
              })
            : code,
      });
    },
    // 3. rewrite the id before 'vite:resolve' plugin transform to 'node_modules/...'
    resolveId: (id) => {
      if (importKeys.includes(id)) {
        return { id, external: true };
      }
    },
    load(id) {
      if (importKeys.includes(id)) {
        return "";
      }
    },
  };
}
