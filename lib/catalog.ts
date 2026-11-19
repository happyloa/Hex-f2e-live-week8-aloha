export const defaultStay = {
  destination: "Bangkok",
  checkIn: "2020-06-17",
  checkOut: "2020-06-19",
  adults: 2,
  rooms: 1,
};

export type Stay = typeof defaultStay;
export type Query = Record<string, string | string[] | undefined>;

export const destinations = [
  { city: "Osaka", country: "Japan", photo: "osaka", count: 2810 },
  { city: "Kyoto", country: "Japan", photo: "kyoto", count: 1960 },
  { city: "Reykjavík", country: "Iceland", photo: "reykjavic", count: 420 },
  { city: "Paris", country: "France", photo: "paris", count: 4150 },
  { city: "Roma", country: "Italy", photo: "roman", count: 3670 },
  { city: "Bangkok", country: "Thailand", photo: "bangkok", count: 3240 },
];

export const choices = [
  { city: "Bali", country: "Indonesia", count: 128 },
  { city: "Okinawa", country: "Japan", count: 67 },
  { city: "Taipei", country: "Taiwan", count: 53 },
];

export const topHotels = [
  {
    slug: "hotel-aqua",
    name: "Hotel Aqua",
    city: "Bali",
    photo: "top1",
    rating: 5,
    reviews: "2k",
    price: 2480,
    was: 3980,
  },
  {
    slug: "mr-kawasaki-inn",
    name: "Mr. Kawasaki Inn",
    city: "Okinawa",
    photo: "top2",
    rating: 4,
    reviews: "500",
    price: 3380,
  },
  {
    slug: "weekly-paradise",
    name: "Weekly Paradise",
    city: "Bali",
    photo: "top3",
    rating: 4,
    reviews: "470",
    price: 4780,
  },
  {
    slug: "beast-hotel",
    name: "Beast Hotel",
    city: "Taipei",
    photo: "top4",
    rating: 4,
    reviews: "283",
    price: 1980,
  },
];

export const stories = [
  {
    title: "The Fifth Most Visited Country",
    slug: "italy",
    photo: "italy",
    excerpt:
      "Italy is the fifth most visited country in the world, with a total of 52.3 million…",
  },
  {
    title: "Visit Thailand for Bangkok",
    slug: "thailand",
    photo: "thailand",
    excerpt:
      "Asian tourists primarily visit Thailand for Bangkok and the historical, natural, and…",
  },
  {
    title: "Lord of the Rings Tour",
    slug: "new-zealand",
    photo: "newzealand",
    excerpt:
      "The national cuisine has been described as Pacific Rim, incorporating the native Māori…",
  },
];

const free = "Free cancellation";
const noPay = "No prepayment";

export type Hotel = {
  slug: string;
  name: string;
  city: string;
  photo: string;
  area: string;
  distance: number;
  room: string;
  bed: string;
  rating: number;
  reviews: number;
  price: number;
  was?: number;
  tags: string[];
  features: string[];
  type: "Hotel" | "Apartment" | "Unique" | "Hostel";
};

