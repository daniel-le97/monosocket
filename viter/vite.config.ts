import { defineConfig, Plugin } from "vite";
import solid from "vite-plugin-solid";
import socketExternals from "./externals.json";
import externalize from "vite-plugin-externalize-dependencies";
import { vitePluginSocketExternals } from "./plugin";
import { vitePluginSocket } from "./vite-plugin-socket";
import dns from 'dns'

dns.setDefaultResultOrder('verbatim')


export default defineConfig({
  plugins: [
    solid(),
    vitePluginSocket(),
    // vitePluginSocketExternals(),
    // externalize({'externals': [/^socket:.*/]}),
  ],
  // server: {
  //   port: 5173,
  //   strictPort: true
    
  // },
  build: {
    manifest: true,
    target: "esnext",

    // sourcemap: true,

    // rollupOptions: {
    //   external: [/^socket:.*/],
    // },
  },
});
