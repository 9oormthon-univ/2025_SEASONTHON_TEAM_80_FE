import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getBoardInfo } from "@/apis/board";
import { PageLayout } from "@/components/ui/page-layout";
import { SearchInput } from "@/components/ui/search-input";
import LetterStep from "../components/letter-step";

interface LetterGuidePageProps {
  nickname?: string;
}

export default function LetterGuidePage({
  nickname = "닉네임",
}: LetterGuidePageProps) {
  const navigate = useNavigate();
  const { shareUri } = useParams();
  const location = useLocation();

  // fetch board info when shareUri is present to get the owner's name
  const boardInfoQuery = useQuery({
    queryKey: ["boardInfo", shareUri],
    queryFn: () => getBoardInfo(shareUri ?? ""),
    enabled: Boolean(shareUri),
  });

  const computedNickname =
    boardInfoQuery.data?.data?.name ?? (nickname as string);

  const isJoinPage = location.pathname.startsWith("/join/");
  const isFirstTimeJoin = location.pathname === "/join/letter/guide";

  const handleSearchClick = () => {
    if (isJoinPage) {
      if (isFirstTimeJoin) {
        navigate("/join/letter/search");
      } else {
        navigate(
          shareUri ? `/join/letter/search/${shareUri}` : "/join/letter/search"
        );
      }
    } else {
      navigate(shareUri ? `/letter/search/${shareUri}` : "/letter/search");
    }
  };

  return (
    <PageLayout
      title={
        isFirstTimeJoin ? (
          <>
            새해를 맞이하는 <br />
            나만의 플레이 리스트를 <br /> 만들어 볼까요?
          </>
        ) : isJoinPage ? (
          <>
            새해를 맞이하는 <br />
            나만의 플레이 리스트를 <br /> 만들어 볼까요?
          </>
        ) : (
          <>
            {computedNickname} 님께 <br />
            새해 기념 어떤 노래를
            <br />
            들려드릴까요?
          </>
        )
      }
    >
      <LetterStep
        step={1}
        className="absolute top-0 right-0 pt-26 sm:pt-36 md:pt-40"
      />

      <p className="mt-8 text-lg text-red-200">
        앨범 커버가 대표적으로 보여요!
      </p>
      <button type="button" onClick={handleSearchClick}>
        <SearchInput className="mt-3" />
      </button>
    </PageLayout>
  );
}