const bangkokHotels: Omit<Hotel, "city">[] = [
  {
    slug: "rachada-hotel",
    name: "Rachada Hotel",
    photo: "rachada1",
    area: "Rachada",
    distance: 2,
    room: "Deluxe Double Room",
    bed: "1 bed (Queen size)",
    rating: 4,
    reviews: 283,
    price: 1980,
    tags: [free, noPay],
    features: ["Breakfast included", "Free Wi-Fi", "Swimming pool"],
    type: "Hotel",
  },
  {
    slug: "forever-place",
    name: "Forever Place",
    photo: "phaya",
    area: "Phaya Thai",
    distance: 2.9,
    room: "Standard Double Room",
    bed: "1 bed (Queen size)",
    rating: 5,
    reviews: 121,
    price: 1680,
    was: 1980,
    tags: [free],
    features: ["Breakfast included", "Free Wi-Fi"],
    type: "Apartment",
  },
  {
    slug: "luv-hotel",
    name: "LUV Hotel",
    photo: "bangkapi",
    area: "Bangkapi",
    distance: 14,
    room: "Standard Double Room",
    bed: "1 bed (Queen size)",
    rating: 4,
    reviews: 325,
    price: 2460,
    tags: [free],
    features: ["Free Wi-Fi", "Swimming pool"],
    type: "Hotel",
  },
  {
    slug: "wow-life-hotel",
    name: "WOW Life Hotel",
    photo: "chatuchack1",
    area: "Chatuchack",
    distance: 12,
    room: "Standard Double Room",
    bed: "1 bed (Queen size)",
    rating: 4,
    reviews: 204,
    price: 2240,
    was: 2880,
    tags: [noPay],
    features: ["Free Wi-Fi"],
    type: "Hotel",
  },
  {
    slug: "celebrity-palace",
    name: "Celebrity Palace",
    photo: "chatuchack2",
    area: "Chatuchack",
    distance: 8,
    room: "Standard Double Room",
    bed: "1 bed (Queen size)",
    rating: 5,
    reviews: 189,
    price: 1890,
    was: 2120,
    tags: [noPay],
    features: ["Breakfast included", "Swimming pool"],
    type: "Unique",
  },
  {
    slug: "rr-space",
    name: "RR Space",
    photo: "rangrak",
    area: "Rang Rak",
    distance: 4.4,
    room: "Deluxe Double Room",
    bed: "1 bed (King size)",
    rating: 4,
    reviews: 112,
    price: 2090,
    tags: [free],
    features: ["Free Wi-Fi"],
    type: "Apartment",
  },
  {
    slug: "bangkok-hostel",
    name: "Bangkok Hostel",
    photo: "watana1",
    area: "Watana",
    distance: 6,
    room: "Twin Room",
    bed: "2 beds (2 twins)",
    rating: 5,
    reviews: 102,
    price: 880,
    tags: [free, noPay],
    features: ["Free Wi-Fi"],
    type: "Hostel",
  },
  {
    slug: "watana-first-hostel",
    name: "Watana First Hostel",
    photo: "watana2",
    area: "Watana",
    distance: 6,
    room: "Twin Room",
    bed: "2 beds (2 twins)",
    rating: 3,
    reviews: 608,
    price: 790,
    was: 1280,
    tags: [free],
    features: ["Free Wi-Fi"],
    type: "Hostel",
  },
  {
    slug: "dd-space",
    name: "DD Space",
    photo: "dindaeng1",
    area: "Din Daeng",
    distance: 7,
    room: "Standard Double Room",
    bed: "1 bed (Queen size)",
    rating: 4,
    reviews: 138,
    price: 1240,
    was: 1700,
    tags: [],
    features: ["Free Wi-Fi"],
    type: "Unique",
  },
  {
    slug: "dininn-hotel",
    name: "Dininn Hotel",
    photo: "dindaeng2",
    area: "Din Daeng",
    distance: 7,
    room: "Deluxe Twin Room",
    bed: "2 beds (2 twins)",
    rating: 3,
    reviews: 446,
    price: 3450,
    tags: [],
    features: ["Breakfast included"],
    type: "Hotel",
  },
];
const breakfast = "Breakfast included";
const wifi = "Free Wi-Fi";
const pool = "Swimming pool";
const double = "1 bed (Queen size)";
const king = "1 bed (King size)";
const twins = "2 beds (2 twins)";

