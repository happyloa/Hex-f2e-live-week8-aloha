"use client";

import { useId, useLayoutEffect, useRef, useState } from "react";
import {
  dateLabel,
  defaultStay,
  guestLabel,
  locationLabel,
  stayQuery,
  type Stay,
} from "@/lib/catalog";
import { Icon, type IconName } from "./icon";
import { StayCalendar } from "./stay-calendar";
import { DestinationOptions, GuestOptions } from "./stay-options";

type Field = "destination" | "dates" | "guests";
const fields: { id: Field; title: string; icon: IconName }[] = [
  { id: "destination", title: "Destination", icon: "pin" },
  { id: "dates", title: "Check-in / Check-out", icon: "calendar" },
  { id: "guests", title: "Guests", icon: "person" },
];

export function SearchBar({
  stay,
  detail = false,
}: {
  stay?: Stay;
  detail?: boolean;
}) {
  const [values, setValues] = useState(stay ?? defaultStay);
  const [draft, setDraft] = useState(values);
  const [edited, setEdited] = useState<Field[]>([]);
  const [open, setOpen] = useState<Field>();
  const dialog = useRef<HTMLDialogElement>(null);
  const anchor = useRef<HTMLButtonElement>(null);
  const headingId = useId();
  const dialogId = useId();
  const hasValue = (field: Field) => Boolean(stay) || edited.includes(field);
  const labels = {
    destination: locationLabel(values.destination),
    dates: dateLabel(values.checkIn) + " - " + dateLabel(values.checkOut),
    guests: guestLabel(values),
  };

  useLayoutEffect(() => {
    const panel = dialog.current;
    const trigger = anchor.current;
    if (!open || !panel || !trigger) return;

    const placePanel = () => {
      if (window.innerWidth < 768) return;
      const bounds = trigger.getBoundingClientRect();
      const { width, height } = panel.getBoundingClientRect();
      const right = window.innerWidth - width - 12;
      const bottom = window.innerHeight - height - 12;
      const fitsBelow = bounds.bottom + height + 20 <= window.innerHeight;
      const above = bounds.top - height - 8;
      const top = fitsBelow ? bounds.bottom + 8 : above >= 12 ? above : bottom;
      panel.style.setProperty(
        "--picker-left",
        Math.max(12, Math.min(bounds.left, right)) + "px",
      );
      panel.style.setProperty("--picker-top", Math.max(12, top) + "px");
    };

    if (!panel.open) panel.showModal();
    placePanel();
    if (
      open === "destination" &&
      window.matchMedia("(min-width: 768px)").matches
    ) {
      panel
        .querySelector<HTMLInputElement>("[data-picker-focus]")
        ?.focus({ preventScroll: true });
    }
    const observer = new ResizeObserver(placePanel);
    observer.observe(panel);
    window.addEventListener("resize", placePanel);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", placePanel);
    };
  }, [open]);

  function show(field: Field, trigger: HTMLButtonElement) {
    anchor.current = trigger;
    setDraft(
      field === "dates" && !hasValue(field)
        ? { ...values, checkIn: "", checkOut: "" }
        : values,
    );
    setOpen(field);
  }

  function search(next: Stay) {
    window.location.assign("/results?" + stayQuery(next));
  }

  function apply() {
    if (!open || !draft.checkIn || draft.checkOut <= draft.checkIn) return;
    if (stay) search(draft);
    else {
      setValues(draft);
      setEdited((previous) =>
        previous.includes(open) ? previous : [...previous, open],
      );
      dialog.current?.close();
    }
  }

  return (
    <div className={stay ? "search-band" : "home-search"}>
      <div className={stay ? "site-container search-wrap" : "search-wrap"}>
        {stay && (
          <div
            className={"mobile-stay" + (detail ? " mobile-stay-detail" : "")}
          >
            {detail && (
              <a
                href={"/results?" + stayQuery(values)}
                aria-label="Back to search results"
              >
                <Icon name="back" size={20} />
              </a>
            )}
            {fields.map(({ id, title }) => {
              const label =
                id === "destination" ? values.destination : labels[id];
              return (
                <button
                  type="button"
                  key={id}
                  aria-haspopup="dialog"
                  aria-expanded={open === id}
                  aria-controls={dialogId}
                  onClick={(event) => show(id, event.currentTarget)}
                  aria-label={label + ", change " + title}
                >
                  {label}
                </button>
              );
            })}
          </div>
        )}
        <div
          className="search-controls"
          role="search"
          aria-label="Search stays"
        >
          {fields.map(({ id, title, icon }) => (
            <button
              type="button"
              className="search-option"
              key={id}
              aria-haspopup="dialog"
              aria-expanded={open === id}
              aria-controls={dialogId}
              onClick={(event) => show(id, event.currentTarget)}
            >
              <Icon name={icon} />
              {hasValue(id) && id === "dates" && stay ? (
                <span className="search-dates">
                  <span>
                    <b>Check-in</b>
                    {dateLabel(values.checkIn)}
                  </span>
                  <span>
                    <b>Check-out</b>
                    {dateLabel(values.checkOut)}
                  </span>
                </span>
              ) : (
                <span>
                  {hasValue(id) && stay && <b>{title}</b>}
                  {hasValue(id) ? labels[id] : title}
                </span>
              )}
            </button>
          ))}
          <button
            className="button"
            type="button"
            onClick={() => search(values)}
          >
            Search
          </button>
        </div>
        <dialog
          id={dialogId}
          ref={dialog}
          className={
            "panel-dialog search-dialog search-dialog-" +
            (open ?? "destination")
          }
          aria-labelledby={headingId}
          onClose={() => {
            setOpen(undefined);
            anchor.current?.focus({ preventScroll: true });
          }}
          onClick={(event) => {
            if (event.target !== event.currentTarget) return;
            const bounds = event.currentTarget.getBoundingClientRect();
            if (
              event.clientX < bounds.left ||
              event.clientX > bounds.right ||
              event.clientY < bounds.top ||
              event.clientY > bounds.bottom
            )
              event.currentTarget.close();
          }}
        >
          {open && (
            <form
              onSubmit={(event) => {
                event.preventDefault();
                apply();
              }}
            >
              <div className="dialog-heading">
                <h2 id={headingId}>
                  {fields.find(({ id }) => id === open)?.title}
                </h2>
                <button
                  className="icon-button"
                  type="button"
                  onClick={() => dialog.current?.close()}
                  aria-label="Close search options"
                >
                  <Icon name="close" size={21} />
                </button>
              </div>
              {open === "destination" && (
                <DestinationOptions
                  value={draft.destination}
                  onChange={(destination) =>
                    setDraft({ ...draft, destination })
                  }
                />
              )}
              {open === "dates" && (
                <StayCalendar
                  value={draft}
                  onChange={(range) => setDraft({ ...draft, ...range })}
                />
              )}
              {open === "guests" && (
                <GuestOptions
                  adults={draft.adults}
                  rooms={draft.rooms}
                  onChange={(field, count) =>
                    setDraft({ ...draft, [field]: count })
                  }
                />
              )}
              <div className="search-dialog-action">
                <button
                  type="submit"
                  className="button w-full"
                  disabled={
                    open === "dates" &&
                    (!draft.checkIn || draft.checkOut <= draft.checkIn)
                  }
                >
                  {stay ? "Search" : "Apply"}
                </button>
              </div>
            </form>
          )}
        </dialog>
      </div>
    </div>
  );
}
