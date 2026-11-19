"use client";

import { useRef, useState } from "react";
import { choices, money, topHotels } from "@/lib/catalog";
import { Icon, Stars } from "./icon";
import { Photo } from "./photo";

const banners = ["index-banner", "osaka", "bangkok"];

export function Hero() {
  const [index, setIndex] = useState(0);
  const change = (direction: number) =>
    setIndex(
      (current) => (current + direction + banners.length) % banners.length,
    );
  return (
    <section className="hero" aria-label="Hotel inspiration">
      <picture>
        {index === 0 && (
          <>
            <source
              media="(max-width: 767px)"
              type="image/avif"
              sizes="100vw"
              srcSet="/img/hero-mobile-420.avif 420w, /img/hero-mobile-720.avif 720w"
            />
            <source
              type="image/avif"
              sizes="100vw"
              srcSet="/img/hero-wide-800.avif 800w, /img/hero-wide-1280.avif 1280w"
            />
          </>
        )}
        <Photo
          className="hero-image"
          asset={banners[index]}
          sizes="100vw"
          priority={index === 0}
          loading="eager"
        />
      </picture>
      <div className="hero-inner">
        <button
          className="icon-button"
          onClick={() => change(-1)}
          aria-label="Previous banner"
        >
          <Icon name="left" size={30} />
        </button>
        <h1>Discover your ideal hotel</h1>
        <button
          className="icon-button"
          onClick={() => change(1)}
          aria-label="Next banner"
        >
          <Icon name="right" size={30} />
        </button>
      </div>
    </section>
  );
}

export function TopChoices() {
  const strip = useRef<HTMLDivElement>(null);
  const [city, setCity] = useState(choices[0].city);
  const [advanced, setAdvanced] = useState(false);
  const hotels =
    city === "Bali"
      ? topHotels
      : city === "Okinawa"
        ? [...topHotels.slice(1), topHotels[0]]
        : [...topHotels.slice(2), ...topHotels.slice(0, 2)];

  return (
    <section className="home-section top-choices" aria-labelledby="top-title">
      <h2 id="top-title">Top Choices</h2>
      <div
        className="choice-tabs"
        role="group"
        aria-label="Top choice destinations"
      >
        {choices.map((item) => (
          <button
            key={item.city}
            className="choice-tab"
            aria-pressed={city === item.city}
            onClick={() => {
              setCity(item.city);
              setAdvanced(false);
              strip.current?.scrollTo({ left: 0 });
            }}
          >
            {item.city}
            <sup>{item.count}</sup>
          </button>
        ))}
      </div>
      <div className="relative">
        <div className="top-strip strip" ref={strip}>
          {hotels.map((hotel) => (
            <article className="top-card" key={hotel.name}>
              <a
                href={
                  "/info/" +
                  [
                    "hotel-aqua",
                    "mr-kawasaki-inn",
                    "weekly-paradise",
                    "beast-hotel",
                  ][topHotels.indexOf(hotel)]
                }
              >
                <Photo
                  asset={hotel.photo}
                  alt=""
                  sizes="(min-width: 1100px) 255px, 240px"
                />
                <h3>{hotel.name}</h3>
              </a>
              <p className="top-rating">
                <Stars rating={hotel.rating} /> {hotel.rating.toFixed(1)}{" "}
                <span>・{hotel.reviews} reviews</span>
              </p>
              <p className="top-price">
                {money(hotel.price)}{" "}
                {"was" in hotel && <del>{money(hotel.was!)}</del>}
              </p>
            </article>
          ))}
        </div>
        <button
          className="icon-button carousel-button"
          aria-label={advanced ? "Previous hotels" : "Next hotels"}
          onClick={() => {
            strip.current?.scrollBy({
              left: advanced ? -288 : 288,
              behavior: "smooth",
            });
            setAdvanced(!advanced);
          }}
        >
          <Icon name={advanced ? "left" : "right"} size={21} />
        </button>
      </div>
    </section>
  );
}