const moreHotels: Hotel[] = [
  {
    slug: "hotel-aqua",
    name: "Hotel Aqua",
    city: "Bali",
    photo: "top1",
    area: "Kuta",
    distance: 1.5,
    room: "Deluxe Double Room",
    bed: double,
    rating: 5,
    reviews: 2000,
    price: 2480,
    was: 3980,
    tags: [free],
    features: [breakfast, wifi, pool],
    type: "Hotel",
  },
  {
    slug: "weekly-paradise",
    name: "Weekly Paradise",
    city: "Bali",
    photo: "top3",
    area: "Ubud",
    distance: 3.8,
    room: "Deluxe Double Room",
    bed: double,
    rating: 4,
    reviews: 470,
    price: 4780,
    tags: [noPay],
    features: [breakfast, pool],
    type: "Apartment",
  },
  {
    slug: "mr-kawasaki-inn",
    name: "Mr. Kawasaki Inn",
    city: "Okinawa",
    photo: "top2",
    area: "Naha",
    distance: 2,
    room: "Standard Double Room",
    bed: double,
    rating: 4,
    reviews: 500,
    price: 3380,
    tags: [free, noPay],
    features: [breakfast, wifi],
    type: "Hotel",
  },
  {
    slug: "beast-hotel",
    name: "Beast Hotel",
    city: "Taipei",
    photo: "top4",
    area: "Da'an",
    distance: 3.2,
    room: "Standard Double Room",
    bed: double,
    rating: 4,
    reviews: 283,
    price: 1980,
    tags: [free],
    features: [wifi],
    type: "Hotel",
  },
  {
    slug: "namba-garden-hotel",
    name: "Namba Garden Hotel",
    city: "Osaka",
    photo: "rooma",
    area: "Namba",
    distance: 1.2,
    room: "Deluxe Double Room",
    bed: double,
    rating: 4,
    reviews: 356,
    price: 2680,
    was: 3100,
    tags: [free],
    features: [breakfast, wifi],
    type: "Hotel",
  },
  {
    slug: "umeda-sky-rooms",
    name: "Umeda Sky Rooms",
    city: "Osaka",
    photo: "rangrak",
    area: "Umeda",
    distance: 3.1,
    room: "Standard Double Room",
    bed: king,
    rating: 5,
    reviews: 214,
    price: 3290,
    tags: [free, noPay],
    features: [wifi],
    type: "Apartment",
  },
  {
    slug: "kitahama-loft",
    name: "Kitahama Loft",
    city: "Osaka",
    photo: "dindaeng1",
    area: "Kitahama",
    distance: 1.8,
    room: "Deluxe Twin Room",
    bed: twins,
    rating: 4,
    reviews: 98,
    price: 2140,
    tags: [],
    features: [wifi],
    type: "Unique",
  },
  {
    slug: "shinsekai-hostel",
    name: "Shinsekai Hostel",
    city: "Osaka",
    photo: "watana1",
    area: "Shinsekai",
    distance: 2.4,
    room: "Twin Room",
    bed: twins,
    rating: 3,
    reviews: 512,
    price: 860,
    tags: [noPay],
    features: [wifi],
    type: "Hostel",
  },
  {
    slug: "gion-machiya-stay",
    name: "Gion Machiya Stay",
    city: "Kyoto",
    photo: "phaya",
    area: "Gion",
    distance: 1.5,
    room: "Standard Double Room",
    bed: double,
    rating: 5,
    reviews: 187,
    price: 3580,
    tags: [free],
    features: [breakfast, wifi],
    type: "Unique",
  },
  {
    slug: "arashiyama-river-inn",
    name: "Arashiyama River Inn",
    city: "Kyoto",
    photo: "roomb",
    area: "Arashiyama",
    distance: 9,
    room: "Deluxe Double Room",
    bed: double,
    rating: 4,
    reviews: 143,
    price: 2960,
    was: 3400,
    tags: [free, noPay],
    features: [breakfast],
    type: "Hotel",
  },
  {
    slug: "higashiyama-suites",
    name: "Higashiyama Suites",
    city: "Kyoto",
    photo: "chatuchack2",
    area: "Higashiyama",
    distance: 2.2,
    room: "Deluxe Double Room",
    bed: king,
    rating: 4,
    reviews: 76,
    price: 3920,
    tags: [],
    features: [wifi, pool],
    type: "Apartment",
  },
  {
    slug: "kyoto-station-hostel",
    name: "Kyoto Station Hostel",
    city: "Kyoto",
    photo: "watana2",
    area: "Shimogyo",
    distance: 0.8,
    room: "Twin Room",
    bed: twins,
    rating: 4,
    reviews: 620,
    price: 920,
    tags: [free],
    features: [wifi],
    type: "Hostel",
  },
  {
    slug: "harbour-view-hotel",
    name: "Harbour View Hotel",
    city: "Reykjavík",
    photo: "bangkapi",
    area: "Miðborg",
    distance: 0.6,
    room: "Deluxe Double Room",
    bed: double,
    rating: 4,
    reviews: 302,
    price: 3890,
    tags: [free],
    features: [breakfast, wifi],
    type: "Hotel",
  },
  {
    slug: "northern-lights-apartments",
    name: "Northern Lights Apartments",
    city: "Reykjavík",
    photo: "rooma",
    area: "Laugardalur",
    distance: 3.5,
    room: "Standard Double Room",
    bed: double,
    rating: 5,
    reviews: 88,
    price: 3150,
    was: 3600,
    tags: [noPay],
    features: [wifi],
    type: "Apartment",
  },
  {
    slug: "old-harbour-hostel",
    name: "Old Harbour Hostel",
    city: "Reykjavík",
    photo: "watana1",
    area: "Vesturbær",
    distance: 1.1,
    room: "Twin Room",
    bed: twins,
    rating: 3,
    reviews: 410,
    price: 1180,
    tags: [free, noPay],
    features: [wifi],
    type: "Hostel",
  },
  {
    slug: "hotel-le-marais",
    name: "Hôtel Le Marais",
    city: "Paris",
    photo: "chatuchack1",
    area: "Le Marais",
    distance: 1.9,
    room: "Standard Double Room",
    bed: double,
    rating: 4,
    reviews: 529,
    price: 3780,
    tags: [free],
    features: [breakfast, wifi],
    type: "Hotel",
  },
  {
    slug: "montmartre-studio",
    name: "Montmartre Studio",
    city: "Paris",
    photo: "rangrak",
    area: "Montmartre",
    distance: 4.2,
    room: "Deluxe Double Room",
    bed: double,
    rating: 5,
    reviews: 167,
    price: 3240,
    was: 3680,
    tags: [free, noPay],
    features: [wifi],
    type: "Apartment",
  },
  {
    slug: "latin-quarter-rooms",
    name: "Latin Quarter Rooms",
    city: "Paris",
    photo: "roomb",
    area: "Latin Quarter",
    distance: 1.4,
    room: "Deluxe Twin Room",
    bed: twins,
    rating: 4,
    reviews: 233,
    price: 2890,
    tags: [],
    features: [breakfast],
    type: "Unique",
  },
  {
    slug: "canal-saint-martin-hostel",
    name: "Canal Saint-Martin Hostel",
    city: "Paris",
    photo: "dindaeng2",
    area: "Canal Saint-Martin",
    distance: 3,
    room: "Twin Room",
    bed: twins,
    rating: 3,
    reviews: 704,
    price: 1290,
    tags: [noPay],
    features: [wifi],
    type: "Hostel",
  },
  {
    slug: "trastevere-house",
    name: "Trastevere House",
    city: "Roma",
    photo: "dindaeng1",
    area: "Trastevere",
    distance: 2.3,
    room: "Standard Double Room",
    bed: double,
    rating: 5,
    reviews: 276,
    price: 2780,
    tags: [free],
    features: [breakfast, wifi],
    type: "Unique",
  },
  {
    slug: "hotel-colosseo",
    name: "Hotel Colosseo",
    city: "Roma",
    photo: "phaya",
    area: "Monti",
    distance: 1.1,
    room: "Deluxe Double Room",
    bed: double,
    rating: 4,
    reviews: 488,
    price: 3460,
    was: 3980,
    tags: [free, noPay],
    features: [breakfast, wifi],
    type: "Hotel",
  },
  {
    slug: "villa-borghese-suites",
    name: "Villa Borghese Suites",
    city: "Roma",
    photo: "bangkapi",
    area: "Pinciano",
    distance: 2.8,
    room: "Deluxe Double Room",
    bed: king,
    rating: 4,
    reviews: 121,
    price: 3950,
    tags: [],
    features: [wifi, pool],
    type: "Apartment",
  },
  {
    slug: "termini-hostel",
    name: "Termini Hostel",
    city: "Roma",
    photo: "watana2",
    area: "Esquilino",
    distance: 1.6,
    room: "Twin Room",
    bed: twins,
    rating: 3,
    reviews: 655,
    price: 990,
    tags: [free],
    features: [wifi],
    type: "Hostel",
  },
];

