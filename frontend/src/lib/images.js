// Kokowa Labs visual asset map.
// Authentic founder/operating photography from the brand owner is preferred.
// Stock fallback only where no authentic asset is available, and only within
// the strict niche: specialty coffee, roastery, sourcing, espresso craftsmanship.

export const ASSETS = {
  // Brand
  logo: "https://customer-assets.emergentagent.com/job_coffee-architecture/artifacts/ahjj8did_image.png",

  // Authentic founder photography (provided by the brand owner)
  founderPortrait: "https://customer-assets.emergentagent.com/job_coffee-architecture/artifacts/2ki1vzgp_image.%20%20%20foto%20.png",
  founderRoastery: "https://customer-assets.emergentagent.com/job_coffee-architecture/artifacts/4vamosvy_Scherm_afbeelding-2026-04-10-om-11.51.27.webp",
  founderPourOver: "https://customer-assets.emergentagent.com/job_coffee-architecture/artifacts/bt8m8gkr_Scherm%C2%ADafbeelding%202026-04-10%20om%2011.50.18.png",
};

// Editorial stock kept only for cinematic frames where no authentic asset exists.
// Strict niche: specialty coffee craftsmanship, sourcing, roasting, espresso.
export const IMAGES = {
  // Hero kept editorial: espresso portafilters, top-down, no people, premium frame
  hero: "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=2400&q=80",
  heroAlt: ASSETS.founderPourOver,

  // Authority sections: authentic founder operating a Giesen roaster
  roastery: ASSETS.founderRoastery,
  roasterySteel: ASSETS.founderRoastery,

  // Sourcing / origin: niche specialty stock, hands sorting cherries
  sourcing: "https://images.unsplash.com/photo-1611174743420-3d7df880ce32?auto=format&fit=crop&w=2000&q=80",
  sourcingAlt: "https://images.unsplash.com/photo-1599639957043-f3aa5c986398?auto=format&fit=crop&w=2000&q=80",

  // Strategic discussion / trust: authentic founder pour-over moment
  discussion: ASSETS.founderPourOver,

  // Founder portrait, authentic
  founder: ASSETS.founderPortrait,

  // Cinematic backdrop frames
  beans: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=2000&q=80",
  espresso: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=2000&q=80",
  insightsHero: "https://images.unsplash.com/photo-1453614512568-c4024d13eb88?auto=format&fit=crop&w=2400&q=80",
};
