import React from "react";
import JournalSpreadCarousel, { type JournalSpread } from "./ui/journal-spread-carousel";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { buildWhatsAppUrl } from "../data/products";

const KEEPSAKE_SPREADS: JournalSpread[] = [
  {
    id: "polaroids",
    label: "Tactile Polaroids",
    paper: "#FAF6F0",
    prints: [
      {
        src: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=700&q=80",
        alt: "Vintage polaroid stack on linen",
        x: 10,
        y: 12,
        w: 26,
        rotate: -4,
        caption: "morning light in kalyan",
      },
      {
        src: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=700&q=80",
        alt: "Golden hour seaside",
        x: 52,
        y: 14,
        w: 24,
        rotate: 3,
        caption: "golden hour",
      },
      {
        src: "https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?auto=format&fit=crop&w=700&q=80",
        alt: "Coffee cup and journal",
        x: 68,
        y: 48,
        w: 22,
        rotate: -3,
        tape: true,
      },
    ],
    notes: [
      {
        x: 8,
        y: 62,
        w: 38,
        rotate: -1,
        title: "Track A — Personal Keepsakes",
        body: "No Minimum Order Quantity. Crafted 1 piece at a time on 300 GSM archival cotton card with custom date stamps.",
        style: "card",
      },
      {
        x: 48,
        y: 72,
        w: 32,
        rotate: 2,
        title: "Films & Memories",
        body: "Warm analog tones calibrated for lasting keepsakes.",
        style: "ink",
      },
    ],
  },
  {
    id: "bookmarks",
    label: "Silk Tassel Bookmarks",
    paper: "#F5F0E8",
    prints: [
      {
        src: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=700&q=80",
        alt: "Open novel with bookmark",
        x: 14,
        y: 10,
        w: 23,
        rotate: -3,
        tape: true,
      },
      {
        src: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=700&q=80",
        alt: "Stack of books and floral stems",
        x: 48,
        y: 12,
        w: 22,
        rotate: 4,
        caption: "one more chapter",
      },
      {
        src: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=700&q=80",
        alt: "Vintage library desk",
        x: 68,
        y: 38,
        w: 24,
        rotate: -2,
        caption: "gold foil deboss",
      },
    ],
    notes: [
      {
        x: 12,
        y: 58,
        w: 32,
        rotate: 1,
        title: "350 GSM Cotton Card",
        body: "Velvet matte touch, hand-trimmed edges, and optional matching silk tassels in plum and champagne.",
        style: "card",
      },
    ],
  },
  {
    id: "photostrips",
    label: "Photostrips & Letters",
    paper: "#ECE5DB",
    prints: [
      {
        src: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=700&q=80",
        alt: "Vintage photo booth strip",
        x: 10,
        y: 14,
        w: 21,
        rotate: -5,
        caption: "4-frame photostrip",
      },
      {
        src: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=700&q=80",
        alt: "Handwritten letter with wax seal",
        x: 46,
        y: 12,
        w: 30,
        rotate: 2,
        caption: "wax seal stamp",
      },
      {
        src: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=700&q=80",
        alt: "Kiss cut sticker sheet",
        x: 72,
        y: 44,
        w: 20,
        rotate: -3,
        tape: true,
      },
    ],
    notes: [
      {
        x: 10,
        y: 65,
        w: 34,
        rotate: -2,
        title: "Tucked inside sealed wax",
        body: "A nostalgic photo booth strip paired with a bespoke typography letter in a wax-sealed envelope.",
        style: "card",
      },
    ],
  },
];

interface KeepsakeJournalSectionProps {
  onPersonaliseClick?: () => void;
}

export const KeepsakeJournalSection: React.FC<KeepsakeJournalSectionProps> = ({
  onPersonaliseClick,
}) => {
  return (
    <section id="keepsake-journal" className="relative w-full bg-[#06080C] text-[#FAF6F0] py-20 lg:py-28 overflow-hidden">
      {/* Background ambient radial glow */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-[#76577B]/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-[#E3A4AE]/15 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#76577B]/20 border border-[#E3A4AE]/25 text-[#E3A4AE] text-xs font-semibold uppercase tracking-wider mb-4">
              Track A · Personal Keepsakes · No MOQ (From 1 Piece)
            </div>
            <h2 className="font-instrument text-4xl sm:text-5xl lg:text-6xl text-[#FAF6F0] font-normal tracking-tight">
              Turn pages of <em className="italic text-[#E3A4AE]">tactile memories.</em>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#FAF6F0]/70 max-w-xl leading-relaxed">
              Drag, swipe, or tap arrow keys to explore our interactive 3D folding journal. Every polaroid, bookmark, and photostrip is crafted individually in our Kalyan studio.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href={buildWhatsAppUrl("Hi Achintya! I would like to personalise a keepsake (Polaroids / Frame / Bookmark / Photostrip) at Amora.co.")}
              target="_blank"
              rel="noopener noreferrer"
              className="liquid-glass rounded-full px-6 py-3 text-sm font-medium text-[#FAF6F0] hover:bg-white/10 transition-colors inline-flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              Personalise on WhatsApp
              <ArrowUpRight className="w-4 h-4 text-[#E3A4AE]" />
            </a>

            {onPersonaliseClick && (
              <button
                type="button"
                onClick={onPersonaliseClick}
                className="liquid-glass-plum rounded-full px-6 py-3 text-sm font-medium text-[#FAF6F0] hover:opacity-90 transition-opacity"
              >
                Open Studio Customiser
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 3D Journal Spread Carousel */}
      <div className="w-full relative shadow-2xl">
        <JournalSpreadCarousel
          spreads={KEEPSAKE_SPREADS}
          title="Amora Keepsake Journal"
          meta="Track A • No MOQ • Turn pages with drag / arrows"
          height="80svh"
          initialIndex={0}
          autoPlay={false}
        />
      </div>
    </section>
  );
};

export default KeepsakeJournalSection;
