interface LetterStepProps {
  step: 1 | 2;
  className?: string;
  style?: React.CSSProperties;
}

const COMMON_STYLES = {
  container: "relative w-12 h-7",
  text: "absolute text-center text-red-100 text-[10px] font-semibold leading-3 tracking-tight",
  dot: "absolute w-2 h-2 bg-red-100/40 rounded-full",
  stepBox:
    "absolute flex h-4 w-4 items-center justify-center rounded-md bg-red-100",
  stepNumber: "text-white text-xs font-primary leading-none",
  line: "absolute h-px w-1 border border-red-100/40",
} as const;

const STEP_DATA = [
  {
    step: 1,
    label: "노래 선정",
    textPosition: "left-0 top-4",
    dotPosition: "left-9 top-1",
    stepBoxPosition: "left-2 top-0",
    lines: ["left-6 top-2", "left-8 top-2"],
  },
  {
    step: 2,
    label: "편지 작성",
    textPosition: "left-3 top-4",
    dotPosition: "left-0 top-1",
    stepBoxPosition: "left-5 top-0",
    lines: ["left-2 top-2", "left-4 top-2"],
  },
] as const;

export default function LetterStep({
  step = 1,
  className,
  style,
}: LetterStepProps) {
  const stepData = STEP_DATA[step - 1];

  return (
    <div className={`flex flex-col items-center ${className}`} style={style}>
      <div className={COMMON_STYLES.container}>
        <div className={`${COMMON_STYLES.text} ${stepData.textPosition}`}>
          {stepData.label}
        </div>

        <div className={`${COMMON_STYLES.dot} ${stepData.dotPosition}`} />

        <div className={`${COMMON_STYLES.stepBox} ${stepData.stepBoxPosition}`}>
          <span className={COMMON_STYLES.stepNumber}>{stepData.step}</span>
        </div>

        {stepData.lines.map((linePosition) => (
          <div
            key={linePosition}
            className={`${COMMON_STYLES.line} ${linePosition}`}
          />
        ))}
      </div>
    </div>
  );
}
