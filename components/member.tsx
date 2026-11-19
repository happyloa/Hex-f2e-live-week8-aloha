"use client";

import { useState } from "react";
import { money } from "@/lib/catalog";
import { Icon } from "./icon";
import { Photo } from "./photo";

const bookings = [
  {
    hotel: "Rachada Hotel",
    photo: "rachada1",
    room: "Deluxe Suite with Pool",
    dates: "17 June 2020 - 19 June 2020",
    nights: 2,
    price: 4633,
    path: "/reserve/success?example=1",
  },
  {
    hotel: "WOW Life Hotel",
    photo: "chatuchack1",
    room: "Standard Double Room",
    dates: "8 Sep 2020 - 15 Sep 2020",
    nights: 7,
    price: 13084,
    path: "/info/wow-life-booking",
  },
];

export function MyBookings() {
  const [upcoming, setUpcoming] = useState(true);
  return (
    <section className="my-bookings" aria-labelledby="my-bookings-title">
      <h2 id="my-bookings-title">My Bookings</h2>
      <div className="booking-tabs" role="group" aria-label="Booking status">
        <button aria-pressed={upcoming} onClick={() => setUpcoming(true)}>
          Upcoming
        </button>
        <button aria-pressed={!upcoming} onClick={() => setUpcoming(false)}>
          Completed
        </button>
      </div>
      <div aria-live="polite">
        {upcoming ? (
          bookings.map(
            ({ hotel, photo, room, dates, nights, price, path }, index) => (
              <article className="member-booking" key={hotel}>
                <Photo
                  asset={photo}
                  alt=""
                  priority={index === 0}
                  sizes="(min-width: 768px) 255px, 92vw"
                />
                <div className="member-booking-body">
                  <div>
                    <Icon name="bed" />
                    <p>
                      <strong>{hotel}</strong>
                      <br />
                      {room}
                    </p>
                  </div>
                  <div>
                    <Icon name="calendar" />
                    <p>
                      <strong>{dates}</strong>
                      <br />
                      {nights} nights・2 adults
                    </p>
                  </div>
                  <div>
                    <Icon name="dollar" />
                    <p>
                      <strong>{money(price)}</strong>
                      <br />
                      includes taxes and charges
                    </p>
                  </div>
                  <a
                    className="text-link"
                    href={path}
                    aria-label={"View details for " + hotel}
                  >
                    View details
                  </a>
                </div>
              </article>
            ),
          )
        ) : (
          <p className="empty-bookings">You have no completed bookings.</p>
        )}
      </div>
    </section>
  );
}

export function Profile() {
  return (
    <section className="profile" aria-labelledby="profile-title">
      <div className="profile-heading">
        <h1 id="profile-title">Profile</h1>
        <span>
          <Icon name="check" size={15} /> Verified
        </span>
        <a className="text-link" href="/info/edit-profile">
          Edit
        </a>
      </div>
      <div className="profile-panel">
        <section className="user-details">
          <h2>User details</h2>
          <Photo asset="profile" alt="David Lin" sizes="64px" />
          <p>David Lin</p>
          <p>david0520@mail.com.tw</p>
          <p>+886 9 32 456 789</p>
        </section>
        <section className="payments">
          <h2>Payment methods</h2>
          <div className="payment-list">
            <p>
              xxxx-xxxx-7890
              <br />
              DAVID LIN
              <br />
              08/2029 <Icon name="card" size={20} />
            </p>
            <a href="/info/add-payment" aria-label="Add payment method">
              <span>
                <Icon name="plus" size={18} />
              </span>
            </a>
          </div>
        </section>
      </div>
    </section>
  );
}
