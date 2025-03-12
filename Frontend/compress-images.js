import imagemin from "imagemin";
import imageminMozjpeg from "imagemin-mozjpeg";
import imageminPngquant from "imagemin-pngquant";
import imageminGifsicle from "imagemin-gifsicle";
import imageminSvgo from "imagemin-svgo";
import imageminWebp from "imagemin-webp";

(async () => {
  await imagemin(["/src/assets/*.{jpg,png,svg,gif}"], {
    destination: "public/compressed-images",
    plugins: [
      imageminMozjpeg({ quality: 60 }),
      imageminPngquant({ quality: [0.2, 0.5] }),
      imageminGifsicle({ optimizationLevel: 2 }),
      imageminSvgo({ plugins: [{ removeViewBox: false }] }),
      imageminWebp({ quality: 50 })
    ]
  });

  console.log("✅ Images compressed successfully!");
})();
