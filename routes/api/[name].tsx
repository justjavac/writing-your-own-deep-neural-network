import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  async GET(req, ctx) {
    const name = ctx.params.name;
    const context = await Deno.readTextFile(`./models/${name}.json`);
    return new Response(context, {
      headers: { "Content-Type": "application/json" },
    });
  },
};
