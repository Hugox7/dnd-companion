import { userContext } from "@/app/app/template"
import { useContext } from "react"

export const useCurrentUser = () => {
  const user = useContext(userContext);
  return user;
}
