"use client";

import { useEffect, useRef, useState } from "react";
import {
  choices,
  defaultStay,
  money,
  stayQuery,
  topHotels,
} from "@/lib/catalog";
import {
  CardCarousel,
  useReducedMotion,
  useSlides,
  useSwipe,
} from "./carousel";
import { Icon, Stars } from "./icon";
import { Photo } from "./photo";

const banners = ["index-banner", "osaka", "bangkok"];

export function Hero() {
  const hero = useRef<HTMLElement>(null);
  const { index, advance, motionClass } = useSlides(banners.length);
  const { handlers } = useSwipe(advance);
  const prefersReducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [paused, setPaused] = useState(false);
  const asset = banners[index];

  useEffect(() => {
    if (!hero.current || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.15 },
    );
    observer.observe(hero.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || hovered || focused || paused || prefersReducedMotion)
      return;
    const timer = window.setInterval(() => {
      if (!document.hidden) advance(1);
    }, 6500);
    return () => window.clearInterval(timer);
  }, [advance, visible, hovered, focused, paused, prefersReducedMotion]);

  return (
    <section
      className="hero"
      aria-label="Hotel inspiration"
      aria-roledescription="carousel"
      ref={hero}
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") setHovered(true);
      }}
      onPointerLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          setFocused(false);
      }}
      {...handlers}
    >
      <picture key={asset} className={motionClass.trim() || undefined}>
        {index === 0 ? (
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
        ) : (
          <>
            <source
              media="(max-width: 767px)"
              type="image/avif"
              srcSet={"/img/hero-" + asset + "-mobile.avif"}
            />
            <source
              type="image/avif"
              srcSet={"/img/hero-" + asset + "-wide.avif"}
            />
          </>
        )}
        <Photo
          className="hero-image"
          asset={asset}
          sizes="100vw"
          priority={index === 0}
          loading="eager"
        />
      </picture>
      <div className="hero-inner">
        <button
          type="button"
          className="icon-button"
          onClick={() => advance(-1)}
          aria-label="Previous banner"
        >
          <Icon name="left" size={30} />
        </button>
        <h1>Discover your ideal hotel</h1>
        <button
          type="button"
          className="icon-button"
          onClick={() => advance(1)}
          aria-label="Next banner"
        >
          <Icon name="right" size={30} />
        </button>
      </div>
      {!prefersReducedMotion && (
        <button
          type="button"
          className="icon-button hero-playback"
          aria-label={paused ? "Play banner autoplay" : "Pause banner autoplay"}
          onClick={() => setPaused(!paused)}
        >
          <Icon name={paused ? "play" : "pause"} size={17} />
        </button>
      )}
    </section>
  );
}

export function TopChoices() {
  const [selected, setSelected] = useState(0);
  const hotels = [
    ...topHotels.slice(selected),
    ...topHotels.slice(0, selected),
  ];

  return (
    <section
      className="home-section top-choices"
      aria-labelledby="top-title"
      data-reveal
    >
      <h2 id="top-title">Top Choices</h2>
      <div
        className="choice-tabs"
        role="group"
        aria-label="Top choice destinations"
      >
        {choices.map((item, index) => (
          <button
            key={item.city}
            className="choice-tab"
            aria-pressed={selected === index}
            onClick={() => setSelected(index)}
          >
            {item.city}
            <sup>{item.count}</sup>
          </button>
        ))}
      </div>
      <CardCarousel key={selected} variant="top" label="hotels">
        {hotels.map((hotel) => (
          <article className="top-card" key={hotel.name}>
            <a
              href={
                "/hotel/" +
                hotel.slug +
                "?" +
                stayQuery({ ...defaultStay, destination: hotel.city })
              }
            >
              <Photo
                asset={hotel.photo}
                alt=""
                sizes="(min-width: 1100px) 255px, (min-width: 768px) 270px, 240px"
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
      </CardCarousel>
    </section>
  );
}
