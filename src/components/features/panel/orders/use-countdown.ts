import { useEffect, useState } from "react";

const getRemainingSeconds = (deadline: string) =>
  Math.max(0, Math.floor((new Date(deadline).getTime() - Date.now()) / 1000));

export const useCountdown = (deadline: string) => {
  const [remaining, setRemaining] = useState(() =>
    getRemainingSeconds(deadline),
  );

  useEffect(() => {
    setRemaining(getRemainingSeconds(deadline));

    const interval = setInterval(() => {
      setRemaining(getRemainingSeconds(deadline));
    }, 1000);

    return () => clearInterval(interval);
  }, [deadline]);

  return remaining;
};