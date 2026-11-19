"use client";

import { useLayoutEffect, useRef, useState, type KeyboardEvent } from "react";
import { dateLabel, nightLabel } from "@/lib/catalog";
import { Icon } from "./icon";

export type StayDates = { checkIn: string; checkOut: string };

const dayMs = 86400000;
const monthFormatter = new Intl.DateTimeFormat("en-GB", {
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const firstMonth = Date.UTC(1900, 0);
const lastMonth = Date.UTC(2099, 11);

function iso(date: number) {
  return new Date(date).toISOString().slice(0, 10);
}

function monthOf(date: number, offset = 0) {
  const value = new Date(date);
  return Date.UTC(value.getUTCFullYear(), value.getUTCMonth() + offset);
}

function todayUtc() {
  const now = new Date();
  return Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
}

export function StayCalendar({
  value,
  onChange,
}: {
  value: StayDates;
  onChange: (value: StayDates) => void;
}) {
  const [today] = useState(todayUtc);
  const initial = value.checkIn ? Date.parse(value.checkIn) : today;
  const [month, setMonth] = useState(() => monthOf(initial));
  const [active, setActive] = useState(initial);
  const grid = useRef<HTMLDivElement>(null);
  const focusNext = useRef(false);
  const complete = value.checkOut > value.checkIn && Boolean(value.checkIn);
  const step =
    !value.checkIn || complete
      ? "Choose your check-in date"
      : "Choose your check-out date";
  const adjacent = monthOf(month, 1);

  useLayoutEffect(() => {
    if (!focusNext.current) return;
    focusNext.current = false;
    grid.current
      ?.querySelector<HTMLButtonElement>(
        "[data-calendar-day='" + iso(active) + "']",
      )
      ?.focus();
  }, [active, month]);

  function moveTo(date: number) {
    const next = monthOf(date);
    if (next < firstMonth || next > lastMonth) return;
    focusNext.current = true;
    setActive(date);
    if (
      next !== month &&
      (next !== adjacent || !window.matchMedia("(min-width: 768px)").matches)
    )
      setMonth(next);
  }

  function moveMonth(offset: number) {
    const next = monthOf(month, offset);
    setMonth(next);
    setActive(next);
  }

  function keyDay(event: KeyboardEvent<HTMLButtonElement>, date: number) {
    const weekday = new Date(date).getUTCDay();
    const offsets: Record<string, number> = {
      ArrowLeft: -1,
      ArrowRight: 1,
      ArrowUp: -7,
      ArrowDown: 7,
      Home: -weekday,
      End: 6 - weekday,
    };
    if (event.key in offsets) {
      event.preventDefault();
      moveTo(date + dayMs * offsets[event.key]);
    } else if (event.key === "PageUp" || event.key === "PageDown") {
      event.preventDefault();
      const target = monthOf(date, event.key === "PageUp" ? -1 : 1);
      const day = Math.min(
        new Date(date).getUTCDate(),
        (monthOf(target, 1) - target) / dayMs,
      );
      moveTo(target + (day - 1) * dayMs);
    }
  }

  function choose(date: number) {
    const id = iso(date);
    setActive(date);
    if (value.checkIn && !complete && id > value.checkIn)
      onChange({ ...value, checkOut: id });
    else onChange({ checkIn: id, checkOut: "" });
  }

  function renderMonth(start: number, secondary = false) {
    const firstDay = new Date(start).getUTCDay();
    const count = (monthOf(start, 1) - start) / dayMs;
    const weeks = Array.from(
      { length: Math.ceil((firstDay + count) / 7) },
      (_, row) => row,
    );
    const caption = monthFormatter.format(start);
    return (
      <table
        className={"calendar-month" + (secondary ? " calendar-month-next" : "")}
        role="grid"
        aria-label={caption}
      >
        <caption>{caption}</caption>
        <thead>
          <tr>
            {weekdays.map((day) => (
              <th key={day} scope="col" abbr={day}>
                {day.slice(0, 2)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weeks.map((row) => (
            <tr key={row}>
              {weekdays.map((day, column) => {
                const number = row * 7 + column - firstDay + 1;
                if (number < 1 || number > count) return <td key={day} />;
                const date = start + (number - 1) * dayMs;
                const id = iso(date);
                const endpoint = id === value.checkIn || id === value.checkOut;
                const inRange =
                  complete && id > value.checkIn && id < value.checkOut;
                return (
                  <td
                    key={day}
                    aria-selected={endpoint || inRange}
                    className={inRange ? "calendar-in-range" : undefined}
                  >
                    <button
                      type="button"
                      data-calendar-day={id}
                      aria-label={dateLabel(id, true)}
                      aria-current={date === today ? "date" : undefined}
                      className={endpoint ? "calendar-endpoint" : undefined}
                      tabIndex={date === active ? 0 : -1}
                      onKeyDown={(event) => keyDay(event, date)}
                      onClick={() => choose(date)}
                    >
                      {number}
                    </button>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  return (
    <div className="stay-calendar">
      <div className="calendar-selection" aria-live="polite">
        <div>
          <span>Check-in</span>
          <strong>
            {value.checkIn ? dateLabel(value.checkIn) : "Choose date"}
          </strong>
        </div>
        <div>
          <span>Check-out</span>
          <strong>
            {value.checkOut ? dateLabel(value.checkOut) : "Choose date"}
          </strong>
        </div>
      </div>
      <div className="calendar-grid" ref={grid}>
        <button
          type="button"
          className="icon-button calendar-previous"
          aria-label="Previous month"
          disabled={month <= firstMonth}
          onClick={() => moveMonth(-1)}
        >
          <Icon name="left" size={22} />
        </button>
        {renderMonth(month)}
        {adjacent <= lastMonth && renderMonth(adjacent, true)}
        <button
          type="button"
          className="icon-button calendar-next"
          aria-label="Next month"
          disabled={month >= lastMonth}
          onClick={() => moveMonth(1)}
        >
          <Icon name="right" size={22} />
        </button>
      </div>
      <p className="calendar-status" aria-live="polite">
        {complete
          ? nightLabel(
              (Date.parse(value.checkOut) - Date.parse(value.checkIn)) / dayMs,
            ) + " selected"
          : step}
      </p>
    </div>
  );
}
