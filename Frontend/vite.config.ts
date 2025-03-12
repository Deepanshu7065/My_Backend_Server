import { defineConfig } from "vite";
import viteImagemin from "vite-plugin-imagemin";

export default defineConfig({
  server: {
    watch: {
      ignored: ['**/node_modules/**', '**/assets/**']
    }
  },
  plugins: [
    viteImagemin({
      mozjpeg: { quality: 60 },
      pngquant: { quality: [0.2, 0.5] },
      gifsicle: { optimizationLevel: 2 },
      svgo: { plugins: [{ removeViewBox: false }] }
    })
  ]
});
