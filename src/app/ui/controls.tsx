"use client";
import Image from "next/image";
import { useState } from "react";

interface ControlsProps {
  onSubmit: (newMessage: string, newShouldGo: boolean) => void;
  addMessage: (message: string, type: string) => void;
  setResponseReceived: (received: boolean) => void; 
}

export default function Controls({ onSubmit, addMessage, setResponseReceived }: ControlsProps) {
  const [loading, setIsLoading] = useState(false)
  async function handleSubmit(e: any) {
    e.preventDefault();
    setIsLoading(true)
    setResponseReceived(false)
    if (e.target[0].value) {
      addMessage(e.target[0].value, 'user')
      const res = await fetch("http://localhost:3001/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: e.target[0].value }),
      });
      const data = await res.json();
      const message = data.message;
      const shouldGo = data.should_go;
      setResponseReceived(true)
      onSubmit(message, shouldGo);
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        style={{
          boxShadow: "0px 0px 5px 1px rgba(255,255,255,1)",
        }}
        placeholder="Type here"
        className="text-[#100A0B] w-full pl-5 rounded-full disabled:bg-gray-500 disabled:cursor-not-allowed"
        disabled={loading}
      ></input>
      <button
        style={{
          boxShadow: "0px 0px 5px 1px rgba(255,255,255,1)",
        }}
        disabled={loading}
        className="bg-white rounded-full box-border p-6 flex place-content-center relative disabled:bg-gray-500 disabled:cursor-not-allowed"
      >
        <Image
          src="/send.svg"
          alt="send"
          height="25"
          width="25"
          className="absolute left-[calc(50%-12.5px)] top-[calc(50%-12px)]"
        />
      </button>
    </form>
  );
}
