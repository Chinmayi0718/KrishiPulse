import React, { useState, useEffect, useRef } from 'react';
import {
  Send,
  Bot,
  User,
  Sparkles,
  RotateCcw,
  Lightbulb,
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

    // Simulate conversational response generation latency
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
            <span className="text-[11px] font-bold uppercase tracking-wider bg-teal-100 text-teal-800 px-2.5 py-0.5 rounded-full">
              Agronomy Knowledgebase
            </span>
            <span className="text-xs text-slate-500">• Local Pre-computed Expert System</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            AI Farmer Assistant
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Ask questions on crop diseases, drip irrigation durations, organic recipes (Jeevamrutha),
            and government agricultural schemes (PMKSY, Raitha Siri).
          </p>
        </div>

        <button
          onClick={handleClearChat}
          className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition shadow-sm w-fit"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Conversation</span>
        </button>
      </div>

      {/* Prominent Simulated Notice */}
      <div className="p-4 rounded-2xl bg-teal-50/80 border border-teal-200/80 flex items-start gap-3 text-xs leading-relaxed">
        <Sparkles className="w-5 h-5 text-teal-700 flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-teal-950 text-sm">
            Demonstration Mode Assistant:
          </span>
          <p className="text-teal-800 mt-0.5">
            This conversational interface is running locally with pre-seeded agricultural domain knowledge based on UAS Bangalore and ICAR guidelines. It is completely offline and does not connect to commercial LLM APIs or consume paid credits.
          </p>
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Preset Questions Library (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Quick Question Prompts
              </span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                Click to Ask
              </span>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-1.5 mb-3 text-[11px] font-semibold">
              {[
                { id: 'all', label: 'All' },
                { id: 'pest', label: 'Crop Health' },
                { id: 'irrigation', label: 'Irrigation' },
                { id: 'soil', label: 'Soil Care' },
                { id: 'scheme', label: 'Schemes' },
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id as any)}
                  className={`px-2.5 py-1 rounded-lg transition ${
                    selectedFilter === filter.id
                      ? 'bg-emerald-800 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            {/* Questions list */}
            <div className="space-y-2 max-h-[480px] overflow-y-auto pr-1">
              {filteredPresetQuestions.map((qa, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(qa.question)}
                  className="w-full text-left p-3 rounded-xl border border-slate-200/80 hover:border-emerald-500 hover:bg-emerald-50/40 transition text-xs font-medium text-slate-700 hover:text-emerald-900 group flex items-start gap-2"
                >
                  <Lightbulb className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5 group-hover:scale-110 transition" />
                  <span className="line-clamp-2">{qa.question}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Chat Window (8 Cols) */}
        <div className="lg:col-span-8">
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm flex flex-col h-[600px] overflow-hidden">
            {/* Chat Messages Body */}
            <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-slate-50/50">
              {messages.map((msg) => {
                const isAssistant = msg.sender === 'assistant';
                return (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-3 ${
                      isAssistant ? '' : 'flex-row-reverse'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm ${
                        isAssistant
                          ? 'bg-emerald-800 text-emerald-200'
                          : 'bg-slate-800 text-white'
                      }`}
                    >
                      {isAssistant ? (
                        <Bot className="w-4 h-4" />
                      ) : (
                        <User className="w-4 h-4" />
                      )}
                    </div>

                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-xs ${
                        isAssistant
                          ? 'bg-white border border-slate-200 text-slate-800'
                          : 'bg-emerald-800 text-white'
                      }`}
                    >
                      <div className="text-xs sm:text-sm whitespace-pre-line leading-relaxed">
                        {msg.text}
                      </div>

                      {/* Quick Replies Chips if Assistant */}
                      {isAssistant && msg.quickReplies && msg.quickReplies.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-slate-100">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                            Related Questions:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {msg.quickReplies.map((reply, ridx) => (
                              <button
                                key={ridx}
                                onClick={() => handleSendMessage(reply)}
                                className="text-[11px] font-semibold bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 px-2.5 py-1 rounded-lg transition text-left"
                              >
                                {reply}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      <div
                        className={`text-[10px] mt-1.5 ${
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
                  <div className="w-8 h-8 rounded-xl bg-emerald-800 text-emerald-200 flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl px-4 py-3 shadow-xs flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce"></span>
                    <span
                      className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce"
                      style={{ animationDelay: '0.2s' }}
                    ></span>
                    <span
                      className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce"
                      style={{ animationDelay: '0.4s' }}
                    ></span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input Bar */}
            <div className="p-4 bg-white border-t border-slate-200">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask about paddy blast, sugarcane watering, Jeevamrutha, PMKSY..."
                  className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isTyping}
                  className="p-3 bg-emerald-800 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-xl transition shadow-sm flex items-center justify-center"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
              <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 px-1">
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
