import React, { useRef, useEffect } from "react";

// マウントされているか判定
// 参考:https://usehooks-ts.com/react-hook/use-is-mounted
export function useIsMounted() {
  const isMounted = useRef<boolean>(false);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      // アンマウントされた場合のみ実行
      isMounted.current = false;
    };
  }, []);

  return isMounted;
}
