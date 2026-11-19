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
  { city: "Osaka", country: "Japan", photo: "osaka" },
  { city: "Kyoto", country: "Japan", photo: "kyoto" },
  { city: "Reykjavík", country: "Iceland", photo: "reykjavic" },
  { city: "Paris", country: "France", photo: "paris" },
  { city: "Roma", country: "Italy", photo: "roman" },
  { city: "Bangkok", country: "Thailand", photo: "bangkok" },
];

export const choices = [
  { city: "Bali", count: 128 },
  { city: "Okinawa", count: 67 },
  { city: "Taipei", count: 53 },
];

export const topHotels = [
  {
    name: "Hotel Aqua",
    photo: "top1",
    rating: 5,
    reviews: "2k",
    price: 2480,
    was: 3980,
  },
  {
    name: "Mr. Kawasaki Inn",
    photo: "top2",
    rating: 4,
    reviews: "500",
    price: 3380,
  },
  {
    name: "Weekly Paradise",
    photo: "top3",
    rating: 4,
    reviews: "470",
    price: 4780,
  },
  {
    name: "Beast Hotel",
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

export const hotels = [
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

export const roomTypes = [
  {
    id: "double-a",
    name: "Deluxe Double Room A",
    photo: "rooma",
    price: 1490,
    was: 1600,
    features: [0, 1, 2, 3, 4, 5],
  },
  {
    id: "double-b",
    name: "Deluxe Double Room B",
    photo: "roomb",
    price: 1600,
    features: [0, 1, 2, 3, 4, 5],
  },
  {
    id: "suite",
    name: "Deluxe Suite with Pool",
    photo: "rachada1",
    price: 1980,
    features: [0, 1, 2, 3, 6, 4, 7, 5],
  },
];

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
  const destination = destinations.find((item) => item.city === city);
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

export function reservation(stay: Stay, query: Query) {
  const quantities = roomTypes.map((room) => {
    const value = Number(query[room.id]);
    return typeof query[room.id] === "string" &&
      Number.isInteger(value) &&
      value >= 0 &&
      value <= 5
      ? value
      : 0;
  });
  if (!quantities.some(Boolean)) quantities[2] = 1;
  const rooms = roomTypes.flatMap((room, index) =>
    quantities[index] ? [{ ...room, quantity: quantities[index] }] : [],
  );
  const subtotal = rooms.reduce(
    (sum, room) => sum + room.quantity * room.price * nights(stay),
    0,
  );
  const tax = Math.round(subtotal * 0.07);
  const charge = Math.round(subtotal * 0.1);
  const params = stayQuery(stay);
  rooms.forEach(({ id, quantity }) => params.set(id, String(quantity)));
  return {
    rooms,
    subtotal,
    tax,
    charge,
    total: subtotal + tax + charge,
    query: params.toString(),
  };
}
