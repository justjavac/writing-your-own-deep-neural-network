import { assertEquals } from "$std/testing/asserts.ts";
import { Network } from "@/dnn/network.ts";

const trainingData = [
  [0, 0],
  [0, 1],
  [1, 0],
  [1, 1],
].map((x) => ({
  input: x,
  output: [x[0] & x[1]],
}));

const learningRate = 0.3;
const network = new Network([2, 5, 5, 1], learningRate);

for (let i = 0; i < 10_000; i++) {
  const index = Math.floor(Math.random() * trainingData.length);
  const { input, output } = trainingData[index];
  network.train(input, output);
}

Deno.test("0 AND 0 = 0", () => {
  const result = network.predict([0, 0]);
  assertEquals(Math.round(result[0]), 0);
});

Deno.test("0 AND 1 = 0", () => {
  const result = network.predict([0, 1]);
  assertEquals(Math.round(result[0]), 0);
});

Deno.test("1 AND 0 = 0", () => {
  const result = network.predict([1, 0]);
  assertEquals(Math.round(result[0]), 0);
});

Deno.test("1 AND 1 = 1", () => {
  const result = network.predict([1, 1]);
  assertEquals(Math.round(result[0]), 1);
});
