import { Writable, writable } from "svelte/store";

export const modes = ["color", "white", "black"] as const;

export type Mode = typeof modes[number];

type Config = {
  mode: Mode;
};

export const config: Writable<Config> = writable({
  mode: "black",
});
