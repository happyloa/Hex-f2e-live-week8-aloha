"use client";

import { useRef, useState } from "react";
import {
  cityCount,
  hotels,
  money,
  stayQuery,
  type Stay,
} from "@/lib/catalog";
import { Icon, Stars } from "./icon";
import { Photo } from "./photo";

const filterGroups = [
  {
    id: "deals",
    name: "Deals",
    options: ["Free cancellation", "No prepayment", "Special offers"],
  },
  {
    id: "features",
    name: "Popular Filter",
    options: ["Breakfast included", "Free Wi-Fi", "Swimming pool"],
  },
  {
    id: "ratings",
    name: "Rating",
    options: ["5", "4", "3", "2", "1", "Unrated"],
  },
  {
    id: "types",
    name: "Stay Type",
    options: ["Hotel", "Apartment", "Unique", "Hostel"],
  },
] as const;
type Group = (typeof filterGroups)[number]["id"];
type Filters = Record<Group, string[]> & { min: number; max: number };
const initialFilters: Filters = {
  deals: [],
  features: [],
  ratings: [],
  types: [],
  min: 800,
  max: 4000,
};
const sorts = [
  "Recommended",
  "Lowest Price",
  "Best Value",
  "Distance to City Center",
];

function FilterPanel({
  filters,
  onChange,
}: {
  filters: Filters;
  onChange: (filters: Filters) => void;
}) {
  return (
    <div className="filter-panel">
      {filterGroups.map((group, index) => (
        <div key={group.id}>
          {index === 2 && (
            <fieldset className="budget">
              <legend>Budget</legend>
              <div className="budget-track">
                <input
                  aria-label="Minimum budget"
                  type="range"
                  min="800"
                  max="4000"
                  step="10"
                  value={filters.min}
                  onChange={(event) =>
                    onChange({
                      ...filters,
                      min: Math.min(filters.max, Number(event.target.value)),
                    })
                  }
                />
                <input
                  aria-label="Maximum budget"
                  type="range"
                  min="800"
                  max="4000"
                  step="10"
                  value={filters.max}
                  onChange={(event) =>
                    onChange({
                      ...filters,
                      max: Math.max(filters.min, Number(event.target.value)),
                    })
                  }
                />
              </div>
              <div className="budget-inputs">
                <label>
                  Min price
                  <span>
                    <span>TWD</span>
                    <input
                      type="number"
                      min="0"
                      max={filters.max}
                      step="10"
                      value={filters.min}
                      onChange={(event) =>
                        onChange({
                          ...filters,
                          min: Math.max(
                            0,
                            Math.min(filters.max, Number(event.target.value)),
                          ),
                        })
                      }
                    />
                  </span>
                </label>
                <span aria-hidden="true">-</span>
                <label>
                  Max price
                  <span>
                    <span>TWD</span>
                    <input
                      type="number"
                      min={filters.min}
                      max="40000"
                      step="10"
                      value={filters.max}
                      onChange={(event) =>
                        onChange({
                          ...filters,
                          max: Math.max(
                            filters.min,
                            Number(event.target.value),
                          ),
                        })
                      }
                    />
                  </span>
                </label>
              </div>
            </fieldset>
          )}
          <fieldset className="filter-group">
            <legend>{group.name}</legend>
            {group.options.map((option) => {
              const selected = filters[group.id].includes(option);
              return (
                <label key={option}>
                  <input
                    type="checkbox"
                    checked={selected}
                    onChange={() =>
                      onChange({
                        ...filters,
                        [group.id]: selected
                          ? filters[group.id].filter(
                              (value) => value !== option,
                            )
                          : [...filters[group.id], option],
                      })
                    }
                  />
                  {group.id === "ratings" && option !== "Unrated" ? (
                    <>
                      <Stars rating={Number(option)} />
                      <span>{option}.0</span>
                    </>
                  ) : (
                    option
                  )}
                </label>
              );
            })}
          </fieldset>
        </div>
      ))}
    </div>
  );
}

