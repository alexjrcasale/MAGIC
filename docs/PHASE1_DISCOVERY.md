# Magic Travel SaaS — Fase 1 (Descoberta Rápida)

## 1) 10 suposições adotadas para seguir sem bloqueios

1. **Modelo organizacional inicial**: começaremos como *single-tenant com organização* (tabela `Organization`) e estrutura preparada para evoluir para multi-tenant forte (chave `organizationId` em entidades de negócio).
2. **Idiomas e moeda**: interface inicial em PT-BR e financeiro em BRL, com estrutura para internacionalização futura.
3. **Perfis RBAC fechados no MVP**: `ADMIN`, `GERENTE`, `AGENTE`, `FINANCEIRO`, `OPERACOES`, `LEITURA`, com permissões por ação (view/create/update/delete/approve/export).
4. **Fluxo comercial padrão**: lead percorre pipeline até proposta; ao aceite, gera reserva/operação e gatilhos financeiros.
5. **Canal WhatsApp desacoplado**: integração via interface de provedor (`MessagingProvider`) + webhooks padronizados, sem amarrar em fornecedor específico.
6. **Pagamentos por plugin**: iniciaremos com provedor simulado e arquitetura para Stripe/Mercado Pago por adaptadores.
7. **PDF server-side**: propostas, itinerários e contratos gerados no backend com versão imutável arquivada.
8. **Auditoria mandatória**: qualquer alteração sensível grava evento em `AuditLog` com antes/depois (quando aplicável), usuário e timestamp.
9. **LGPD baseline**: consentimento/legítimo interesse registrado no lead/cliente, soft delete para dados pessoais e trilha de acesso a documentos.
10. **SLA operacional**: tarefas, follow-ups e checklists com datas e status; notificações iniciais in-app (email/WhatsApp em milestones seguintes).

---

## 2) Backlog por milestones (M1..M6)

## M1 — Fundação: Auth + RBAC + Base de Projeto + Banco + Layout

**Objetivo**: estabelecer espinha dorsal técnica e segurança.

**Escopo**
- Monorepo/app com Next.js (App Router) + TypeScript + Tailwind + shadcn/ui.
- Prisma + PostgreSQL com migrations iniciais.
- NextAuth com login por credenciais (e estrutura para OAuth).
- RBAC por middleware + guards no backend/API.
- Layout base: sidebar por módulos, topbar, dashboard inicial.
- Auditoria base (`AuditLog`) e utilitário de logging estruturado.
- Docker Compose (app + db) e seed inicial (usuários, perfis, organização).
- CI inicial (lint, typecheck, testes).

**Definition of Done**
- Login/logout funcional.
- Permissões por perfil bloqueando rota e ação.
- Banco sobe via Docker e seed executa sem erro.

---

## M2 — CRM & Leads

**Objetivo**: implementar ciclo de captação e evolução de leads.

**Escopo**
- CRUD de leads com validação.
- Funil kanban por estágio (`novo`, `qualificando`, `proposta`, `ganho`, `perdido`).
- Origem do lead, tags, notas e histórico de interações.
- Tarefas de follow-up com vencimento e responsável.
- Busca, filtros e paginação.
- Auditoria por mudança de estágio e dados críticos.

**Definition of Done**
- Fluxo completo criar/editar/mover lead no funil.
- Histórico consistente por lead.

---

## M3 — Orçamentos/Propostas + PDF

**Objetivo**: converter oportunidades com proposta versionada.

**Escopo**
- CRUD de propostas vinculadas a lead/cliente.
- Versionamento (`v1`, `v2`, ...), status (`rascunho`, `enviada`, `aceita`, `recusada`).
- Itens da proposta (serviços, quantidades, preços, impostos/descontos).
- Geração de PDF e armazenamento do snapshot.
- Envio por email (provider interface) e registro de tentativa/envio.
- Endpoint/link de aceite do cliente com trilha de auditoria.

