import { URL } from "./utils";
export const HTTP = (
  path: string,
  method: string = "GET",
  content?: object
) => {
  const allURL = URL + path;
  const options: RequestInit = {};

  if (content && method !== "GET") {
    options.body = JSON.stringify(content);
    options.headers = {
      "Content-Type": "application/json",
    };
    options.method = method;
  }

  return fetch(allURL, options);
};

export const HTTP_VERTIF = (path: string, token?: string) => {
  const allURL = URL + path;
  return fetch(allURL, { headers: { Authorization: `Bearer ${token}` } });
};
