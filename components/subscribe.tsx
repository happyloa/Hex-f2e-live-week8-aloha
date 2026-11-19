"use client";

import { useState } from "react";

export function Subscribe({ wide }: { wide: boolean }) {
  const [subscribed, setSubscribed] = useState(false);

  return (
    <section
      className={"subscribe" + (wide ? " subscribe-wide" : "")}
      aria-labelledby="subscribe-title"
    >
      <div className="site-container subscribe-row">
        <h2 id="subscribe-title">Subscribe for Exclusive Offer</h2>
        <form
          className="subscribe-form"
          onSubmit={(event) => {
            event.preventDefault();
            setSubscribed(true);
          }}
        >
          <label className="sr-only" htmlFor="subscribe-email">
            Your email address
          </label>
          <input
            id="subscribe-email"
            type="email"
            placeholder="Your email address"
            autoComplete="email"
            required
          />
          <button className="button" type="submit">
            Subscribe
          </button>
          {subscribed && (
            <p className="subscribe-status" role="status">
              Thanks for trying the subscription demo.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
