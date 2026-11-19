"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { choices, destinations, locationLabel } from "@/lib/catalog";
import { Icon } from "./icon";

const cities = [
  ...destinations.map(({ city }) => city),
  ...choices.map(({ city }) => city),
];
const normalize = (text: string) =>
  text
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();

export function DestinationOptions({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const listId = useId();
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(() => Math.max(0, cities.indexOf(value)));
  const list = useRef<HTMLDivElement>(null);
  const matching = cities.filter((city) =>
    normalize(locationLabel(city)).includes(normalize(query.trim())),
  );
  const choose = (city: string) => {
    onChange(city);
    setQuery("");
    setIndex(cities.indexOf(city));
  };

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (!matching.length) return;
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const next =
        (index + (event.key === "ArrowDown" ? 1 : -1) + matching.length) %
        matching.length;
      setIndex(next);
      list.current?.children[next]?.scrollIntoView({ block: "nearest" });
    } else if (event.key === "Enter") {
      event.preventDefault();
      choose(matching[index]);
    }
  }

  return (
    <div className="destination-picker">
      <label className="destination-search">
        <Icon name="search" size={20} />
        <span className="sr-only">Search cities or countries</span>
        <input
          data-picker-focus
          type="text"
          role="combobox"
          aria-expanded="true"
          aria-autocomplete="list"
          aria-controls={listId}
          aria-activedescendant={
            matching.length ? listId + "-" + index : undefined
          }
          autoComplete="off"
          placeholder="Search cities or countries"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setIndex(0);
            if (list.current) list.current.scrollTop = 0;
          }}
          onKeyDown={onKeyDown}
        />
      </label>
      <div
        className="destination-options"
        role="listbox"
        aria-label="Destinations"
        id={listId}
        ref={list}
      >
        {matching.map((city, position) => (
          <div
            key={city}
            role="option"
            aria-selected={value === city}
            id={listId + "-" + position}
            data-active={position === index}
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => choose(city)}
          >
            <span className="destination-option-icon">
              <Icon name="pin" size={18} />
            </span>
            <span>{locationLabel(city)}</span>
            {value === city && <Icon name="check" size={18} />}
          </div>
        ))}
      </div>
      {!matching.length && (
        <p className="destination-empty" role="status">
          No destinations match your search.
        </p>
      )}
    </div>
  );
}

export function GuestOptions({
  adults,
  rooms,
  onChange,
}: {
  adults: number;
  rooms: number;
  onChange: (field: "adults" | "rooms", value: number) => void;
}) {
  const settings = [
    {
      field: "adults",
      title: "Adults",
      name: "adult",
      icon: "person",
      value: adults,
      max: 8,
    },
    {
      field: "rooms",
      title: "Rooms",
      name: "room",
      icon: "bed",
      value: rooms,
      max: 5,
    },
  ] as const;
  return (
    <div className="guest-options">
      {settings.map(({ field, title, name, icon, value, max }) => (
        <div key={field} className="guest-option">
          <span className="guest-option-icon">
            <Icon name={icon} size={20} />
          </span>
          <strong>{title}</strong>
          <button
            type="button"
            className="icon-button"
            aria-label={"Remove one " + name}
            disabled={value === 1}
            onClick={() => onChange(field, value - 1)}
          >
            <Icon name="minus" size={19} />
          </button>
          <output aria-label={title + " selected"}>{value}</output>
          <button
            type="button"
            className="icon-button"
            aria-label={"Add one " + name}
            disabled={value === max}
            onClick={() => onChange(field, value + 1)}
          >
            <Icon name="plus" size={19} />
          </button>
        </div>
      ))}
    </div>
  );
}
