import { ans } from "./mist";
import crypto from "crypto";
import { content, system } from "./prompt";

export function ansToAnsHash(tempKey: number) {
  const myHash = crypto.createHash("sha256");
  const ansSHA = myHash.update(ans[tempKey]).digest("hex");

  return ansSHA;
}

export async function getAccessToken() {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: "DvZowzAp2Iw75hxUlUFXREEJ",
      client_secret: "NgVDkYMlp4qnbR1X4yPpjWs9ifuZYgXy",
    }),
  };

  const data = await fetch("https://aip.baidubce.com/oauth/2.0/token", options);
  const dataJson: any = await data.json();
  return dataJson.access_token;
}

export async function askGener() {
  const accessToken = await getAccessToken();

  const url = `https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/ernie_speed?access_token=${accessToken}`;

  const payload = {
    messages: [
      {
        role: "user",
        content: content,
        system: system,
      },
    ],
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const result: any = await response.json();

    const regex = /```json([\s\S]*?)```/;

    let match = result.result.match(regex);
    if (match) {
      return JSON.parse(match[1]);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
