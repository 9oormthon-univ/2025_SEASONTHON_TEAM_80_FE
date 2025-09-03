import LetterPaperBg from "@/assets/bg_letterpaper.webp";
import StampWebp from "@/assets/ic_stamp.webp";

interface LetterPaperProps {
  albumImageSrc?: string;
  className?: string;
}

export default function LetterPaper({
  albumImageSrc,
  className = "",
}: LetterPaperProps) {
  return (
    <div className={`relative ${className}`}>
      {/* 편지지 배경 */}
      <img 
        src={LetterPaperBg} 
        alt="편지지 배경" 
        className="z-10"
      />

      {/* 편지지 내부 콘텐츠 영역 - 디버깅용 배경색 추가 */}
      <div className="absolute top-0 left-0 z-20 h-[294px] w-[294px] bg-red-100 bg-opacity-50 px-5 py-5">
        {/* 스탬프 아이콘 - 우측 상단 모서리 */}
        <img
          src={StampWebp}
          alt="스탬프"
          className="absolute top-2 right-[31px] z-30 h-auto w-auto mix-blend-multiply"
        />

        <div className="mb-4 flex justify-end">
          <div className="h-[26px] w-[26px] overflow-hidden rounded-sm bg-gray-300">
            <img
              src={albumImageSrc || "/path/to/album-image.jpg"}
              alt="앨범 커버"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
