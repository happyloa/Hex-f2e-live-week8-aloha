"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type TouchEvent,
} from "react";
import { Icon } from "./icon";

type Direction = -1 | 1;

export function useSlides(count: number) {
  const [slide, setSlide] = useState({ index: 0, direction: 0 });
  const advance = useCallback(
    (direction: Direction) => {
      setSlide(({ index }) => ({
        index: (index + direction + count) % count,
        direction,
      }));
    },
    [count],
  );
  const goTo = (index: number) => setSlide({ index, direction: 0 });
  const motionClass =
    slide.direction === 0
      ? ""
      : slide.direction === 1
        ? " slide-forward"
        : " slide-backward";
  return { ...slide, advance, goTo, motionClass };
}

export function useSwipe(advance: (direction: Direction) => void) {
  const start = useRef<{ x: number; y: number } | null>(null);
  const swiped = useRef(false);

  return {
    swiped,
    handlers: {
      onTouchStart(event: TouchEvent) {
        swiped.current = false;
        const touch = event.touches[0];
        start.current =
          event.touches.length === 1
            ? { x: touch.clientX, y: touch.clientY }
            : null;
      },
      onTouchEnd(event: TouchEvent) {
        const first = start.current;
        start.current = null;
        const touch = event.changedTouches[0];
        if (!first || !touch) return;
        const x = touch.clientX - first.x;
        if (
          Math.abs(x) < 48 ||
          Math.abs(x) <= Math.abs(touch.clientY - first.y)
        )
          return;
        swiped.current = true;
        advance(x < 0 ? 1 : -1);
      },
      onTouchCancel() {
        start.current = null;
      },
    },
  };
}

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const setting = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(setting.matches);
    apply();
    setting.addEventListener("change", apply);
    return () => setting.removeEventListener("change", apply);
  }, []);
  return reduced;
}

export function CardCarousel({
  variant,
  label,
  children,
}: {
  variant: "top" | "story";
  label: string;
  children: ReactNode;
}) {
  const strip = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: true, end: true });
  const reduced = useReducedMotion();
  const checkEdges = useCallback(() => {
    const track = strip.current;
    if (!track) return;
    const start = track.scrollLeft < 3;
    const end = track.scrollLeft + track.clientWidth >= track.scrollWidth - 3;
    setEdges((previous) =>
      previous.start === start && previous.end === end
        ? previous
        : { start, end },
    );
  }, []);

  useEffect(() => {
    if (!strip.current) return;
    const observer = new ResizeObserver(checkEdges);
    observer.observe(strip.current);
    checkEdges();
    return () => observer.disconnect();
  }, [checkEdges]);

  function scroll(direction: Direction) {
    const track = strip.current;
    const card = track?.firstElementChild;
    if (!track || !card) return;
    const gap = Number.parseFloat(getComputedStyle(track).columnGap);
    track.scrollBy({
      left: direction * (card.getBoundingClientRect().width + gap),
      behavior: reduced ? "instant" : "smooth",
    });
  }

  const overflowing = !(edges.start && edges.end);
  return (
    <div className="card-carousel">
      <div
        ref={strip}
        className={variant + "-strip strip"}
        tabIndex={overflowing ? 0 : undefined}
        role="region"
        aria-label={label}
        onScroll={checkEdges}
        onKeyDown={(event) => {
          if (event.target !== event.currentTarget || !overflowing) return;
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            scroll(event.key === "ArrowRight" ? 1 : -1);
          }
        }}
      >
        {children}
      </div>
      {overflowing && (
        <>
          <button
            type="button"
            className="icon-button card-carousel-control card-carousel-prev"
            disabled={edges.start}
            aria-label={"Previous " + label}
            onClick={() => scroll(-1)}
          >
            <Icon name="left" size={20} />
          </button>
          <button
            type="button"
            className="icon-button card-carousel-control card-carousel-next"
            disabled={edges.end}
            aria-label={"Next " + label}
            onClick={() => scroll(1)}
          >
            <Icon name="right" size={20} />
          </button>
        </>
      )}
    </div>
  );
}
