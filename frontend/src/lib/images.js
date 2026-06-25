// Kokowa Labs visual asset map.
// Brand photography from the founder is preferred everywhere.
// Unsplash editorial stock used only for cinematic frames where no authentic asset exists.
//
// NOTE: founderRoastery and founderPourOver are currently served from the Emergent
// build CDN. These should be migrated to /public/ once final photography files are
// confirmed. Replace the URLs below with /founder-roastery.webp and /founder-pourover.png
// once those files are in place.

export const ASSETS = {
  // Brand
  logo: "/kokowa-field-labs-logo.png",

  // Authentic founder photography
  founderPortrait: "/founder-portrait.png",
  founderRoastery: "https://customer-assets.emergentagent.com/job_coffee-architecture/artifacts/4vamosvy_Scherm_afbeelding-2026-04-10-om-11.51.27.webp",
  founderPourOver: "https://customer-assets.emergentagent.com/job_coffee-architecture/artifacts/bt8m8gkr_Scherm%C2%ADafbeelding%202026-04-10%20om%2011.50.18.png",
};

// Editorial stock for cinematic frames only.
export const IMAGES = {
  hero: "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=2400&q=80",
  heroAlt: ASSETS.founderPourOver,

  roastery: ASSETS.founderRoastery,
  roasterySteel: ASSETS.founderRoastery,

  sourcing: "https://images.unsplash.com/photo-1586095516671-d085ff58cdd4?auto=format&fit=crop&w=2000&q=80",
  sourcingAlt: "https://images.unsplash.com/photo-1515694590185-73647ba02c10?auto=format&fit=crop&w=2000&q=80",

  discussion: ASSETS.founderPourOver,

  founder: ASSETS.founderPortrait,

  beans: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=2000&q=80",
  espresso: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=2000&q=80",
  insightsHero: "https://images.unsplash.com/photo-1529133396358-0f5f0c4a1c8a?auto=format&fit=crop&w=2400&q=80",
};
