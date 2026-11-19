import {
  hotels,
  locationLabel,
  nights,
  stayQuery,
  type Hotel,
  type Query,
  type Stay,
} from "./catalog";

export type RoomType = {
  id: string;
  name: string;
  photo: string;
  bed: string;
  sleeps: number;
  price: number;
  was?: number;
  /** Indexes into `features` in catalog.ts */
  features: number[];
};

export type HotelProfile = {
  slug: string;
  name: string;
  city: string;
  rating: number;
  reviews: string;
  address: string;
  description: string;
  photos: [asset: string, alt: string][];
  rooms: RoomType[];
  /** Room booked when the reservation link carries no quantities */
  defaultRoom: number;
};

const roundTen = (value: number) => Math.round(value / 10) * 10;

function standardRooms({
  room,
  bed,
  price,
  was,
  photo,
  breakfast,
  hostel,
}: {
  room: string;
  bed: string;
  price: number;
  was?: number;
  photo: string;
  breakfast: boolean;
  hostel: boolean;
}): RoomType[] {
  // Wi-Fi, (breakfast), television, air conditioner, smoke free
  const basics = [0, ...(breakfast ? [1] : []), 2, 3, 5];
  const main: RoomType = {
    id: "classic",
    name: room,
    photo,
    bed,
    sleeps: 2,
    price,
    was,
    features: basics,
  };
  const second: RoomType = hostel
    ? {
        id: "single",
        name: "Single Room",
        photo: "roomb",
        bed: "1 bed (Single)",
        sleeps: 1,
        price: roundTen(price * 0.7),
        features: [0, 3, 5],
      }
    : {
        id: "family",
        name: "Family Suite",
        photo: photo === "rooma" ? "roomb" : "rooma",
        bed: "2 beds (1 king, 1 twin)",
        sleeps: 3,
        price: roundTen(price * 1.6),
        features: [...basics.slice(0, -1), 6, 4, 7, 5],
      };
  return [main, second];
}

const rachadaRooms: RoomType[] = [
  {
    id: "double-a",
    name: "Deluxe Double Room A",
    photo: "rooma",
    bed: "1 bed (Queen size)",
    sleeps: 2,
    price: 1490,
    was: 1600,
    features: [0, 1, 2, 3, 4, 5],
  },
  {
    id: "double-b",
    name: "Deluxe Double Room B",
    photo: "roomb",
    bed: "1 bed (Queen size)",
    sleeps: 2,
    price: 1600,
    features: [0, 1, 2, 3, 4, 5],
  },
  {
    id: "suite",
    name: "Deluxe Suite with Pool",
    photo: "rachada1",
    bed: "1 bed (Queen size)",
    sleeps: 2,
    price: 1980,
    features: [0, 1, 2, 3, 6, 4, 7, 5],
  },
];

const guestRoom = "Guest room";
const extra: Record<
  string,
  { address: string; description: string; photos: [string, string][] }
