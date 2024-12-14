// @ts-check
import { defineConfig } from "astro/config";

import cloudflare from "@astrojs/cloudflare";

import db from "@astrojs/db";

import svelte from "@astrojs/svelte";

import tailwind from "@astrojs/tailwind";

// import auth from "auth-astro";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: cloudflare(),
  integrations: [db(), svelte(), tailwind()],
});