import { assertEquals } from "$std/testing/asserts.ts";
import { Network } from "@/dnn/network.ts";

const trainingData = [
  {
    input: [0],
    output: [1],
  },
  {
    input: [1],
    output: [0],
  },
];

const learningRate = 0.3;
const network = new Network([1, 5, 5, 1], learningRate);

for (let i = 0; i < 10_000; i++) {
  const index = Math.floor(Math.random() * trainingData.length);
  const { input, output } = trainingData[index];
  network.train(input, output);
}

Deno.test("NOT 0 = 1", () => {
  const result = network.predict([0]);
  assertEquals(Math.round(result[0]), 1);
});

Deno.test("NOT 1 = 0", () => {
  const result = network.predict([1]);
  assertEquals(Math.round(result[0]), 0);
});
