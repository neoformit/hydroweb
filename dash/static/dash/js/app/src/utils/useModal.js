import { useState } from "react";

const useModal = () => {
  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
  };
  return {
    toggle,
    modal,
    setModal
  };
};

export default useModal
