import { assertEquals } from "$std/testing/asserts.ts";
import { Network } from "@/dnn/network.ts";

// 生成 0 到 1023 的二进制数
const allData = Array(2 ** 10)
  .fill(0)
  .map((_, i) => ({
    i: i,
    input: i.toString(2).padStart(10, "0").split("").map(Number),
    output: [i % 2],
  }));

// 只用 10% 的数据进行训练
const trainingData = allData
  .sort(() => Math.random() - 0.5)
  .slice(0, Math.floor(allData.length * 0.1));

const network = new Network([10, 5, 1]);

for (let i = 0; i < 100_000; i++) {
  const index = Math.floor(Math.random() * trainingData.length);
  const { input, output } = trainingData[index];
  network.train(input, output);
}

for (const x of allData) {
  const { i, input, output } = x;
  Deno.test(`${i} --> ${output}`, () => {
    const result = network.predict(input);
    assertEquals(Math.round(result[0]), output[0]);
  });
}
