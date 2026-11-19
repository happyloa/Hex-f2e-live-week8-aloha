"use client";

import { useRef, useState } from "react";
import {
  choices,
  dateLabel,
  defaultStay,
  destinations,
  guestLabel,
  locationLabel,
  stayQuery,
  type Stay,
} from "@/lib/catalog";
import { Icon, type IconName } from "./icon";

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
  const [edited, setEdited] = useState<Field[]>([]);
  const [open, setOpen] = useState<Field>();
  const dialog = useRef<HTMLDialogElement>(null);
  const hasValue = (field: Field) => stay || edited.includes(field);
  const dateRange =
    dateLabel(values.checkIn) + " - " + dateLabel(values.checkOut);
  const labels = {
    destination: locationLabel(values.destination),
    dates: dateRange,
    guests: guestLabel(values),
  };
  const isValid = values.checkOut > values.checkIn;

  function show(field: Field) {
    setOpen(field);
    dialog.current?.showModal();
  }

  function setValue<K extends keyof Stay>(key: K, value: Stay[K]) {
    setValues((previous) => ({ ...previous, [key]: value }));
  }

  function submit() {
    if (!isValid) {
      show("dates");
      return;
    }
    window.location.assign("/results?" + stayQuery(values));
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
            {fields.map(({ id, title }) => (
              <button
                type="button"
                key={id}
                onClick={() => show(id)}
                aria-label={"Change " + title}
              >
                {id === "destination" ? values.destination : labels[id]}
              </button>
            ))}
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
              onClick={() => show(id)}
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
          <button className="button" type="button" onClick={submit}>
            Search
          </button>
        </div>
        <dialog
          ref={dialog}
          className="panel-dialog search-dialog"
          aria-labelledby="search-dialog-title"
        >
          <div className="dialog-heading">
            <h2 id="search-dialog-title">
              {fields.find(({ id }) => id === open)?.title ?? "Search stays"}
            </h2>
            <button
              className="icon-button"
              onClick={() => dialog.current?.close()}
              aria-label="Close search options"
            >
              <Icon name="close" />
            </button>
          </div>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              if (open && (open !== "dates" || isValid)) {
                setEdited((previous) => [...previous, open]);
                if (stay) submit();
                else dialog.current?.close();
              }
            }}
          >
            {open === "destination" && (
              <label className="field">
                Destination
                <select
                  value={values.destination}
                  onChange={(event) =>
                    setValue("destination", event.target.value)
                  }
                >
                  {[
                    ...destinations.map(({ city }) => city),
                    ...choices.map(({ city }) => city),
                  ].map((city) => (
                    <option key={city} value={city}>
                      {locationLabel(city)}
                    </option>
                  ))}
                </select>
              </label>
            )}
            {open === "dates" && (
              <>
                <label className="field">
                  Check-in
                  <input
                    type="date"
                    value={values.checkIn}
                    onChange={(event) =>
                      event.target.value &&
                      setValue("checkIn", event.target.value)
                    }
                    required
                  />
                </label>
                <label className="field">
                  Check-out
                  <input
                    type="date"
                    value={values.checkOut}
                    onChange={(event) =>
                      event.target.value &&
                      setValue("checkOut", event.target.value)
                    }
                    required
                  />
                </label>
                {!isValid && (
                  <p className="form-error" role="alert">
                    Check-out must be after check-in.
                  </p>
                )}
              </>
            )}
            {open === "guests" && (
              <>
                <label className="field">
                  Adults
                  <select
                    value={values.adults}
                    onChange={(event) =>
                      setValue("adults", Number(event.target.value))
                    }
                  >
                    {Array.from({ length: 8 }, (_, index) => (
                      <option key={index}>{index + 1}</option>
                    ))}
                  </select>
                </label>
                <label className="field">
                  Rooms
                  <select
                    value={values.rooms}
                    onChange={(event) =>
                      setValue("rooms", Number(event.target.value))
                    }
                  >
                    {Array.from({ length: 5 }, (_, index) => (
                      <option key={index}>{index + 1}</option>
                    ))}
                  </select>
                </label>
              </>
            )}
            <button
              type="submit"
              className="button w-full"
              disabled={open === "dates" && !isValid}
            >
              {stay ? "Search" : "Apply"}
            </button>
          </form>
        </dialog>
      </div>
    </div>
  );
}
