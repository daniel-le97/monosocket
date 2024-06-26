

const validNames = [
  "socket:buffer",
  "socket:async/context",
  "socket:events",
  "socket:async/wrap",
  "socket:diagnostics/channels",
  "socket:diagnostics/metric",
  "socket:diagnostics/window",
  "socket:diagnostics/index",
  "socket:diagnostics",
  "socket:internal/symbols",
  "socket:gc",
  "socket:internal/async/hooks",
  "socket:async/resource",
  "socket:async/hooks",
  "socket:async/storage",
  "socket:async/deferred",
  "socket:async",
  "socket:application/menu",
  "socket:internal/events",
  "socket:path/well-known",
  "socket:os",
  "socket:signal",
  "socket:internal/streams/web",
  "socket:internal/streams",
  "socket:stream/web",
  "socket:stream",
  "socket:tty",
  "socket:process",
  "socket:url/urlpattern/urlpattern",
  "socket:url/url/url",
  "socket:querystring",
  "socket:url/index",
  "socket:url",
  "socket:location",
  "socket:path/path",
  "socket:path/mounts",
  "socket:path/win32",
  "socket:path/posix",
  "socket:path/index",
  "socket:path",
  "socket:fs/stream",
  "socket:fs/constants",
  "socket:fs/flags",
  "socket:fs/stats",
  "socket:fs/fds",
  "socket:fs/handle",
  "socket:fs/dir",
  "socket:hooks",
  "socket:fs/watcher",
  "socket:fs/promises",
  "socket:fs/index",
  "socket:fs",
  "socket:external/libsodium/index",
  "socket:crypto/sodium",
  "socket:crypto",
  "socket:ipc",
  "socket:os/constants",
  "socket:errno",
  "socket:errors",
  "socket:util/types",
  "socket:mime/index",
  "socket:mime",
  "socket:util",
  "socket:window/constants",
  "socket:window/hotkey",
  "socket:window",
  "socket:application",
  "socket:test/fast-deep-equal",
  "socket:assert",
  "socket:async_hooks",
  "socket:bluetooth",
  "socket:bootstrap",
  "socket:internal/globals",
  "socket:internal/shared-worker",
  "socket:internal/serialize",
  "socket:internal/database",
  "socket:commonjs/cache",
  "socket:commonjs/loader",
  "socket:commonjs/package",
  "socket:console",
  "socket:vm",
  "socket:worker_threads/init",
  "socket:worker_threads",
  "socket:child_process",
  "socket:constants",
  "socket:ip",
  "socket:dns/promises",
  "socket:dns/index",
  "socket:dns",
  "socket:dgram",
  "socket:enumeration",
  "socket:fs/web",
  "socket:extension",
  "socket:fetch/fetch",
  "socket:service-worker/env",
  "socket:service-worker/debug",
  "socket:service-worker/state",
  "socket:service-worker/clients",
  "socket:service-worker/context",
  "socket:service-worker/events",
  "socket:http/adapters",
  "socket:http",
  "socket:fetch/index",
  "socket:fetch",
  "socket:https",
  "socket:language",
  "socket:i18n",
  "socket:stream-relay/packets",
  "socket:stream-relay/encryption",
  "socket:stream-relay/cache",
  "socket:stream-relay/nat",
  "socket:stream-relay/index",
  "socket:node/index",
  "socket:index",
  "socket:stream-relay/proxy",
  "socket:stream-relay/api",
  "socket:network",
  "socket:string_decoder",
  "socket:test/context",
  "socket:test/dom-helpers",
  "socket:test/index",
  "socket:test",
  "socket:timers/platform",
  "socket:timers/timer",
  "socket:timers/promises",
  "socket:timers/scheduler",
  "socket:timers/index",
  "socket:timers",
  "socket:commonjs/builtins",
  "socket:commonjs/require",
  "socket:commonjs/module",
  "socket:module",
  "socket:node-esm-loader",
  "socket:internal/permissions",
  "socket:notification",
  "socket:service-worker",
  "socket:stream-relay",
  "socket:service-worker/instance",
  "socket:worker",
  "socket:child_process/worker",
  "socket:internal/callsite",
  "socket:internal/error",
  "socket:internal/geolocation",
  "socket:internal/post-message",
  "socket:service-worker/notification",
  "socket:service-worker/registration",
  "socket:service-worker/container",
  "socket:internal/service-worker",
  "socket:internal/webassembly",
  "socket:internal/scheduler",
  "socket:internal/promise",
  "socket:internal/timers",
  "socket:internal/pickers",
  "socket:internal/primitives",
  "socket:internal/init",
  "socket:internal/worker",
  "socket:npm/module",
  "socket:npm/service-worker",
  "socket:service-worker/global",
  "socket:service-worker/init",
  "socket:service-worker/storage",
  "socket:service-worker/worker",
  "socket:stream-relay/worker",
  "socket:test/harness",
  "socket:vm/init",
  "socket:vm/world",
] as const;

type ValidName = (typeof validNames)[number];

export async function useSocket(module: ValidName) {
  try {
    return await import(module);
  } catch (error) {
    console.error(error);
  }
}

useSocket("socket:process");
