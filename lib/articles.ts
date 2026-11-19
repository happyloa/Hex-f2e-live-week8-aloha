import { stories } from "./catalog";

type Section = { title: string; paragraphs: string[] };

type ArticleBody = {
  country: string;
  minutes: number;
  intro: string;
  sections: Section[];
  /** Shown after the first section */
  figure?: { asset: string; caption: string };
  /** City from catalog destinations, used for the "find a stay" link */
  stayIn?: string;
};

const bodies: Record<string, ArticleBody> = {
  italy: {
    country: "Italy",
    minutes: 4,
    intro:
      "Italy is the fifth most visited country in the world, with a total of 52.3 million international arrivals in 2016. Most of them see some mix of Rome, Florence and Venice, and the three cities are easy to link by train.",
    sections: [
      {
        title: "Start in Rome",
        paragraphs: [
          "One ticket covers the Colosseum and the Roman Forum, so plan half a day for both. Book a time slot online in summer, when the queues are longest.",
          "Throw a coin into the Trevi Fountain on your way back. The coins are collected and given to charity.",
        ],
      },
      {
        title: "Florence and Venice by train",
        paragraphs: [
          "High-speed trains take about an hour and a half from Rome to Florence, and about two hours from Florence to Venice. Fares go up closer to the date, so book a few weeks ahead.",
        ],
      },
      {
        title: "When to go",
        paragraphs: [
          "April to June and September to October are warm without the August crowds. Many family-run restaurants close for a week or two in mid-August, around the Ferragosto holiday on 15 August.",
        ],
      },
    ],
    figure: { asset: "roman-wide", caption: "The Trevi Fountain in Rome" },
    stayIn: "Roma",
  },
  thailand: {
    country: "Thailand",
    minutes: 5,
    intro:
      "Asian tourists primarily visit Thailand for Bangkok and the historical, natural and cultural sights around it. A first trip can cover the old town temples, a weekend market and the riverside in three or four days.",
    sections: [
      {
        title: "Temples along the river",
        paragraphs: [
          "The Grand Palace, Wat Pho and Wat Arun sit close together on the Chao Phraya River. Wat Pho has a reclining Buddha 46 metres long, and Wat Arun is a short ferry ride across the water.",
          "All three ask visitors to cover their shoulders and knees, so pack something light with long sleeves.",
        ],
      },
      {
        title: "Chatuchak Weekend Market",
        paragraphs: [
          "Chatuchak has more than 15,000 stalls selling clothes, plants, antiques and street food, and it opens on Saturdays and Sundays. Go early, before the midday heat. WOW Life Hotel and Celebrity Palace are both in Chatuchack.",
        ],
      },
      {
        title: "Getting around",
        paragraphs: [
          "The BTS Skytrain and the MRT subway skip the traffic and cover most central districts. For the temples in the old town, river boats on the Chao Phraya are the easiest way in.",
        ],
      },
      {
        title: "When to go",
        paragraphs: [
          "November to February is cool and dry. March to May is the hottest time of year, and the rainy season runs from about June to October.",
        ],
      },
    ],
    figure: { asset: "bangkok-wide", caption: "Temple rooftops in Bangkok" },
    stayIn: "Bangkok",
  },
  "new-zealand": {
    country: "New Zealand",
    minutes: 4,
    intro:
      "Peter Jackson filmed The Lord of the Rings trilogy across New Zealand, and many of the locations are open to visitors. You can see the main ones on a two-week road trip between the North and South Islands.",
    sections: [
      {
        title: "Hobbiton",
        paragraphs: [
          "The Hobbiton Movie Set is on a working sheep farm near Matamata, about two hours' drive south of Auckland. You can only visit on a guided tour, and every tour ends with a drink at the Green Dragon Inn.",
        ],
      },
      {
        title: "Mount Doom",
        paragraphs: [
          "Mount Ngauruhoe in Tongariro National Park stood in for Mount Doom. The Tongariro Alpine Crossing passes right under it. The walk is 19.4 km long and takes most of a day, and the weather is most reliable from November to April.",
        ],
      },
      {
        title: "Wellington and Queenstown",
        paragraphs: [
          "Weta Workshop in Wellington made the props and costumes for the films and runs tours every day. Near Queenstown, the Kawarau River stood in for the River Anduin.",
        ],
      },
      {
        title: "What to eat",
        paragraphs: [
          "The national cuisine has been described as Pacific Rim, incorporating the native Māori cuisine with European and Asian dishes. In Rotorua, cultural evenings serve a hāngī, food slow-cooked in an earth oven.",
        ],
      },
    ],
  },
};

export const articles = stories.map((story) => ({
  ...story,
  ...bodies[story.slug],
}));

export type Article = (typeof articles)[number];

export function articleBySlug(slug: string) {
  return articles.find((article) => article.slug === slug);
}
