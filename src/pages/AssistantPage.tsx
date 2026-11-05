import React, { useState, useEffect, useRef } from 'react';
import {
  Send,
  Bot,
  User,
  Sparkles,
  RotateCcw,
  Lightbulb,
  MessageSquare,
  Sprout,
  Droplets,
  ShieldAlert,
  FileText,
} from 'lucide-react';
import { storageService } from '../services/storage';
import { ChatMessage } from '../types';
import { getDemoAssistantReply, PREDEFINED_QUESTIONS } from '../data/demoResponses';

export const AssistantPage: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'pest' | 'irrigation' | 'soil' | 'scheme'>('all');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages(storageService.getChatHistory());
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    storageService.saveChatHistory(newHistory);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const responseData = getDemoAssistantReply(text);
      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: responseData.reply,
        category: responseData.category,
        quickReplies: responseData.quickReplies,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      const finalHistory = [...newHistory, assistantMsg];
      setMessages(finalHistory);
      storageService.saveChatHistory(finalHistory);
      setIsTyping(false);
    }, 700);
  };

  const handleClearChat = () => {
    if (window.confirm('Reset conversation history to initial demonstration greeting?')) {
      storageService.saveChatHistory([]);
      const fresh = storageService.getChatHistory();
      setMessages(fresh);
    }
  };

  const filteredPresetQuestions = PREDEFINED_QUESTIONS.filter(
    (q) => selectedFilter === 'all' || q.category === selectedFilter
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-black uppercase tracking-wider bg-gradient-to-r from-emerald-600 to-teal-700 text-white px-3 py-0.5 rounded-full shadow-xs">
              Agronomy Knowledgebase
            </span>
            <span className="text-xs text-emerald-800 font-bold">• Local Pre-computed Expert AI</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            AI Farmer Assistant
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl font-medium">
            Ask questions on crop diseases, drip irrigation durations, organic recipes (Jeevamrutha, Panchagavya),
            and government agricultural schemes (PMKSY, Raitha Siri).
          </p>
        </div>

        <button
          onClick={handleClearChat}
          className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-700 hover:text-slate-950 bg-white border border-emerald-200 rounded-xl hover:bg-emerald-50 transition shadow-xs w-fit"
        >
          <RotateCcw className="w-4 h-4 text-emerald-600" />
          <span>Reset Conversation</span>
        </button>
      </div>

      {/* Prominent Simulated Notice */}
      <div className="p-4 rounded-3xl bg-gradient-to-r from-teal-50 via-emerald-50 to-teal-50 border border-teal-200 flex items-start gap-3.5 text-xs leading-relaxed shadow-xs">
        <div className="p-2 rounded-xl bg-teal-200/60 text-teal-900 flex-shrink-0 mt-0.5">
          <Sparkles className="w-5 h-5 text-teal-700" />
        </div>
        <div>
          <span className="font-black text-teal-950 text-sm">
            Demonstration Mode Assistant:
          </span>
          <p className="text-teal-900/90 mt-0.5 font-medium">
            This conversational interface is running locally with pre-computed agronomic datasets based on UAS Bangalore and ICAR guidelines. It is completely offline and does not connect to external LLMs or charge paid credits.
          </p>
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7">
        {/* Left Column: Preset Questions Library (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-sm">
            <div className="flex items-center justify-between mb-3.5">
              <span className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                <span>Suggested Questions</span>
              </span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-extrabold px-2.5 py-0.5 rounded-full">
                Click to Ask
              </span>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-1.5 mb-4 text-[11px] font-black">
              {[
                { id: 'all', label: 'All', icon: MessageSquare },
                { id: 'pest', label: 'Crops', icon: Sprout },
                { id: 'irrigation', label: 'Water', icon: Droplets },
                { id: 'soil', label: 'Soil', icon: ShieldAlert },
                { id: 'scheme', label: 'Schemes', icon: FileText },
              ].map((filter) => {
                const Icon = filter.icon;
                return (
                  <button
                    key={filter.id}
                    onClick={() => setSelectedFilter(filter.id as any)}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-xl transition ${
                      selectedFilter === filter.id
                        ? 'bg-gradient-to-r from-emerald-800 to-forest-800 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <Icon className="w-3 h-3" />
                    <span>{filter.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Questions list */}
            <div className="space-y-2.5 max-h-[480px] overflow-y-auto pr-1">
              {filteredPresetQuestions.map((qa, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(qa.question)}
                  className="w-full text-left p-3.5 rounded-2xl border border-slate-200/80 hover:border-emerald-500 hover:bg-emerald-50/50 transition text-xs font-semibold text-slate-700 hover:text-emerald-950 group flex items-start gap-2.5 shadow-2xs"
                >
                  <span className="p-1 rounded-lg bg-emerald-100 text-emerald-800 group-hover:scale-110 transition flex-shrink-0 mt-0.5">
                    <Lightbulb className="w-3.5 h-3.5" />
                  </span>
                  <span className="line-clamp-2 leading-snug">{qa.question}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Chat Window (8 Cols) */}
        <div className="lg:col-span-8">
          <div className="bg-white rounded-3xl border border-emerald-100 shadow-sm flex flex-col h-[620px] overflow-hidden">
            {/* Chat Messages Body */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-gradient-to-b from-[#F6FAF6] to-white">
              {messages.map((msg) => {
                const isAssistant = msg.sender === 'assistant';
                return (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-3.5 ${
                      isAssistant ? '' : 'flex-row-reverse'
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md ${
                        isAssistant
                          ? 'bg-gradient-to-br from-emerald-800 via-forest-800 to-teal-900 text-emerald-200 ring-2 ring-emerald-200'
                          : 'bg-gradient-to-br from-slate-800 to-slate-900 text-white'
                      }`}
                    >
                      {isAssistant ? (
                        <Bot className="w-5 h-5" />
                      ) : (
                        <User className="w-5 h-5" />
                      )}
                    </div>

                    <div
                      className={`max-w-[85%] rounded-3xl px-5 py-4 shadow-sm ${
                        isAssistant
                          ? 'bg-white border border-emerald-100 text-slate-800'
                          : 'bg-gradient-to-r from-emerald-800 to-forest-800 text-white shadow-md shadow-emerald-900/15'
                      }`}
                    >
                      <div className="text-xs sm:text-sm whitespace-pre-line leading-relaxed font-medium">
                        {msg.text}
                      </div>

                      {/* Quick Replies Chips if Assistant */}
                      {isAssistant && msg.quickReplies && msg.quickReplies.length > 0 && (
                        <div className="mt-3.5 pt-3.5 border-t border-slate-100">
                          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-2">
                            Suggested Inquiries:
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {msg.quickReplies.map((reply, ridx) => (
                              <button
                                key={ridx}
                                onClick={() => handleSendMessage(reply)}
                                className="text-[11px] font-bold bg-emerald-50/80 hover:bg-emerald-100 text-emerald-950 border border-emerald-200 px-3 py-1.5 rounded-xl transition text-left shadow-2xs hover:scale-105"
                              >
                                {reply}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      <div
                        className={`text-[10px] mt-2 font-semibold ${
                          isAssistant ? 'text-slate-400' : 'text-emerald-200'
                        } text-right`}
                      >
                        {msg.timestamp}
                      </div>
                    </div>
                  </div>
                );
              })}

              {isTyping && (
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-emerald-800 to-teal-900 text-emerald-200 flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div className="bg-white border border-emerald-100 rounded-2xl px-5 py-3.5 shadow-xs flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-bounce"></span>
                    <span
                      className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-bounce"
                      style={{ animationDelay: '0.2s' }}
                    ></span>
                    <span
                      className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-bounce"
                      style={{ animationDelay: '0.4s' }}
                    ></span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input Bar with Glowing Send Button */}
            <div className="p-4 bg-white border-t border-slate-200">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2.5"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask about paddy blast, sugarcane watering, Jeevamrutha, PMKSY..."
                  className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition font-medium"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isTyping}
                  className="p-3.5 bg-gradient-to-r from-emerald-700 to-teal-700 hover:from-emerald-600 hover:to-teal-600 disabled:opacity-40 text-white rounded-2xl transition shadow-md shadow-emerald-900/20 flex items-center justify-center"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
              <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 px-1 font-semibold">
                <span>⚡ Predefined answers calibrated for Mandya / Southern Karnataka</span>
                <span>Demo Assistant v1.0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
