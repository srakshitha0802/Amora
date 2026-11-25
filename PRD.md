# Amora.co — Container-Free Free-Floating 3D & High-Contrast Luxury Overhaul PRD

## Overview
Address all points from the user's latest review (`media_1795437870833_e377e970.jpg`):
1. **Remove the 3D Stage Container Card**:
   - The user explicitly requested: *"remove this container let the 3d object be revolve or show 3d animation properly without any conatiner"*.
   - Remove the white/dark rounded card box (`rounded-3xl border bg-white/90 shadow-2xl`).
   - Allow the 3D medallion, bezel, and planetary rings to revolve and float freely directly in the hero background space with zero borders, frames, or boxes.
2. **Fix Color Contrast & Luminous Material Quality**:
   - In light mode, the 3D disc previously appeared muddy and pitch black because high metalness without an environment map reflected black in Three.js.
   - Inject a custom procedural Studio Environment Map (`scene.environment`) with softbox studio reflections so metals gleam with authentic rose-gold and champagne highlights.
   - Separate the keepsake disc face (rich lacquered porcelain: `metalness: 0.08`, `roughness: 0.22`, high vibrant contrast `#613B69` royal plum, `#E8929F` radiant blush, `#FFFFFF` pearl ivory) from the metallic bezel & planetary rings (mirror rose-gold: `metalness: 0.88`, `roughness: 0.12`).
   - The 3D object will pop with crisp, vibrant, high-end contrast against both light cream linen and dark obsidian backgrounds.
3. **Clean Floating Micro-Controls**:
   - Minimal floating pill dock for finish switcher and angle presets positioned naturally beneath the free-floating 3D stage, completely borderless and seamless.

---

## Tasks

### Task 1: Update PRD and Specifications (COMPLETED)
- Defined container-free layout, environment map generator, and material color palettes.

### Task 2: Remove Stage Container Card (COMPLETED)
- In `src/components/ParticleHero.tsx`:
  - Completely removed the white/dark card container box (`rounded-3xl border bg-white/90 shadow-2xl`).
  - Rendered the 3D canvas directly on the hero background with zero borders, frames, or boxes.
  - The 3D medallion revolves and floats freely in 3D space.

### Task 3: Overhaul 3D Lighting, Materials & Contrast (COMPLETED)
- In `src/components/ParticleHero.tsx`:
  - Added procedural `StudioEnvironment` component generating an equirectangular softbox reflection map.
  - Tuned the Yin-Yang medallion face to high-vibrancy glossy porcelain:
    - Pure pearl ivory `#FFFFFF`
    - Deep royal plum `#54295D`
    - Radiant coral-blush rose `#E88A98`
  - Metallic bezel ring and planetary rings now gleam with genuine rose-gold specular reflections (`metalness: 0.92`, `roughness: 0.14`), eliminating muddy or pitch black appearance in light mode.

### Task 4: Free-Floating Minimal Controls (COMPLETED)
- Embedded minimal floating pill docks for finish switcher (`Rose-Gold`, `Plum Enamel`, `Ceramic`, `Chrome`) and angle presets floating naturally under and above the 3D medallion with zero container.

### Task 5: Verification & Build (COMPLETED)
- `npm run lint` (`tsc --noEmit`) passed with 0 errors.
- `npm run build` (`vite build`) passed with 0 errors in 211ms.
- HMR verified live on `http://localhost:3000`.

---

## CrystalizedBall Integration Specification

### Task 6: Integrate `<CrystalizedBall />` from React Bits (COMPLETED)
- Installed `ogl` library (`npm i ogl --legacy-peer-deps`).
- Created `src/components/CrystalizedBall.jsx`, `src/components/CrystalizedBall.css`, and TypeScript declaration `src/components/CrystalizedBall.d.ts`.
- Integrated full WebGL2 particle rendering, electric rim strands, flare physics, and cursor turbulence.

### Task 7: Premium 3D Hero Dual-Mode / Layered Showcase (COMPLETED)
- Embedded `<CrystalizedBall />` directly into the 3D showcase section of `src/components/ParticleHero.tsx`.
- Integrated dual-mode switcher pill (`🔮 Crystalized Orb` vs `🪙 3D Medallion`) allowing instantaneous switching.
- Curated 4 brand colorways for Amora (`Rose Blush`, `Royal Plum`, `Champagne Gold`, `Frost Silver`).
- Added full dual theme support:
  - Dark mode: Luminous rose-gold and plum emitted plasma sparks.
  - Light mode: High-contrast rich ink dust particles and white-hot rim core that pop on cream linen.
- Minimal floating pill bottom dock for switching ball themes with zero container box.

### Task 8: Verification & Quality Assurance (COMPLETED)
- Run `npm run lint` (`tsc --noEmit`): 0 errors.
- Run `npm run build` (`vite build`): 0 errors, build in 216ms.
- Verified in Playwright browser in both Light and Dark mode, including mode switching between Orb and Medallion.

---

