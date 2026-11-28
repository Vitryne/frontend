import StoreService from "@/service/store-service";
import { useEffect, useState } from "react";

export const STORE_NAME_KEY = "vitryne:store-name";

export const useStoreName = () => {
  const [storeName, setStoreName] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem(STORE_NAME_KEY)?.trim();
    if (saved) setStoreName(saved);

    let cancelled = false;

    StoreService()
      .getMyStore()
      .then((store) => {
        const name = store.name?.trim();
        if (cancelled || !name) return;

        localStorage.setItem(STORE_NAME_KEY, name);
        setStoreName(name);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, []);

  return storeName;
};
