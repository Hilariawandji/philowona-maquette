import { useState, useEffect } from "react";
import type { Screen } from "../App";
import { modules, quizQuestions, type Module } from "../data";
import {
  HomeIcon as HomeIconBase,
  GridIcon as GridIconBase,
  PersonIcon as PersonIconBase,
  LockIcon,
  StarIcon,
  CheckCircleIcon,
  BellIcon,
  CategoryIcon,
  HeartIcon,
  SearchIcon,
  TrophyIcon,
  BookOpenIcon,
} from "../icons";

interface Props {
  screen: Screen;
  go: (s: Screen) => void;
  isPremium: boolean;
  setIsPremium: (v: boolean) => void;
  selectedModuleId: string;
  setSelectedModuleId: (id: string) => void;
}

const GOLD_GRAD = "linear-gradient(135deg, #8A6D3A, #B8975A, #D9C39C)";
const LINE_CREAM = "rgba(138,109,58,0.28)";
const LINE_BLACK = "rgba(184,151,90,0.35)";

/* ─── ICONS ──────────────────────────────────────────────────── */
const HomeIcon = ({ active }: { active: boolean }) => (
  <HomeIconBase color={active ? "#B8975A" : "#6E6353"} />
);
const GridIcon = ({ active }: { active: boolean }) => (
  <GridIconBase color={active ? "#B8975A" : "#6E6353"} />
);
const PersonIcon = ({ active }: { active: boolean }) => (
  <PersonIconBase color={active ? "#B8975A" : "#6E6353"} />
);
const CheckCircle = CheckCircleIcon;

/* ─── MODULE CARD ─────────────────────────────────────────────── */
function ModuleCard({
  module: m,
  onClick,
  isPremium,
}: {
  module: Module;
  onClick: () => void;
  isPremium: boolean;
}) {
  const locked = !m.free && !isPremium;

  return (
    <div
      className="flex items-center gap-4 p-4 cursor-pointer transition-opacity hover:opacity-90"
      style={{
        background: "#EEE5D2",
        border: `1px solid ${LINE_CREAM}`,
        borderRadius: "2px",
        opacity: locked ? 0.82 : 1,
      }}
      onClick={onClick}
    >
      <div
        className="w-10 h-10 flex items-center justify-center shrink-0"
        style={{
          background: locked ? "rgba(110,99,83,0.12)" : "rgba(184,151,90,0.14)",
          borderRadius: "2px",
        }}
      >
        {locked ? <LockIcon /> : <CategoryIcon category={m.category} />}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-sans text-ink text-sm font-medium leading-snug line-clamp-2">{m.title}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs text-muted-cream">{m.duration}</span>
          <span className="text-muted-cream text-xs">·</span>
          <span className="text-xs text-muted-cream">{m.level}</span>
        </div>
        {m.progress > 0 && m.progress < 100 && (
          <div className="mt-2 h-1 rounded-full overflow-hidden" style={{ background: "#F6F1E7" }}>
            <div className="h-full rounded-full" style={{ width: `${m.progress}%`, background: "linear-gradient(90deg, #8A6D3A, #B8975A)" }} />
          </div>
        )}
      </div>
      <div className="shrink-0">
        {m.completed ? (
          <CheckCircle />
        ) : (
          <span
            className="text-xs font-sans px-2 py-0.5"
            style={{
              borderRadius: "2px",
              ...(m.free
                ? { color: "#B8975A", border: "1px solid #8A6D3A" }
                : { background: "#B8975A", color: "#141414", fontWeight: 600 }),
            }}
          >
            {m.free ? "Gratuit" : "Premium"}
          </span>
        )}
      </div>
    </div>
  );
}

/* ─── SKELETON ──────────────────────────────────────────────── */
function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={className}
      style={{ background: "linear-gradient(90deg, #EEE5D2 25%, #E5D9C5 50%, #EEE5D2 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.5s infinite", borderRadius: "2px" }}
    />
  );
}

/* ─── APP LAYOUT ─────────────────────────────────────────────── */
function AppLayout({
  screen,
  go,
  title,
  showBack,
  onBack,
  children,
}: {
  screen: Screen;
  go: (s: Screen) => void;
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  children: React.ReactNode;
}) {
  const noBottomNav = ["video-player", "quiz", "result", "payment", "payment-confirm", "premium", "module-detail"].includes(screen);
  const navTabs = [
    { id: "dashboard" as Screen, label: "Accueil", Icon: HomeIcon },
    { id: "catalogue" as Screen, label: "Catalogue", Icon: GridIcon },
    { id: "profile" as Screen, label: "Profil", Icon: PersonIcon },
  ];

  return (
    <div className="flex flex-col h-full bg-cream">
      {/* Top bar */}
      <header
        className="shrink-0 flex items-center justify-between px-5 h-14"
        style={{ background: "#F6F1E7", borderBottom: `1px solid ${LINE_CREAM}` }}
      >
        {showBack ? (
          <button className="text-ink text-xl mr-3" onClick={onBack ?? (() => go("dashboard"))}>←</button>
        ) : (
          <span className="font-serif font-bold text-base text-ink" style={{ fontFamily: "Playfair Display, serif" }}>
            Philowona
          </span>
        )}
        {title && (
          <span className="font-sans font-semibold text-sm text-ink flex-1 text-center">{title}</span>
        )}
        <button className="w-8 h-8 flex items-center justify-center">
          <BellIcon />
        </button>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto">{children}</main>

      {/* Bottom nav */}
      {!noBottomNav && (
        <nav
          className="shrink-0 flex"
          style={{ background: "#F6F1E7", borderTop: `1px solid ${LINE_CREAM}` }}
        >
          {navTabs.map(({ id, label, Icon }) => {
            const active = screen === id;
            return (
              <button
                key={id}
                className="flex-1 flex flex-col items-center py-3 gap-1"
                onClick={() => go(id)}
              >
                <Icon active={active} />
                <span
                  className="text-[10px] font-sans font-medium"
                  style={{ color: active ? "#B8975A" : "#6E6353" }}
                >
                  {label}
                </span>
              </button>
            );
          })}
        </nav>
      )}
    </div>
  );
}

