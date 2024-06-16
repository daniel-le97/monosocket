import { Hono } from 'hono'
import { authHandler, initAuthConfig, verifyAuth } from '@hono/auth-js'
import GitHub from '@auth/core/providers/github'
import path from 'socket:path'
import { UnstorageAdapter } from '@auth/unstorage-adapter'
import { createStorage } from 'unstorage'

const storage = createStorage()

const app = new Hono({ getPath: c => new URL(c.url).pathname }).basePath(
  '/api',
)

app.use('*', initAuthConfig(getAuthConfig))

app.use('/auth/*', authHandler())

app.use('/*', verifyAuth())
// app.use("/cats", verifyAuth());
// app.get("*", (c) => c.text("Hello World!"));
app.get('/cats', c => c.text('meow'))
// app.use("*", (c) => c.text("meow"));

// app.get("/api/protected", (c) => {
//   const auth = c.get("authUser");
//   return c.json(auth);
// });

/**
 *
 * @param {import('hono').Context} c The context object.
 *  @returns {import('@hono/auth-js').AuthConfig} authjs AuthConfig object.
 */
function getAuthConfig(c) {
  console.log(c)
  return {
    secret: 'cNJhJsZRdwSuSs5V/jiv4QuyJ79vwSy0hJkPCx5NJBga',
    adapter: UnstorageAdapter(storage),
    providers: [
      GitHub({
        clientId: `740b8a0b8d98f0cb94ae`,
        clientSecret: `0873e20b599d7cea8134d20cd628e5c1b236e130`,
      }),
    ],
  }
}

console.log(path.RESOURCES)
/**
 * The request handler entry.
 * @param {Request} request
 * @param {object} env
 * @param {object} ctx
 * @return {Response?}
 */
export default async function (request, env, ctx) {
  await storage.setItem('URL', request.url)
  try {
    return app.fetch(request, env, ctx)
  }
  catch (error) {
    // console.log(error);
    // return app.fetch(request, env, ctx);
  }
}
