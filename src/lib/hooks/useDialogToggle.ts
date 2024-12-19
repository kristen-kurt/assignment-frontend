import { useState } from "react";

export default function useDialogToggle<T>() {
  const [shouldDialogShow, setShouldDialogShow] = useState(false);
  const [propsData, setPropsData] = useState<T | null>(null);
  const closeDialog = () => {
    setPropsData(null);
    setShouldDialogShow(false);
  };
  const openDialog = (data?: T) => {
    if (data) setPropsData(data);
    setShouldDialogShow(true);
  };
  return [shouldDialogShow, openDialog, closeDialog, propsData] as [
    boolean,
    (data?: T) => void,
    () => void,
    T | null
  ];
}