/* ─── DASHBOARD ─────────────────────────────────────────────── */
function DashboardScreen({
  go,
  isPremium,
  setSelectedModuleId,
}: {
  go: (s: Screen) => void;
  isPremium: boolean;
  setSelectedModuleId: (id: string) => void;
}) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  const inProgress = modules.find((m) => m.progress > 0 && !m.completed);

  if (loading) {
    return (
      <div className="px-5 py-6 flex flex-col gap-4">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-16 w-full" />
        <div className="grid grid-cols-3 gap-3">
          {[0, 1, 2].map((i) => <Skeleton key={i} className="h-16" />)}
        </div>
        {[0, 1, 2].map((i) => <Skeleton key={i} className="h-16 w-full" />)}
      </div>
    );
  }

  return (
    <div className="px-5 py-6">
      {/* Greeting */}
      <p
        className="italic text-gold text-base mb-1"
        style={{ fontFamily: "Cormorant Garamond, serif" }}
      >
        Bonjour, Amadou
      </p>
      <h1
        className="text-ink font-bold text-2xl mb-5"
        style={{ fontFamily: "Playfair Display, serif" }}
      >
        Tableau de bord
      </h1>

      {/* Subscription status */}
      {!isPremium && (
        <div
          className="flex items-center justify-between p-4 mb-5 cursor-pointer"
          style={{ background: "linear-gradient(135deg, #1b1b1a, #141414)", border: `1px solid ${LINE_BLACK}`, borderRadius: "2px" }}
          onClick={() => go("premium")}
        >
          <div>
            <p className="font-sans text-xs text-muted-black mb-0.5">Abonnement actuel</p>
            <p className="font-sans text-cream text-sm font-semibold">Compte gratuit</p>
          </div>
          <button
            className="px-3 py-1.5 text-xs font-sans font-semibold text-black"
            style={{ background: GOLD_GRAD, borderRadius: "2px", whiteSpace: "nowrap" }}
          >
            Passer Premium →
          </button>
        </div>
      )}
      {isPremium && (
        <div
          className="flex items-center gap-3 p-4 mb-5"
          style={{ background: "linear-gradient(135deg, #1b1b1a, #141414)", border: `1px solid ${LINE_BLACK}`, borderRadius: "2px" }}
        >
          <StarIcon />
          <div>
            <p className="font-sans text-xs text-muted-black mb-0.5">Abonnement</p>
            <p className="font-sans text-gold text-sm font-semibold">Premium actif — expire le 15 avril 2025</p>
          </div>
        </div>
      )}

      {/* Resume banner */}
      {inProgress && (
        <div
          className="flex items-center gap-4 p-4 mb-5 cursor-pointer"
          style={{ background: "#1b1b1a", border: `1px solid ${LINE_BLACK}`, borderRadius: "2px" }}
          onClick={() => { setSelectedModuleId(inProgress.id); go("module-detail"); }}
        >
          <div
            className="w-10 h-10 flex items-center justify-center shrink-0"
            style={{ background: "rgba(184,151,90,0.15)", borderRadius: "2px" }}
          >
            <CategoryIcon category={inProgress.category} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-muted-black font-sans mb-0.5">Reprendre</p>
            <p className="font-sans text-cream text-sm font-medium leading-snug line-clamp-1">{inProgress.title}</p>
            <div className="mt-2 h-1 rounded-full overflow-hidden" style={{ background: "#333" }}>
              <div className="h-full rounded-full" style={{ width: `${inProgress.progress}%`, background: "linear-gradient(90deg, #8A6D3A, #B8975A)" }} />
            </div>
          </div>
          <span className="text-gold text-xs font-sans shrink-0">{inProgress.progress}%</span>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        {[
          { value: "1", label: "Complété" },
          { value: "0", label: "Certificats" },
          { value: "3", label: "Accessibles" },
        ].map((s, i) => (
          <div
            key={i}
            className="p-3 text-center"
            style={{ background: "#EEE5D2", border: `1px solid ${LINE_CREAM}`, borderRadius: "2px" }}
          >
            <p
              className="text-xl font-bold text-ink"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              {s.value}
            </p>
            <p className="font-sans text-xs text-muted-cream">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Module list */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-serif font-bold text-base text-ink" style={{ fontFamily: "Playfair Display, serif" }}>
          Modules disponibles
        </h2>
        <button className="text-xs text-gold font-sans" onClick={() => go("catalogue")}>
          Voir tout →
        </button>
      </div>
      <div className="flex flex-col gap-3">
        {modules.slice(0, 4).map((m) => (
          <ModuleCard
            key={m.id}
            module={m}
            isPremium={isPremium}
            onClick={() => { setSelectedModuleId(m.id); go("module-detail"); }}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── CATALOGUE ─────────────────────────────────────────────── */
function CatalogueScreen({
  go,
  isPremium,
  setSelectedModuleId,
}: {
  go: (s: Screen) => void;
  isPremium: boolean;
  setSelectedModuleId: (id: string) => void;
}) {
  const [filter, setFilter] = useState<"all" | "free" | "premium">("all");
  const [search, setSearch] = useState("");

  const filtered = modules.filter((m) => {
    if (filter === "free" && !m.free) return false;
    if (filter === "premium" && m.free) return false;
    if (search && !m.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const tabs = [
    { id: "all" as const, label: "Tous" },
    { id: "free" as const, label: "Gratuits" },
    { id: "premium" as const, label: "Premium" },
  ];

  return (
    <div className="px-5 py-5">
      <h1
        className="text-ink font-bold text-2xl mb-5"
        style={{ fontFamily: "Playfair Display, serif" }}
      >
        Catalogue
      </h1>

      {/* Search */}
      <div className="relative mb-4">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center">
          <SearchIcon color="#6E6353" />
        </span>
        <input
          type="text"
          placeholder="Rechercher un module..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 text-sm font-sans text-ink bg-cream-2"
          style={{ border: `1.5px solid ${LINE_CREAM}`, borderRadius: "2px", outline: "none" }}
        />
      </div>

      {/* Filter tabs */}
      <div
        className="flex gap-1 p-1 mb-5"
        style={{ background: "#EEE5D2", border: `1px solid ${LINE_CREAM}`, borderRadius: "2px" }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className="flex-1 py-2 text-xs font-sans font-medium transition-all"
            style={{
              borderRadius: "1px",
              background: filter === tab.id ? "#F6F1E7" : "transparent",
              color: filter === tab.id ? "#211C13" : "#6E6353",
              boxShadow: filter === tab.id ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
            }}
            onClick={() => setFilter(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Count */}
      <p className="text-xs text-muted-cream font-sans mb-3">
        {filtered.length} module{filtered.length > 1 ? "s" : ""}
      </p>

      {/* List */}
      <div className="flex flex-col gap-3 pb-4">
        {filtered.map((m) => (
          <ModuleCard
            key={m.id}
            module={m}
            isPremium={isPremium}
            onClick={() => { setSelectedModuleId(m.id); go("module-detail"); }}
          />
        ))}
        {filtered.length === 0 && (
          <p className="text-sm text-muted-cream font-sans text-center py-8">
            Aucun module trouvé
          </p>
        )}
      </div>
    </div>
  );
}

/* ─── MODULE DETAIL ─────────────────────────────────────────── */
function ModuleDetailScreen({
  go,
  isPremium,
  moduleId,
}: {
  go: (s: Screen) => void;
  isPremium: boolean;
  moduleId: string;
}) {
  const m = modules.find((x) => x.id === moduleId) ?? modules[1];
  const locked = !m.free && !isPremium;
  const [faved, setFaved] = useState(false);

  return (
    <div className="flex flex-col h-full bg-cream overflow-y-auto">
      {/* Hero */}
      <div
        className="relative px-5 pt-5 pb-8"
        style={{ background: "linear-gradient(180deg, #141414 0%, #1b1b1a 100%)" }}
      >
        <div className="flex items-center justify-between mb-8">
          <button className="text-cream text-xl" onClick={() => go("catalogue")}>←</button>
          <button onClick={() => setFaved(!faved)}>
            <HeartIcon color={faved ? "#B8975A" : "#B7AB92"} filled={faved} />
          </button>
        </div>
        <div
          className="w-14 h-14 flex items-center justify-center text-2xl mb-4"
          style={{ background: "rgba(184,151,90,0.15)", borderRadius: "2px" }}
        >
          <CategoryIcon category={m.category} size={24} color="#B8975A" />
        </div>
        <span
          className="text-xs font-sans px-2 py-0.5 mb-3 inline-block"
          style={{ background: "rgba(184,151,90,0.2)", color: "#B8975A", borderRadius: "2px" }}
        >
          {m.category}
        </span>
        <h1
          className="text-cream font-bold text-2xl leading-snug mb-3"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          {m.title}
        </h1>
        <div className="flex items-center gap-3 text-muted-black text-xs font-sans">
          <span>{m.duration}</span>
          <span>·</span>
          <span>{m.level}</span>
          <span>·</span>
          <span style={{ color: m.free ? "#B8975A" : "#D9C39C" }}>{m.free ? "Gratuit" : "Premium"}</span>
        </div>
      </div>

      {/* Progress if started */}
      {m.progress > 0 && (
        <div
          className="mx-5 mt-4 p-3 flex items-center gap-3"
          style={{ background: "#EEE5D2", border: `1px solid ${LINE_CREAM}`, borderRadius: "2px" }}
        >
          <div className="flex-1">
            <p className="text-xs text-muted-cream font-sans mb-1">Progression</p>
            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "#F6F1E7" }}>
              <div className="h-full rounded-full" style={{ width: `${m.progress}%`, background: "linear-gradient(90deg, #8A6D3A, #B8975A)" }} />
            </div>
          </div>
          <span className="text-sm font-sans font-semibold text-gold">{m.progress}%</span>
        </div>
      )}

      {/* Description */}
      <div className="px-5 pt-6">
        <h2 className="font-serif font-bold text-base text-ink mb-2" style={{ fontFamily: "Playfair Display, serif" }}>
          À propos de ce module
        </h2>
        <p className="font-sans text-sm text-muted-cream leading-relaxed mb-6">{m.description}</p>

        {/* What you'll learn */}
        <h2 className="font-serif font-bold text-base text-ink mb-3" style={{ fontFamily: "Playfair Display, serif" }}>
          Objectifs pédagogiques
        </h2>
        <div className="flex flex-col gap-2 mb-8">
          {["Comprendre les concepts fondamentaux", "Appliquer des méthodes concrètes", "Valider vos acquis par le quiz", "Obtenir votre certificat de complétion"].map((obj, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="text-gold text-sm shrink-0 mt-0.5">✓</span>
              <p className="font-sans text-sm text-ink">{obj}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        {locked ? (
          <div className="flex flex-col gap-3 pb-8">
            <div
              className="p-4 text-center"
              style={{ background: "#EEE5D2", border: `1px solid ${LINE_CREAM}`, borderRadius: "2px" }}
            >
              <span className="mb-2 flex justify-center"><LockIcon size={22} color="#8A6D3A" /></span>
              <p className="font-sans text-sm text-ink font-medium mb-1">Module réservé aux membres Premium</p>
              <p className="font-sans text-xs text-muted-cream">Débloquez l&apos;accès à tous les modules pour 9 900 XOF / mois</p>
            </div>
            <button
              className="w-full py-4 font-sans font-semibold text-sm text-black"
              style={{ background: GOLD_GRAD, borderRadius: "2px" }}
              onClick={() => go("premium")}
            >
              Passer Premium — 9 900 XOF / mois
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-3 pb-8">
            <button
              className="w-full py-4 font-sans font-semibold text-sm text-black"
              style={{ background: GOLD_GRAD, borderRadius: "2px" }}
              onClick={() => go("video-player")}
            >
              {m.progress > 0 ? "Reprendre le module" : "Commencer le module"}
            </button>
            <button
              className="w-full py-3 font-sans text-sm font-medium text-ink"
              style={{ border: `1px solid ${LINE_CREAM}`, borderRadius: "2px" }}
              onClick={() => go("catalogue")}
            >
              Retour au catalogue
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── VIDEO PLAYER ──────────────────────────────────────────── */
function VideoPlayerScreen({ go }: { go: (s: Screen) => void }) {
  const [progress, setProgress] = useState(42);
  const [playing, setPlaying] = useState(false);
  const [tab, setTab] = useState<"video" | "text">("video");

  useEffect(() => {
    if (!playing) return;
    if (progress >= 100) { setPlaying(false); return; }
    const t = setInterval(() => setProgress((p) => Math.min(p + 1, 100)), 300);
    return () => clearInterval(t);
  }, [playing, progress]);

  return (
    <div className="flex flex-col h-full bg-black">
      {/* Top bar */}
      <div
        className="flex items-center justify-between px-5 h-14 shrink-0"
        style={{ borderBottom: `1px solid ${LINE_BLACK}` }}
      >
        <button className="text-cream text-xl" onClick={() => go("module-detail")}>←</button>
        <span className="font-sans text-cream text-sm font-medium">Épargne et investissement</span>
        <div className="w-8" />
      </div>

      {/* Module progress */}
      <div className="px-5 pt-3 pb-2 shrink-0">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-sans text-muted-black">Progression du module</span>
          <span className="text-xs font-sans text-gold">{progress}%</span>
        </div>
        <div className="h-1 rounded-full overflow-hidden" style={{ background: "#333" }}>
          <div className="h-full rounded-full transition-all" style={{ width: `${progress}%`, background: "linear-gradient(90deg, #8A6D3A, #B8975A)" }} />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex px-5 gap-4 mb-0 shrink-0" style={{ borderBottom: `1px solid ${LINE_BLACK}` }}>
        {(["video", "text"] as const).map((t) => (
          <button
            key={t}
            className="py-3 text-xs font-sans font-medium transition-colors"
            style={{
              color: tab === t ? "#B8975A" : "#B7AB92",
              borderBottom: tab === t ? "2px solid #B8975A" : "2px solid transparent",
            }}
            onClick={() => setTab(t)}
          >
            {t === "video" ? "Vidéo" : "Support texte"}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {tab === "video" ? (
          <div className="flex flex-col">
            {/* Video area */}
            <div
              className="relative w-full flex items-center justify-center cursor-pointer"
              style={{ background: "#0a0a0a", aspectRatio: "16/9" }}
              onClick={() => setPlaying(!playing)}
            >
              <div
                className="w-16 h-16 flex items-center justify-center rounded-full"
                style={{ background: "rgba(184,151,90,0.85)" }}
              >
                <span className="text-black text-2xl ml-1">{playing ? "⏸" : "▶"}</span>
              </div>
              {playing && (
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.2)" }}>
                    <div className="h-full rounded-full transition-all" style={{ width: `${progress}%`, background: "#B8975A" }} />
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="px-5 pt-5">
              <h2
                className="text-cream font-bold text-lg mb-3"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Épargne et investissement pour débutants
              </h2>
              <p
                className="italic text-gold-light text-sm mb-4"
                style={{ fontFamily: "Cormorant Garamond, serif" }}
              >
                « Épargner, c&apos;est se payer en premier. Investir, c&apos;est faire travailler ce qu&apos;on a épargné. »
              </p>
              <p className="font-sans text-muted-black text-sm leading-relaxed mb-6">
                Dans ce module, vous apprendrez à distinguer l&apos;épargne de l&apos;investissement, à construire un fonds d&apos;urgence, et à choisir les premiers instruments adaptés à votre situation.
              </p>
            </div>
          </div>
        ) : (
          <div className="px-5 pt-5">
            <h2 className="text-cream font-bold text-base mb-4" style={{ fontFamily: "Playfair Display, serif" }}>Support de cours</h2>
            {["Définitions clés", "Les règles d'or de l'épargne", "Instruments disponibles en Afrique", "Exercices pratiques"].map((s, i) => (
              <div key={i} className="flex items-center justify-between py-3" style={{ borderBottom: `1px solid ${LINE_BLACK}` }}>
                <div className="flex items-center gap-3">
                  <span className="text-gold text-sm">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-sans text-cream text-sm">{s}</span>
                </div>
                <span className="text-muted-black text-xs">PDF</span>
              </div>
            ))}
            <button
              className="w-full mt-4 py-3 font-sans text-sm font-medium text-black"
              style={{ background: GOLD_GRAD, borderRadius: "2px" }}
            >
              ↓ Télécharger le support complet
            </button>
          </div>
        )}
      </div>

      {/* Quiz CTA */}
      <div
        className="shrink-0 px-5 py-4"
        style={{ borderTop: `1px solid ${LINE_BLACK}` }}
      >
        <button
          className="w-full py-4 font-sans font-semibold text-sm transition-all"
          style={{
            background: progress >= 80 ? GOLD_GRAD : "rgba(184,151,90,0.2)",
            color: progress >= 80 ? "#141414" : "#B7AB92",
            borderRadius: "2px",
            cursor: progress >= 80 ? "pointer" : "default",
          }}
          onClick={() => progress >= 80 && go("quiz")}
        >
          {progress >= 80 ? "Passer le quiz →" : `Regardez encore ${100 - progress}% pour débloquer le quiz`}
        </button>
      </div>
    </div>
  );
}

/* ─── QUIZ ──────────────────────────────────────────────────── */
function QuizScreen({ go }: { go: (s: Screen) => void }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>(quizQuestions.map(() => null));
  const [submitted, setSubmitted] = useState(false);

  const q = quizQuestions[current];
  const totalCorrect = answers.filter((a, i) => a === quizQuestions[i].correct).length;
  const pct = Math.round((totalCorrect / quizQuestions.length) * 100);

  function handleNext() {
    const newAnswers = [...answers];
    newAnswers[current] = selected;
    setAnswers(newAnswers);
    if (current + 1 < quizQuestions.length) {
      setCurrent(current + 1);
      setSelected(null);
    } else {
      setSubmitted(true);
    }
  }

  if (submitted) {
    const pass = pct >= 60;
    return (
      <div className="flex flex-col h-full bg-cream items-center justify-center px-6 text-center">
        <div
          className="w-20 h-20 flex items-center justify-center mb-6 rounded-full"
          style={{ background: pass ? "rgba(184,151,90,0.15)" : "rgba(192,57,43,0.1)" }}
        >
          {pass ? <TrophyIcon size={32} color="#B8975A" /> : <BookOpenIcon size={32} color="#c0392b" />}
        </div>
        <h2
          className="text-ink font-bold text-2xl mb-2"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          {pass ? "Félicitations !" : "Continuez à apprendre"}
        </h2>
        <p
          className="italic text-gold text-base mb-3"
          style={{ fontFamily: "Cormorant Garamond, serif" }}
        >
          {pass ? "Quiz réussi avec succès" : "Score insuffisant pour valider"}
        </p>
        <div
          className="w-24 h-24 flex items-center justify-center mb-6 rounded-full"
          style={{ background: GOLD_GRAD }}
        >
          <span className="font-serif text-2xl font-bold text-black" style={{ fontFamily: "Playfair Display, serif" }}>
            {pct}%
          </span>
        </div>
        <p className="font-sans text-sm text-muted-cream mb-8">
          {totalCorrect} bonne{totalCorrect > 1 ? "s" : ""} réponse{totalCorrect > 1 ? "s" : ""} sur {quizQuestions.length}
        </p>
        {pass ? (
          <button
            className="w-full py-4 font-sans font-semibold text-sm text-black mb-3"
            style={{ background: GOLD_GRAD, borderRadius: "2px" }}
            onClick={() => go("result")}
          >
            Obtenir mon certificat →
          </button>
        ) : (
          <>
            <button
              className="w-full py-4 font-sans font-semibold text-sm text-black mb-3"
              style={{ background: GOLD_GRAD, borderRadius: "2px" }}
              onClick={() => { setCurrent(0); setSelected(null); setAnswers(quizQuestions.map(() => null)); setSubmitted(false); }}
            >
              Repasser le quiz
            </button>
            <button
              className="w-full py-3 font-sans text-sm font-medium text-ink"
              style={{ border: `1px solid ${LINE_CREAM}`, borderRadius: "2px" }}
              onClick={() => go("video-player")}
            >
              Revoir le module
            </button>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-cream">
      {/* Header */}
      <div
        className="flex items-center justify-between px-5 h-14 shrink-0"
        style={{ borderBottom: `1px solid ${LINE_CREAM}` }}
      >
        <button className="text-ink text-xl" onClick={() => go("video-player")}>←</button>
        <span className="font-sans text-xs font-medium text-muted-cream">
          Question {current + 1} / {quizQuestions.length}
        </span>
        <div className="w-8" />
      </div>

      {/* Progress */}
      <div className="px-5 pt-4 pb-2 shrink-0">
        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "#EEE5D2" }}>
          <div
            className="h-full rounded-full transition-all"
            style={{ width: `${((current) / quizQuestions.length) * 100}%`, background: "linear-gradient(90deg, #8A6D3A, #B8975A)" }}
          />
        </div>
      </div>

      <div className="flex-1 px-5 py-6 overflow-y-auto">
        <h2
          className="text-ink font-bold text-xl mb-2 leading-snug"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          {q.question}
        </h2>
        <p className="font-sans text-xs text-muted-cream mb-6">Sélectionnez la meilleure réponse</p>

        <div className="flex flex-col gap-3 mb-8">
          {q.options.map((opt, i) => (
            <button
              key={i}
              className="text-left p-4 font-sans text-sm transition-all"
              style={{
                borderRadius: "2px",
                background: selected === i ? "rgba(184,151,90,0.12)" : "#EEE5D2",
                border: selected === i ? "1.5px solid #B8975A" : `1.5px solid ${LINE_CREAM}`,
                color: selected === i ? "#211C13" : "#6E6353",
                fontWeight: selected === i ? 500 : 400,
              }}
              onClick={() => setSelected(i)}
            >
              <span
                className="inline-flex items-center justify-center w-5 h-5 mr-3 rounded-full text-xs font-bold shrink-0"
                style={{ background: selected === i ? "#B8975A" : "#F6F1E7", color: selected === i ? "#141414" : "#6E6353" }}
              >
                {["A", "B", "C", "D"][i]}
              </span>
              {opt}
            </button>
          ))}
        </div>

        <button
          className="w-full py-4 font-sans font-semibold text-sm transition-all"
          style={{
            background: selected !== null ? GOLD_GRAD : "rgba(184,151,90,0.2)",
            color: selected !== null ? "#141414" : "#B7AB92",
            borderRadius: "2px",
            cursor: selected !== null ? "pointer" : "default",
          }}
          onClick={() => selected !== null && handleNext()}
        >
          {current + 1 < quizQuestions.length ? "Question suivante →" : "Valider mes réponses"}
        </button>
      </div>
    </div>
  );
}

/* ─── RESULT + CERTIFICATE ──────────────────────────────────── */
function ResultScreen({ go }: { go: (s: Screen) => void }) {
  return (
    <div className="flex flex-col h-full bg-black overflow-y-auto">
      {/* Header */}
      <div
        className="flex items-center justify-between px-5 h-14 shrink-0"
        style={{ borderBottom: `1px solid ${LINE_BLACK}` }}
      >
        <div className="w-8" />
        <span
          className="font-serif font-bold text-cream"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          Philowona
        </span>
        <div className="w-8" />
      </div>

      <div className="flex-1 px-5 pt-8 pb-8 flex flex-col items-center text-center">
        <div className="mb-6"><TrophyIcon size={56} color="#B8975A" /></div>
        <h1
          className="text-cream font-bold text-3xl mb-2 leading-snug"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          Félicitations !
        </h1>
        <p
          className="italic text-gold-light text-base mb-6"
          style={{ fontFamily: "Cormorant Garamond, serif" }}
        >
          Module complété avec succès
        </p>

        {/* Score */}
        <div
          className="w-28 h-28 flex items-center justify-center rounded-full mb-8"
          style={{ background: GOLD_GRAD }}
        >
          <div>
            <p
              className="text-black font-bold text-3xl"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              80%
            </p>
            <p className="text-black text-xs font-sans">Score final</p>
          </div>
        </div>

        {/* Certificate preview */}
        <div
          className="w-full p-6 mb-8"
          style={{
            background: "linear-gradient(145deg, #1b1b1a, #211C13)",
            border: `1px solid ${LINE_BLACK}`,
            borderRadius: "2px",
          }}
        >
          <div style={{ borderBottom: `1px solid ${LINE_BLACK}`, paddingBottom: "16px", marginBottom: "16px" }}>
            <p className="font-sans text-xs text-muted-black mb-2 uppercase tracking-wider">Certificat de complétion</p>
            <p
              className="italic text-gold-light text-base"
              style={{ fontFamily: "Cormorant Garamond, serif" }}
            >
              délivré par Philowona.com
            </p>
          </div>
          <p className="font-sans text-xs text-muted-black mb-1">décerné à</p>
          <p
            className="text-cream font-bold text-xl mb-3"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Amadou Diallo
          </p>
          <p className="font-sans text-xs text-muted-black mb-1">pour avoir complété</p>
          <p className="font-sans text-sm text-cream font-medium mb-4">
            Épargne et investissement pour débutants
          </p>
          <div
            className="h-px mb-4"
            style={{ background: LINE_BLACK }}
          />
          <div className="flex items-center justify-between">
            <p className="font-sans text-xs text-muted-black">15 mars 2025</p>
            <p
              className="text-gold text-lg font-bold italic"
              style={{ fontFamily: "Cormorant Garamond, serif" }}
            >
              Philowona
            </p>
          </div>
        </div>

        <button
          className="w-full py-4 font-sans font-semibold text-sm text-black mb-3"
          style={{ background: GOLD_GRAD, borderRadius: "2px" }}
        >
          ↓ Télécharger le certificat (PDF)
        </button>
        <button
          className="w-full py-3 font-sans text-sm font-medium text-cream"
          style={{ border: "1px solid rgba(184,151,90,0.35)", borderRadius: "2px" }}
          onClick={() => go("profile")}
        >
          Accéder à mon espace personnel
        </button>
      </div>
    </div>
  );
}

/* ─── PROFILE ───────────────────────────────────────────────── */
function ProfileScreen({
  go,
  isPremium,
}: {
  go: (s: Screen) => void;
  isPremium: boolean;
}) {
  const [tab, setTab] = useState<"historique" | "favoris" | "certificats">("historique");

  const completed = modules.filter((m) => m.completed);
  const inProgress = modules.filter((m) => m.progress > 0 && !m.completed);

  return (
    <div className="px-5 py-5 overflow-y-auto">
      {/* Avatar + info */}
      <div className="flex items-center gap-4 mb-6">
        <div
          className="w-16 h-16 flex items-center justify-center text-2xl font-bold rounded-full"
          style={{ background: GOLD_GRAD, color: "#141414", fontFamily: "Playfair Display, serif" }}
        >
          AD
        </div>
        <div>
          <p
            className="text-ink font-bold text-xl"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Amadou Diallo
          </p>
          <p className="font-sans text-xs text-muted-cream">Dakar, Sénégal · Français</p>
          {isPremium ? (
            <span
              className="inline-flex items-center gap-1 text-xs font-sans font-semibold px-2 py-0.5 mt-1"
              style={{ background: GOLD_GRAD, color: "#141414", borderRadius: "2px" }}
            >
              ★ Premium
            </span>
          ) : (
            <span
              className="inline-flex items-center gap-1 text-xs font-sans px-2 py-0.5 mt-1"
              style={{ border: "1px solid #8A6D3A", color: "#B8975A", borderRadius: "2px" }}
            >
              Gratuit
            </span>
          )}
        </div>
      </div>

      {/* Stats strip */}
      <div
        className="grid grid-cols-3 gap-3 mb-6 p-4"
        style={{ background: "#EEE5D2", border: `1px solid ${LINE_CREAM}`, borderRadius: "2px" }}
      >
        {[{ v: "1", l: "Certifiés" }, { v: "1", l: "En cours" }, { v: "0", l: "Certificats" }].map((s, i) => (
          <div key={i} className="text-center">
            <p className="font-serif font-bold text-lg text-ink" style={{ fontFamily: "Playfair Display, serif" }}>{s.v}</p>
            <p className="font-sans text-xs text-muted-cream">{s.l}</p>
          </div>
        ))}
      </div>

      {/* Subscription */}
      {!isPremium && (
        <div
          className="flex items-center justify-between p-4 mb-6"
          style={{ background: "#141414", border: `1px solid ${LINE_BLACK}`, borderRadius: "2px" }}
        >
          <div>
            <p className="font-sans text-xs text-muted-black mb-0.5">Abonnement</p>
            <p className="font-sans text-sm text-cream font-medium">Compte gratuit</p>
          </div>
          <button
            className="px-3 py-1.5 text-xs font-semibold text-black font-sans"
            style={{ background: GOLD_GRAD, borderRadius: "2px" }}
            onClick={() => go("premium")}
          >
            Passer Premium
          </button>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-0 mb-4" style={{ borderBottom: `1px solid ${LINE_CREAM}` }}>
        {(["historique", "favoris", "certificats"] as const).map((t) => (
          <button
            key={t}
            className="flex-1 py-2.5 text-xs font-sans font-medium capitalize transition-colors"
            style={{
              color: tab === t ? "#B8975A" : "#6E6353",
              borderBottom: tab === t ? "2px solid #B8975A" : "2px solid transparent",
            }}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="flex flex-col gap-3 pb-4">
        {tab === "historique" && (
          <>
            {[...completed, ...inProgress].length === 0 ? (
              <p className="text-sm text-muted-cream font-sans text-center py-8">
                Aucun module commencé — explorez le catalogue !
              </p>
            ) : (
              [...completed, ...inProgress].map((m) => (
                <div
                  key={m.id}
                  className="flex items-center gap-3 p-3"
                  style={{ background: "#EEE5D2", border: `1px solid ${LINE_CREAM}`, borderRadius: "2px" }}
                >
                  {m.completed ? <CheckCircle /> : <span className="text-gold text-sm">{m.progress}%</span>}
                  <div className="flex-1 min-w-0">
                    <p className="font-sans text-sm text-ink font-medium line-clamp-1">{m.title}</p>
                    <p className="font-sans text-xs text-muted-cream">{m.duration} · {m.level}</p>
                  </div>
                </div>
              ))
            )}
          </>
        )}
        {tab === "favoris" && (
          <p className="text-sm text-muted-cream font-sans text-center py-8">
            Aucun module en favoris pour l&apos;instant
          </p>
        )}
        {tab === "certificats" && (
          completed.length > 0 ? (
            completed.map((m) => (
              <div
                key={m.id}
                className="flex items-center justify-between p-4"
                style={{ background: "linear-gradient(135deg, #1b1b1a, #211C13)", border: `1px solid ${LINE_BLACK}`, borderRadius: "2px" }}
              >
                <div>
                  <p className="font-sans text-xs text-muted-black mb-0.5">Certificat</p>
                  <p className="font-sans text-sm text-cream font-medium line-clamp-1">{m.title}</p>
                  <p className="font-sans text-xs text-muted-black mt-0.5">15 mars 2025</p>
                </div>
                <button className="text-xs text-gold font-sans underline ml-3 shrink-0">↓ PDF</button>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-cream font-sans text-center py-8">
              Terminez un module pour obtenir votre premier certificat
            </p>
          )
        )}
      </div>

      {/* TPE placeholder */}
      <div
        className="mt-4 p-4 opacity-50"
        style={{ border: `1px dashed ${LINE_CREAM}`, borderRadius: "2px" }}
      >
        <p className="font-sans text-xs text-muted-cream text-center">Profil TPE / Partenaire — disponible prochainement</p>
      </div>
    </div>
  );
}

/* ─── PREMIUM ───────────────────────────────────────────────── */
function PremiumScreen({ go }: { go: (s: Screen) => void }) {
  return (
    <div className="flex flex-col h-full bg-black overflow-y-auto">
      <div
        className="flex items-center px-5 h-14 shrink-0"
        style={{ borderBottom: `1px solid ${LINE_BLACK}` }}
      >
        <button className="text-cream text-xl mr-4" onClick={() => go("dashboard")}>←</button>
        <span
          className="font-serif font-bold text-cream"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          Passer Premium
        </span>
      </div>

      <div className="flex-1 px-5 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <p
            className="italic text-gold text-base mb-2"
            style={{ fontFamily: "Cormorant Garamond, serif" }}
          >
            Investissez dans votre savoir
          </p>
          <h1
            className="text-cream font-bold text-3xl mb-3"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Accès illimité à tout le catalogue
          </h1>
          <div className="inline-flex items-end gap-1">
            <span
              className="text-gold font-bold text-4xl"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              9 900
            </span>
            <span className="text-muted-black font-sans text-sm pb-1">XOF / mois</span>
          </div>
          <p className="font-sans text-xs text-muted-black mt-1">Sans engagement · Résiliable à tout moment</p>
        </div>

        {/* Features */}
        <div
          className="p-5 mb-6"
          style={{ background: "#1b1b1a", border: `1px solid ${LINE_BLACK}`, borderRadius: "2px" }}
        >
          <h2
            className="text-cream font-bold text-base mb-4"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Ce qui est inclus
          </h2>
          {[
            "8 modules de formation complets",
            "Quiz et certifications officiels",
            "Supports PDF téléchargeables",
            "Accès hors-ligne (offline)",
            "Nouveaux modules chaque mois",
            "Support prioritaire",
          ].map((f, i) => (
            <div key={i} className="flex items-center gap-3 mb-3">
              <span className="text-gold text-sm shrink-0">✓</span>
              <p className="font-sans text-cream text-sm">{f}</p>
            </div>
          ))}
        </div>

        {/* Testimonial */}
        <div
          className="p-4 mb-6 text-center"
          style={{ background: "rgba(184,151,90,0.08)", border: `1px solid ${LINE_BLACK}`, borderRadius: "2px" }}
        >
          <p
            className="italic text-gold-light text-sm mb-2 leading-relaxed"
            style={{ fontFamily: "Cormorant Garamond, serif" }}
          >
            « Philowona m&apos;a aidé à structurer mon épargne et à comprendre la fiscalité de ma TPE en 2 mois. »
          </p>
          <p className="font-sans text-xs text-muted-black">— Jean-Baptiste O., Entrepreneur, Paris</p>
        </div>

        {/* CTA */}
        <button
          className="w-full py-4 font-sans font-semibold text-sm text-black mb-3 transition-opacity hover:opacity-90"
          style={{ background: GOLD_GRAD, borderRadius: "2px" }}
          onClick={() => go("payment")}
        >
          S&apos;abonner — 9 900 XOF / mois
        </button>
        <button
          className="w-full py-3 font-sans text-sm text-muted-black"
          onClick={() => go("dashboard")}
        >
          Pas maintenant
        </button>
      </div>
    </div>
  );
}

/* ─── PAYMENT ───────────────────────────────────────────────── */
function PaymentScreen({
  go,
  setIsPremium,
}: {
  go: (s: Screen) => void;
  setIsPremium: (v: boolean) => void;
}) {
  const [operator, setOperator] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);

  const operators = [
    { id: "orange", name: "Orange Money", dot: "#E67E22" },
    { id: "mtn", name: "MTN MoMo", dot: "#D9B316" },
    { id: "wave", name: "Wave", dot: "#2E86DE" },
  ];

  function handlePay() {
    if (!operator) return;
    setLoading(true);
    setFailed(false);
    setTimeout(() => {
      setLoading(false);
      setIsPremium(true);
      go("payment-confirm");
    }, 2200);
  }

  return (
    <div className="flex flex-col h-full bg-cream overflow-y-auto">
      <div
        className="flex items-center px-5 h-14 shrink-0"
        style={{ borderBottom: `1px solid ${LINE_CREAM}` }}
      >
        <button className="text-ink text-xl mr-4" onClick={() => go("premium")}>←</button>
        <span
          className="font-serif font-bold text-ink"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          Paiement
        </span>
      </div>

      <div className="flex-1 px-5 py-6">
        {/* Summary */}
        <div
          className="p-4 mb-6"
          style={{ background: "#EEE5D2", border: `1px solid ${LINE_CREAM}`, borderRadius: "2px" }}
        >
          <p className="font-sans text-xs text-muted-cream mb-3 uppercase tracking-wider">Récapitulatif</p>
          <div className="flex items-center justify-between mb-2">
            <span className="font-sans text-sm text-ink">Abonnement Philowona Premium</span>
            <span className="font-sans text-sm font-semibold text-ink">9 900 XOF</span>
          </div>
          <div className="flex items-center justify-between mb-3">
            <span className="font-sans text-xs text-muted-cream">Période</span>
            <span className="font-sans text-xs text-muted-cream">1 mois (renouvelable)</span>
          </div>
          <div
            className="flex items-center justify-between pt-3"
            style={{ borderTop: `1px solid ${LINE_CREAM}` }}
          >
            <span className="font-sans text-sm font-semibold text-ink">Total</span>
            <span
              className="font-serif font-bold text-lg text-ink"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              9 900 XOF
            </span>
          </div>
        </div>

        {/* Operator selection */}
        <p className="font-sans text-sm font-medium text-ink mb-3">Choisissez votre opérateur</p>
        <div className="flex flex-col gap-3 mb-6">
          {operators.map((op) => (
            <button
              key={op.id}
              className="flex items-center gap-4 p-4 text-left transition-all"
              style={{
                borderRadius: "2px",
                background: operator === op.id ? "rgba(184,151,90,0.1)" : "#EEE5D2",
                border: operator === op.id ? "1.5px solid #B8975A" : `1.5px solid ${LINE_CREAM}`,
              }}
              onClick={() => setOperator(op.id)}
            >
              <span
                className="w-3 h-3 rounded-full shrink-0"
                style={{ background: op.dot }}
              />
              <span className="font-sans text-sm font-medium text-ink">{op.name}</span>
              {operator === op.id && (
                <span className="ml-auto text-gold text-lg">✓</span>
              )}
            </button>
          ))}
        </div>

        {/* Security notice */}
        <div
          className="flex items-start gap-3 p-3 mb-6"
          style={{ background: "rgba(184,151,90,0.06)", border: `1px solid ${LINE_CREAM}`, borderRadius: "2px" }}
        >
          <span className="shrink-0"><LockIcon size={16} color="#B8975A" /></span>
          <p className="font-sans text-xs text-muted-cream leading-relaxed">
            Votre paiement est traité en toute sécurité par notre passerelle mobile money. Aucune donnée bancaire n&apos;est stockée sur Philowona.
          </p>
        </div>

        {failed && (
          <div
            className="p-3 mb-4"
            style={{ background: "rgba(192,57,43,0.08)", border: "1px solid rgba(192,57,43,0.3)", borderRadius: "2px" }}
          >
            <p className="font-sans text-xs text-red-700 font-medium mb-1">Échec du paiement</p>
            <p className="font-sans text-xs text-red-600">La transaction n&apos;a pas pu être complétée. Vérifiez votre solde et réessayez.</p>
          </div>
        )}

        <button
          className="w-full py-4 font-sans font-semibold text-sm transition-all"
          style={{
            background: operator && !loading ? GOLD_GRAD : "rgba(184,151,90,0.25)",
            color: operator && !loading ? "#141414" : "#B7AB92",
            borderRadius: "2px",
            cursor: operator && !loading ? "pointer" : "default",
          }}
          onClick={handlePay}
          disabled={!operator || loading}
        >
          {loading ? "Traitement en cours…" : "Payer — 9 900 XOF"}
        </button>
      </div>
    </div>
  );
}

/* ─── PAYMENT CONFIRM ──────────────────────────────────────── */
function PaymentConfirmScreen({ go }: { go: (s: Screen) => void }) {
  return (
    <div className="flex flex-col h-full bg-black items-center justify-center px-6 text-center">
      <div
        className="w-20 h-20 flex items-center justify-center rounded-full mb-8"
        style={{ background: "rgba(184,151,90,0.15)", border: `1px solid ${LINE_BLACK}` }}
      >
        <CheckCircleIcon size={36} color="#B8975A" />
      </div>
      <h1
        className="text-cream font-bold text-3xl mb-2"
        style={{ fontFamily: "Playfair Display, serif" }}
      >
        Paiement confirmé !
      </h1>
      <p
        className="italic text-gold text-base mb-6"
        style={{ fontFamily: "Cormorant Garamond, serif" }}
      >
        Bienvenue dans l&apos;espace Premium
      </p>

      {/* Transaction recap */}
      <div
        className="w-full p-4 mb-8 text-left"
        style={{ background: "#1b1b1a", border: `1px solid ${LINE_BLACK}`, borderRadius: "2px" }}
      >
        <p className="font-sans text-xs text-muted-black mb-3 uppercase tracking-wider">Détails de la transaction</p>
        {[
          ["Référence", "PAY-2025-0143"],
          ["Montant", "9 900 XOF"],
          ["Opérateur", "MTN MoMo"],
          ["Date", "15 mars 2025"],
          ["Statut", "Succès"],
        ].map(([k, v]) => (
          <div key={k} className="flex items-center justify-between py-2" style={{ borderBottom: `1px solid rgba(184,151,90,0.15)` }}>
            <span className="font-sans text-xs text-muted-black">{k}</span>
            <span className={`font-sans text-xs font-medium ${k === "Statut" ? "text-green-400" : "text-cream"}`}>{v}</span>
          </div>
        ))}
      </div>

      <button
        className="w-full py-4 font-sans font-semibold text-sm text-black mb-3"
        style={{ background: GOLD_GRAD, borderRadius: "2px" }}
        onClick={() => go("catalogue")}
      >
        Accéder à mes modules Premium
      </button>
      <button
        className="w-full py-3 font-sans text-sm text-muted-black"
        onClick={() => go("dashboard")}
      >
        Retour au tableau de bord
      </button>
    </div>
  );
}

/* ─── ROUTER ─────────────────────────────────────────────────── */
export default function AppScreens({
  screen,
  go,
  isPremium,
  setIsPremium,
  selectedModuleId,
  setSelectedModuleId,
}: Props) {
  const noLayout = ["video-player", "quiz", "result", "payment", "payment-confirm", "premium"].includes(screen);

  const content = (() => {
    switch (screen) {
      case "dashboard":
        return <DashboardScreen go={go} isPremium={isPremium} setSelectedModuleId={setSelectedModuleId} />;
      case "catalogue":
        return <CatalogueScreen go={go} isPremium={isPremium} setSelectedModuleId={setSelectedModuleId} />;
      case "module-detail":
        return <ModuleDetailScreen go={go} isPremium={isPremium} moduleId={selectedModuleId} />;
      case "video-player":
        return <VideoPlayerScreen go={go} />;
      case "quiz":
        return <QuizScreen go={go} />;
      case "result":
        return <ResultScreen go={go} />;
      case "profile":
        return <ProfileScreen go={go} isPremium={isPremium} />;
      case "premium":
        return <PremiumScreen go={go} />;
      case "payment":
        return <PaymentScreen go={go} setIsPremium={setIsPremium} />;
      case "payment-confirm":
        return <PaymentConfirmScreen go={go} />;
      default:
        return null;
    }
  })();

  if (noLayout) {
    return <div className="flex flex-col h-full overflow-hidden">{content}</div>;
  }

  return (
    <AppLayout screen={screen} go={go}>
      {content}
    </AppLayout>
  );
}
