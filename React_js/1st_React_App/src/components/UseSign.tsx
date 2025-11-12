import { useContext } from "react";
import GlobalUser from "../GlobalUser";

export function useSign() {
  const context = useContext(GlobalUser);
  if (!context) {
    throw new Error("useSign must be used inside SignProvider");
  }
  return context;
}
