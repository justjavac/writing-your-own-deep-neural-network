import { Head } from "$fresh/runtime.ts";
import { AppProps } from "$fresh/src/server/types.ts";
import { Menu } from "@/components/Menu.tsx";

export default function App({ Component }: AppProps) {
  return (
    <html lang="zh-CN">
      <Head>
        <title>Deep Neural Network</title>
        <link rel="icon" type="image/x-icon" href="https://fresh.deno.dev/favicon.ico"></link>
      </Head>
      <body class="flex flex-col h-screen">
        <div class="flex p-4 gap-x-4 border">
          <div class="align-middle mt-1 mr-8 flex items-center">
            <a class="text-xl font-semibold" href="/">
              Playground
            </a>
          </div>
          <Menu title="与门" href="/and_gate" />
          <Menu title="或门" href="/or_gate" />
          <Menu title="非门" href="/not_gate" />
          <Menu title="十以内加法" href="/add" />
        </div>
        <div class="flex flex-grow">
          <Component />
        </div>
      </body>
    </html>
  );
}
