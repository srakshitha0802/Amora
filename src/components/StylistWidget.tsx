import React from 'react';
import { AlertCircle, MessageCircle, MessageSquareHeart, Send, X } from 'lucide-react';
import { API_BASE_URL, buildWhatsAppUrl } from '../data/products';

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
      const res = await fetch(`${API_BASE_URL}/api/stylist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmed,
          history: historyForApi,
        }),
      });
      const contentType = res.headers.get('content-type') || '';

      if (res.status === 404 || res.status === 405 || !contentType.includes('application/json')) {
        setErrorMsg(
          'Live AI Stylist requires the Amora backend server (configure VITE_API_BASE_URL for GitHub Pages). You can chat directly with our studio on WhatsApp below.'
        );
        return;
      }

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
      setErrorMsg(
        'Could not connect to the AI Stylist backend. You can still message our Kalyan studio directly on WhatsApp below.'
      );
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
          className="mb-3 w-[calc(100vw-2rem)] sm:w-[390px] max-h-[72vh] rounded-2xl bg-[#FDFBF7] border border-[#EBDCE4] shadow-[0_24px_48px_-16px_rgba(59,13,39,0.28)] flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="px-5 py-4 bg-[#3B0D27] text-[#FDFBF7] flex items-center justify-between gap-3">
            <div>
              <p className="font-editorial text-xl font-semibold leading-tight">
                Amora Gift &amp; Merch Stylist
              </p>
              <p className="text-[11px] text-[#F9D8E6]/85 mt-0.5">
                Personal gifting ideas &amp; corporate kit planning (MOQ 30+)
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close Gift Stylist"
              className="w-8 h-8 rounded-lg bg-[#FDFBF7]/10 hover:bg-[#FDFBF7]/20 flex items-center justify-center text-[#FDFBF7] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          {/* Conversation Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#FAF5EE]/60">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs sm:text-[13px] leading-relaxed whitespace-pre-wrap ${
                    msg.role === 'user'
                      ? 'bg-[#3B0D27] text-[#FDFBF7] rounded-br-sm'
                      : 'bg-[#FDFBF7] text-[#3B0D27] border border-[#EBDCE4] rounded-bl-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-bl-sm bg-[#FDFBF7] border border-[#EBDCE4] px-4 py-2.5 text-xs text-[#6E5D66]">
                  Curating recommendations...
                </div>
              </div>
            )}

            {errorMsg && (
              <div
                role="alert"
                className="rounded-xl bg-[#FCE7F3] border border-[#DFB2C7] px-3.5 py-2.5 text-xs text-[#3B0D27] space-y-2"
              >
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-[#8C1D40] mt-0.5" aria-hidden="true" />
                  <span>{errorMsg}</span>
                </div>
                <a
                  href={buildWhatsAppUrl(
                    `Hello Amora.co! I was browsing your store and had a question: ${
                      messages.filter((m) => m.role === 'user').slice(-1)[0]?.text ??
                      'Looking for gifting & merch advice'
                    }`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#3B0D27] text-[#FDFBF7] text-[11px] font-medium hover:bg-[#59163C] transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
                  Ask Amora Studio on WhatsApp
                </a>
              </div>
            )}

            {/* Quick Starter Chips on first open */}
            {messages.length === 1 && !isLoading && (
              <div className="pt-2 space-y-1.5">
                <p className="text-[11px] font-medium text-[#6E5D66]">Try asking:</p>
                <div className="flex flex-col gap-1.5">
                  {STARTER_PROMPTS.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => void sendMessage(prompt)}
                      className="text-left text-xs px-3 py-2 rounded-lg bg-[#FDFBF7] border border-[#EBDCE4] text-[#3B0D27] hover:bg-[#FCE7F3]/70 transition-colors cursor-pointer"
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
            className="p-3 border-t border-[#EBDCE4] bg-[#FDFBF7] flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about gifts, budgets, or 30+ kits..."
              disabled={isLoading}
              className="flex-1 px-3.5 py-2 text-xs sm:text-sm rounded-lg border border-[#EBDCE4] bg-[#FAF5EE]/60 text-[#3B0D27] placeholder:text-[#6E5D66]/70 focus:outline-none focus:border-[#3B0D27]"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              aria-label="Send message to stylist"
              className="w-10 h-10 rounded-lg bg-[#3B0D27] text-[#FDFBF7] hover:bg-[#59163C] disabled:opacity-45 flex items-center justify-center shrink-0 transition-colors cursor-pointer"
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
        className="inline-flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#3B0D27] text-[#FDFBF7] shadow-[0_14px_30px_-8px_rgba(59,13,39,0.45)] hover:bg-[#59163C] transition-transform hover:-translate-y-0.5 text-xs sm:text-sm font-medium whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B0D27]"
      >
        <MessageSquareHeart className="w-4 h-4 text-[#F9D8E6]" aria-hidden="true" />
        <span>Amora Gift &amp; Merch Stylist</span>
      </button>
    </div>
  );
};
