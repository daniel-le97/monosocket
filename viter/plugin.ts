import type { Plugin } from "vite";

// https://github.com/vitejs/vite/issues/6582#issuecomment-1988662224
export function vitePluginSocketExternals(): Plugin {
  const VALID_ID_PREFIX = `/@id/socket:`;
  const reg = new RegExp(`${VALID_ID_PREFIX}[\\w:]+`, "g");
  return {
    name: "vite-plugin-ignore-socket-imports",
    enforce: "pre",
    config(config) {
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
      // config.optimizeDeps?.exclude

      return config;
    },
    configResolved(resolvedConfig) {
      // @ts-ignore
      resolvedConfig.plugins.push({
        name: "vite-plugin-ignore-static-import-replace-idprefix",
        transform: (code: string) =>
          reg.test(code)
            ? code.replace(reg, (m) => m.replace(VALID_ID_PREFIX, ""))
            : code,
      });
    },

    resolveId: (id) => {
      if (id.includes("socket:")) {
        console.log("resolve", id);

        return { id, external: true };
      }
    },
    load(id) {
      if (id.includes("socket:")) {
        console.log("load", id);

        return "";
      }
    },
  };
}
