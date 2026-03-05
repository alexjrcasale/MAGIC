# M1 — Resumo da implementação

## Resumo
- Criada base técnica do projeto com arquivos de configuração (Next/TS).
- Definido schema Prisma com entidades iniciais e enums para RBAC/pipeline de leads.
- Implementado RBAC base com matriz de permissões por papel.
- Criado middleware de proteção de rotas e dashboard inicial.
- Adicionado Docker Compose, Dockerfile e CI inicial.
- Incluídos testes automatizados para RBAC, ambiente e serialização de auditoria.

## Arquivos alterados (principais)
- `package.json`, `tsconfig.json`, `next.config.ts`, `next-env.d.ts`
- `prisma/schema.prisma`, `prisma/seed.mjs`
- `src/app/**`, `src/components/app-shell.tsx`
- `src/lib/**`, `src/types/rbac.ts`, `src/middleware.ts`
- `docker-compose.yml`, `Dockerfile`, `.env.example`
- `.github/workflows/ci.yml`, `tests/*.test.mjs`, `README.md`

## Como testar
```bash
npm run test
node --test tests/**/*.test.mjs
```

## Próximos passos (M2)
- Implementar CRUD de Leads com API Routes + validação Zod.
- Adicionar kanban de pipeline e tarefas de follow-up.
- Persistir eventos no AuditLog via Prisma em mutações de lead.
