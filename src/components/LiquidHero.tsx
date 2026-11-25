import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, Sparkles, MessageCircle, ShoppingBag } from "lucide-react";
import { BRAND_LOGO_URL, buildWhatsAppUrl } from "../data/products";
import AsciiBloom from "./AsciiBloom";

interface LiquidHeroProps {
  onExplorePersonal: () => void;
  onExploreCorporate: () => void;
  onOpenShortlist: () => void;
  shortlistCount: number;
}

const HERO_VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_074625_a81f018a-956b-43fb-9aee-4d1508e30e6a.mp4";

export const LiquidHero: React.FC<LiquidHeroProps> = ({
  onExplorePersonal,
  onExploreCorporate,
  onOpenShortlist,
  shortlistCount,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [emailInput, setEmailInput] = useState("");
  const isFadingRef = useRef(false);

  // Seamless video fade loop via requestAnimationFrame (vanilla JS, no CSS transitions)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let animId: number;

    const fadeOpacity = (start: number, end: number, duration: number, callback?: () => void) => {
      isFadingRef.current = true;
      const startTime = performance.now();
      const step = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / duration);
        const currentOpacity = start + (end - start) * progress;
        if (video) video.style.opacity = currentOpacity.toString();
        if (progress < 1) {
          animId = requestAnimationFrame(step);
        } else {
          isFadingRef.current = false;
          if (callback) callback();
        }
      };
      animId = requestAnimationFrame(step);
    };

    const handleCanPlay = () => {
      video.play().catch(() => {});
      fadeOpacity(0, 1, 500);
    };

    const handleTimeUpdate = () => {
      if (isFadingRef.current) return;
      const remaining = video.duration - video.currentTime;
      if (remaining <= 0.55 && video.duration > 1) {
        fadeOpacity(parseFloat(video.style.opacity || "1"), 0, 500);
      }
    };

    const handleEnded = () => {
      video.style.opacity = "0";
      setTimeout(() => {
        video.currentTime = 0;
        video.play().catch(() => {});
        fadeOpacity(0, 1, 500);
      }, 100);
    };

    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", handleEnded);

    return () => {
      cancelAnimationFrame(animId);
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", handleEnded);
    };
  }, []);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = emailInput.trim()
      ? `Hi Achintya! I would like to enquire about Amora.co prints and merchandise. My email/details: ${emailInput}`
      : "Hi Achintya! I would like to enquire about Amora.co prints and merchandise.";
    window.open(buildWhatsAppUrl(query), "_blank");
  };

  return (
    <section className="relative min-h-screen w-full bg-[#06080C] overflow-hidden flex flex-col justify-between select-none">
      {/* Background Seamless Video with JS Opacity Crossfade */}
      <video
        ref={videoRef}
        src={HERO_VIDEO_URL}
        muted
        autoPlay
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover object-bottom pointer-events-none mix-blend-screen opacity-0"
        style={{ opacity: 0 }}
      />

      {/* ASCII Bloom Shader Field in Brand Colors */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-40 md:opacity-60">
        <AsciiBloom />
      </div>

      {/* Atmospheric Dark & Brand Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#06080C]/80 via-transparent to-[#06080C] pointer-events-none z-10" />

      {/* Top Floating Navbar (Liquid Glass Pill) */}
      <header className="relative z-20 px-4 sm:px-6 py-6 w-full max-w-6xl mx-auto">
        <nav className="liquid-glass rounded-full px-5 py-3 flex items-center justify-between border border-white/10 shadow-2xl">
          {/* Brand Mark */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-full overflow-hidden border border-[#E3A4AE]/40 shadow-sm transition-transform duration-300 group-hover:scale-105">
              <img src={BRAND_LOGO_URL} alt="Amora.co yin-yang emblem" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col">
              <span className="font-instrument text-xl text-[#FAF6F0] leading-none tracking-tight">
                amora<span className="text-[#E3A4AE]">.co</span>
              </span>
              <span className="font-serif italic text-[11px] text-[#FAF6F0]/60 tracking-wider">
                prints, &amp; pretty things
              </span>
            </div>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6 text-xs uppercase tracking-widest text-[#FAF6F0]/80">
            <a href="#keepsake-journal" className="hover:text-[#E3A4AE] transition-colors">
              Keepsakes (No MOQ)
            </a>
            <a href="#corporate-runway" className="hover:text-[#E3A4AE] transition-colors">
              Corporate Studio (MOQ 30+)
            </a>
            <a href="#catalogue" className="hover:text-[#E3A4AE] transition-colors">
              Catalogue
            </a>
            <a href="#about-studio" className="hover:text-[#E3A4AE] transition-colors">
              Studio Story
            </a>
          </div>

          {/* CTAs */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onOpenShortlist}
              className="relative p-2 rounded-full text-[#FAF6F0]/80 hover:text-white hover:bg-white/5 transition-colors"
              title="View Quote Tray"
            >
              <ShoppingBag className="w-5 h-5" />
              {shortlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#E3A4AE] text-[#232E36] font-bold text-[10px] flex items-center justify-center">
                  {shortlistCount}
                </span>
              )}
            </button>

            <a
              href="#corporate-estimator"
              className="liquid-glass rounded-full px-5 py-2 text-xs sm:text-sm font-medium text-[#FAF6F0] hover:bg-white/10 transition-colors hidden sm:inline-flex items-center gap-1.5"
            >
              Book a Bulk Quote ↗
            </a>
          </div>
        </nav>
      </header>

      {/* Hero Center Content */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 text-center max-w-5xl mx-auto py-12">
        {/* Subtle Pill Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full liquid-glass border border-[#E3A4AE]/30 text-[#E3A4AE] text-xs uppercase tracking-widest mb-6 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-[#F3C69F]" />
          <span>Kalyan, Maharashtra · Creative Personalised Gifting &amp; Corporate Merchandise</span>
        </div>

        {/* Editorial Heading */}
        <h1 className="font-instrument text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-[#FAF6F0] tracking-tight leading-[0.98] mb-6">
          Thoughtfully <span className="text-[#FAF6F0]">personalised,</span> <br />
          <em className="italic text-[#E3A4AE] font-normal">beautifully branded.</em>
        </h1>

        {/* Subtitle */}
        <p className="font-sans text-sm sm:text-base md:text-lg text-[#FAF6F0]/75 max-w-2xl leading-relaxed mb-8">
          Tactile 350 GSM polaroids, gold-foiled bookmarks &amp; wax-sealed letters for personal keepsakes — paired with precision-printed bottles, mugs &amp; desk mats for growing companies.
        </p>

        {/* Liquid Glass Input Pill */}
        <form
          onSubmit={handleInquirySubmit}
          className="max-w-xl w-full liquid-glass rounded-full pl-5 pr-2 py-2 flex items-center gap-3 border border-white/15 shadow-2xl mb-8"
        >
          <input
            type="text"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            placeholder="Enter your email or project note..."
            className="flex-1 bg-transparent text-sm sm:text-base text-white placeholder:text-white/45 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-[#FAF6F0] hover:bg-white rounded-full p-3 text-[#232E36] transition-transform hover:scale-105 active:scale-95 shadow-md flex items-center justify-center"
            title="Send Inquiry"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Action Pills: Dual-Track Split */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={onExplorePersonal}
            className="liquid-glass-plum rounded-full px-6 py-3 text-sm font-medium text-[#FAF6F0] hover:opacity-90 transition-all inline-flex items-center gap-2 border border-[#E3A4AE]/30"
          >
            Explore Personal Keepsakes (No MOQ)
            <ArrowRight className="w-4 h-4 text-[#E3A4AE]" />
          </button>

          <button
            type="button"
            onClick={onExploreCorporate}
            className="liquid-glass rounded-full px-6 py-3 text-sm font-medium text-[#FAF6F0] hover:bg-white/10 transition-colors inline-flex items-center gap-2"
          >
            Explore Corporate Merchandise (MOQ 30+)
            <ArrowRight className="w-4 h-4 text-[#F3C69F]" />
          </button>
        </div>
      </div>

      {/* Bottom Bar with Socials & Concierge */}
      <div className="relative z-20 flex flex-col sm:flex-row items-center justify-between max-w-6xl w-full mx-auto px-6 pb-8 gap-4 text-xs text-[#FAF6F0]/60">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
          <span>Kalyan Studio Live · WhatsApp Concierge: +91 9819442335</span>
        </div>

        <div className="flex items-center gap-4">
          <a
            href={buildWhatsAppUrl("Hi Achintya! I would like to chat with the Amora concierge.")}
            target="_blank"
            rel="noopener noreferrer"
            className="liquid-glass rounded-full px-4 py-1.5 text-[#FAF6F0] hover:bg-white/10 transition-colors inline-flex items-center gap-1.5"
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
            Quick Concierge
          </a>
          <a
            href="https://www.instagram.com/amora.co._?dmpr=eDcycW4yZm1qNzM%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            Instagram @amora.co._
          </a>
        </div>
      </div>
    </section>
  );
};

export default LiquidHero;
