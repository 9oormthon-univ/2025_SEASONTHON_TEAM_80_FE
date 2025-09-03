import bgLanding from "@/assets/bg_landing.webp";
import bgPaper from "@/assets/bg_paper.webp";
import bgPaperLP from "@/assets/bg_paper_lp.webp";

export const routeBg: Record<string, string> = {
  "/": bgLanding,
  "/join/nickname": bgPaper,
  "/join/complete": bgPaper,
  "/letter/guide": bgPaper,
  "/letter/select": bgPaperLP,
  "/letter/write": bgPaper,
  "/letter/complete": bgPaper,
};
