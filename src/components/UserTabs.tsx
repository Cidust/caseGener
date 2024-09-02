import { Typography } from "antd";
import { ListItem } from "../interfaces";
const { Paragraph, Text, Title } = Typography;

function createText(key: string, value: string) {
  return (
    <Text copyable key={key} className="block m-1">
      {value + "："}
    </Text>
  );
}

export default function UserTabs({ user }: { user: ListItem }) {
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
        模拟病例：请点击下方按钮进行猜谜后生成
      </Title>
      <Text type="secondary" className="block m-1">
        标题上的复制按钮可以复制全部，每个文本后的复制按钮可以复制单独的一段
      </Text>{" "}
      <Text type="warning" className="block m-1">
        声明：本模拟病例内容由大模型随机生成，与患者真实情况无关
      </Text>
      <Paragraph>
        {Object.entries(user).map(([key, value]) => createText(key, value))}
      </Paragraph>
    </div>
  );
}
