import { useCallback, useState } from "preact/hooks";

export function useToggle(initialValue = 0) {
  const [value, setValue] = useState(initialValue);

  const toggleValue = useCallback(() => {
    setValue((value) => (value ? 0 : 1));
  }, []);

  return [value, toggleValue] as const;
}
