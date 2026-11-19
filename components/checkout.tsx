"use client";

import { useEffect, useState } from "react";
import {
  dateLabel,
  guestLabel,
  money,
  nightLabel,
  nights,
  type reservation,
  type Stay,
} from "@/lib/catalog";
import { Icon } from "./icon";

type Booking = ReturnType<typeof reservation>;
type Guest = { name: string; email: string; phone: string };
const sampleGuest: Guest = {
  name: "David Lin",
  email: "david0520@mail.com.tw",
  phone: "+886 9 32 456 789",
};
const emptyGuest: Guest = { name: "", email: "", phone: "" };
const guestStorageKey = "aloha-demo-reservation";

function readGuest() {
  try {
    const value = sessionStorage.getItem(guestStorageKey);
    return value ? (JSON.parse(value) as Guest) : null;
  } catch {
    return null;
  }
}

function BookingSummary({ stay, booking }: { stay: Stay; booking: Booking }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <aside
      className={"booking-summary" + (expanded ? " is-expanded" : "")}
      aria-label="Booking summary"
    >
      <button
        className="booking-toggle"
        type="button"
        aria-expanded={expanded}
        aria-controls="booking-details"
        onClick={() => setExpanded(!expanded)}
      >
        <span>
          Total <strong>{money(booking.total)}</strong>
        </span>
        <span>
          Detail <Icon name="down" size={20} />
        </span>
      </button>
      <div id="booking-details" className="booking-details">
        <section>
          <h2>Booking details</h2>
          <p>
            {dateLabel(stay.checkIn)} {stay.checkIn.slice(0, 4)} -{" "}
            {dateLabel(stay.checkOut)} {stay.checkOut.slice(0, 4)}・
            {nightLabel(nights(stay))}
          </p>
          <p>{guestLabel(stay)}</p>
          <p>Rachada Hotel</p>
        </section>
        <section>
          <h2>Price summary</h2>
          <dl>
            {booking.rooms.map((room) => (
              <div key={room.id}>
                <dt>
                  {room.name}
                  {room.quantity > 1 ? " × " + room.quantity : ""}
                </dt>
                <dd>{money(room.price * nights(stay) * room.quantity)}</dd>
              </div>
            ))}
            <div>
              <dt>VAT (7%)</dt>
              <dd>{money(booking.tax)}</dd>
            </div>
            <div>
              <dt>Property service charge</dt>
              <dd>{money(booking.charge)}</dd>
            </div>
          </dl>
        </section>
        <div className="booking-total">
          Total <strong>{money(booking.total)}</strong>
        </div>
      </div>
    </aside>
  );
}

export function Checkout({
  stay,
  booking,
  edit,
}: {
  stay: Stay;
  booking: Booking;
  edit: boolean;
}) {
  const [guest, setGuest] = useState(emptyGuest);
  useEffect(() => {
    if (edit) setGuest(readGuest() ?? sampleGuest);
  }, [edit]);

  const fields = [
    { key: "name", label: "Name", type: "text", auto: "name" },
    { key: "email", label: "Email", type: "email", auto: "email" },
    { key: "phone", label: "Phone (optional)", type: "tel", auto: "tel" },
  ] as const;
  return (
    <div className="checkout-container checkout-grid">
      <BookingSummary stay={stay} booking={booking} />
      <div className="checkout-form">
        <h1>Reservation details</h1>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            try {
              sessionStorage.setItem(guestStorageKey, JSON.stringify(guest));
            } catch {}
            window.location.assign("/reserve/success?" + booking.query);
          }}
        >
          {fields.map(({ key, label, type, auto }) => (
            <label key={key} className="field">
              {label}
              <input
                type={type}
                autoComplete={auto}
                value={guest[key]}
                onChange={(event) =>
                  setGuest({ ...guest, [key]: event.target.value })
                }
                required={key !== "phone"}
                maxLength={120}
              />
            </label>
          ))}
          <button className="button w-full" type="submit">
            Reserve
          </button>
          <p className="pay-at-stay">Reserve now, pay at stay</p>
        </form>
      </div>
    </div>
  );
}

export function Confirmation({
  stay,
  booking,
  example = false,
}: {
  stay: Stay;
  booking: Booking;
  example?: boolean;
}) {
  const [guest, setGuest] = useState<Guest | null>(null);
  useEffect(() => {
    if (!example) setGuest(readGuest());
  }, [example]);
  const display = guest ?? sampleGuest;
  return (
    <div className="checkout-container confirmation">
      <h1>Reservation received!</h1>
      <div className="confirmation-details">
        <dl className="confirmation-group">
          <div>
            <dt>Guest</dt>
            <dd>{display.name}</dd>
          </div>
          <div>
            <dt>Email</dt>
            <dd>
              {display.email}
              <small>
                {guest
                  ? "Demo confirmation for this address"
                  : "Confirmation email sent to this address"}
              </small>
            </dd>
          </div>
          <div>
            <dt>Phone</dt>
            <dd>{display.phone || "—"}</dd>
          </div>
        </dl>
        <dl className="confirmation-group">
          <div>
            <dt>Room</dt>
            <dd>
              {booking.rooms
                .map(
                  (room) =>
                    room.name +
                    (room.quantity > 1 ? " × " + room.quantity : ""),
                )
                .join(", ")}{" "}
              / {nightLabel(nights(stay))}
            </dd>
          </div>
        </dl>
        <dl className="confirmation-group">
          <div>
            <dt>Check-In</dt>
            <dd>{dateLabel(stay.checkIn, true)}</dd>
          </div>
          <div>
            <dt>Check-Out</dt>
            <dd>{dateLabel(stay.checkOut, true)}</dd>
          </div>
        </dl>
      </div>
      <div className="confirmation-actions">
        <a
          className="button button-outline"
          href={"/reserve?" + booking.query + "&edit=1"}
        >
          Edit reservation
        </a>
        <a className="button" href="/">
          Homepage
        </a>
      </div>
    </div>
  );
}
