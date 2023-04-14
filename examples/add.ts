import { Network } from "@/dnn/network.ts";

const layers = [
  10, // 输入层
  5, // 隐藏层
  5, // 隐藏层
  10, // 输出层
];

const network = new Network(layers);

const trainingData = [];

for (let i = 0; i <= 9; i++) {
  for (let j = 0; j <= 9 - i; j++) {
    const input = Array(10).fill(0);
    const output = Array(10).fill(0);
    input[i] = 1;
    input[j] = 1;
    output[i + j] = 1;
    trainingData.push({
      input,
      output,
    });
  }
}

for (let i = 0; i < 1000_000; i++) {
  const index = Math.floor(Math.random() * trainingData.length);
  const { input, output } = trainingData[index];
  network.train(input, output);
}

console.log(network.predict([1, 1, 0, 0, 0, 0, 0, 0, 0, 0]));
console.log(network.predict([1, 0, 0, 0, 1, 0, 0, 0, 0, 0]));
