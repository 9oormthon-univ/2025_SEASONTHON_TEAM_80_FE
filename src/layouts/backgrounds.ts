import bgBoard from "@/assets/bg_board.webp";
import bgLanding from "@/assets/bg_landing.webp";
import bgPaper from "@/assets/bg_paper.webp";
import bgPaperLP from "@/assets/bg_paper_lp.webp";
import { ROUTES } from "@/constants/routes";

export const routeBg: Record<string, string> = {
  [ROUTES.HOME]: bgLanding,
  [ROUTES.JOIN.NICKNAME]: bgPaper,
  [ROUTES.JOIN.GUIDE]: bgPaper,
  [ROUTES.JOIN.GUIDE_WITH_SHARE.replace("/:shareUri", "")]: bgPaper,
  [ROUTES.JOIN.SEARCH]: bgPaper,
  [ROUTES.JOIN.SEARCH_WITH_SHARE.replace("/:shareUri", "")]: bgPaper,
  [ROUTES.JOIN.SELECT]: bgPaper,
  [ROUTES.JOIN.SELECT_WITH_SHARE.replace("/:shareUri", "")]: bgPaper,
  [ROUTES.JOIN.WRITE]: bgPaper,
  [ROUTES.JOIN.WRITE_WITH_SHARE.replace("/:shareUri", "")]: bgPaper,
  [ROUTES.JOIN.COMPLETE]: bgPaper,
  [ROUTES.LETTER.GUIDE.replace("/:shareUri", "")]: bgPaper,
  [ROUTES.LETTER.SELECT.replace("/:shareUri", "")]: bgPaperLP,
  [ROUTES.LETTER.WRITE.replace("/:shareUri", "")]: bgPaper,
  [ROUTES.LETTER.COMPLETE.replace("/:shareUri", "")]: bgPaper,
  [ROUTES.BOARD.replace("/:shareUri", "")]: bgBoard,
};
