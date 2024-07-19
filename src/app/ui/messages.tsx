"use client";

import clsx from "clsx";
import { useMemo, useState } from "react";

interface MessagesProps {
  messages: { message: string; author: string }[];
  shouldGo: boolean;
  responseReceived: boolean;
}
export default function Messages({
  responseReceived,
  shouldGo,
  messages,
}: MessagesProps) {
  const hasResult = useMemo(() => {
    return responseReceived && messages.length > 2;
  }, [responseReceived, messages]);

  return (
    <div className="h-[550px] rounded-3xl bg-[#3B0086] p-2 opacity-70">
      <div className="h-full flex flex-col gap-3 overflow-y-auto p-1 ">
        {messages.map((message) => (
          <div
            key={message.message}
            className={clsx(" text-white rounded-3xl text-sm p-3 ", {
              "rounded-bl-none bg-[#B43E8F]": message.author === "system",
              "rounded-br-none bg-[#A544AE]": message.author === "user",
            })}
          >
            {message.message}
          </div>
        ))}
        {responseReceived && <div className="w-full h-full text-[50px] text-center">{shouldGo ? "✅" : "❌"}</div>}
      </div>
    </div>
  );
}
