import React from 'react';
import { AlertCircle, MessageSquareHeart, Send, X } from 'lucide-react';

interface StylistMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
}

const STARTER_PROMPTS = [
  'Suggest a birthday keepsake gift bundle under ₹900',
  'Plan an onboarding welcome kit for 60 new hires',
  'Can I order 15 custom printed mugs for my small team?',
  'Which printing finish works best on matte water bottles?',
];

export const StylistWidget: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [input, setInput] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
  const [messages, setMessages] = React.useState<StylistMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: 'Welcome to Amora.co! I can help you curate a personal keepsake gift (no minimums) or plan a corporate welcome kit (30+ piece MOQ). What are we creating today?',
    },
  ]);

  const scrollEndRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (isOpen) {
      scrollEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isLoading]);

  const sendMessage = async (promptText: string) => {
    const trimmed = promptText.trim();
    if (!trimmed || isLoading) return;

    setErrorMsg(null);
    const userTurn: StylistMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: trimmed,
    };

    const historyForApi = messages
      .filter((m) => m.id !== 'welcome')
      .map((m) => ({ role: m.role, text: m.text }));

    setMessages((prev) => [...prev, userTurn]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/stylist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmed,
          history: historyForApi,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(
          data.error || 'The stylist encountered an issue. Please try again in a moment.'
        );
        return;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `model-${Date.now()}`,
          role: 'model',
          text: data.reply,
        },
      ]);
    } catch {
      setErrorMsg('Unable to reach the Amora Gift & Merch Stylist right now.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void sendMessage(input);
  };

  return (
    <div className="fixed right-4 sm:right-6 bottom-20 md:bottom-6 z-40 flex flex-col items-end">
      {isOpen && (
        <div
          role="dialog"
          aria-label="Amora Gift and Merch Stylist"
          className="mb-3 w-[calc(100vw-2rem)] sm:w-[390px] max-h-[72vh] rounded-2xl bg-[#0B0E14] text-[#FAF6F0] border border-white/10 shadow-[0_24px_48px_-16px_rgba(59,13,39,0.28)] flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="px-5 py-4 bg-[#232E36] text-[#FAF6F0] flex items-center justify-between gap-3">
            <div>
              <p className="font-serif text-xl font-semibold leading-tight">
                Amora Gift &amp; Merch Stylist
              </p>
              <p className="text-[11px] text-[#E3A4AE]/85 mt-0.5">
                Personal gifting ideas &amp; corporate kit planning (MOQ 30+)
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close Gift Stylist"
              className="w-8 h-8 rounded-lg bg-[#0B0E14] text-[#FAF6F0]/10 hover:bg-[#0B0E14] text-[#FAF6F0]/20 flex items-center justify-center text-[#FAF6F0] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          {/* Conversation Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#F5F0E8]/60">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs sm:text-[13px] leading-relaxed whitespace-pre-wrap ${
                    msg.role === 'user'
                      ? 'bg-[#232E36] text-[#FAF6F0] rounded-br-sm'
                      : 'bg-[#0B0E14] text-[#FAF6F0] text-[#FAF6F0] border border-white/10 rounded-bl-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-bl-sm bg-[#0B0E14] text-[#FAF6F0] border border-white/10 px-4 py-2.5 text-xs text-[#FAF6F0]/70">
                  Curating recommendations...
                </div>
              </div>
            )}

            {errorMsg && (
              <div
                role="alert"
                className="rounded-xl bg-[#E3A4AE/20] border border-[#DFB2C7] px-3.5 py-2.5 text-xs text-[#FAF6F0] flex items-start gap-2"
              >
                <AlertCircle className="w-4 h-4 shrink-0 text-[#8C1D40] mt-0.5" aria-hidden="true" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Quick Starter Chips on first open */}
            {messages.length === 1 && !isLoading && (
              <div className="pt-2 space-y-1.5">
                <p className="text-[11px] font-medium text-[#FAF6F0]/70">Try asking:</p>
                <div className="flex flex-col gap-1.5">
                  {STARTER_PROMPTS.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => void sendMessage(prompt)}
                      className="text-left text-xs px-3 py-2 rounded-lg bg-[#0B0E14] text-[#FAF6F0] border border-white/10 text-[#FAF6F0] hover:bg-[#E3A4AE/20]/70 transition-colors cursor-pointer"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div ref={scrollEndRef} />
          </div>

          {/* Input Bar */}
          <form
            onSubmit={handleSubmit}
            className="p-3 border-t border-white/10 bg-[#0B0E14] text-[#FAF6F0] flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about gifts, budgets, or 30+ kits..."
              disabled={isLoading}
              className="flex-1 px-3.5 py-2 text-xs sm:text-sm rounded-lg border border-white/10 bg-[#F5F0E8]/60 text-[#FAF6F0] placeholder:text-[#FAF6F0]/70/70 focus:outline-none focus:border-[#232E36]"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              aria-label="Send message to stylist"
              className="w-10 h-10 rounded-lg bg-[#232E36] text-[#FAF6F0] hover:bg-[#76577B] disabled:opacity-45 flex items-center justify-center shrink-0 transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" aria-hidden="true" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Launcher Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="inline-flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#232E36] text-[#FAF6F0] shadow-[0_14px_30px_-8px_rgba(59,13,39,0.45)] hover:bg-[#76577B] transition-transform hover:-translate-y-0.5 text-xs sm:text-sm font-medium whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#232E36]"
      >
        <MessageSquareHeart className="w-4 h-4 text-[#E3A4AE]" aria-hidden="true" />
        <span>Amora Gift &amp; Merch Stylist</span>
      </button>
    </div>
  );
};
