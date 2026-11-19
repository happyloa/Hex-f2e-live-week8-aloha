import { Icon } from "@/components/icon";
import { LoginForm } from "@/components/login-form";
import { Photo } from "@/components/photo";
import { Header } from "@/components/site-shell";
import "../account.css";

export const metadata = { title: "Login" };

export default function LoginPage() {
  return (
    <div className="login-page">
      <Header login />
      <main id="main" className="site-container login-layout">
        <picture className="login-image-wrap">
          <source
            media="(max-width: 767px)"
            srcSet="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
          />
          <Photo
            asset="login"
            className="login-image"
            priority
            sizes="(min-width: 1024px) 64vw, 100vw"
          />
        </picture>
        <div className="login-promo">
          <h2>An ideal hotel makes a wonderful Trip.</h2>
          <p>Discover your dream destination and hotel on ALOHA.com</p>
        </div>
        <a className="login-location" href="/results?destination=Osaka">
          <Icon name="pin" size={20} /> Osaka Castel, Japan
        </a>
        <LoginForm />
      </main>
    </div>
  );
}
