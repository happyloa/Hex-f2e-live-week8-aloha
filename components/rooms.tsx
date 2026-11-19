"use client";

import { useState } from "react";
import {
  dateLabel,
  features,
  guestLabel,
  locationLabel,
  money,
  nightLabel,
  nights,
  stayQuery,
  type Stay,
} from "@/lib/catalog";
import type { HotelProfile } from "@/lib/hotels";
import { Icon } from "./icon";
import { Photo } from "./photo";

export function Rooms({
  stay,
  hotel,
}: {
  stay: Stay;
  hotel: Pick<HotelProfile, "slug" | "rooms">;
}) {
  const roomTypes = hotel.rooms;
  const empty = roomTypes.map(() => 0);
  const [counts, setCounts] = useState(empty);
  const nightCount = nights(stay);
  const count = counts.reduce((sum, value) => sum + value, 0);
  const total = roomTypes.reduce(
    (sum, room, index) => sum + room.price * counts[index] * nightCount,
    0,
  );
  const query = stayQuery({ ...stay, rooms: count || stay.rooms });
  query.set("hotel", hotel.slug);
  roomTypes.forEach(({ id }, index) => {
    if (counts[index]) query.set(id, String(counts[index]));
  });

  return (
    <section className="rooms" aria-labelledby="rooms-title">
      <h2 id="rooms-title">Select your room</h2>
      <div className="room-summary">
        <span>{locationLabel(stay.destination)}</span>
        <span>
          {dateLabel(stay.checkIn)} - {dateLabel(stay.checkOut)}・
          {nightLabel(nightCount)}
        </span>
        <span>{guestLabel(stay)}</span>
        <a className="text-link" href={"/results?" + stayQuery(stay)}>
          Edit detail
        </a>
      </div>
      <div className="room-table-heading room-row" aria-hidden="true">
        <span>Room type</span>
        <span>Sleeps</span>
        <span>Price</span>
        <span>Rooms</span>
      </div>
      {roomTypes.map((room, index) => (
        <article className="room-row room-option" key={room.id} data-reveal>
          <div className="room-info">
            <Photo
              asset={room.photo}
              sizes="(min-width: 1024px) 255px, 150px"
            />
            <div>
              <h3>{room.name}</h3>
              <p>{room.bed}</p>
              <ul className="amenities">
                {room.features.map((feature) => (
                  <li key={feature}>
                    <Icon name={features[feature][0]} size={18} />
                    <span>{features[feature][1]}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div
            className="room-sleeps"
            role="img"
            aria-label={"Sleeps " + room.sleeps}
          >
            {Array.from({ length: room.sleeps }, (_, person) => (
              <Icon key={person} name="person" size={20} />
            ))}
          </div>
          <div className="room-price">
            {room.was && <del>{money(room.was)}</del>}
            <strong className={room.was ? "text-brand" : undefined}>
              {money(room.price)}
            </strong>
            <small>per night</small>
          </div>
          <div className="room-counter">
            <button
              className="icon-button"
              aria-label={"Remove " + room.name}
              disabled={counts[index] === 0}
              onClick={() =>
                setCounts(
                  counts.map((value, number) =>
                    number === index ? value - 1 : value,
                  ),
                )
              }
            >
              <Icon name="minus" size={21} />
            </button>
            <output aria-label={room.name + " quantity"}>
              {counts[index]}
            </output>
            <button
              className="icon-button"
              aria-label={"Add " + room.name}
              disabled={count >= 5}
              onClick={() =>
                setCounts(
                  counts.map((value, number) =>
                    number === index ? value + 1 : value,
                  ),
                )
              }
            >
              <Icon name="plus" size={21} />
            </button>
          </div>
        </article>
      ))}
      {count > 0 && (
        <div className="room-booking-bar">
          <div className="site-container">
            <div className="room-booking-total" aria-live="polite">
              <small>
                {count} {count === 1 ? "room" : "rooms"}・
                {nightLabel(nightCount)}
              </small>
              <strong>{money(total)}</strong>
            </div>
            <button
              className="button button-outline"
              onClick={() => setCounts(empty)}
            >
              Cancel
            </button>
            <a className="button" href={"/reserve?" + query}>
              Reserve
            </a>
          </div>
        </div>
      )}
    </section>
  );
}
