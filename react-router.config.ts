import type { Config } from "@react-router/dev/config";

export default {
  // Fully static: no runtime server, every route is prerendered at build time.
  ssr: false,
  prerender: true,
} satisfies Config;