## Unified Amora Crystalline Logo Core (No Separate Medallion)

### Task 9: Unify Logo Emblem Inside the Crystalized Ball Core (COMPLETED)
- Removed the separate toggle between `[ Crystalized Orb ]` and `[ 3D Medallion ]`.
- Created `src/components/CrystallineEmblemCore.tsx` suspending the **Amora Yin-Yang Brand Emblem** right at the heart of the `<CrystalizedBall />` crystal sphere.
- Designed with luxury physical materials:
  - Concentric metallic bezel in Rose-Gold / Champagne / Royal Plum / Ceramic.
  - High-gloss porcelain Yin-Yang face with specular sheen and inner rim grooves.
  - Smooth 3D parallax tilt reacting to cursor and touch with natural inertia damping.
  - Floating dual planetary orbit rings surrounding the emblem inside the electric crystal sphere.

### Task 10: Unified Material & Aura Switcher (COMPLETED)
- Connected the bottom dock to switch BOTH the Amora Keepsake emblem's metallic/lacquer finish AND the crystal ball's particle aura simultaneously:
  - **Rose-Gold Edition**: Mirror Rose-Gold bezel & blush Yin-Yang + Rose Blush plasma rim & stardust.
  - **Royal Plum Edition**: Royal Plum lacquer bezel + Celestial Nebula violet-plum electric strands.
  - **Champagne Edition**: Warm Amber Gold bezel + Solar Gold flares & hot embers.
  - **Velvet Ceramic Edition**: Pure Pearl Ivory ceramic bezel + Frost Silver stardust.

### Task 11: Verification, Contrast & Fluid Physics (COMPLETED)
- Streamlined bundle size from 1.4 MB to 483 kB by eliminating redundant Three.js canvases.
- `npm run lint` (`tsc --noEmit`): 0 errors.
- `npm run build` (`vite build`): 0 errors in 129ms.
- Verified live on `http://localhost:3000`.

---

## Pure Official Amora Logo in Crystalline Sphere Specification

### Task 12: Pure Official Logo Core (Remove Orbital Rings & Extra Bezels) (COMPLETED)
- Replaced the stylized SVG Yin-Yang medallion, dashed planetary rings, and bottom ribbon tag in `src/components/CrystallineEmblemCore.tsx`.
- Used the exact official Amora brand logo image (`public/assets/amora-logo-official.jpg` from user attachment `media_1795439765864_7798580f.jpg`).
- Clipped cleanly to an immaculate circle with subtle luxury glass rim highlight, soft depth shadow, and real-time 3D parallax tilt.
- Zero clutter: pure, minimal, and insanely beautiful.

### Task 13: Harmonize Crystalline Ball & Official Logo (COMPLETED)
- Inside `src/components/ParticleHero.tsx`:
  - Sized the official logo to float harmoniously in the center of the `<CrystalizedBall />` (approx. 55% of the crystal sphere's diameter).
  - The 15,000 stardust particles flow over and around the official logo without obscuring its delicate feather/leaf and Yin-Yang curves.
  - The electric braided rim wraps the official logo like a high-tech luxury crystal orb.
  - Synchronized the aura switcher with the official logo's royal plum, rose blush, champagne, and frost tones.

### Task 14: Verification & Quality Assurance (COMPLETED)
- Run `npm run lint` (`tsc --noEmit`): 0 errors.
- Run `npm run build` (`vite build`): 0 errors in 136ms.
- Verified live on `http://localhost:3000`.

---

## 3D Orbit Runway Card Proportion & Full-Site Smooth Responsiveness

### Task 15: Re-proportion 3D Orbit Runway Cards (COMPLETED)
- Fixed the 3D perspective magnification blowout:
  - Adjusted 3D perspective to 1800px (from 1200px) in `src/index.css` to eliminate extreme fisheye magnification.
  - Sized base cards to `w-[230px] h-[320px]` (from `w-[280px] h-[390px]`) with responsive radius `420px` desktop / `350px` tablet.
  - Front cards now sit at an elegant ~430px height, comfortably inside the 450px stage.
  - Zero overlap: Ample breathing space above ("Drag horizontally, flick...") and below (pagination & WhatsApp pills).
  - Compact editorial layout: `h-[58%]` photo, clear line-clamp typography, minimal badge, neat CTA button.

### Task 16: Full Website Responsiveness & Smooth Motion Audit (COMPLETED)
- Polished responsive breakpoints:
  - Mobile touch-carousel cards resized to compact `max-w-[310px] h-[385px]` with swipe touch physics.
  - Global `html, body { overflow-x: hidden; max-width: 100vw; }` prevents horizontal jitter.
  - Lenis smooth momentum scroll active with silky 60fps easing across all sections.

### Task 17: Verification & Build (COMPLETED)
- Run `npm run lint` (`tsc --noEmit`): 0 errors.
- Run `npm run build` (`vite build`): 0 errors in 134ms.
- Verified live on `http://localhost:3000`.