export const hotels: Hotel[] = [
  ...bangkokHotels.map((hotel) => ({ ...hotel, city: "Bangkok" })),
  ...moreHotels,
];

export function cityCount(city: string) {
  return [...destinations, ...choices].find((item) => item.city === city)
    ?.count;
}

export const features = [
  ["wifi", "Wi-Fi"],
  ["breakfast", "Breakfast"],
  ["tv", "Television"],
  ["air", "Air conditioner"],
  ["service", "Room service"],
  ["smokeFree", "Smoke free"],
  ["fridge", "Refrigerator"],
  ["bar", "Mini bar"],
] as const;

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  timeZone: "UTC",
});
const fullDateFormat = new Intl.DateTimeFormat("en-GB", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});
const moneyFormat = new Intl.NumberFormat("en-US");

export function money(amount: number) {
  return "TWD " + moneyFormat.format(amount);
}

export function dateLabel(date: string, full = false) {
  return (full ? fullDateFormat : dateFormat).format(new Date(date));
}

export function nights(stay: Stay) {
  return (Date.parse(stay.checkOut) - Date.parse(stay.checkIn)) / 86_400_000;
}

export function nightLabel(count: number) {
  return count + (count === 1 ? " night" : " nights");
}

export function guestLabel(stay: Stay) {
  return (
    stay.adults +
    (stay.adults === 1 ? " adult" : " adults") +
    "・" +
    stay.rooms +
    (stay.rooms === 1 ? " room" : " rooms")
  );
}

