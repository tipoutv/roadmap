"use client";

import { useEffect, useState } from "react";
import { getLfgCount } from "@/lib/db/lfg";

export function useLfgCount() {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    let mounted = true;

    getLfgCount().then((c) => {
      if (mounted) setCount(c);
    });

    return () => {
      mounted = false;
    };
  }, []);

  return count;
}
