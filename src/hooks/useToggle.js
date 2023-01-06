import { useEffect, useRef, useState } from "react";

const useToggle = () => {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleToggle = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setExpanded(false);
      }
    };

    document.addEventListener("mouseup", handleToggle);
    return () => {
      document.removeEventListener("mouseup", handleToggle);
    };
  }, [ref]);

  return { expanded, setExpanded, ref };
};

export default useToggle;