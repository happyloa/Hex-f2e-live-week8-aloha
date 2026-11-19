"use client";

export function LoginForm() {
  return (
    <form
      className="login-form"
      onSubmit={(event) => {
        event.preventDefault();
        window.location.assign("/member");
      }}
    >
      <h1>Login</h1>
      <label className="field">
        Email
        <input type="email" autoComplete="username" required />
      </label>
      <label className="field">
        Passwords
        <input type="password" autoComplete="current-password" required />
      </label>
      <p className="login-terms">
        By signing in or creating an account, you agree with our{" "}
        <a href="/info/terms-of-use">Terms &amp; Conditions</a> and{" "}
        <a href="/info/privacy-policy">Privacy Statement</a>
      </p>
      <label className="remember">
        <input type="checkbox" defaultChecked /> Remember me
      </label>
      <button className="button w-full" type="submit">
        Login
      </button>
      <p className="login-signup">
        Don’t have an account yet? <a href="/info/sign-up">Sign up</a>
      </p>
    </form>
  );
}
