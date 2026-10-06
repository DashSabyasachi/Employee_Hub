import { Link } from "react-router-dom";
import { pages } from "../pages.js";

export default function Home() {
  return (
    <main className="card home">
      <h1>Employee Hub</h1>
      <p className="sub">Choose a page to open.</p>
      <nav className="menu">
        {pages.map(p => (
          <Link key={p.path} to={p.path}>
            {p.name}
            <small>{p.desc}</small>
          </Link>
        ))}
      </nav>
    </main>
  );
}
