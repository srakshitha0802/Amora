import React from 'react';
import type { ProductVisualType } from '../types';

interface ProductVisualProps {
  visualType: ProductVisualType;
  accentColor?: string;
  customText?: string;
  uploadedImage?: string | null;
  fontStyle?: 'serif' | 'sans';
  imageUrl?: string;
  alt?: string;
  mode?: 'card' | 'studio';
}

/**
 * Bespoke studio-framed SVG/CSS product renderer.
 * Supports optional real photography (`imageUrl`) when swapping in live shoots later,
 * and overlays user uploads/custom text cleanly in Live Customiser Studio mode.
 */
export const ProductVisual: React.FC<ProductVisualProps> = ({
  visualType,
  accentColor = '#232E36',
  customText = '',
  uploadedImage = null,
  fontStyle = 'serif',
  imageUrl,
  alt = 'Amora.co personalised product',
  mode = 'card',
}) => {
  const [imgFailed, setImgFailed] = React.useState(false);

  if (imageUrl && !imgFailed && mode === 'card') {
    return (
      <div className="relative w-full h-full overflow-hidden bg-[#F5F0E8]">
        <img
          src={imageUrl}
          alt={alt}
          referrerPolicy="no-referrer"
          onError={() => setImgFailed(true)}
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  const textFontClass = fontStyle === 'serif' ? 'font-serif italic' : 'font-sans tracking-wide';
  const displayCaption = customText.trim() || 'amora.co';
  const isStudio = mode === 'studio';

  return (
    <div
      className={`relative w-full h-full overflow-hidden select-none flex items-center justify-center ${
        isStudio ? 'bg-[#F5F0E8] p-6 sm:p-8' : 'bg-[#F5F0E8] p-5'
      }`}
    >
      {/* Subtle studio lighting radial backdrop */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 28% 20%, rgba(252,231,243,0.65) 0%, rgba(250,245,238,0.2) 55%, rgba(59,13,39,0.03) 100%)',
        }}
      />

      {/* Fine stationery grid hairline for studio mode */}
      {isStudio && (
        <div
          className="absolute inset-0 pointer-events-none opacity-45"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(59,13,39,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(59,13,39,0.04) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
      )}

      {/* 1. CUSTOMISED PHOTO FRAME */}
      {visualType === 'photo-frame' && (
        <div className="relative z-10 flex items-center justify-center">
          <div
            className={`relative bg-[#FAF6F0] shadow-[0_18px_36px_-14px_rgba(59,13,39,0.28)] transition-transform duration-200 ${
              isStudio ? 'w-56 sm:w-64 p-3.5' : 'w-40 p-2.5'
            }`}
            style={{ border: `8px solid ${accentColor}`, borderRadius: '4px' }}
          >
            <div className="bg-[#F5F0E8] p-3 border border-[#76577B/15]">
              <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-[#E3A4AE/20] via-[#F5E6DC] to-[#E6D4DF] flex items-center justify-center">
                {uploadedImage ? (
                  <img
                    src={uploadedImage}
                    alt="Uploaded frame artwork"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <svg viewBox="0 0 160 200" className="w-full h-full" aria-hidden="true">
                    <rect width="160" height="200" fill="#F7ECE4" />
                    <circle cx="118" cy="48" r="24" fill="#E3A4AE" />
                    <path d="M0 154 Q45 112 92 142 T160 130 L160 200 L0 200 Z" fill="#C9A2B4" opacity="0.55" />
                    <path d="M0 168 Q62 132 114 156 T160 150 L160 200 L0 200 Z" fill={accentColor} opacity="0.72" />
                    <path d="M44 138 C46 105 64 82 78 66 C74 96 64 118 52 138 Z" fill="#FAF6F0" opacity="0.75" />
                  </svg>
                )}
              </div>
              <p
                className={`mt-2.5 text-center truncate text-[#232E36] ${textFontClass} ${
                  isStudio ? 'text-sm' : 'text-[11px]'
                }`}
              >
                {displayCaption}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 2. PERSONALISED BOOKMARK */}
      {visualType === 'bookmark' && (
        <div className="relative z-10 flex items-center justify-center">
          {/* Silk tassel cord */}
          <div className="relative flex flex-col items-center">
            <div
              className="w-1 h-7 rounded-full -mb-2 z-20"
              style={{ backgroundColor: accentColor }}
            />
            <div
              className={`relative rounded-[14px] bg-[#FAF6F0] border border-[#76577B/15] shadow-[0_18px_34px_-12px_rgba(59,13,39,0.24)] overflow-hidden flex flex-col items-center justify-between ${
                isStudio ? 'w-32 h-72 px-4 py-5' : 'w-24 h-52 px-3 py-4'
              }`}
            >
              {/* Punch hole */}
              <div className="w-3 h-3 rounded-full bg-[#F5F0E8] border border-[#DFC9D5] shrink-0" />
              {/* Top artwork window */}
              <div
                className="w-full flex-1 my-3 rounded-[8px] overflow-hidden relative flex items-center justify-center"
                style={{ backgroundColor: `${accentColor}14` }}
              >
                {uploadedImage ? (
                  <img
                    src={uploadedImage}
                    alt="Bookmark artwork"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <svg viewBox="0 0 80 140" className="w-full h-full" aria-hidden="true">
                    <path
                      d="M40 122 C40 82 39 50 40 20"
                      stroke={accentColor}
                      strokeWidth="1.4"
                      fill="none"
                      opacity="0.75"
                    />
                    <path
                      d="M40 94 C26 88 22 76 26 68 C34 72 39 82 40 94 Z"
                      fill="#E6A4B8"
                      opacity="0.85"
                    />
                    <path
                      d="M40 74 C54 68 58 54 53 46 C46 50 41 62 40 74 Z"
                      fill={accentColor}
                      opacity="0.7"
                    />
                    <circle cx="40" cy="24" r="7" fill="#E3A4AE" />
                    <circle cx="40" cy="24" r="3" fill={accentColor} />
                  </svg>
                )}
              </div>
              <p
                className={`w-full text-center leading-tight line-clamp-2 text-[#232E36] ${textFontClass} ${
                  isStudio ? 'text-xs' : 'text-[10px]'
                }`}
              >
                {displayCaption}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 3. CUSTOM PHOTOCARDS & POSTERS */}
      {visualType === 'photocards-posters' && (
        <div className="relative z-10 flex items-end justify-center gap-3">
          {/* Wall Poster */}
          <div
            className={`relative bg-[#FAF6F0] border border-[#76577B/15] shadow-[0_16px_32px_-14px_rgba(59,13,39,0.22)] p-2.5 flex flex-col ${
              isStudio ? 'w-44 h-60' : 'w-32 h-44'
            }`}
          >
            <div
              className="flex-1 overflow-hidden relative flex items-center justify-center"
              style={{ backgroundColor: accentColor }}
            >
              {uploadedImage ? (
                <img
                  src={uploadedImage}
                  alt="Poster artwork"
                  className="w-full h-full object-cover"
                />
              ) : (
                <svg viewBox="0 0 120 150" className="w-full h-full" aria-hidden="true">
                  <rect width="120" height="150" fill={accentColor} />
                  <circle cx="60" cy="64" r="34" fill="#E3A4AE" opacity="0.9" />
                  <path d="M18 118 Q60 88 102 118" stroke="#FAF6F0" strokeWidth="1.5" fill="none" />
                  <circle cx="60" cy="64" r="14" fill="#FAF6F0" opacity="0.45" />
                </svg>
              )}
            </div>
            <p
              className={`mt-2 text-center truncate text-[#232E36] ${textFontClass} ${
                isStudio ? 'text-xs' : 'text-[9px]'
              }`}
            >
              {displayCaption}
            </p>
          </div>
          {/* Rounded Photocard overlapping */}
          <div
            className={`relative -ml-7 mb-2 bg-[#FAF6F0] rounded-[10px] border border-[#76577B/15] shadow-[0_14px_26px_-10px_rgba(59,13,39,0.26)] p-1.5 rotate-3 ${
              isStudio ? 'w-24 h-34' : 'w-16 h-24'
            }`}
          >
            <div className="w-full h-full rounded-[6px] overflow-hidden bg-[#E3A4AE/20] flex items-center justify-center">
              {uploadedImage ? (
                <img
                  src={uploadedImage}
                  alt="Photocard preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div
                  className="w-full h-full flex flex-col items-center justify-center p-2 text-center"
                  style={{
                    background: `linear-gradient(155deg, #E3A4AE/20 0%, ${accentColor}30 100%)`,
                  }}
                >
                  <div
                    className="w-6 h-6 rounded-full mb-1.5"
                    style={{ backgroundColor: accentColor, opacity: 0.8 }}
                  />
                  <span className="text-[8px] font-medium text-[#232E36] leading-tight">
                    Velvet Matte
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 4. PERSONALISED POLAROIDS */}
      {visualType === 'polaroids' && (
        <div className="relative z-10 flex items-center justify-center">
          {/* Background tilted polaroid */}
          <div
            className={`absolute bg-[#FAF6F0] border border-[#76577B/15] shadow-md -rotate-6 -translate-x-7 translate-y-1 p-2 pb-6 ${
              isStudio ? 'w-44 h-56' : 'w-32 h-40'
            }`}
          >
            <div className="w-full h-full bg-gradient-to-tr from-[#E3A4AE] via-[#FAF0E6] to-[#E9D7E2]" />
          </div>
          {/* Foreground primary polaroid */}
          <div
            className={`relative bg-[#FAF6F0] border border-[#76577B/15] shadow-[0_20px_38px_-14px_rgba(59,13,39,0.25)] rotate-2 p-2.5 flex flex-col ${
              isStudio ? 'w-52 h-64 pb-4' : 'w-36 h-44 pb-3'
            }`}
          >
            <div className="relative flex-1 overflow-hidden bg-[#F5E9EF] flex items-center justify-center">
              {uploadedImage ? (
                <img
                  src={uploadedImage}
                  alt="Uploaded polaroid memory"
                  className="w-full h-full object-cover"
                />
              ) : (
                <svg viewBox="0 0 140 140" className="w-full h-full" aria-hidden="true">
                  <rect width="140" height="140" fill="#F6E5EE" />
                  <circle cx="96" cy="40" r="22" fill="#FAF6F0" opacity="0.85" />
                  <path d="M0 102 Q36 74 74 92 T140 84 L140 140 L0 140 Z" fill={accentColor} opacity="0.58" />
                  <path d="M0 116 Q56 92 104 112 T140 106 L140 140 L0 140 Z" fill={accentColor} opacity="0.82" />
                </svg>
              )}
              <span className="absolute bottom-1.5 right-2 text-[9px] font-mono text-white/90 drop-shadow">
                21.11.26
              </span>
            </div>
            <p
              className={`mt-2.5 text-center truncate text-[#232E36] ${textFontClass} ${
                isStudio ? 'text-base' : 'text-xs'
              }`}
            >
              {displayCaption}
            </p>
          </div>
        </div>
      )}

      {/* 5. CUSTOM STICKER SHEETS */}
      {visualType === 'sticker-sheet' && (
        <div className="relative z-10 flex items-center justify-center">
          <div
            className={`relative rounded-[12px] bg-[#FAF6F0] border border-[#76577B/15] shadow-[0_18px_36px_-14px_rgba(59,13,39,0.2)] p-3.5 ${
              isStudio ? 'w-56 h-68' : 'w-40 h-48'
            }`}
          >
            <div className="flex items-center justify-between border-b border-[#F1E4EB] pb-1.5 mb-2.5">
              <span className="text-[9px] font-medium text-[#8A7F85] truncate">{displayCaption}</span>
              <span className="text-[8px] text-[#8A7F85]">A5 Matte</span>
            </div>
            <div className="grid grid-cols-2 gap-2.5 h-[calc(100%-28px)]">
              <div
                className="rounded-full border-2 border-white shadow-sm flex items-center justify-center overflow-hidden p-1.5"
                style={{ backgroundColor: accentColor }}
              >
                {uploadedImage ? (
                  <img src={uploadedImage} alt="Sticker motif" className="w-full h-full object-cover rounded-full" />
                ) : (
                  <span className="font-serif italic text-xs text-white">amora</span>
                )}
              </div>
              <div className="rounded-[12px] border-2 border-white shadow-sm bg-[#E3A4AE/20] flex items-center justify-center p-1.5">
                {uploadedImage ? (
                  <img src={uploadedImage} alt="Sticker tile" className="w-full h-full object-cover rounded-[8px]" />
                ) : (
                  <svg viewBox="0 0 40 40" className="w-8 h-8" aria-hidden="true">
                    <path
                      d="M20 33 C10 25 6 19 6 14 C6 9.5 9.5 6.5 13.5 6.5 C16.3 6.5 18.6 8 20 10.2 C21.4 8 23.7 6.5 26.5 6.5 C30.5 6.5 34 9.5 34 14 C34 19 30 25 20 33 Z"
                      fill="#232E36"
                    />
                  </svg>
                )}
              </div>
              <div className="col-span-2 rounded-[10px] border-2 border-white shadow-sm bg-[#F5F0E8] flex items-center justify-center px-2">
                <span
                  className={`truncate text-center ${textFontClass} ${isStudio ? 'text-sm' : 'text-[11px]'}`}
                  style={{ color: '#232E36' }}
                >
                  {displayCaption}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. PERSONALISED PHOTOSTRIPS & LETTERS */}
      {visualType === 'photostrips-letters' && (
        <div className="relative z-10 flex items-center justify-center">
          {/* Blush letter envelope */}
          <div
            className={`relative rounded-[8px] bg-[#E3A4AE/20] border border-[#E8CAD9] shadow-md -rotate-3 flex flex-col justify-end p-3 ${
              isStudio ? 'w-48 h-36 -mr-6' : 'w-34 h-26 -mr-5'
            }`}
          >
            <svg
              viewBox="0 0 180 65"
              className="absolute top-0 left-0 w-full"
              aria-hidden="true"
            >
              <path d="M0 0 L90 52 L180 0" fill="#E3A4AE" stroke="#E5C0D2" strokeWidth="1" />
            </svg>
            <div
              className="w-6 h-6 rounded-full mx-auto mb-2 shadow-sm border border-white/50"
              style={{ backgroundColor: accentColor }}
            />
            <p className={`text-center truncate text-[#232E36] ${textFontClass} text-[10px]`}>
              {displayCaption}
            </p>
          </div>
          {/* 4-frame photostrip */}
          <div
            className={`relative z-10 bg-[#FAF6F0] border border-[#76577B/15] shadow-[0_18px_32px_-12px_rgba(59,13,39,0.28)] rotate-3 p-1.5 flex flex-col gap-1.5 ${
              isStudio ? 'w-20 h-60' : 'w-14 h-44'
            }`}
          >
            {[0, 1, 2, 3].map((frameIdx) => (
              <div
                key={frameIdx}
                className="flex-1 overflow-hidden bg-[#F5E6EE] flex items-center justify-center"
              >
                {uploadedImage ? (
                  <img
                    src={uploadedImage}
                    alt={`Photostrip frame ${frameIdx + 1}`}
                    className="w-full h-full object-cover"
                    style={{
                      filter:
                        frameIdx === 1
                          ? 'sepia(0.25)'
                          : frameIdx === 2
                            ? 'grayscale(0.35)'
                            : 'none',
                    }}
                  />
                ) : (
                  <div
                    className="w-full h-full"
                    style={{
                      background:
                        frameIdx % 2 === 0
                          ? `linear-gradient(135deg, #E3A4AE/20, ${accentColor}55)`
                          : `linear-gradient(135deg, ${accentColor}40, #F5E6DC)`,
                    }}
                  />
                )}
              </div>
            ))}
            <span className="text-[7px] text-center tracking-widest text-[#8A7F85] uppercase">
              amora
            </span>
          </div>
        </div>
      )}

      {/* 7. CUSTOM PRINTED WATER BOTTLES (BULK 30+) */}
      {visualType === 'water-bottle' && (
        <div className="relative z-10 flex items-center justify-center">
          <div className="flex flex-col items-center">
            {/* Brushed steel lid */}
            <div
              className={`rounded-t-[6px] bg-gradient-to-r from-[#D5CCD0] via-[#F2ECEF] to-[#B8AEB3] border border-[#C7BCC1] ${
                isStudio ? 'w-14 h-7' : 'w-10 h-5'
              }`}
            />
            {/* Neck ring */}
            <div
              className={`bg-[#E7DFE3] ${isStudio ? 'w-16 h-2' : 'w-12 h-1.5'}`}
            />
            {/* Insulated matte bottle body */}
            <div
              className={`relative rounded-t-[20px] rounded-b-[12px] shadow-[0_22px_36px_-14px_rgba(59,13,39,0.34)] flex flex-col items-center justify-center px-3 overflow-hidden ${
                isStudio ? 'w-28 h-56' : 'w-20 h-40'
              }`}
              style={{
                background: `linear-gradient(90deg, ${accentColor} 0%, ${accentColor}E0 35%, ${accentColor} 100%)`,
              }}
            >
              {/* Soft vertical studio highlight */}
              <div className="absolute inset-y-0 left-3 w-3 bg-white/15 blur-[2px] pointer-events-none" />
              <div className="relative z-10 flex flex-col items-center gap-2 max-w-full">
                {uploadedImage ? (
                  <div className="w-12 h-12 rounded-md bg-white/95 p-1 shadow-sm flex items-center justify-center overflow-hidden">
                    <img
                      src={uploadedImage}
                      alt="Bottle brand logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full border border-[#E3A4AE]/70 flex items-center justify-center">
                    <div className="w-3.5 h-3.5 rounded-full bg-[#E3A4AE]/85" />
                  </div>
                )}
                <span
                  className={`text-center leading-tight max-w-full truncate px-1 text-[#FAF6F0] ${textFontClass} ${
                    isStudio ? 'text-xs' : 'text-[9px]'
                  }`}
                >
                  {displayCaption}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 8. CUSTOM PRINTED MUGS (BULK 30+) */}
      {visualType === 'mug' && (
        <div className="relative z-10 flex items-center justify-center">
          <div className="relative flex items-center">
            {/* Ceramic Mug Body */}
            <div
              className={`relative rounded-t-[6px] rounded-b-[18px] bg-gradient-to-r from-[#F4EDE6] via-[#FAF6F0] to-[#EAE0D7] border border-[#E5D7DC] shadow-[0_20px_34px_-14px_rgba(59,13,39,0.24)] flex flex-col items-center justify-center px-4 overflow-hidden ${
                isStudio ? 'w-44 h-44' : 'w-32 h-32'
              }`}
            >
              {/* Top lip accent */}
              <div
                className="absolute top-0 inset-x-0 h-2"
                style={{ backgroundColor: accentColor }}
              />
              {/* Imprint zone */}
              <div className="relative z-10 flex flex-col items-center gap-2 max-w-full">
                {uploadedImage ? (
                  <div className="w-14 h-14 rounded-md overflow-hidden flex items-center justify-center">
                    <img
                      src={uploadedImage}
                      alt="Mug logo imprint"
                      className="w-full h-full object-contain"
                    />
                  </div>
                ) : (
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-[#FAF6F0] font-serif text-lg"
                    style={{ backgroundColor: accentColor }}
                  >
                    a
                  </div>
                )}
                <span
                  className={`max-w-full truncate text-center ${textFontClass} ${
                    isStudio ? 'text-sm' : 'text-[10px]'
                  }`}
                  style={{ color: accentColor }}
                >
                  {displayCaption}
                </span>
              </div>
            </div>
            {/* Ceramic Handle */}
            <div
              className={`-ml-2 rounded-r-full border-[7px] border-l-0 border-[#EFE6DE] shadow-sm ${
                isStudio ? 'w-11 h-24' : 'w-8 h-18'
              }`}
            />
          </div>
        </div>
      )}

      {/* 9. CUSTOM PRINTED MOUSEPADS (BULK 30+) */}
      {visualType === 'mousepad' && (
        <div className="relative z-10 flex items-center justify-center">
          <div
            className={`relative rounded-[18px] shadow-[0_18px_32px_-12px_rgba(59,13,39,0.28)] p-3 flex flex-col justify-between overflow-hidden ${
              isStudio ? 'w-60 h-48' : 'w-44 h-36'
            }`}
            style={{
              backgroundColor: accentColor,
              border: '2px dashed rgba(253, 251, 247, 0.35)',
            }}
          >
            {/* Subtle weave grid */}
            <div
              className="absolute inset-0 opacity-15 pointer-events-none"
              style={{
                backgroundImage:
                  'radial-gradient(#FAF6F0 0.75px, transparent 0.75px)',
                backgroundSize: '10px 10px',
              }}
            />
            <div className="relative z-10 flex items-start justify-between">
              {uploadedImage ? (
                <div className="w-11 h-11 rounded bg-white/95 p-1 flex items-center justify-center overflow-hidden">
                  <img src={uploadedImage} alt="Mousepad logo" className="w-full h-full object-contain" />
                </div>
              ) : (
                <div className="w-7 h-7 rounded-full border border-[#E3A4AE]/80" />
              )}
              <span className="text-[8px] uppercase tracking-widest text-[#E3A4AE]/80">
                Stitched Edge
              </span>
            </div>
            <div className="relative z-10">
              <p
                className={`truncate text-[#FAF6F0] ${textFontClass} ${
                  isStudio ? 'text-base' : 'text-xs'
                }`}
              >
                {displayCaption}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 10. CUSTOM PRINTED KEYBOARD MATS (BULK 30+) */}
      {visualType === 'keyboard-mat' && (
        <div className="relative z-10 flex items-center justify-center w-full px-2">
          <div
            className={`relative w-full rounded-[14px] shadow-[0_20px_36px_-14px_rgba(59,13,39,0.3)] flex items-center justify-between px-5 overflow-hidden ${
              isStudio ? 'max-w-[330px] h-32' : 'max-w-[230px] h-24'
            }`}
            style={{
              backgroundColor: accentColor,
              border: '2px dashed rgba(252, 231, 243, 0.38)',
            }}
          >
            {/* Decorative keyboard silhouette outline */}
            <div className="flex flex-col gap-1 opacity-25 pointer-events-none">
              <div className="flex gap-1">
                {[0, 1, 2, 3, 4, 5].map((k) => (
                  <span key={k} className="w-3 h-2.5 rounded-[2px] bg-[#FAF6F0]" />
                ))}
              </div>
              <div className="flex gap-1">
                {[0, 1, 2, 3, 4, 5].map((k) => (
                  <span key={k} className="w-3 h-2.5 rounded-[2px] bg-[#FAF6F0]" />
                ))}
              </div>
              <div className="w-16 h-2.5 rounded-[2px] bg-[#FAF6F0] mx-auto" />
            </div>

            {/* Brand logo & caption on right side of desk mat */}
            <div className="relative z-10 flex flex-col items-end text-right max-w-[56%]">
              {uploadedImage ? (
                <div className="w-10 h-10 rounded bg-white/95 p-1 mb-1 flex items-center justify-center overflow-hidden">
                  <img
                    src={uploadedImage}
                    alt="Keyboard mat logo"
                    className="w-full h-full object-contain"
                  />
                </div>
              ) : (
                <span className="text-[8px] tracking-widest uppercase text-[#E3A4AE]/80 mb-0.5">
                  800×300mm
                </span>
              )}
              <span
                className={`truncate max-w-full text-[#FAF6F0] ${textFontClass} ${
                  isStudio ? 'text-sm' : 'text-[11px]'
                }`}
              >
                {displayCaption}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
