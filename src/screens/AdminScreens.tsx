import { useState } from "react";
import type { ReactElement } from "react";
import type { Screen } from "../App";
import { modules, adminUsers, adminPayments } from "../data";
import { ChartIcon, BookOpenIcon, UsersIcon, CreditCardIcon, VideoIcon, DocumentIcon, SearchIcon, MapPinIcon } from "../icons";

interface Props {
  screen: Screen;
  go: (s: Screen) => void;
}

const GOLD_GRAD = "linear-gradient(135deg, #8A6D3A, #B8975A, #D9C39C)";
const LINE_BLACK = "rgba(184,151,90,0.35)";

/* ─── ADMIN LAYOUT ───────────────────────────────────────────── */
function AdminLayout({
  screen,
  go,
  title,
  children,
}: {
  screen: Screen;
  go: (s: Screen) => void;
  title: string;
  children: React.ReactNode;
}) {
  const navItems: { id: Screen; label: string; Icon: (p: { size?: number; color?: string }) => ReactElement }[] = [
    { id: "admin-dashboard", label: "Tableau de bord", Icon: ChartIcon },
    { id: "admin-modules", label: "Modules", Icon: BookOpenIcon },
    { id: "admin-users", label: "Utilisateurs", Icon: UsersIcon },
    { id: "admin-payments", label: "Paiements", Icon: CreditCardIcon },
  ];

  return (
    <div className="flex flex-col h-full" style={{ background: "#F6F1E7" }}>
      {/* Header */}
      <header
        className="shrink-0 flex items-center justify-between px-5 h-14"
        style={{ background: "rgba(20,20,20,0.96)", borderBottom: `1px solid ${LINE_BLACK}` }}
      >
        <span
          className="font-serif font-bold text-cream text-base"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          Philowona <span className="text-gold text-xs font-sans font-normal ml-1">Admin</span>
        </span>
        <button
          className="text-xs font-sans text-muted-black transition-colors hover:text-gold-light"
          onClick={() => go("home")}
        >
          Déconnexion →
        </button>
      </header>

      {/* Subnav */}
      <nav
        className="shrink-0 flex overflow-x-auto"
        style={{ background: "#1b1b1a", borderBottom: `1px solid ${LINE_BLACK}` }}
      >
        {navItems.map((item) => {
          const active = screen === item.id;
          return (
            <button
              key={item.id}
              className="flex-shrink-0 flex flex-col items-center px-4 py-2.5 text-center"
              style={{
                borderBottom: active ? "2px solid #B8975A" : "2px solid transparent",
                color: active ? "#B8975A" : "#B7AB92",
              }}
              onClick={() => go(item.id)}
            >
              <span className="mb-0.5"><item.Icon size={16} color={active ? "#B8975A" : "#B7AB92"} /></span>
              <span className="text-[10px] font-sans whitespace-nowrap">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Page title */}
      <div
        className="shrink-0 px-5 py-3"
        style={{ background: "#EEE5D2", borderBottom: "1px solid rgba(138,109,58,0.28)" }}
      >
        <h1
          className="text-ink font-bold text-base"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          {title}
        </h1>
      </div>

      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}

/* ─── ADMIN LOGIN ─────────────────────────────────────────────── */
function AdminLoginScreen({ go }: { go: (s: Screen) => void }) {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const inputStyle = {
    border: "1.5px solid rgba(184,151,90,0.35)",
    borderRadius: "2px",
    outline: "none",
    background: "#1b1b1a",
    color: "#F6F1E7",
  };

  return (
    <div className="flex flex-col h-full" style={{ background: "#141414" }}>
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-xs">
          {/* Logo */}
          <div className="text-center mb-10">
            <p
              className="font-serif font-bold text-cream text-3xl mb-1"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Philowona
            </p>
            <p
              className="italic text-gold text-sm"
              style={{ fontFamily: "Cormorant Garamond, serif" }}
            >
              Espace Administration
            </p>
          </div>

          <div className="mb-4">
            <label className="block text-xs font-sans font-medium text-muted-black mb-1.5">
              Email administrateur
            </label>
            <input
              type="email"
              placeholder="admin@philowona.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 text-sm font-sans"
              style={inputStyle}
            />
          </div>
          <div className="mb-8">
            <label className="block text-xs font-sans font-medium text-muted-black mb-1.5">
              Mot de passe
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              className="w-full px-4 py-3 text-sm font-sans"
              style={inputStyle}
            />
          </div>

          <button
            className="w-full py-4 font-sans font-semibold text-sm text-black mb-4 transition-opacity hover:opacity-90"
            style={{ background: GOLD_GRAD, borderRadius: "2px" }}
            onClick={() => go("admin-dashboard")}
          >
            Accéder au back-office
          </button>
          <button
            className="w-full text-center text-xs font-sans text-muted-black underline"
            onClick={() => go("home")}
          >
            ← Retour au site
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── ADMIN DASHBOARD ─────────────────────────────────────────── */
function AdminDashboardScreen({ go }: { go: (s: Screen) => void }) {
  const stats = [
    { label: "Inscrits (total)", value: "2 438", trend: "+12 cette semaine", up: true },
    { label: "Nouvelles inscriptions / sem.", value: "142", trend: "+8% vs sem. passée", up: true },
    { label: "Taux de complétion moyen", value: "34%", trend: "-2pts vs mois passé", up: false },
    { label: "Conversion gratuit → Premium", value: "7.2%", trend: "+1.1pt ce mois", up: true },
    { label: "Chiffre d'affaires cumulé", value: "1 420 000 XOF", trend: "depuis jan. 2025", up: true },
    { label: "NPS", value: "62", trend: "Enquête mars 2025", up: true },
  ];

  const weeks = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin"];
  const values = [180, 290, 420, 580, 790, 1020];
  const max = Math.max(...values);

  return (
    <div className="px-5 py-5">
      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {stats.map((s, i) => (
          <div
            key={i}
            className="p-4"
            style={{ background: i < 2 ? "#141414" : "#EEE5D2", border: i < 2 ? `1px solid ${LINE_BLACK}` : "1px solid rgba(138,109,58,0.28)", borderRadius: "2px" }}
          >
            <p
              className="text-xs font-sans mb-2 leading-snug"
              style={{ color: i < 2 ? "#B7AB92" : "#6E6353" }}
            >
              {s.label}
            </p>
            <p
              className="font-serif font-bold text-lg mb-1"
              style={{ fontFamily: "Playfair Display, serif", color: i < 2 ? "#F6F1E7" : "#211C13" }}
            >
              {s.value}
            </p>
            <p
              className="text-xs font-sans"
              style={{ color: s.up ? "#B8975A" : "#c0392b" }}
            >
              {s.trend}
            </p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div
        className="p-4 mb-6"
        style={{ background: "#141414", border: `1px solid ${LINE_BLACK}`, borderRadius: "2px" }}
      >
        <p className="font-sans text-xs text-muted-black mb-4 uppercase tracking-wider">
          Inscriptions cumulées 2025
        </p>
        <div className="flex items-end gap-2 h-24">
          {weeks.map((w, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div
                className="w-full rounded-t-sm"
                style={{
                  height: `${(values[i] / max) * 80}px`,
                  background: i === weeks.length - 1 ? GOLD_GRAD : "rgba(184,151,90,0.35)",
                }}
              />
              <span className="text-muted-black font-sans text-[9px]">{w}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick links */}
      <div className="flex flex-col gap-3 pb-4">
        {[
          { label: "Gérer les modules de formation", screen: "admin-modules" as Screen },
          { label: "Gérer les utilisateurs", screen: "admin-users" as Screen },
          { label: "Exporter les paiements CSV", screen: "admin-payments" as Screen },
        ].map((l) => (
          <button
            key={l.screen}
            className="flex items-center justify-between p-4 text-left"
            style={{ background: "#EEE5D2", border: "1px solid rgba(138,109,58,0.28)", borderRadius: "2px" }}
            onClick={() => go(l.screen)}
          >
            <span className="font-sans text-sm text-ink font-medium">{l.label}</span>
            <span className="text-gold">→</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─── ADMIN MODULES ───────────────────────────────────────────── */
function AdminModulesScreen({ go }: { go: (s: Screen) => void }) {
  const [moduleList, setModuleList] = useState(
    modules.map((m) => ({ ...m, published: m.completed || m.id <= "4" }))
  );

  function togglePublished(id: string) {
    setModuleList((prev) =>
      prev.map((m) => (m.id === id ? { ...m, published: !m.published } : m))
    );
  }

  return (
    <div className="px-5 py-5">
      {/* Create button */}
      <button
        className="w-full flex items-center justify-center gap-2 py-3 font-sans font-semibold text-sm text-black mb-5"
        style={{ background: GOLD_GRAD, borderRadius: "2px" }}
        onClick={() => go("admin-module-edit")}
      >
        <span className="text-lg">+</span>
        Créer un nouveau module
      </button>

      {/* Module list */}
      <p className="text-xs text-muted-cream font-sans mb-3">{moduleList.length} modules</p>
      <div className="flex flex-col gap-3 pb-4">
        {moduleList.map((m) => (
          <div
            key={m.id}
            className="p-4"
            style={{ background: "#EEE5D2", border: "1px solid rgba(138,109,58,0.28)", borderRadius: "2px" }}
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <p className="font-sans text-sm text-ink font-medium leading-snug flex-1">{m.title}</p>
              <div className="flex items-center gap-2 shrink-0">
                <span
                  className="text-[10px] font-sans px-2 py-0.5"
                  style={{
                    borderRadius: "2px",
                    ...(m.free
                      ? { color: "#B8975A", border: "1px solid #8A6D3A" }
                      : { background: "#B8975A", color: "#141414", fontWeight: 600 }),
                  }}
                >
                  {m.free ? "Gratuit" : "Premium"}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-cream font-sans">{m.duration}</span>
                <span className="text-muted-cream text-xs">·</span>
                <span className="text-xs text-muted-cream font-sans">{m.level}</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  className="text-xs font-sans underline text-gold"
                  onClick={() => go("admin-module-edit")}
                >
                  Modifier
                </button>
                <button
                  className="text-xs font-sans px-2 py-1 transition-all"
                  style={{
                    borderRadius: "2px",
                    background: m.published ? "rgba(184,151,90,0.15)" : "rgba(192,57,43,0.1)",
                    color: m.published ? "#B8975A" : "#c0392b",
                    border: m.published ? "1px solid rgba(184,151,90,0.4)" : "1px solid rgba(192,57,43,0.3)",
                  }}
                  onClick={() => togglePublished(m.id)}
                >
                  {m.published ? "Publié" : "Brouillon"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── ADMIN MODULE EDIT ──────────────────────────────────────── */
function AdminModuleEditScreen({ go }: { go: (s: Screen) => void }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [level, setLevel] = useState("Débutant");
  const [access, setAccess] = useState<"free" | "premium">("free");
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [quizScore, setQuizScore] = useState("60");

  const inputStyle = {
    border: "1.5px solid rgba(138,109,58,0.28)",
    borderRadius: "2px",
    outline: "none",
    background: "#F6F1E7",
  };

  return (
    <div className="px-5 py-5 overflow-y-auto">
      <div className="flex flex-col gap-4 pb-6">
        {/* Title */}
        <div>
          <label className="block text-xs font-sans font-medium text-ink mb-1.5">Titre du module *</label>
          <input
            type="text"
            placeholder="Ex. : Les fondamentaux du patrimoine"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 text-sm font-sans text-ink"
            style={inputStyle}
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-sans font-medium text-ink mb-1.5">Description</label>
          <textarea
            rows={3}
            placeholder="Décrivez le contenu et les objectifs de ce module..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-3 text-sm font-sans text-ink resize-none"
            style={inputStyle}
          />
        </div>

        {/* Upload video */}
        <div>
          <label className="block text-xs font-sans font-medium text-ink mb-1.5">Vidéo du module</label>
          <div
            className="w-full py-8 flex flex-col items-center justify-center cursor-pointer"
            style={{ border: "2px dashed rgba(138,109,58,0.35)", borderRadius: "2px" }}
          >
            <span className="mb-2"><VideoIcon size={24} color="#8A6D3A" /></span>
            <p className="font-sans text-xs text-muted-cream">Cliquez pour uploader une vidéo</p>
            <p className="font-sans text-xs text-muted-cream">MP4, MOV · max 500 Mo</p>
          </div>
        </div>

        {/* Upload support */}
        <div>
          <label className="block text-xs font-sans font-medium text-ink mb-1.5">Support texte (PDF)</label>
          <div
            className="w-full py-6 flex flex-col items-center justify-center cursor-pointer"
            style={{ border: "2px dashed rgba(138,109,58,0.35)", borderRadius: "2px" }}
          >
            <span className="mb-2"><DocumentIcon size={24} color="#8A6D3A" /></span>
            <p className="font-sans text-xs text-muted-cream">Uploader un PDF</p>
          </div>
        </div>

        {/* Level + access */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-sans font-medium text-ink mb-1.5">Niveau</label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full px-4 py-3 text-sm font-sans text-ink"
              style={inputStyle}
            >
              <option>Débutant</option>
              <option>Intermédiaire</option>
              <option>Avancé</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-sans font-medium text-ink mb-1.5">Accès</label>
            <div
              className="flex p-1"
              style={{ background: "#EEE5D2", border: "1px solid rgba(138,109,58,0.28)", borderRadius: "2px" }}
            >
              {(["free", "premium"] as const).map((a) => (
                <button
                  key={a}
                  className="flex-1 py-2 text-xs font-sans font-medium transition-all"
                  style={{
                    borderRadius: "1px",
                    background: access === a ? "#F6F1E7" : "transparent",
                    color: access === a ? "#211C13" : "#6E6353",
                  }}
                  onClick={() => setAccess(a)}
                >
                  {a === "free" ? "Gratuit" : "Premium"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Quiz section */}
        <div
          className="p-4"
          style={{ background: "#EEE5D2", border: "1px solid rgba(138,109,58,0.28)", borderRadius: "2px" }}
        >
          <p className="font-sans text-sm font-medium text-ink mb-3">Quiz de fin de module</p>
          <div className="mb-3">
            <label className="block text-xs font-sans text-muted-cream mb-1.5">Score minimal pour valider (%)</label>
            <input
              type="number"
              min="0"
              max="100"
              value={quizScore}
              onChange={(e) => setQuizScore(e.target.value)}
              className="w-full px-4 py-2 text-sm font-sans text-ink"
              style={inputStyle}
            />
          </div>
          <button className="text-xs font-sans text-gold underline">+ Ajouter une question</button>
          <div className="mt-3 flex flex-col gap-2">
            {["Qu'est-ce que le patrimoine net ?", "Règle de l'épargne d'urgence ?"].map((q, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-2"
                style={{ background: "#F6F1E7", borderRadius: "2px" }}
              >
                <span className="font-sans text-xs text-ink line-clamp-1">{q}</span>
                <button className="text-xs text-red-400 ml-2 shrink-0">×</button>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <button
            className="flex-1 py-3 font-sans text-sm font-medium text-ink"
            style={{ border: "1px solid rgba(138,109,58,0.28)", borderRadius: "2px" }}
            onClick={() => { setStatus("draft"); go("admin-modules"); }}
          >
            Brouillon
          </button>
          <button
            className="flex-1 py-3 font-sans font-semibold text-sm text-black"
            style={{ background: GOLD_GRAD, borderRadius: "2px" }}
            onClick={() => { setStatus("published"); go("admin-modules"); }}
          >
            Publier
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── ADMIN USERS ─────────────────────────────────────────────── */
function AdminUsersScreen() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "premium" | "free">("all");

  const filtered = adminUsers.filter((u) => {
    if (filter === "premium" && u.status !== "Premium") return false;
    if (filter === "free" && u.status !== "Gratuit") return false;
    if (search && !u.name.toLowerCase().includes(search.toLowerCase()) && !u.email.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="px-5 py-5">
      {/* Search */}
      <div className="relative mb-3">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center">
          <SearchIcon color="#6E6353" />
        </span>
        <input
          type="text"
          placeholder="Nom ou email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 text-sm font-sans text-ink"
          style={{ background: "#EEE5D2", border: "1px solid rgba(138,109,58,0.28)", borderRadius: "2px", outline: "none" }}
        />
      </div>

      {/* Filter */}
      <div
        className="flex p-1 mb-5"
        style={{ background: "#EEE5D2", border: "1px solid rgba(138,109,58,0.28)", borderRadius: "2px" }}
      >
        {(["all", "premium", "free"] as const).map((f) => (
          <button
            key={f}
            className="flex-1 py-2 text-xs font-sans font-medium transition-all"
            style={{
              borderRadius: "1px",
              background: filter === f ? "#F6F1E7" : "transparent",
              color: filter === f ? "#211C13" : "#6E6353",
            }}
            onClick={() => setFilter(f)}
          >
            {f === "all" ? "Tous" : f === "premium" ? "Premium" : "Gratuit"}
          </button>
        ))}
      </div>

      <p className="text-xs text-muted-cream font-sans mb-3">{filtered.length} utilisateur{filtered.length > 1 ? "s" : ""}</p>

      {/* User list */}
      <div className="flex flex-col gap-3 pb-4">
        {filtered.map((u) => (
          <div
            key={u.id}
            className="p-4"
            style={{ background: "#EEE5D2", border: "1px solid rgba(138,109,58,0.28)", borderRadius: "2px" }}
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex-1 min-w-0">
                <p className="font-sans text-sm text-ink font-medium">{u.name}</p>
                <p className="font-sans text-xs text-muted-cream">{u.email}</p>
              </div>
              <span
                className="text-[10px] font-sans px-2 py-0.5 shrink-0"
                style={{
                  borderRadius: "2px",
                  ...(u.status === "Premium"
                    ? { background: "#B8975A", color: "#141414", fontWeight: 600 }
                    : { color: "#6E6353", border: "1px solid rgba(138,109,58,0.28)" }),
                }}
              >
                {u.status}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-muted-cream font-sans">
                <span className="inline-flex items-center gap-1">
                  <MapPinIcon size={12} color="#6E6353" />
                  {u.city}
                </span>
                <span>·</span>
                <span>{u.modules} modules</span>
                <span>·</span>
                <span>{u.joined}</span>
              </div>
              <button
                className="text-xs font-sans px-2 py-1 text-red-400 transition-colors hover:text-red-600"
                style={{ border: "1px solid rgba(192,57,43,0.3)", borderRadius: "2px" }}
              >
                Bloquer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── ADMIN PAYMENTS ──────────────────────────────────────────── */
function AdminPaymentsScreen() {
  const [period, setPeriod] = useState<"all" | "month" | "week">("month");

  return (
    <div className="px-5 py-5">
      {/* Export button */}
      <button
        className="w-full flex items-center justify-center gap-2 py-3 font-sans font-semibold text-sm text-black mb-5"
        style={{ background: GOLD_GRAD, borderRadius: "2px" }}
      >
        ↓ Exporter en CSV
      </button>

      {/* Period filter */}
      <div
        className="flex p-1 mb-5"
        style={{ background: "#EEE5D2", border: "1px solid rgba(138,109,58,0.28)", borderRadius: "2px" }}
      >
        {(["week", "month", "all"] as const).map((p) => (
          <button
            key={p}
            className="flex-1 py-2 text-xs font-sans font-medium transition-all"
            style={{
              borderRadius: "1px",
              background: period === p ? "#F6F1E7" : "transparent",
              color: period === p ? "#211C13" : "#6E6353",
            }}
            onClick={() => setPeriod(p)}
          >
            {p === "week" ? "Cette semaine" : p === "month" ? "Ce mois" : "Tout"}
          </button>
        ))}
      </div>

      {/* Summary strip */}
      <div
        className="grid grid-cols-2 gap-3 mb-5"
      >
        {[
          { label: "Transactions", value: `${adminPayments.filter(p => p.status === "Succès").length} succès` },
          { label: "Montant total", value: "58 400 XOF" },
        ].map((s, i) => (
          <div
            key={i}
            className="p-3 text-center"
            style={{ background: "#141414", border: `1px solid ${LINE_BLACK}`, borderRadius: "2px" }}
          >
            <p className="font-serif font-bold text-base text-cream mb-0.5" style={{ fontFamily: "Playfair Display, serif" }}>{s.value}</p>
            <p className="font-sans text-xs text-muted-black">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Payments list */}
      <p className="text-xs text-muted-cream font-sans mb-3">{adminPayments.length} transactions</p>
      <div className="flex flex-col gap-3 pb-4">
        {adminPayments.map((p) => (
          <div
            key={p.id}
            className="p-4"
            style={{ background: "#EEE5D2", border: "1px solid rgba(138,109,58,0.28)", borderRadius: "2px" }}
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex-1 min-w-0">
                <p className="font-sans text-sm text-ink font-medium">{p.user}</p>
                <p className="font-sans text-xs text-muted-cream">{p.id}</p>
              </div>
              <span
                className="text-xs font-sans px-2 py-0.5 shrink-0 font-semibold"
                style={{
                  borderRadius: "2px",
                  ...(p.status === "Succès"
                    ? { background: "rgba(39,174,96,0.15)", color: "#27ae60", border: "1px solid rgba(39,174,96,0.3)" }
                    : { background: "rgba(192,57,43,0.1)", color: "#c0392b", border: "1px solid rgba(192,57,43,0.3)" }),
                }}
              >
                {p.status}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs text-muted-cream font-sans">
              <span>{p.operator}</span>
              <span>{p.date}</span>
              <span
                className="font-semibold"
                style={{ color: p.status === "Succès" ? "#B8975A" : "#c0392b" }}
              >
                {p.amount}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── ROUTER ─────────────────────────────────────────────────── */
export default function AdminScreens({ screen, go }: Props) {
  if (screen === "admin-login") return <AdminLoginScreen go={go} />;

  const titles: Record<string, string> = {
    "admin-dashboard": "Tableau de bord",
    "admin-modules": "Gestion des modules",
    "admin-module-edit": "Créer / Modifier un module",
    "admin-users": "Gestion des utilisateurs",
    "admin-payments": "Export des paiements",
  };

  return (
    <AdminLayout screen={screen} go={go} title={titles[screen] ?? ""}>
      {screen === "admin-dashboard" && <AdminDashboardScreen go={go} />}
      {screen === "admin-modules" && <AdminModulesScreen go={go} />}
      {screen === "admin-module-edit" && <AdminModuleEditScreen go={go} />}
      {screen === "admin-users" && <AdminUsersScreen />}
      {screen === "admin-payments" && <AdminPaymentsScreen />}
    </AdminLayout>
  );
}
