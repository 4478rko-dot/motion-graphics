/**
 * ✍️ ملف المحتوى — غيّر النص من هنا فقط.
 *
 * - verse: نص الآية (تُقسَّم تلقائيًا إلى كلمات بالمسافات، وكل كلمة تظهر وحدها)
 * - highlightWords: كلمات تُلوَّن بالذهبي (تطابق حرفي مع الكلمة كما في النص)
 * - durationInSeconds: مدة الفيديو، والتوقيتات كلها تتمدد معها تلقائيًا
 */
export type AyahProps = {
  intro: string;
  verse: string;
  reference: string;
  highlightWords: string[];
  durationInSeconds: number;
};

export const defaultAyah: AyahProps = {
  intro: "قال الله تعالى",
  verse:
    "الَّذِينَ آمَنُوا وَتَطْمَئِنُّ قُلُوبُهُمْ بِذِكْرِ اللَّهِ أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ",
  reference: "سورة الرعد • الآية ٢٨",
  highlightWords: ["اللَّهِ"],
  durationInSeconds: 15,
};
