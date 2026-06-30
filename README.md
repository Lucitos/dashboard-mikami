# Mikami — Dashboard de Análise Crítica de Processos

Dashboard executivo privado que prioriza os 15 processos operacionais da Mikami via Matriz GUT (Gravidade × Urgência × Tendência), com drill-down por processo, riscos, gargalos e planos de ação. Acesso protegido por senha.

**Stack:** Next.js 16 (App Router) + TypeScript + Tailwind CSS + Recharts  
**Hospedagem:** Vercel free tier

---

## Deploy no Vercel

### 1. Suba o código para um repositório GitHub
```bash
git init
git add .
git commit -m "feat: mikami dashboard"
git remote add origin https://github.com/SEU_USUARIO/mikami-dashboard.git
git push -u origin main
```

### 2. Importe no Vercel
1. Acesse vercel.com/new e importe o repositório
2. Framework Preset: Next.js (auto-detectado)
3. Em Environment Variables, adicione:
   - SITE_PASSWORD = a senha para acessar o dashboard (ex: mikami2026)
   - SESSION_SECRET = string aleatória longa (gere com: openssl rand -hex 32)
4. Clique em Deploy

---

## Desenvolvimento local

```bash
cp .env.example .env.local
# edite .env.local com sua senha e segredo

npm install
npm run dev
```

Acesse http://localhost:3000 — você será redirecionado para /login.
Senha padrão de desenvolvimento: mikami2026

---

## Estrutura

```
src/
  app/
    page.tsx                     # Dashboard principal
    processos/[slug]/page.tsx    # Detalhe do processo
    login/page.tsx               # Tela de login
    api/login/route.ts           # Autenticação
  components/                    # Header, GutBadge, KpiCard, PriorityRanking, ProcessCard
    charts/                      # GutMatrixChart, ActivitiesChart, ConsultorDonut
  data/processes.ts              # 15 processos com GUT, riscos, gargalos, planos
  lib/gut.ts                     # Helpers de nível/cor GUT
  lib/session.ts                 # HMAC para cookie de sessão
proxy.ts                         # Proteção de rotas (Next.js 16)
public/
  logo-mikami.png
  pops/*.docx                    # POPs originais para download
```
