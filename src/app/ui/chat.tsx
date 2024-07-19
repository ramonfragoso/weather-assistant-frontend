"use client";
import { useState } from "react";
import Controls from "./controls";
import Messages from "./messages";

export default function Chat() {
  const [messages, setMessages] = useState([
    {
      message:
        "Hello, tell me your location, and I'll tell you if you can go outside!",
      author: "system",
    },
  ]);
  const [shouldGo, setShouldGo] = useState(false);
  const [responseReceived, setResponseReceived] = useState(false);

  function addMessage(message: string, type: string) {
    setMessages((prev) => [
      ...prev,
      {
        message,
        author: type,
      },
    ]);
  }

  function onSubmit(newMessage: string, newShouldGo: boolean) {
    addMessage(newMessage, "system");
    setShouldGo(newShouldGo);
  }

  return (
    <div className="glass w-full flex flex-col gap-5 max-w-sm border rounded-lg shadow-lg p-5 border-white ">
      <Messages
        shouldGo={shouldGo}
        messages={messages}
        responseReceived={responseReceived}
      />
      <Controls
        addMessage={addMessage}
        onSubmit={onSubmit}
        setResponseReceived={(received: boolean) => setResponseReceived(received)}
      />
    </div>
  );
}
