import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import {
  getBoardInfo,
  getBoardList,
  getBoardShare,
  getSharedBoard,
} from "@/apis/board";
import type { BoardListItem, SharedBoardMessage } from "@/types/board";

export function useBoardData(shareUri?: string) {
  const isSharedBoard = Boolean(shareUri);
  const [currentPage, setCurrentPage] = useState(0);
  const [ownerNickname, setOwnerNickname] = useState<string>("닉네임");
  const [boardList, setBoardList] = useState<
    BoardListItem[] | SharedBoardMessage[]
  >([]);
  const [boardTotalElements, setBoardTotalElements] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);

  const { data: sharedBoardData } = useQuery({
    queryKey: ["sharedBoard", shareUri, currentPage],
    queryFn: () => getSharedBoard(shareUri ?? "", currentPage, 10),
    enabled: isSharedBoard && Boolean(shareUri),
  });

  const { data: currentUserBoard } = useQuery({
    queryKey: ["currentUserBoard"],
    queryFn: () => getBoardShare(),
    enabled: !isSharedBoard,
  });

  // prefer route shareUri when present, otherwise use current user's shareUri
  const shareUriFromCurrentUser = useMemo(() => {
    // derive shareUri from possible shapes returned by getBoardShare()
    const maybe = currentUserBoard as unknown as
      | Record<string, unknown>
      | undefined;
    const maybeData = maybe?.data as Record<string, unknown> | undefined;

    return (
      // standard typed shape
      (currentUserBoard as unknown as { data?: { shareUri?: string } })?.data
        ?.shareUri ??
      // top-level or alternative keys
      (maybe && (maybe.shareUri as string | undefined)) ??
      (maybeData && (maybeData.share_uri as string | undefined)) ??
      (maybe && (maybe.share_url as string | undefined))
    );
  }, [currentUserBoard]);

  const computedShareUri = useMemo(() => {
    return shareUri ?? shareUriFromCurrentUser;
  }, [shareUri, shareUriFromCurrentUser]);

  // boardInfo query: fetch automatically when a shareUri (route or current user) exists
  const boardInfoQuery = useQuery({
    queryKey: ["boardInfo", computedShareUri],
    queryFn: ({ queryKey }) => {
      const uri = queryKey[1] as string;
      return getBoardInfo(uri);
    },
    enabled: Boolean(computedShareUri),
  });

  // fetch current user's board list (paginated) when not viewing a shared board
  const { data: currentUserBoardList } = useQuery({
    queryKey: ["currentUserBoardList", currentPage],
    queryFn: () => getBoardList(currentPage, 10, "desc"),
    enabled: !isSharedBoard,
  });

  useEffect(() => {
    // prefer boardInfo name when available (applies to shared and own board)
    const nameFromInfo = boardInfoQuery.data?.data?.name;
    if (nameFromInfo && nameFromInfo !== ownerNickname) {
      setOwnerNickname(nameFromInfo);
    }
  }, [boardInfoQuery.data?.data?.name, ownerNickname]);

  useEffect(() => {
    // handle shared board data
    if (isSharedBoard && sharedBoardData?.data) {
      setBoardList(sharedBoardData.data.content ?? []);
      setTotalPages(sharedBoardData.data.totalPages ?? 1);
      setBoardTotalElements(sharedBoardData.data.totalElements ?? 0);
    }
  }, [isSharedBoard, sharedBoardData]);

  useEffect(() => {
    // handle current user board data
    if (!isSharedBoard && currentUserBoardList) {
      const data = currentUserBoardList.data;
      setBoardList(data.content ?? []);
      setBoardTotalElements(data.totalElements ?? data.content?.length ?? 0);
      setTotalPages(data.totalPages ?? 1);
    }
  }, [isSharedBoard, currentUserBoardList]);

  return {
    currentPage,
    setCurrentPage,
    ownerNickname,
    boardList,
    boardTotalElements,
    totalPages,
    sharedBoardData,
    currentUserBoard,
    boardInfoQuery,
    isSharedBoard,
  };
}
