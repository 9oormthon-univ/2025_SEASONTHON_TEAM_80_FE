import { useCallback, useEffect, useRef, useState } from "react";

export function useLayoutCalculation() {
  const shelfRef = useRef<HTMLImageElement | null>(null);
  const frameRef = useRef<HTMLImageElement | null>(null);
  const shelfWrapperRef = useRef<HTMLDivElement | null>(null);
  const bottomGroupRef = useRef<HTMLDivElement | null>(null);

  const [shiftPx, setShiftPx] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [contentLeft, setContentLeft] = useState<number>(0);
  const [screenWidth, setScreenWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 400
  );
  const [bottomGroupHeight, setBottomGroupHeight] = useState<number>(0);
  const [frameCenter, setFrameCenter] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const computeShift = useCallback(() => {
    const img = shelfRef.current;
    const wrap = shelfWrapperRef.current;
    if (!img || !wrap) return;
    const rect = img.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    const shiftPct = 6;
    const shiftX = Math.round((rect.width * shiftPct) / 100);
    const shiftY = Math.round((rect.height * shiftPct) / 100);

    // update screen width
    setScreenWidth(window.innerWidth);

    // estimate width of album grid based on screen size
    const currentScreenWidth = window.innerWidth;
    const scale =
      currentScreenWidth <= 400
        ? Math.max(0.8, (currentScreenWidth / 400) * 0.9)
        : 1;
    const ALBUM_MAX_X = 265 * scale;
    const ALBUM_WIDTH = 60; // placeholder width used in layout
    const contentWidth = ALBUM_MAX_X + ALBUM_WIDTH;

    // center the album grid across the full shelf width
    const leftOffset = Math.max(0, Math.round((rect.width - contentWidth) / 2));

    setShiftPx({ x: shiftX, y: shiftY });
    setContentLeft(leftOffset);
  }, []);

  const computeFrameCenter = useCallback(() => {
    const img = frameRef.current;
    if (!img) return;
    const rect = img.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    setFrameCenter({ x: centerX, y: centerY });
  }, []);

  useEffect(() => {
    computeShift();
    computeFrameCenter();
    window.addEventListener("resize", computeShift);
    window.addEventListener("resize", computeFrameCenter);
    return () => {
      window.removeEventListener("resize", computeShift);
      window.removeEventListener("resize", computeFrameCenter);
    };
  }, [computeShift, computeFrameCenter]);

  // measure bottom group's height and update padding
  useEffect(() => {
    const el = bottomGroupRef.current;
    if (!el) return;

    const update = () =>
      setBottomGroupHeight(el.getBoundingClientRect().height);

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);

    return () => {
      ro.disconnect();
    };
  }, []);

  // adjust positions based on screen width
  const getAdjustedPositions = () => {
    const ORIGINAL_POS = [
      { id: 1, x: 0, y: 10 },
      { id: 2, x: 85, y: 10 },
      { id: 3, x: 175, y: 10 },
      { id: 4, x: 265, y: 10 },
      { id: 5, x: 0, y: 102 },
      { id: 6, x: 85, y: 102 },
      { id: 7, x: 175, y: 102 },
      { id: 8, x: 265, y: 102 },
      { id: 9, x: 0, y: 200 },
      { id: 10, x: 265, y: 200 },
      { id: 11, x: 0, y: 290 },
      { id: 12, x: 265, y: 290 },
    ];

    if (screenWidth <= 400) {
      // reduce spacing for small screens
      const scale = Math.max(0.8, (screenWidth / 400) * 0.9); // minimum 80% scale
      return ORIGINAL_POS.map((pos) => ({
        ...pos,
        x: Math.round(pos.x * scale),
        y: Math.round(pos.y * scale),
      }));
    }
    return ORIGINAL_POS;
  };

  return {
    shelfRef,
    frameRef,
    shelfWrapperRef,
    bottomGroupRef,
    shiftPx,
    contentLeft,
    screenWidth,
    bottomGroupHeight,
    frameCenter,
    computeShift,
    computeFrameCenter,
    getAdjustedPositions,
  };
}