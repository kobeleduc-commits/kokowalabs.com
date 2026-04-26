// Curated long-form field notes for Insights.
// Strict brand rules: no em-dashes, calm authority, decision-grade.

export const INSIGHTS = [
  {
    slug: "quality-is-expected-strategy-is-rare",
    tag: "Positioning",
    title: "Quality is expected. Strategy is rare.",
    excerpt:
      "Why specialty coffee has matured past the point where great beans alone can carry a business, and what to build instead.",
    read: "6 min read",
    cover: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=2400&q=80",
    body: [
      {
        h: "The market is no longer scoring you on quality.",
        p:
          "Twenty years ago a roaster who sourced well, roasted carefully, and served the result with intention could build a serious business almost on craft alone. The bar has moved. Quality is now table stakes. Customers, distributors, and capital all walk into the conversation assuming you have it. They are scoring you on something else.",
      },
      {
        h: "What they are actually scoring.",
        p:
          "They are scoring strategic clarity. Why does your business exist in the form it takes. Who is it precisely for. How does the offer compose into something coherent. What is the next move and why this one before the others. Most coffee businesses cannot answer these in a single, calm sentence. The ones that can compound.",
      },
      {
        h: "What this means for founders.",
        p:
          "Pour more energy into structure than into proof of craft. Audiences already believe you can roast. They want to know what you have built around the roasting that makes the business durable. That is the architecture work. It is rare because it is harder, and it is harder because it is rarely taught.",
      },
    ],
  },
  {
    slug: "margin-architecture-where-coffee-businesses-break",
    tag: "Economics",
    title: "Margin architecture: where coffee businesses break.",
    excerpt:
      "The structural points where unit economics fail, mapped against the moments founders typically miss them.",
    read: "8 min read",
    cover: "https://images.unsplash.com/photo-1442550528053-c431ecb55509?auto=format&fit=crop&w=2400&q=80",
    body: [
      {
        h: "Most failures are mathematical, not motivational.",
        p:
          "When a coffee business closes, the postmortem usually reaches for a story about effort, taste, or timing. The honest postmortem is almost always arithmetic. Margins were too thin to absorb predictable shocks: a rent step, a green coffee spike, a slow quarter, a hire made one season too early.",
      },
      {
        h: "Three structural pressure points.",
        p:
          "First, the gap between cost of goods and price discipline. Second, the labor model relative to peak hour throughput. Third, the fixed-cost ramp built before the revenue curve was earned. Each one is invisible while the business is growing and unforgiving the moment growth stalls.",
      },
      {
        h: "What strategic architecture does about it.",
        p:
          "It refuses to leave any of these three to instinct. Each is modeled, each is sequenced, and each is given a defensible buffer before the next investment is approved. The business is not built to survive a good year. It is built to survive an indifferent one.",
      },
    ],
  },
  {
    slug: "the-right-move-at-the-wrong-moment",
    tag: "Sequencing",
    title: "The right move at the wrong moment is the wrong move.",
    excerpt:
      "On strategic sequencing in early-stage coffee businesses and the cost of inverting the order.",
    read: "5 min read",
    cover: "https://images.unsplash.com/photo-1559496417-e7f25cb247f3?auto=format&fit=crop&w=2400&q=80",
    body: [
      {
        h: "The plan is correct. The order is wrong.",
        p:
          "Founders usually have an inventory of moves they intend to make: a second location, a wholesale arm, a subscription, a flagship product, a redesign, a hire. When the moves are listed, the plan reads well. When the moves are sequenced, the plan often falls apart. The order is where the strategy lives.",
      },
      {
        h: "The cost of inversion.",
        p:
          "Build wholesale before retail proof and the brand defends itself in front of buyers it cannot yet impress. Hire a head of operations before the operating model is even drafted and the role has nothing to compress. Open the second location before the first one is fully understood and you import the first location's flaws at twice the rent.",
      },
      {
        h: "Sequencing is strategy.",
        p:
          "We do not pick the smartest move. We pick the next correct move. The one that earns the right to make the one after it. That ordering is the strategic work. The list of moves is just the menu.",
      },
    ],
  },
  {
    slug: "differentiation-is-not-a-tagline",
    tag: "Differentiation",
    title: "Differentiation is not a tagline. It is a system.",
    excerpt:
      "How positioning, offer, and operations align into a single coherent differentiation system.",
    read: "7 min read",
    cover: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=2400&q=80",
    body: [
      {
        h: "A line of copy will not save you.",
        p:
          "Differentiation is rarely solved at the surface, in a tagline or a hero image. The customer absorbs differentiation through the totality of the experience: how the offer is composed, how the staff is trained, how the menu is sequenced, how the website paces, how the price is held. Every one of these is a vote for or against the same idea.",
      },
      {
        h: "Three systems must agree.",
        p:
          "Positioning describes the place you occupy. The offer is the structure that makes that place valuable. Operations is the discipline that delivers it consistently. When the three agree the brand feels inevitable. When any one is out of phase, customers can sense the looseness even when they cannot name it.",
      },
      {
        h: "Architecture before language.",
        p:
          "Most rebrands fail because they try to fix at the language layer what is actually a structural problem. We start at the structure. The language follows, almost effortlessly, from a system that is already coherent.",
      },
    ],
  },
];

export const findInsight = (slug) => INSIGHTS.find((i) => i.slug === slug);
