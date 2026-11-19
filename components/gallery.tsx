"use client";

import { useRef, useState } from "react";
import { useSlides, useSwipe } from "./carousel";
import { Icon } from "./icon";
import { Photo } from "./photo";

export function Gallery({
  name,
  photos,
}: {
  name: string;
  photos: [asset: string, alt: string][];
}) {
  const preview = useSlides(photos.length);
  const lightbox = useSlides(photos.length);
  const previewSwipe = useSwipe(preview.advance);
  const lightboxSwipe = useSwipe(lightbox.advance);
  const [opened, setOpened] = useState(false);
  const gallery = useRef<HTMLDialogElement>(null);
  const [previewAsset, previewAlt] = photos[preview.index];
  const [asset, alt] = photos[lightbox.index];

  function show(start: number) {
    lightbox.goTo(start);
    setOpened(true);
    gallery.current?.showModal();
  }

  return (
    <>
      <div
        className="gallery"
        role="region"
        aria-label="Hotel photos"
        aria-roledescription="carousel"
        {...previewSwipe.handlers}
      >
        <button
          type="button"
          className="gallery-main"
          onClick={() => {
            if (previewSwipe.swiped.current) {
              previewSwipe.swiped.current = false;
              return;
            }
            show(preview.index);
          }}
          aria-label="Open hotel photo gallery"
        >
          <Photo
            key={previewAsset}
            className={preview.motionClass.trim() || undefined}
            asset={previewAsset}
            alt={previewAlt}
            sizes="(min-width: 1024px) 635px, (min-width: 768px) 55vw, 100vw"
            priority={preview.index === 0}
            loading="eager"
          />
        </button>
        {photos.slice(1, 4).map(([thumb, description], number) => (
          <button
            className={"gallery-thumb gallery-thumb-" + (number + 1)}
            type="button"
            key={thumb}
            onClick={() => show(number + 1)}
            aria-label={"View " + description}
          >
            <picture>
              <source
                media="(max-width: 767px)"
                srcSet="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
              />
              <Photo
                asset={thumb}
                sizes={
                  number === 0
                    ? "(min-width: 1024px) 465px, 45vw"
                    : "(min-width: 1024px) 230px, 22vw"
                }
              />
            </picture>
          </button>
        ))}
        <button className="button gallery-all" onClick={() => show(0)}>
          See all {photos.length} photos
        </button>
        <button
          className="icon-button gallery-previous"
          onClick={() => preview.advance(-1)}
          aria-label="Previous hotel photo"
        >
          <Icon name="left" />
        </button>
        <button
          className="icon-button gallery-next"
          onClick={() => preview.advance(1)}
          aria-label="Next hotel photo"
        >
          <Icon name="right" />
        </button>
      </div>
      <dialog
        className="panel-dialog gallery-dialog"
        ref={gallery}
        aria-labelledby="gallery-title"
        onClose={() => setOpened(false)}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            lightbox.advance(event.key === "ArrowRight" ? 1 : -1);
          }
        }}
      >
        <div className="dialog-heading">
          <h2 id="gallery-title">{name} photos</h2>
          <button
            className="icon-button"
            onClick={() => gallery.current?.close()}
            aria-label="Close gallery"
          >
            <Icon name="close" />
          </button>
        </div>
        {opened && (
          <div className="gallery-stage" {...lightboxSwipe.handlers}>
            <Photo
              key={asset}
              className={lightbox.motionClass.trim() || undefined}
              asset={asset}
              alt={alt}
              sizes="(min-width: 760px) 720px, 90vw"
              loading="eager"
            />
          </div>
        )}
        <div className="gallery-pagination">
          <button
            className="icon-button"
            onClick={() => lightbox.advance(-1)}
            aria-label="Previous photo"
          >
            <Icon name="left" />
          </button>
          <p aria-live="polite">
            {lightbox.index + 1} / {photos.length} · {alt}
          </p>
          <button
            className="icon-button"
            onClick={() => lightbox.advance(1)}
            aria-label="Next photo"
          >
            <Icon name="right" />
          </button>
        </div>
      </dialog>
    </>
  );
}