**Definition of Done**
- Criar proposta, gerar PDF, enviar e registrar aceite/recusa.

---

## M4 — Reservas + Operações + Itinerário

**Objetivo**: operacionalizar venda com controle de execução.

**Escopo**
- CRUD de reservas por tipo de produto (hotel/voo/passeio/translado/pacote).
- Status e prazos operacionais por reserva.
- Checklist de operação por viagem.
- Builder de itinerário por dia/horário + anexos.
- Export de itinerário em PDF.
- Link público do viajante (tokenizado, somente leitura).

**Definition of Done**
- A partir de proposta aceita, criar reserva e montar itinerário publicado.

---

## M5 — Financeiro + Pagamentos

**Objetivo**: controlar receita, despesa, comissões e recebimentos.

**Escopo**
- Contas a receber/pagar, centro de custo, categorias.
- Baixa manual e conciliação simples.
- Cálculo de comissões por venda/reserva.
- Interface de pagamentos com provedor simulado + plugin base (Stripe/Mercado Pago).
- Registro de transações e webhooks de pagamento.
- Relacionamento com propostas/reservas.

**Definition of Done**
- Lançamentos financeiros completos com reconciliação básica e comissão apurada.

---

## M6 — Relatórios + Atendimento (Canal WhatsApp Interface)

**Objetivo**: dar visibilidade e consolidar comunicação.

**Escopo**
- Relatórios: vendas por período, conversão, receita por destino, comissões, funil.
- Dashboard analítico com filtros.
- Caixa de entrada de atendimento (registro de interações + templates).
- Interface de canal para WhatsApp (mensagens, templates, webhook inbound/outbound).
- Estrutura de email provider (SMTP/API) integrada ao histórico.

**Definition of Done**
- Relatórios exportáveis e canal de atendimento com trilha por cliente/lead.

---

## 3) Diagrama textual de entidades (alto nível)

```text
Organization 1---N User
Organization 1---N Role
Role N---N Permission
User 1---N AuditLog

Organization 1---N Lead
Lead 1---N LeadInteraction
Lead 1---N LeadTask
Lead N---N Tag
Lead 1---N Proposal

Proposal 1---N ProposalVersion
ProposalVersion 1---N ProposalItem
ProposalVersion 1---N Document (PDF snapshot)
Proposal 1---0..1 Booking (quando aceita)

Booking 1---N BookingItem (hotel/voo/passeio/translado/pacote)
Booking 1---N OperationChecklistItem
Booking 1---1 Itinerary
Itinerary 1---N ItineraryDay
ItineraryDay 1---N ItineraryEvent
Itinerary 1---N Document (PDF/anexos)

Organization 1---N Supplier
Supplier 1---N SupplierContact
Supplier 1---N SupplierRatePolicy
Supplier 1---N Contract

Organization 1---N FinancialAccount
Organization 1---N Receivable
Organization 1---N Payable
Receivable 1---N PaymentTransaction
Payable 1---N PaymentTransaction
Booking 1---N Commission

Organization 1---N Customer
Customer 1---N Document
Customer 1---N ServiceChannelMessage
Lead/Customer 1---N ServiceThread

Organization 1---N ReportSnapshot (opcional cache)

Todos principais agregados possuem:
- organizationId
- createdAt/updatedAt
- createdBy/updatedBy (quando aplicável)
- softDeleteAt (entidades com dados pessoais)
```

---

## 4) Decisão técnica inicial (stack)

**Escolha**: Next.js App Router + Next API Routes (em vez de NestJS, neste MVP).

**Justificativa**
- Reduz complexidade operacional no início (frontend + backend no mesmo runtime/projeto).
- Acelera entrega incremental por módulo com tipagem compartilhada (DTOs/schemas).
- Facilita SSR + páginas internas autenticadas + rotas API coesas.
- Mantém caminho de evolução: se necessário, extração futura para serviço dedicado sem refatorar domínio.
