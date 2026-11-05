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
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Radio,
  Landmark,
} from 'lucide-react';
import { storageService } from '../services/storage';
import { ChatMessage } from '../types';
import { getDemoAssistantReply, PREDEFINED_QUESTIONS } from '../data/demoResponses';
import { useApp } from '../context/AppContext';

export const AssistantPage: React.FC = () => {
  const { profile, language, weather } = useApp();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [activeSpeechId, setActiveSpeechId] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'pest' | 'irrigation' | 'soil' | 'scheme'>('all');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    setMessages(storageService.getChatHistory());
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Initialize Speech Recognition if supported
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = language === 'kn' ? 'kn-IN' : language === 'hi' ? 'hi-IN' : 'en-IN';

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInputValue(transcript);
          handleSendMessage(transcript);
        }
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, [language]);

  const toggleSpeechRecognition = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in this browser. Please use Chrome or Edge.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.lang = language === 'kn' ? 'kn-IN' : language === 'hi' ? 'hi-IN' : 'en-IN';
        recognitionRef.current.start();
        setIsListening(true);
      } catch (e) {
        console.warn(e);
      }
    }
  };

  const handleTextToSpeech = (msgId: string, text: string) => {
    if (!('speechSynthesis' in window)) return;

    if (activeSpeechId === msgId) {
      window.speechSynthesis.cancel();
      setActiveSpeechId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[*_#`]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = language === 'kn' ? 'kn-IN' : language === 'hi' ? 'hi-IN' : 'en-IN';
    utterance.rate = 0.95;

    utterance.onend = () => setActiveSpeechId(null);
    utterance.onerror = () => setActiveSpeechId(null);

    setActiveSpeechId(msgId);
    window.speechSynthesis.speak(utterance);
  };

  const handleSendMessage = async (textToSend?: string) => {
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

    let replyText = '';
    let category: any = 'general';

    try {
      // First attempt backend Gemini assistant endpoint
      const res = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          language,
          farmerProfile: profile,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        replyText = data.answer;
      }
    } catch {
      // Fall through to local agronomic rulebase
    }

    if (!replyText) {
      const responseData = getDemoAssistantReply(text);
      replyText = responseData.reply;
      category = responseData.category;
    }

    const assistantMsg: ChatMessage = {
      id: `assistant-${Date.now()}`,
      sender: 'assistant',
      text: replyText,
      category,
      quickReplies: ['Pest management spray', 'Irrigation schedule', 'PMKSY subsidy eligibility'],
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const finalHistory = [...newHistory, assistantMsg];
    setMessages(finalHistory);
    storageService.saveChatHistory(finalHistory);
    setIsTyping(false);
  };

  const handleResetChat = () => {
    if (window.confirm('Clear conversation history?')) {
      storageService.saveChatHistory([]);
      setMessages([]);
    }
  };

  const filteredQuestions =
    selectedFilter === 'all'
      ? PREDEFINED_QUESTIONS
      : PREDEFINED_QUESTIONS.filter((q) => q.category === selectedFilter);

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden noir-card border border-noir-700/80 shadow-noir-elevated p-6 sm:p-7">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1.5 rounded-xl bg-lime-accent/15 text-lime-accent border border-lime-accent/30 shadow-glow-lime">
                <Bot className="w-4 h-4" />
              </span>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-lime-accent">
                Gemini 1.5 Flash Agronomic Intelligence
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-ivory-100 tracking-tight">
              Pulse AI Assistant
            </h1>
            <p className="text-xs text-ivory-300 font-mono mt-0.5">
              Trained on ICAR cultivation standards for {profile.soilType} in {profile.district}, {profile.state}.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-noir-850 text-lime-glow border border-lime-accent/30 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-lime-accent animate-ping" />
              <span>Voice & Multilingual Active</span>
            </span>

            <button
              onClick={handleResetChat}
              className="p-2 rounded-xl bg-noir-850 hover:bg-noir-800 text-ivory-400 hover:text-ivory-100 border border-noir-700 transition"
              title="Reset Chat"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Suggested Agronomy Prompt Chips */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-ivory-400 font-bold uppercase tracking-wider flex items-center gap-1">
            <Lightbulb className="w-3.5 h-3.5 text-lime-accent" />
            <span>Suggested Field Queries</span>
          </span>
          <div className="flex items-center gap-1 text-[11px] overflow-x-auto">
            {(['all', 'pest', 'irrigation', 'soil', 'scheme'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-2.5 py-0.5 rounded-lg font-mono transition capitalize ${
                  selectedFilter === filter
                    ? 'bg-lime-accent/20 text-lime-glow font-bold border border-lime-accent/40'
                    : 'text-ivory-400 hover:text-ivory-200'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {filteredQuestions.slice(0, 5).map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(q.question)}
              className="px-3.5 py-2 rounded-xl noir-card border border-noir-700 hover:border-lime-accent/50 text-xs text-ivory-200 hover:text-lime-glow transition whitespace-nowrap shadow-noir-card text-left"
            >
              {q.question}
            </button>
          ))}
        </div>
      </div>

      {/* CHAT MESSAGES WINDOW */}
      <div className="rounded-3xl noir-card border border-noir-700 shadow-noir-card min-h-[460px] max-h-[560px] flex flex-col justify-between overflow-hidden">
        {/* Messages Scroll Area */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
          {messages.length === 0 ? (
            <div className="text-center py-20 text-ivory-400 space-y-3">
              <Bot className="w-12 h-12 text-noir-700 mx-auto" />
              <p className="text-xs font-mono max-w-sm mx-auto">
                Ask any question regarding crop diseases, drip irrigation scheduling, fertilizer dosages, or government
                schemes in English, ಕನ್ನಡ, or हिन्दी.
              </p>
            </div>
          ) : (
            messages.map((msg) => {
              const isUser = msg.sender === 'user';
              const isSpeaking = activeSpeechId === msg.id;

              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  {/* Avatar */}
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 text-xs font-bold border ${
                      isUser
                        ? 'bg-noir-800 text-lime-accent border-lime-accent/40 shadow-glow-lime'
                        : 'bg-lime-accent text-noir-950 border-lime-accent font-black'
                    }`}
                  >
                    {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4 text-noir-950" />}
                  </div>

                  {/* Message Bubble */}
                  <div
                    className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs leading-relaxed space-y-2 border ${
                      isUser
                        ? 'bg-noir-800 border-noir-700 text-ivory-100 rounded-tr-none'
                        : 'bg-noir-850 border-noir-700/80 text-ivory-200 rounded-tl-none shadow-noir-card'
                    }`}
                  >
                    <div className="whitespace-pre-line leading-relaxed">{msg.text}</div>

                    <div className="flex items-center justify-between pt-1 border-t border-noir-700/60 text-[10px] font-mono text-ivory-400">
                      <span>{msg.timestamp}</span>

                      {!isUser && (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleTextToSpeech(msg.id, msg.text)}
                            className={`p-1 rounded transition flex items-center gap-1 ${
                              isSpeaking ? 'text-lime-accent font-bold' : 'hover:text-ivory-100'
                            }`}
                            title="Read Aloud"
                          >
                            {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                            <span>{isSpeaking ? 'Stop' : 'Listen'}</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}

          {isTyping && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-lime-accent text-noir-950 flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-3.5 rounded-2xl bg-noir-850 border border-noir-700 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-lime-accent animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-lime-accent animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 rounded-full bg-lime-accent animate-bounce [animation-delay:0.4s]" />
                <span className="text-[11px] text-ivory-400 font-mono ml-2">Consulting agronomic core...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* INPUT BAR WITH VOICE INPUT */}
        <div className="p-4 bg-noir-900 border-t border-noir-700">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            {/* Speech Recognition Mic Toggle */}
            <button
              type="button"
              onClick={toggleSpeechRecognition}
              className={`p-3 rounded-2xl border transition ${
                isListening
                  ? 'bg-rose-500/20 border-rose-500 text-rose-300 animate-pulse shadow-glow-amber'
                  : 'bg-noir-850 border-noir-700 text-ivory-300 hover:text-lime-accent hover:border-lime-accent/40'
              }`}
              title={isListening ? 'Listening (Click to stop)' : 'Voice Input (Kannada/Hindi/English)'}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            <input
              type="text"
              placeholder={
                isListening
                  ? 'Listening to speech... Speak now'
                  : language === 'kn'
                  ? 'ಕೃಷಿ ಪ್ರಶ್ನೆಯನ್ನು ಟೈಪ್ ಮಾಡಿ...'
                  : language === 'hi'
                  ? 'कृषि सम्बन्धी प्रश्न पूछें...'
                  : 'Ask about sugarcane tillering, rice blast bio-sprays, PM-KISAN, or drip timers...'
              }
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1 px-4 py-3 rounded-2xl bg-noir-850 border border-noir-700 text-ivory-100 placeholder-ivory-500 text-xs focus:outline-none focus:border-lime-accent/60 transition shadow-inner font-sans"
            />

            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              className="p-3 rounded-2xl bg-lime-accent text-noir-950 font-bold hover:bg-lime-glow disabled:opacity-40 disabled:hover:bg-lime-accent transition shadow-glow-lime"
              title="Send Query"
            >
              <Send className="w-4 h-4 text-noir-950" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
