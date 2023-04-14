import { Network } from "@/dnn/network.ts";

const model = await Deno.readTextFile("./models/not_gate.json");
const network = Network.fromModel(JSON.parse(model));

console.log("NOT 0 = ", network.predict([0]));
console.log("NOT 1 = ", network.predict([1]));
