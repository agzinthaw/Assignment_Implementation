import React, { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import axios from "axios";

const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { role: "bot", text: "Hello! I'm your AI assistant. How can I help you today?" },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const handleSend = async () => {
    if (!message.trim() || isLoading) return;

    const userMessage = { role: "user", text: message };
    setChatHistory((prev) => [...prev, userMessage]);
    setMessage("");
    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:5001/api/chat", {
        message: userMessage.text,
      });

      const botMessage = { role: "bot", text: response.data.reply };
      setChatHistory((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Chat Error:", error);
      setChatHistory((prev) => [
        ...prev,
        { role: "bot", text: "Sorry, I'm having trouble connecting to the brain. Please try again later!" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 h-[500px] bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden flex flex-col transition-all duration-300 ease-in-out transform origin-bottom-right scale-100 opacity-100 animate-in fade-in zoom-in">
          {/* Header */}
          <div className="bg-[#248b7c] p-4 text-white flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Bot size={24} className="text-white" />
              <span className="font-semibold">AI Assistant</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 p-1 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-transparent">
            {chatHistory.map((chat, index) => (
              <div
                key={index}
                className={`flex ${chat.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    chat.role === "user"
                      ? "bg-[#248b7c] text-white rounded-tr-none"
                      : "bg-gray-100 text-gray-800 rounded-tl-none border border-gray-200"
                  } shadow-sm`}
                >
                  <p className="whitespace-pre-line">{chat.text}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 p-3 rounded-2xl rounded-tl-none border border-gray-200 shadow-sm flex gap-1">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-100 bg-white/50 backdrop-blur-md">
            <div className="relative flex items-center">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type your message..."
                className="w-full pl-4 pr-12 py-3 bg-gray-100/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#248b7c] focus:border-transparent transition-all placeholder:text-gray-400 text-gray-700"
              />
              <button
                onClick={handleSend}
                disabled={!message.trim() || isLoading}
                className={`absolute right-2 p-2 rounded-lg transition-all ${
                  message.trim() && !isLoading
                    ? "text-[#248b7c] hover:bg-[#248b7c]/10"
                    : "text-gray-300"
                }`}
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-95 ${
          isOpen ? "bg-white text-[#248b7c] rotate-90" : "bg-[#248b7c] text-white"
        }`}
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-white"></span>
          </span>
        )}
      </button>
    </div>
  );
};

export default AIChat;
