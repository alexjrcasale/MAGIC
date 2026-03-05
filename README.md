# Magic Travel SaaS

Base do M1 para o sistema de gestão da agência de viagens (Magic Travel).

## Stack (M1)
- Next.js App Router + TypeScript
- PostgreSQL + Prisma
- NextAuth (estrutura base)
- Docker Compose para `app` e `db`

## Como rodar (local)
1. Copie ambiente:
   ```bash
   cp .env.example .env
   ```
2. Instale dependências:
   ```bash
   npm install
   ```
3. Rode o banco e aplicação:
   ```bash
   docker compose up --build
   ```
4. Em outro terminal, execute migração/seed:
   ```bash
   npm run db:migrate
   npm run db:seed
   ```

## Scripts
- `npm run dev` — desenvolvimento
- `npm run test` — testes automatizados mínimos de RBAC/env/auditoria
- `npm run typecheck` — validação TypeScript

## Entregas M1
- Estrutura de layout com sidebar e dashboard inicial.
- Middleware base para autenticação e autorização por perfil (RBAC).
- Schema Prisma inicial com entidades de fundação: Organization, User, Permission, Lead, AuditLog.
- Docker Compose + Dockerfile + CI base.

## Segurança e LGPD (baseline)
- RBAC por perfil e recurso/ação.
- Trilha de auditoria por entidade/ação.
- Preparado para escopo por organização (`organizationId`).
