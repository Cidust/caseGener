import { useState } from "react";
import { ListItem } from "../interfaces";
import UserTabs from "./UserTabs";
import Mist from "./Mist";

export default function Main() {
  const [user, setUser] = useState<ListItem>({
    name: "",
    age: "",
    mainAsk: "",
    nowHis: "",
    historyHis: "",
    singleHis: "",
    marriageHis: "",
    familyHis: "",
    personalCheck: "",
    additionalCheck: "",
    westMedi: "",
    eastMedi: "",
    diagnosis: "",
    prescription: "",
    composition: "",
    medicalAdvice: "",
  });

  const [auth, setAuth] = useState<boolean>(false);

  const handleSetAuth = (val: boolean) => {
    setAuth(val);
  };

  const handleSetUser = (val: ListItem) => {
    setUser(val);
  };

  return (
    <div className="mt-4 flex container mx-auto columns-3xs gap-8">
      <UserTabs
        user={user}
        auth={auth}
        setAuth={handleSetAuth}
        setUser={handleSetUser}
      ></UserTabs>
      <Mist auth={auth} setAuth={handleSetAuth}></Mist>
    </div>
  );
}
