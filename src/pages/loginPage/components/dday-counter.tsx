// 디데이 계산 컴포넌트
const DDayCounter = () => {
  const calculateDDay = () => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const nextNewYear = new Date(currentYear + 1, 0, 1); // 다음 해 1월 1일

    const timeDiff = nextNewYear.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    return daysDiff;
  };

  const daysLeft = calculateDDay();
  const daysStr = daysLeft.toString().padStart(3, "0");

  // 자릿수에 따른 너비 계산
  const getWidth = (days: number) => {
    if (days < 10) return 100;
    if (days < 100) return 110;
    return 120;
  };

  return (
    <div
      style={{
        width: `${getWidth(daysLeft)}px`,
        height: "32px",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderRadius: "4px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "14px",
        fontWeight: "bold",
        color: "rgba(255, 255, 255, 1.0)",
      }}
    >
      새해까지 D-{daysStr}
    </div>
  );
};

export { DDayCounter };
