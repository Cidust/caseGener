import { Button, Input, message, Modal, Typography } from "antd";
import { useState } from "react";
import { HTTP } from "../utils/fetchs";
import { BackEndMist } from "../interfaces";

const { Text } = Typography;

export default function Mist({
  auth,
  setAuth,
}: {
  auth: boolean;
  setAuth: (val: boolean) => void;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mistData, setMistData] = useState<BackEndMist>({
    mist: "",
    key: 0,
  });
  const [ans, setAns] = useState<string>("");

  const showModal = () => {
    setIsModalOpen(true);

    fetchMist();
  };

  const handleOk = async () => {
    if (ans.length !== 1) {
      message.info("答案只有一个汉字哦");
      return;
    }

    const ansHash = await stringToHashHex(ans);

    const result = await HTTP("/vertify", "POST", {
      ans: ansHash,
      key: mistData.key,
    });

    if (result.status !== 200) {
      message.error("没猜对(╥﹏╥..)");
    } else {
      message.success("猜对啦(≧▽≦*)");

      const data = await result.json();
      const coke = data.coke;

      localStorage.setItem("coke", coke);

      setAuth(true);
      setIsModalOpen(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAns(event.target.value);
  };

  const stringToHashHex = async (str: string) => {
    const encoder = new TextEncoder();

    const myAns = encoder.encode(str);

    const myAnsHash = await crypto.subtle.digest("SHA-256", myAns);

    const hashArray = Array.from(new Uint8Array(myAnsHash));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    return hashHex;
  };

  const fetchMist = () => {
    HTTP("/need", "GET").then(async (res) => {
      const data = await res.json();

      let str = "";

      data.mist.forEach((code: number) => {
        str += String.fromCodePoint(code);
      });

      setMistData({ mist: str, key: data.key });
    });
  };

  return (
    <>
      <Button type="primary" onClick={showModal} disabled={auth}>
        开始猜谜
      </Button>
      <Modal
        title="打一字"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="确定"
        cancelText="取消"
      >
        <Text className="w-full h-5/6 block m-2">
          {"谜面：" + mistData.mist}
        </Text>
        <Input
          count={{
            show: true,
            max: 1,
          }}
          maxLength={1}
          placeholder="请输入您的答案"
          value={ans}
          onChange={handleInputChange}
        ></Input>
      </Modal>
    </>
  );
}
