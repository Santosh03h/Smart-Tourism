import React, { useState, useRef, useEffect } from 'react';
import MainLayout from '../layouts/MainLayout';
import ChatBubble from '../components/ChatBubble';
import DemoBadge from '../components/DemoBadge';
import API from '../services/api';
import { Bot, Send, Sparkles, Shield, RefreshCw } from 'lucide-react';

const SafetyAssistant = () => {
  const [messages, setMessages] = useState([
    {
      id: 'm1',
      isBot: true,
      text: 'Hello! I am your AI Safety Assistant. How can I assist with your trip safety, routes, or local travel guidance today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [inputMsg, setInputMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const sampleQuestions = [
    'Is this route safe?',
    'What should I do during bad weather?',
    'Where is the safest route?',
    'What should I carry for this trip?'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (textToSend) => {
    const query = textToSend || inputMsg;
    if (!query.trim()) return;

    const userMessage = {
      id: `u_${Date.now()}`,
      isBot: false,
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    if (!textToSend) setInputMsg('');
    setLoading(true);

    try {
      const { data } = await API.post('/ai/chat', { message: query });
      const botReply = {
        id: `b_${Date.now()}`,
        isBot: true,
        text: data?.reply || 'Based on current data, your route and destination are in low-risk parameters. Keep emergency contacts handy.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botReply]);
    } catch (err) {
      // Local fallback rule-based reply
      let replyText = 'I am monitoring safety conditions. Avoid isolated areas at night and keep your emergency numbers active.';
      const lower = query.toLowerCase();
      if (lower.includes('route')) replyText = 'The safest route via Boulevard Road is clear with a safety score of 91/100 (Low Risk).';
      else if (lower.includes('weather')) replyText = 'Temperatures will peak at 40°C around 2 PM. Carry water, wear sunscreen, and stay hydrated.';
      else if (lower.includes('carry')) replyText = 'Recommended packing: First aid kit, power bank, water bottle, ID copies, and emergency contact list.';

      setMessages(prev => [
        ...prev,
        {
          id: `b_${Date.now()}`,
          isBot: true,
          text: replyText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout title="AI Safety Assistant">
      <div className="max-w-4xl mx-auto space-y-4 h-[calc(100vh-140px)] flex flex-col">
        {/* Banner */}
        <div className="glass-panel p-4 rounded-3xl border border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600/30 text-blue-400 border border-blue-500/40 flex items-center justify-center">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white">AI Safety Assistant</h2>
                <DemoBadge isLive={false} text="24/7 ACTIVE" />
              </div>
              <p className="text-xs text-slate-400">Instant answers for travel safety, emergency precautions, & rerouting</p>
            </div>
          </div>
        </div>

        {/* Chat Log Window */}
        <div className="flex-1 glass-panel p-4 rounded-3xl border border-slate-800 overflow-y-auto space-y-2">
          {messages.map((m) => (
            <ChatBubble key={m.id} message={m.text} isBot={m.isBot} timestamp={m.timestamp} />
          ))}
          {loading && (
            <div className="flex items-center gap-2 text-xs text-slate-400 p-3">
              <RefreshCw className="w-4 h-4 animate-spin text-blue-400" />
              <span>AI Assistant is analyzing travel safety data...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Sample Question Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-400" />
            Suggested:
          </span>
          {sampleQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-blue-600/30 text-slate-300 hover:text-white border border-slate-700/60 text-xs transition-all"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputMsg}
            onChange={(e) => setInputMsg(e.target.value)}
            placeholder="Ask about route safety, weather precautions, packing..."
            className="flex-1 px-4 py-3 rounded-2xl bg-slate-800/80 border border-slate-700/80 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            disabled={loading || !inputMsg.trim()}
            className="p-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold disabled:opacity-50 transition-all shadow-lg shadow-blue-600/20"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </MainLayout>
  );
};

export default SafetyAssistant;
