import Link from "next/link";

const menu = [
  ["Dashboard", "/dashboard"],
  ["Leads", "/leads"],
  ["Propostas", "/proposals"],
  ["Reservas", "/bookings"],
  ["Financeiro", "/finance"]
];

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", minHeight: "100vh" }}>
      <aside style={{ background: "#020617", color: "#e2e8f0", padding: "1rem" }}>
        <h2>Magic Travel</h2>
        <nav style={{ display: "grid", gap: ".5rem" }}>
          {menu.map(([label, href]) => (
            <Link key={href} href={href} style={{ color: "#e2e8f0", textDecoration: "none" }}>
              {label}
            </Link>
          ))}
        </nav>
      </aside>
      <main>
        <header style={{ borderBottom: "1px solid #e2e8f0", padding: "1rem", background: "white" }}>
          Fundação M1 — Auth + RBAC + Base
        </header>
        <div className="container">{children}</div>
      </main>
    </div>
  );
}
