import { Head } from "$fresh/runtime.ts";
import { AppProps } from "$fresh/src/server/types.ts";
import { Menu } from "@/components/Menu.tsx";

export default function App({ Component }: AppProps) {
  return (
    <html lang="zh-CN">
      <Head>
        <title>Deep Neural Network</title>
        <link rel="icon" type="image/x-icon" href="https://fresh.deno.dev/favicon.ico"></link>
        <link rel="stylesheet" href="https://x.deno.js.cn/assets/css/style.css?v=cf667d" />
      </Head>
      <body class="flex flex-col h-screen">
        <div class="flex px-4 py-3 gap-x-4 border-b">
          <div class="align-middle mt-1 mr-8 flex items-center">
            <a class="text-xl font-semibold" href="/">
              Playground
            </a>
          </div>
          <Menu title="与门" href="/and_gate" />
          <Menu title="或门" href="/or_gate" />
          <Menu title="非门" href="/not_gate" />
          <Menu title="十以内加法" href="/add" />
          <Menu title="奇偶判断" href="/odd" />
        </div>
        <div class="flex flex-grow">
          <Component />
        </div>
      </body>
    </html>
  );
}
