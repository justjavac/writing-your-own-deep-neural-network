import { Network } from "@/dnn/network.ts";

const model = await Deno.readTextFile("./models/and_gate.json");
const network = Network.fromModel(JSON.parse(model));

console.log("0 AND 0 = ", network.predict([0, 0]));
console.log("0 AND 1 = ", network.predict([0, 1]));
console.log("1 AND 0 = ", network.predict([1, 0]));
console.log("1 AND 1 = ", network.predict([1, 1]));
