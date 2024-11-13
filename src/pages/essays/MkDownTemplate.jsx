import { useEffect, useState } from "react";
import { EssayTemplate } from "./EssayTemplate";
import Markdown from "markdown-to-jsx";

export function MkDownTemplate({ url }) {
  const [mkdown, setMkddown] = useState("");
  useEffect(() => {
    const getMarkDown = async () => {
      const res = await fetch(url);
      const json = await res.text();
      setMkddown(json);
    };
    getMarkDown();
  }, [url]);
  return (
    <div>
      <EssayTemplate>
        <Markdown>{mkdown}</Markdown>
      </EssayTemplate>
    </div>
  );
}
