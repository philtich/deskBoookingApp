import { useState } from "react";

export const useModal = () => {
  const [isShown, setIsShown] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState(null);

  function toggle(id = null) {
    setIsShown(!isShown);
    setSelectedId(id);
  }

  return {
    isShown,
    toggle,
    selectedId,
  };
};