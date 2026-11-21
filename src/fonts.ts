import { continueRender, delayRender, staticFile } from "remotion";

// تحميل الخطوط المحلية قبل بدء الرندر حتى لا يظهر خط بديل في أول الإطارات
const fonts = [
  { family: "Amiri", file: "fonts/Amiri-Regular.ttf", weight: "400" },
  { family: "Amiri", file: "fonts/Amiri-Bold.ttf", weight: "700" },
];

if (typeof window !== "undefined" && "FontFace" in window) {
  const handle = delayRender("Loading Arabic fonts");
  Promise.all(
    fonts.map((f) => {
      const face = new FontFace(f.family, `url(${staticFile(f.file)}) format("truetype")`, {
        weight: f.weight,
      });
      return face.load().then((loaded) => document.fonts.add(loaded));
    })
  )
    .then(() => continueRender(handle))
    .catch((err) => {
      console.error(err);
      continueRender(handle);
    });
}

export const FONT_VERSE = "'Amiri', serif";
export const FONT_UI = "'Amiri', serif";
