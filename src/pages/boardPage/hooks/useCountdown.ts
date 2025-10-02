import { useEffect, useState } from "react";

interface TimeRemaining {
  d: number;
  h: number;
  m: number;
  s: number;
}

export function useCountdown(serverTimeStr?: string) {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    d: 0,
    h: 0,
    m: 0,
    s: 0,
  });

  useEffect(() => {
    // use a fixed server time as requested
    const serverTime = serverTimeStr ?? new Date().toISOString();
    const serverNow = new Date(serverTime);
    const startClient = Date.now();

    function update() {
      const elapsed = Date.now() - startClient;
      const currentServer = new Date(serverNow.getTime() + elapsed);

      const year = currentServer.getUTCFullYear();
      const target = new Date(Date.UTC(year + 1, 0, 1, 0, 0, 0));
      let diffMs = target.getTime() - currentServer.getTime();
      if (diffMs < 0) diffMs = 0;

      const totalSec = Math.floor(diffMs / 1000);
      const d = Math.floor(totalSec / 86400);
      const h = Math.floor((totalSec % 86400) / 3600);
      const m = Math.floor((totalSec % 3600) / 60);
      const s = totalSec % 60;

      setTimeRemaining({ d, h, m, s });
    }

    update();
    const id = window.setInterval(update, 1000);
    return () => window.clearInterval(id);
  }, [serverTimeStr]);

  return timeRemaining;
}