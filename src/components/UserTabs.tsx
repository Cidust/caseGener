import { Button, message, Typography } from "antd";
import { ListItem } from "../interfaces";
import { HTTP_VERTIF } from "../utils/fetchs";
import { labelMapping } from "../utils/utils";
const { Paragraph, Text, Title } = Typography;

function createLabeledText(label: string, value: string) {
  // 使用映射表获取中文标签，如果没有找到则使用英文键名
  const chineseLabel = labelMapping[label as keyof object] || label;
  return (
    <div key={chineseLabel} className="flex items-center mb-2">
      <Text strong>{chineseLabel}：</Text>
      {createText(chineseLabel, value)}
    </div>
  );
}

function createText(key: string, value: string) {
  return (
    <Text copyable key={key} className="block m-1">
      {value}
    </Text>
  );
}

export default function UserTabs({
  user,
  auth,
  setAuth,
  setUser,
}: {
  user: ListItem;
  auth: boolean;
  setAuth: (val: boolean) => void;
  setUser: (val: ListItem) => void;
}) {
  const askGener = async () => {
    if (!localStorage.getItem("coke")) {
      message.error("请先猜谜");
      setAuth(false);
      return;
    } else {
      const response = await HTTP_VERTIF(
        "/gener",
        localStorage.getItem("coke") as string
      );

      const result = await response.json();
      setUser(result.content);
    }
  };

  return (
    <div>
      <Title
        level={3}
        copyable={{
          text: () =>
            Object.values(user)
              .map((value) => value)
              .join("\n"),
        }}
      >
        模拟病例：请点击右侧按钮进行猜谜后生成
      </Title>
      <Text type="secondary" className="block m-1">
        标题上的复制按钮可以复制全部信息，每个文本后的复制按钮可以复制单独的一段
      </Text>
      <Text type="warning" className="block m-1">
        声明：本模拟病例内容由大模型随机生成，仅作模拟使用，与真实患者情况无关
      </Text>
      <Paragraph>
        {Object.entries(user).map(([key, value]) =>
          createLabeledText(key, value)
        )}
      </Paragraph>
      <Button type="primary" disabled={!auth} onClick={askGener}>
        生成信息
      </Button>
    </div>
  );
}
