import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LetterPaperBg from "@/assets/bg_letterpaper.webp";
import SideDiskIcon from "@/assets/ic_side_disk.svg?react";
import StampWebp from "@/assets/ic_stamp.webp";
import { NavigationButton } from "@/components/ui/navigation-button";
import { PageLayout } from "@/components/ui/page-layout";
import { SendAlert } from "@/pages/letterPage/components/send-alert";
import LetterStep from "../components/letter-step";

export default function LetterWritePage() {
  const navigate = useNavigate();
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [letterContent, setLetterContent] = useState("");
  const [authorName, setAuthorName] = useState("");

  const isFormValid =
    letterContent.trim() !== "" &&
    authorName.trim() !== "" &&
    letterContent.length <= 50 &&
    authorName.length <= 18;

  const handleSendClick = () => {
    if (isFormValid) {
      setIsAlertOpen(true);
    }
  };

  const handleConfirm = () => {
    setIsAlertOpen(false);
    navigate("/letter/complete");
  };

  const handleCancel = () => {
    setIsAlertOpen(false);
  };

  return (
    <>
      <PageLayout
        title={
          <>
            노래랑 함께 보낼 <br />
            마음을 작성해봐요.
          </>
        }
        bottomContent={
          <NavigationButton
            active={isFormValid}
            disabled={!isFormValid}
            aria-disabled={!isFormValid}
            className="w-full"
            onClick={handleSendClick}
          >
            전송
          </NavigationButton>
        }
        className="p-4"
      >
        <LetterStep
          step={2}
          className="dynamic-padding-top absolute top-0 right-0 p-4"
        />

        <SideDiskIcon className="dynamic-bottom-position absolute right-0" />

        {/* 음악 앨범 사진 */}
        <div className="-translate-y-[90.625px] dynamic-bottom-position absolute right-0 h-[108.75px] w-[108.75px] overflow-hidden rounded-md bg-gray-300">
          <img
            src="/path/to/album-image.jpg"
            alt="앨범 커버"
            className="h-full w-full object-cover"
          />
        </div>

        <img
          src={LetterPaperBg}
          alt=""
          aria-hidden="true"
          className="dynamic-bottom-position absolute z-10 select-none"
        />

        {/* 편지지 내부 콘텐츠 영역 */}
        <div className="dynamic-bottom-position absolute z-20 h-[294px] w-[294px] px-5 py-5">
          {/* To. 닉네임 - 좌측 상단 */}
          <div className="absolute top-5 left-5 font-letter text-black text-xs">
            To. 닉네임
          </div>
          <img
            src={StampWebp}
            alt=""
            aria-hidden="true"
            className="absolute top-2 right-[31px] z-30 h-auto w-auto mix-blend-multiply"
          />

          <div className="mb-4 flex justify-end">
            <div className="h-[26px] w-[26px] overflow-hidden rounded-sm bg-gray-300">
              <img
                src="/path/to/album-image.jpg"
                alt="앨범 커버"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* 편지 내용 입력 영역 */}
          <textarea
            className="scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent h-48 w-full resize-none overflow-y-auto border-none bg-transparent font-letter text-black leading-relaxed outline-none placeholder:text-gray-600"
            style={{ fontSize: "14.5px" }}
            placeholder="여기를 눌러 편지를 작성해주세요"
            value={letterContent}
            onChange={(e) => setLetterContent(e.target.value)}
            aria-label="편지 내용"
            name="letterContent"
            maxLength={50}
          />

          {/* From 작성자 입력 영역 - 편지지 하단에서 20px 위 */}
          <div className="absolute bottom-5 left-5 flex items-center font-letter">
            <span className="mr-2 text-black" style={{ fontSize: "14.5px" }}>
              From.
            </span>
            <input
              type="text"
              className="border-none bg-transparent font-letter text-black outline-none placeholder:text-gray-600"
              style={{
                fontSize: "12px",
                borderBottom: "1px solid #333333",
                minWidth: "60px",
              }}
              placeholder="작성자"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              aria-label="작성자"
              name="authorName"
              autoComplete="name"
              required
              maxLength={18}
              onInput={(e) => {
                const target = e.target as HTMLInputElement;
                const canvas = document.createElement("canvas");
                const context = canvas.getContext("2d");
                if (context) {
                  const computedStyle = window.getComputedStyle(target);
                  context.font = `${computedStyle.fontStyle} ${computedStyle.fontVariant} ${computedStyle.fontWeight} ${computedStyle.fontSize} ${computedStyle.fontFamily}`;
                  const textWidth = context.measureText(
                    target.value || target.placeholder
                  ).width;
                  target.style.width = `${Math.max(60, textWidth + 10)}px`;
                }
              }}
            />
          </div>
        </div>
      </PageLayout>

      <SendAlert
        isOpen={isAlertOpen}
        onClose={handleCancel}
        onConfirm={handleConfirm}
      />
    </>
  );
}
