import { useState } from "react";
import { ListItem } from "../interfaces";
import UserTabs from "./UserTabs";
import Mist from "./Mist";

export default function Main() {
  const [user, setUser] = useState<ListItem>({
    name: "姓名",
    age: "年龄",
    mainAsk: "主诉",
    nowHis: "现病史",
    historyHis: "既往史",
    singleHis: "个人史",
    marriageHis: "婚育史",
    familyHis: "家族史",
    personalCheck: "体格检查",
    additionalCheck: "辅助检查",
    westMedi: "西医疾病诊断",
    eastMedi: "中医疾病诊断",
    diagnosis: "证型诊断",
    prescription: "用方",
    composition: "药物组成",
    medicalAdvice: "医嘱",
  });

  const [ans, setAns] = useState<string>("");

  return (
    <div className="mt-4 flex container mx-auto columns-3xs gap-8">
      <UserTabs user={user}></UserTabs>
      <Mist ans={ans}></Mist>
    </div>
  );
}