> = {
  "rachada-hotel": {
    address:
      "318 Phaya Thai Road, Ratchathewi, Phaya Thai, 10400 Bangkok, Thailand",
    description:
      "The Rachada Hotel is an establishment that provides paid lodging on a short-term basis. Facilities provided may range from a modest-quality mattress in a small room to large suites with bigger, higher-quality beds, a dresser, a refrigerator and other kitchen facilities, upholstered chairs, a flat screen television, and en-suite bathrooms.",
    photos: [
      ["rachada1", "Guest suite with dark walls and a queen bed"],
      ["rachada2", "Swimming pool surrounded by greenery"],
      ["rachada3", "Lounge chair by the window"],
      ["rachada4", "Seating area at Rachada Hotel"],
      ["rooma", "Deluxe Double Room A"],
      ["roomb", "Deluxe Double Room B"],
    ],
  },
  "forever-place": {
    address: "112 Phahonyothin Road, Phaya Thai, 10400 Bangkok, Thailand",
    description:
      "Forever Place is a serviced apartment building in Phaya Thai, 2.9 km from the city center. Rooms are set up for longer stays, and breakfast is included in every rate.",
    photos: [
      ["phaya", "Double room with dark walls and framed prints"],
      ["rooma", guestRoom],
      ["roomb", guestRoom],
      ["rachada4", "Seating area"],
    ],
  },
  "luv-hotel": {
    address: "45 Lat Phrao Road, Bang Kapi, 10240 Bangkok, Thailand",
    description:
      "LUV Hotel is in Bangkapi, 14 km from the city center. Every room has free Wi-Fi, and guests can use the outdoor swimming pool.",
    photos: [
      ["bangkapi", "Room with green walls and a chandelier"],
      ["rachada2", "Outdoor swimming pool"],
      ["rooma", guestRoom],
      ["roomb", guestRoom],
    ],
  },
  "wow-life-hotel": {
    address: "88 Kamphaeng Phet 2 Road, Chatuchak, 10900 Bangkok, Thailand",
    description:
      "WOW Life Hotel is in Chatuchack, 12 km from the city center and a short ride from the weekend market. You pay nothing until you arrive.",
    photos: [
      ["chatuchack1", "Dark room with patterned pillows"],
      ["chatuchack2", "Bedroom with a yellow wall hanging"],
      ["rooma", guestRoom],
      ["roomb", guestRoom],
    ],
  },
  "celebrity-palace": {
    address: "19 Phahonyothin Road, Chatuchak, 10900 Bangkok, Thailand",
    description:
      "Celebrity Palace is a boutique stay in Chatuchack, 8 km from the city center, and no two rooms are decorated the same way. Breakfast is included, and there is a swimming pool on site.",
    photos: [
      ["chatuchack2", "Bedroom with a yellow wall hanging"],
      ["chatuchack1", "Dark room with patterned pillows"],
      ["rachada2", "Swimming pool"],
      ["rooma", guestRoom],
    ],
  },
  "rr-space": {
    address: "27 Charoen Krung Road, Rang Rak, 10500 Bangkok, Thailand",
    description:
      "RR Space is an apartment-style stay in Rang Rak, 4.4 km from the city center. Rooms have a king-size bed and free Wi-Fi, and you can cancel for free.",
    photos: [
      ["rangrak", "Bedroom with a king-size bed and wardrobe"],
      ["roomb", guestRoom],
      ["rooma", guestRoom],
      ["rachada3", "Lounge chair by the window"],
    ],
  },
  "bangkok-hostel": {
    address: "61 Sukhumvit Soi 11, Watana, 10110 Bangkok, Thailand",
    description:
      "Bangkok Hostel is in Watana, 6 km from the city center. It has private twin and single rooms, with free cancellation and no prepayment.",
    photos: [
      ["watana1", "Twin room with white bedding"],
      ["watana2", "Twin room with a red wall"],
      ["roomb", guestRoom],
      ["rooma", guestRoom],
    ],
  },
  "watana-first-hostel": {
    address: "8 Sukhumvit Soi 22, Watana, 10110 Bangkok, Thailand",
    description:
      "Watana First Hostel is a budget stay in Watana, 6 km from the city center. Private twin rooms come with free Wi-Fi, and you can cancel for free.",
    photos: [
      ["watana2", "Twin room with a red wall"],
      ["watana1", "Twin room with white bedding"],
      ["roomb", guestRoom],
      ["rooma", guestRoom],
    ],
  },
  "dd-space": {
    address: "140 Pracha Songkhro Road, Din Daeng, 10400 Bangkok, Thailand",
    description:
      "DD Space is a small guesthouse in Din Daeng, 7 km from the city center. Rooms have warm lighting and framed pictures above the bed.",
    photos: [
      ["dindaeng1", "Warmly lit room with framed pictures"],
      ["dindaeng2", "Twin room with wood-panelled walls"],
      ["rooma", guestRoom],
      ["roomb", guestRoom],
    ],
  },
  "dininn-hotel": {
    address: "52 Din Daeng Road, Din Daeng, 10400 Bangkok, Thailand",
    description:
      "Dininn Hotel is in Din Daeng, 7 km from the city center. The twin rooms have wood-panelled walls, and breakfast is included.",
    photos: [
      ["dindaeng2", "Twin room with wood-panelled walls"],
      ["dindaeng1", "Warmly lit room with framed pictures"],
      ["rooma", guestRoom],
      ["roomb", guestRoom],
    ],
  },
  "hotel-aqua": {
    address: "Jalan Pantai Kuta 12, Kuta, 80361 Bali, Indonesia",
    description:
      "Hotel Aqua is a resort-style hotel in Bali, rated 5.0 from about 2,000 guest reviews. The ground-floor rooms open straight onto the pool.",
    photos: [
      ["top1", "Guest rooms opening onto the pool"],
      ["rachada2", "Swimming pool"],
      ["rooma", guestRoom],
      ["roomb", guestRoom],
    ],
  },
  "mr-kawasaki-inn": {
    address: "2-14 Kumoji, Naha, 900-0015 Okinawa, Japan",
    description:
      "Mr. Kawasaki Inn is a two-storey wooden inn in Okinawa, surrounded by trees. Rooms are simple, and breakfast is included.",
    photos: [
      ["top2", "Wooden inn among trees"],
      ["rooma", guestRoom],
      ["roomb", guestRoom],
      ["rachada3", "Lounge chair by the window"],
    ],
  },
  "weekly-paradise": {
    address: "Jalan Raya Ubud 45, Ubud, 80571 Bali, Indonesia",
    description:
      "Weekly Paradise is a whitewashed villa in Bali surrounded by palm trees. It suits guests who plan to stay a week or longer.",
    photos: [
      ["top3", "White villa with palm trees"],
      ["rachada2", "Swimming pool"],
      ["roomb", guestRoom],
      ["rooma", guestRoom],
    ],
  },
  "beast-hotel": {
    address:
      "No. 88, Section 4, Zhongxiao East Road, Da'an, 106 Taipei, Taiwan",
    description:
      "Beast Hotel is a modern building in Taipei with planted terraces on every floor. At TWD 1,980 a night, it is the lowest-priced of the top choices.",
    photos: [
      ["top4", "Modern building with planted terraces"],
      ["roomb", guestRoom],
      ["rooma", guestRoom],
      ["rachada4", "Seating area"],
    ],
  },
};