export function locationLabel(city: string) {
  const destination = [...destinations, ...choices].find(
    (item) => item.city === city,
  );
  return destination ? destination.city + ", " + destination.country : city;
}

export function readStay(query: Query): Stay {
  const known = [
    ...destinations.map(({ city }) => city),
    ...choices.map(({ city }) => city),
  ];
  const destination =
    typeof query.destination === "string" && known.includes(query.destination)
      ? query.destination
      : defaultStay.destination;
  const validDate = (value: unknown): value is string =>
    typeof value === "string" &&
    /^\d{4}-\d{2}-\d{2}$/.test(value) &&
    Number.isFinite(Date.parse(value)) &&
    new Date(value).toISOString().startsWith(value);
  const ordered =
    validDate(query.checkIn) &&
    validDate(query.checkOut) &&
    query.checkOut > query.checkIn;
  const size = (value: unknown, fallback: number, maximum: number) => {
    const count = typeof value === "string" ? Number(value) : NaN;
    return Number.isInteger(count) && count >= 1 && count <= maximum
      ? count
      : fallback;
  };
  return {
    destination,
    checkIn: ordered ? (query.checkIn as string) : defaultStay.checkIn,
    checkOut: ordered ? (query.checkOut as string) : defaultStay.checkOut,
    adults: size(query.adults, defaultStay.adults, 8),
    rooms: size(query.rooms, defaultStay.rooms, 5),
  };
}

export function stayQuery(stay: Stay) {
  return new URLSearchParams({
    ...stay,
    adults: String(stay.adults),
    rooms: String(stay.rooms),
  });
}
