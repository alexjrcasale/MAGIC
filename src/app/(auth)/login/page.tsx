export default function LoginPage() {
  return (
    <main className="container">
      <div className="card" style={{ maxWidth: 420, margin: "3rem auto" }}>
        <h1>Entrar</h1>
        <p>Use o provedor de autenticação configurado (NextAuth) após instalar dependências.</p>
        <form style={{ display: "grid", gap: ".75rem" }}>
          <input placeholder="Email" type="email" />
          <input placeholder="Senha" type="password" />
          <button type="submit">Entrar</button>
        </form>
      </div>
    </main>
  );
}