function HotelCard({
  hotel,
  query,
  priority,
}: {
  hotel: (typeof hotels)[number];
  query: string;
  priority: boolean;
}) {
  const href = "/hotel/" + hotel.slug + "?" + query;
  return (
    <article className="hotel-card">
      <a className="hotel-photo" href={href} aria-label={hotel.name}>
        <Photo
          asset={hotel.photo}
          priority={priority}
          sizes="(min-width: 1024px) 255px, 150px"
        />
      </a>
      <div className="hotel-body">
        <div className="hotel-title">
          <p className="hotel-location">
            {hotel.area}, {hotel.city}<span>・{hotel.distance} km from center</span>
          </p>
          <h2>
            <a href={href}>{hotel.name}</a>
          </h2>
        </div>
        <p className="hotel-rating">
          <Stars rating={hotel.rating} />{" "}
          <span>
            {hotel.rating}.0 ({hotel.reviews})
          </span>
        </p>
        <div className="hotel-room">
          <p>
            <strong>{hotel.room}</strong>
            <br />
            <small>2 guests・{hotel.bed}</small>
          </p>
          <ul>
            {hotel.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </div>
        <div className="hotel-price">
          <small>per night</small>
          {hotel.was && <del>{money(hotel.was)}</del>}
          <strong>
            {hotel.was ? (
              <>
                TWD <span>{money(hotel.price).slice(4)}</span>
              </>
            ) : (
              money(hotel.price)
            )}
          </strong>
        </div>
      </div>
    </article>
  );
}

export function Results({ stay }: { stay: Stay }) {
  const [filters, setFilters] = useState(initialFilters);
  const [draft, setDraft] = useState(initialFilters);
  const [sort, setSort] = useState(0);
  const filterDialog = useRef<HTMLDialogElement>(null);
  const sortDialog = useRef<HTMLDialogElement>(null);
  const query = stayQuery(stay).toString();
  const cityHotels = hotels.filter((hotel) => hotel.city === stay.destination);
  const filterHotels = (values: Filters) =>
    cityHotels.filter((hotel) => {
      const dealTags = hotel.was
        ? [...hotel.tags, "Special offers"]
        : hotel.tags;
      return (
        values.deals.every((tag) => dealTags.includes(tag)) &&
        values.features.every((feature) => hotel.features.includes(feature)) &&
        (!values.ratings.length ||
          values.ratings.includes(String(hotel.rating))) &&
        (!values.types.length || values.types.includes(hotel.type)) &&
        (values.min === initialFilters.min || hotel.price >= values.min) &&
        (values.max === initialFilters.max || hotel.price <= values.max)
      );
    });
  const matching = filterHotels(filters);
  const compare = [
    () => 0,
    (a: (typeof hotels)[number], b: (typeof hotels)[number]) =>
      a.price - b.price,
    (a: (typeof hotels)[number], b: (typeof hotels)[number]) =>
      b.rating / b.price - a.rating / a.price,
    (a: (typeof hotels)[number], b: (typeof hotels)[number]) =>
      a.distance - b.distance,
  ];
  matching.sort(compare[sort]);
  const unfiltered = matching.length === cityHotels.length;
  const total = cityCount(stay.destination) ?? cityHotels.length;

  return (
    <div className="site-container results-layout">
      <h1>
        {stay.destination}
        {matching.length > 0 && (
          <sup>
            {unfiltered ? total.toLocaleString("en-US") : matching.length}
          </sup>
        )}
      </h1>
      <div className="mobile-result-controls">
        <button
          type="button"
          onClick={() => {
            setDraft(filters);
            filterDialog.current?.showModal();
          }}
        >
          <Icon name="filter" /> Filter
        </button>
        <button type="button" onClick={() => sortDialog.current?.showModal()}>
          <Icon name="sort" /> Sort
        </button>
      </div>
      <nav className="sort-controls" aria-label="Sort results">
        {sorts.map((label, index) => (
          <button
            type="button"
            key={label}
            aria-pressed={sort === index}
            onClick={() => setSort(index)}
          >
            {label}
          </button>
        ))}
      </nav>
      <aside className="desktop-filters" aria-label="Filter results">
        <FilterPanel filters={filters} onChange={setFilters} />
      </aside>
      <div className="result-list" aria-live="polite">
        {matching.map((hotel, index) => (
          <HotelCard
            hotel={hotel}
            key={hotel.slug}
            query={query}
            priority={index === 0}
          />
        ))}
        {matching.length === 0 && (
          <div className="empty-result">
            <h2>
              {cityHotels.length
                ? "No stays match these filters"
                : "No sample listings are available for this destination"}
            </h2>
            {cityHotels.length ? (
              <button
                className="button button-outline"
                onClick={() => setFilters(initialFilters)}
              >
                Clear filters
              </button>
            ) : (
              <a
                className="button button-outline"
                href={
                  "/results?" + stayQuery({ ...stay, destination: "Bangkok" })
                }
              >
                Explore Bangkok
              </a>
            )}
          </div>
        )}
        {unfiltered && (
          <nav className="pagination" aria-label="Result pages">
            <button
              className="button button-outline button-small"
              disabled
              aria-label="Previous page"
            >
              <span>Previous</span>
              <Icon name="left" size={20} />
            </button>
            <div className="page-numbers">
              <span aria-current="page">1</span>
              {[2, 3, 4, 5, 6].map((page) => (
                <a
                  href={"/info/result-page?page=" + page}
                  key={page}
                  aria-label={"Page " + page}
                >
                  {page}
                </a>
              ))}
              <span>…</span>
              <a href="/info/result-page?page=9" aria-label="Page 9">
                9
              </a>
            </div>
            <a
              className="button button-small"
              href="/info/result-page?page=2"
              aria-label="Next page"
            >
              <span>Next</span>
              <Icon name="right" size={20} />
            </a>
          </nav>
        )}
      </div>
      <dialog
        ref={filterDialog}
        className="mobile-filter-dialog"
        aria-labelledby="filter-title"
      >
        <div className="dialog-heading">
          <h2 id="filter-title">
            <Icon name="filter" size={20} /> Filter
          </h2>
          <button
            className="icon-button"
            aria-label="Close filters"
            onClick={() => filterDialog.current?.close()}
          >
            <Icon name="close" />
          </button>
        </div>
        <div className="mobile-filter-fields">
          <FilterPanel filters={draft} onChange={setDraft} />
        </div>
        <div className="mobile-filter-actions">
          <h3>
            Find{" "}
            {filterHotels(draft).length}{" "}
            results
          </h3>
          <button
            className="button button-outline"
            onClick={() => setDraft(initialFilters)}
          >
            Clear
          </button>
          <button
            className="button"
            onClick={() => {
              setFilters(draft);
              filterDialog.current?.close();
            }}
          >
            Filter
          </button>
        </div>
      </dialog>
      <dialog
        ref={sortDialog}
        className="panel-dialog"
        aria-labelledby="sort-title"
      >
        <div className="dialog-heading">
          <h2 id="sort-title">Sort</h2>
          <button
            className="icon-button"
            aria-label="Close sort options"
            onClick={() => sortDialog.current?.close()}
          >
            <Icon name="close" />
          </button>
        </div>
        <div className="mobile-sort-options">
          {sorts.map((label, index) => (
            <button
              key={label}
              aria-pressed={sort === index}
              onClick={() => {
                setSort(index);
                sortDialog.current?.close();
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </dialog>
    </div>
  );
}
