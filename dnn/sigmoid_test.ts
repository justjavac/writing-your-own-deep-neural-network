import { assert } from "$std/testing/asserts.ts";
import { sigmoid } from "./sigmoid.ts";

Deno.test("sigmoid 的输出值在 `[0,1]` 区间内", () => {
  assert(sigmoid(0) > 0 && sigmoid(0) <= 1);
  assert(sigmoid(1) > 0 && sigmoid(0) <= 1);
  assert(sigmoid(0.5) > 0 && sigmoid(0) <= 1);
  assert(sigmoid(5) > 0 && sigmoid(0) <= 1);
  assert(sigmoid(-10) > 0 && sigmoid(0) <= 1);
  assert(sigmoid(Number.MAX_SAFE_INTEGER) > 0 && sigmoid(0) <= 1);
});
