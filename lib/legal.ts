export const legalPages = [
  { slug: "faqs", title: "FAQs" },
  { slug: "terms-of-use", title: "Terms of use" },
  { slug: "privacy-policy", title: "Privacy policy" },
] as const;

export type LegalSlug = (typeof legalPages)[number]["slug"];

export const supportEmail = "support@aloha.example";
export const legalUpdated = "1 June 2020";

/** A string is a paragraph; a string array is a bulleted list. */
export type Block = string | string[];
export type LegalSection = { id: string; title: string; body: Block[] };

export const faqGroups = [
  {
    id: "booking",
    title: "Booking",
    items: [
      {
        q: "How do I book a room?",
        a: [
          "Search by destination, dates and guests, then open a hotel. On the hotel page, use the + button to choose how many of each room type you want. A bar at the bottom of the screen shows the total for your stay.",
          "Select Reserve, enter your name and email, and confirm. The confirmation page lists everything you booked.",
        ],
      },
      {
        q: "Do I pay when I book?",
        a: [
          "No. Every reservation on ALOHA is reserve now, pay at stay. You pay the property when you check in.",
        ],
      },
      {
        q: "What is included in the price?",
        a: [
          "The nightly rate on the results page covers the room only. At checkout, the price summary adds VAT at 7% and a property service charge of 10% of the room total. The total you see before you confirm is the amount you pay.",
        ],
      },
      {
        q: "Can I book more than one room?",
        a: [
          "Yes. Pick a quantity for each room type on the hotel page. You can mix room types in one reservation.",
        ],
      },
    ],
  },
  {
    id: "changes",
    title: "Changes and cancellations",
    items: [
      {
        q: "How do I change my reservation?",
        a: [
          "Select Edit reservation on the confirmation page to go back to the form with your details filled in. Bookings you make while logged in also appear under My Bookings.",
        ],
      },
      {
        q: "Can I cancel for free?",
        a: [
          "Rooms tagged Free cancellation can be cancelled without a fee before the deadline in your confirmation. For other rooms, the property's own cancellation policy applies. Check the tags on the results page before you book.",
        ],
      },
      {
        q: "What does No prepayment mean?",
        a: [
          "The property will not take a deposit before you arrive. You pay the full amount at check-in.",
        ],
      },
    ],
  },
  {
    id: "account",
    title: "Account and support",
    items: [
      {
        q: "Do I need an account to book?",
        a: [
          "No. A name and email are enough. With an account, your upcoming and completed stays are listed in My Bookings, and you can save a payment method in your profile.",
        ],
      },
      {
        q: "Which languages and currencies can I use?",
        a: ["For now, ALOHA is in English and prices are shown in TWD."],
      },
      {
        q: "How do I stop receiving offer emails?",
        a: [
          "Every offer email has an unsubscribe link at the bottom. You can also write to " +
            supportEmail +
            " and we will remove your address.",
        ],
      },
    ],
  },
];

export const termsSections: LegalSection[] = [
  {
    id: "using-aloha",
    title: "Using ALOHA",
    body: [
      "These terms apply when you search, book or create an account on ALOHA. If you do not agree with them, please do not use the site.",
    ],
  },
  {
    id: "account",
    title: "Your account",
    body: [
      "You must be at least 18 to create an account or make a booking. Keep your password to yourself. You are responsible for activity under your account, so tell us right away if you think someone else has used it.",
    ],
  },
  {
    id: "bookings",
    title: "Bookings",
    body: [
      "When you book, your contract for the stay is with the property. We pass your details to the property and send you a confirmation email.",
      "The property's own rules, such as check-in times and house rules, apply during your stay.",
    ],
  },
  {
    id: "prices",
    title: "Prices and payment",
    body: [
      "Room rates are per night and shown in TWD. At checkout we add:",
      [
        "VAT at 7% of the room total",
        "a property service charge of 10% of the room total",
      ],
      "You pay the property when you arrive. ALOHA does not charge your card.",
    ],
  },
  {
    id: "cancellations",
    title: "Cancellations and no-shows",
    body: [
      "Each room shows its cancellation terms before you book. If a room offers free cancellation, you can cancel without a fee before the deadline in your confirmation.",
      "If you do not arrive and have not cancelled, the property may charge a no-show fee under its own policy.",
    ],
  },
  {
    id: "content",
    title: "Content on the site",
    body: [
      "Properties supply their descriptions and photos, and ratings come from guest reviews. We cannot promise that every detail is current, so contact the property if something matters to your stay.",
      "You may not copy photos or text from ALOHA for commercial use without permission.",
    ],
  },
  {
    id: "liability",
    title: "Liability",
    body: [
      "If a property cannot provide the stay you booked, we will help you find another room, but the property is responsible for the failure. Nothing in these terms limits rights you have under consumer law.",
    ],
  },
  {
    id: "changes",
    title: "Changes to these terms",
    body: [
      "We may update these terms. The date at the top of this page shows the current version. A booking made before a change keeps the terms that applied when you booked.",
    ],
  },
  {
    id: "contact",
    title: "Contact",
    body: ["Questions about these terms can go to " + supportEmail + "."],
  },
];

export const privacySections: LegalSection[] = [
  {
    id: "collect",
    title: "What we collect",
    body: [
      "We only collect what you type into the site:",
      [
        "your name, email and phone number when you reserve a room",
        "your email and password when you log in",
        "your email when you subscribe to offers",
        "your search: destination, dates, guests and rooms",
      ],
    ],
  },
  {
    id: "this-site",
    title: "How this demo handles your data",
    body: [
      "Nothing you type on this site is sent to a server. Your reservation details are kept in your browser's session storage so the confirmation page can show them, and the browser deletes them when you close the tab.",
      "The login and subscribe forms do not save what you enter. Your search is written into the page address, which lets you reload or share a results page.",
    ],
  },
  {
    id: "use",
    title: "How we use information",
    body: [
      "We use your details to make and manage bookings, send confirmation emails and, if you subscribed, send offers. We do not sell personal information.",
    ],
  },
  {
    id: "sharing",
    title: "Who we share it with",
    body: [
      "When you book, the property receives your name, email and phone number so it can prepare for your stay. We do not share your details with advertisers.",
    ],
  },
  {
    id: "cookies",
    title: "Cookies",
    body: ["ALOHA does not set cookies or use analytics tools."],
  },
  {
    id: "choices",
    title: "Your choices",
    body: [
      "You can ask to see, correct or delete your information by writing to " +
        supportEmail +
        ". To stop offer emails, use the unsubscribe link in any of them.",
    ],
  },
  {
    id: "changes",
    title: "Changes to this policy",
    body: [
      "If we change this policy, we will update the date at the top of this page.",
    ],
  },
];
