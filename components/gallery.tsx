"use client";

import { useRef, useState } from "react";
import { Icon } from "./icon";
import { Photo } from "./photo";

const photos = [
  ["rachada1", "Guest suite with dark walls and a queen bed"],
  ["rachada2", "Swimming pool surrounded by greenery"],
  ["rachada3", "Lounge chair by the window"],
  ["rachada4", "Seating area at Rachada Hotel"],
  ["rooma", "Deluxe Double Room A"],
  ["roomb", "Deluxe Double Room B"],
];

export function Gallery() {
  const [index, setIndex] = useState(0);
  const gallery = useRef<HTMLDialogElement>(null);
  const change = (step: number) =>
    setIndex((current) => (current + step + photos.length) % photos.length);
  const show = (start: number) => {
    setIndex(start);
    gallery.current?.showModal();
  };
  const [asset, alt] = photos[index];
  return (
    <>
      <div className="gallery">
        <button
          type="button"
          className="gallery-main"
          onClick={() => show(0)}
          aria-label="Open hotel photo gallery"
        >
          <Photo
            asset={asset}
            alt={alt}
            sizes="(min-width: 1024px) 635px, (min-width: 768px) 55vw, 100vw"
            priority={index === 0}
          />
        </button>
        {photos.slice(1, 4).map(([name, description], number) => (
          <button
            className={"gallery-thumb gallery-thumb-" + (number + 1)}
            type="button"
            key={name}
            onClick={() => show(number + 1)}
            aria-label={"View " + description}
          >
            <Photo
              asset={name}
              alt=""
              loading="eager"
              sizes={
                number === 0
                  ? "(min-width: 1024px) 465px, 45vw"
                  : "(min-width: 1024px) 230px, 22vw"
              }
            />
          </button>
        ))}
        <button className="button gallery-all" onClick={() => show(0)}>
          See all {photos.length} photos
        </button>
        <button
          className="icon-button gallery-previous"
          onClick={() => change(-1)}
          aria-label="Previous hotel photo"
        >
          <Icon name="left" />
        </button>
        <button
          className="icon-button gallery-next"
          onClick={() => change(1)}
          aria-label="Next hotel photo"
        >
          <Icon name="right" />
        </button>
      </div>
      <dialog
        className="panel-dialog gallery-dialog"
        ref={gallery}
        aria-labelledby="gallery-title"
      >
        <div className="dialog-heading">
          <h2 id="gallery-title">Rachada Hotel photos</h2>
          <button
            className="icon-button"
            onClick={() => gallery.current?.close()}
            aria-label="Close gallery"
          >
            <Icon name="close" />
          </button>
        </div>
        <Photo
          asset={asset}
          alt={alt}
          sizes="(min-width: 760px) 720px, 90vw"
          loading="eager"
        />
        <div className="gallery-pagination">
          <button
            className="icon-button"
            onClick={() => change(-1)}
            aria-label="Previous photo"
          >
            <Icon name="left" />
          </button>
          <p aria-live="polite">
            {index + 1} / {photos.length} · {alt}
          </p>
          <button
            className="icon-button"
            onClick={() => change(1)}
            aria-label="Next photo"
          >
            <Icon name="right" />
          </button>
        </div>
      </dialog>
    </>
  );
}