const typeLabel = {
  Hotel: "a hotel",
  Apartment: "an apartment-style stay",
  Unique: "a boutique stay",
  Hostel: "a hostel",
};

function generatedDetails(hotel: Hotel) {
  const perks = [
    hotel.features.includes("Breakfast included") && "breakfast is included",
    hotel.features.includes("Swimming pool") && "there is a swimming pool",
    hotel.features.includes("Free Wi-Fi") && "every room has free Wi-Fi",
  ].filter(Boolean) as string[];
  const perkSentence = perks.length
    ? " " +
      perks[0][0].toUpperCase() +
      perks[0].slice(1) +
      (perks.length > 1
        ? perks.slice(1, -1).map((perk) => ", " + perk).join("") +
          ", and " +
          perks.at(-1)
        : "") +
      "."
    : "";
  const extras = ["rooma", "roomb", "rachada3", "rachada4"].filter(
    (asset) => asset !== hotel.photo,
  );
  return {
    address: hotel.area + ", " + locationLabel(hotel.city),
    description:
      hotel.name +
      " is " +
      typeLabel[hotel.type] +
      " in " +
      hotel.area +
      ", " +
      hotel.distance +
      " km from the center of " +
      hotel.city +
      "." +
      perkSentence,
    photos: [
      [hotel.photo, hotel.room],
      [extras[0], guestRoom],
      [extras[1], guestRoom],
      [extras[2], "Lounge area"],
    ] as [string, string][],
  };
}

export const hotelProfiles: HotelProfile[] = hotels.map((hotel) => ({
  slug: hotel.slug,
  name: hotel.name,
  city: hotel.city,
  rating: hotel.rating,
  reviews: hotel.reviews.toLocaleString("en-US"),
  ...(extra[hotel.slug] ?? generatedDetails(hotel)),
  rooms:
    hotel.slug === "rachada-hotel"
      ? rachadaRooms
      : standardRooms({
          room: hotel.room,
          bed: hotel.bed,
          price: hotel.price,
          was: hotel.was,
          photo: hotel.photo.startsWith("top") ? "rooma" : hotel.photo,
          breakfast: hotel.features.includes("Breakfast included"),
          hostel: hotel.type === "Hostel",
        }),
  defaultRoom: hotel.slug === "rachada-hotel" ? 2 : 0,
}));

export function hotelBySlug(slug: unknown) {
  return hotelProfiles.find((hotel) => hotel.slug === slug);
}

export function hotelHref(slug: string, stay: Stay) {
  return "/hotel/" + slug + "?" + stayQuery(stay);
}

export function reservation(stay: Stay, query: Query) {
  const hotel = hotelBySlug(query.hotel) ?? hotelProfiles[0];
  const quantities = hotel.rooms.map((room) => {
    const value = Number(query[room.id]);
    return typeof query[room.id] === "string" &&
      Number.isInteger(value) &&
      value >= 0 &&
      value <= 5
      ? value
      : 0;
  });
  if (!quantities.some(Boolean)) quantities[hotel.defaultRoom] = 1;
  const rooms = hotel.rooms.flatMap((room, index) =>
    quantities[index] ? [{ ...room, quantity: quantities[index] }] : [],
  );
  const subtotal = rooms.reduce(
    (sum, room) => sum + room.quantity * room.price * nights(stay),
    0,
  );
  const tax = Math.round(subtotal * 0.07);
  const charge = Math.round(subtotal * 0.1);
  const params = stayQuery(stay);
  params.set("hotel", hotel.slug);
  rooms.forEach(({ id, quantity }) => params.set(id, String(quantity)));
  return {
    hotel: { slug: hotel.slug, name: hotel.name },
    rooms,
    subtotal,
    tax,
    charge,
    total: subtotal + tax + charge,
    query: params.toString(),
  };
}
