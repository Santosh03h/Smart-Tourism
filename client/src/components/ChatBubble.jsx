import React from 'react';
import { Bot, User } from 'lucide-react';

const ChatBubble = ({ message, isBot = true, timestamp }) => {
  return (
    <div className={`flex gap-3 mb-4 ${isBot ? 'justify-start' : 'justify-end'}`}>
      {isBot && (
        <div className="w-8 h-8 rounded-full bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-blue-400 shrink-0">
          <Bot className="w-4 h-4" />
        </div>
      )}

      <div className={`max-w-[80%] rounded-2xl p-4 text-xs md:text-sm leading-relaxed ${
        isBot 
          ? 'glass-panel border border-slate-800 text-slate-200 rounded-tl-none' 
          : 'bg-blue-600 text-white rounded-tr-none shadow-md shadow-blue-600/20'
      }`}>
        <p className="whitespace-pre-wrap">{message}</p>
        <span className={`block text-[10px] mt-1.5 ${isBot ? 'text-slate-500' : 'text-blue-200 text-right'}`}>
          {timestamp || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>

      {!isBot && (
        <div className="w-8 h-8 rounded-full bg-teal-600/30 border border-teal-500/40 flex items-center justify-center text-teal-400 shrink-0">
          <User className="w-4 h-4" />
        </div>
      )}
    </div>
  );
};

export default ChatBubble;
