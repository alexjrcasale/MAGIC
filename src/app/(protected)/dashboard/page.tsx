import { AppShell } from "@/components/app-shell";

export default function DashboardPage() {
  return (
    <AppShell>
      <h1>Dashboard</h1>
      <div className="grid">
        <section className="card">
          <h3>Leads em aberto</h3>
          <strong>24</strong>
        </section>
        <section className="card">
          <h3>Propostas pendentes</h3>
          <strong>7</strong>
        </section>
        <section className="card">
          <h3>Receita prevista (30d)</h3>
          <strong>R$ 128.400,00</strong>
        </section>
      </div>
    </AppShell>
  );
}
