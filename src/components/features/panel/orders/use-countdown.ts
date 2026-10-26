import { useEffect, useState } from "react";

export const getRemainingSeconds = (deadline: string, now = Date.now()) =>
  Math.max(0, Math.floor((new Date(deadline).getTime() - now) / 1000));

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

export const useNow = () => {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);

    return () => clearInterval(interval);
  }, []);

  return now;
};