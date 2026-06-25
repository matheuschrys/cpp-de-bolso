import { useCallback, useEffect, useState } from "react";
import { readLocation, toHash, type AppLocation } from "../app/routes";

export const useStudyLocation = () => {
  const [location, setLocation] = useState<AppLocation>(readLocation);

  useEffect(() => {
    const syncLocation = () => setLocation(readLocation());
    window.addEventListener("hashchange", syncLocation);
    return () => window.removeEventListener("hashchange", syncLocation);
  }, []);

  const navigate = useCallback((next: AppLocation) => {
    const hash = toHash(next);
    if (window.location.hash !== hash) window.location.hash = hash;
    setLocation(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return { location, navigate };
};
