import { useState } from "react";
import type { Screen } from "../App";
import { CategoryIcon, TrophyIcon, SmartphoneIcon, CreditCardIcon, LockIcon, MailIcon, GlobeIcon } from "../icons";

interface Props {
  screen: Screen;
  go: (s: Screen) => void;
  setSelectedModuleId: (id: string) => void;
}

const LINE_BLACK = "rgba(184,151,90,0.35)";
const GOLD_GRAD = "linear-gradient(135deg, #8A6D3A, #B8975A, #D9C39C)";

function PublicHeader({ go }: { go: (s: Screen) => void }) {
  return (
    <header
      className="shrink-0 flex items-center justify-between px-5 h-14 z-50"
      style={{
        background: "rgba(20,20,20,0.92)",
        backdropFilter: "blur(12px)",
        borderBottom: `1px solid ${LINE_BLACK}`,
      }}
    >
      <button
        className="font-serif text-cream font-bold text-lg tracking-wide"
        onClick={() => go("home")}
      >
        Philowona
      </button>
      <div className="flex items-center gap-3">
        <button
          className="text-muted-black font-sans text-sm transition-colors hover:text-gold-light"
          onClick={() => go("login")}
        >
          Connexion
        </button>
        <button
          className="px-3 py-1.5 text-xs font-sans font-medium text-gold-light transition-all hover:text-white hover:border-white"
          style={{ border: "1px solid #8A6D3A", borderRadius: "2px" }}
          onClick={() => go("register")}
        >
          S&apos;inscrire
        </button>
      </div>
    </header>
  );
}

/* ─── HOME ─────────────────────────────────────────────────── */
function HomeScreen({
  go,
  setSelectedModuleId,
}: {
  go: (s: Screen) => void;
  setSelectedModuleId: (id: string) => void;
}) {
  const previews = [
    { id: "1", category: "Patrimoine", title: "Les fondamentaux du patrimoine", duration: "18 min", free: true },
    { id: "2", category: "Épargne", title: "Épargne et investissement pour débutants", duration: "24 min", free: true },
    { id: "4", category: "Digital", title: "Mobile money et portefeuille numérique", duration: "20 min", free: true },
    { id: "5", category: "Immobilier", title: "L'immobilier comme pilier patrimonial", duration: "45 min", free: false },
  ];

  return (
    <div className="flex flex-col h-full bg-black overflow-y-auto">
      <PublicHeader go={go} />

      {/* Hero */}
      <section className="flex flex-col items-center text-center px-6 pt-16 pb-12">
        <p
          className="text-gold text-base mb-3 italic"
          style={{ fontFamily: "Cormorant Garamond, serif" }}
        >
          Votre patrimoine commence ici
        </p>
        <h1
          className="text-cream font-bold leading-tight mb-5"
          style={{ fontFamily: "Playfair Display, serif", fontSize: "38px", lineHeight: "1.15" }}
        >
          La finance accessible,<br />dans votre langue
        </h1>
        <p className="font-sans text-muted-black text-sm leading-relaxed mb-8 max-w-xs">
          Formations courtes, quiz et certificats pour bâtir votre patrimoine — depuis votre smartphone, à votre rythme.
        </p>
        <button
          className="w-full max-w-xs py-4 font-sans font-semibold text-sm text-black mb-3 transition-opacity hover:opacity-90"
          style={{ background: GOLD_GRAD, borderRadius: "2px" }}
          onClick={() => go("register")}
        >
          Commencer gratuitement
        </button>
        <button
          className="text-sm font-sans text-muted-black underline underline-offset-2"
          onClick={() => go("login")}
        >
          J&apos;ai déjà un compte
        </button>
      </section>

      {/* Divider */}
      <div className="mx-6" style={{ height: "1px", background: LINE_BLACK }} />

      {/* Modules preview */}
      <section className="px-5 pt-8 pb-6">
        <div className="flex items-center justify-between mb-4">
          <h2
            className="text-cream font-bold text-xl"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Modules gratuits
          </h2>
          <button className="text-xs text-muted-black font-sans" onClick={() => go("catalogue")}>
            Voir tout →
          </button>
        </div>
        <div className="flex flex-col gap-3">
          {previews.map((m, i) => (
            <div
              key={i}
              className="flex items-center gap-4 p-4 cursor-pointer transition-opacity hover:opacity-90"
              style={{ background: "#1b1b1a", border: `1px solid ${LINE_BLACK}`, borderRadius: "2px" }}
              onClick={() => { setSelectedModuleId(m.id); go("module-detail"); }}
            >
              <div
                className="w-10 h-10 flex items-center justify-center shrink-0"
                style={{ background: "rgba(184,151,90,0.12)", borderRadius: "2px" }}
              >
                <CategoryIcon category={m.category} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-sans text-cream text-sm font-medium leading-snug line-clamp-1">
                  {m.title}
                </p>
                <p className="text-xs text-muted-black mt-0.5">{m.duration}</p>
              </div>
              <span
                className="text-xs font-sans shrink-0 px-2 py-0.5"
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
          ))}
        </div>
      </section>

      {/* Value props */}
      <div className="mx-5" style={{ height: "1px", background: LINE_BLACK }} />
      <section className="px-5 py-8">
        <p
          className="italic text-gold text-base text-center mb-6"
          style={{ fontFamily: "Cormorant Garamond, serif" }}
        >
          Pourquoi Philowona ?
        </p>
        <div className="grid grid-cols-2 gap-3">
          {[
            { Icon: TrophyIcon, label: "Certifications reconnues" },
            { Icon: SmartphoneIcon, label: "Mobile-first & hors-ligne" },
            { Icon: GlobeIcon, label: "Contexte africain" },
            { Icon: CreditCardIcon, label: "Paiement mobile money" },
          ].map((v, i) => (
            <div
              key={i}
              className="p-4 text-center"
              style={{ background: "#1b1b1a", border: "1px solid rgba(184,151,90,0.2)", borderRadius: "2px" }}
            >
              <div className="mb-2 flex justify-center"><v.Icon size={24} color="#B8975A" /></div>
              <p className="font-sans text-cream text-xs leading-snug">{v.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA banner */}
      <section
        className="mx-5 mb-6 p-6 text-center"
        style={{ background: "linear-gradient(135deg, #1b1b1a, #211C13)", border: `1px solid ${LINE_BLACK}`, borderRadius: "2px" }}
      >
        <h3
          className="text-cream font-bold text-lg mb-2"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          Prêt à construire votre patrimoine ?
        </h3>
        <p
          className="italic text-gold-light text-sm mb-4"
          style={{ fontFamily: "Cormorant Garamond, serif" }}
        >
          Rejoignez +2 400 apprenants actifs
        </p>
        <button
          className="w-full py-3 font-sans font-semibold text-sm text-black"
          style={{ background: GOLD_GRAD, borderRadius: "2px" }}
          onClick={() => go("register")}
        >
          S&apos;inscrire — c&apos;est gratuit
        </button>
      </section>

      {/* Footer */}
      <footer
        className="px-5 py-5 text-center"
        style={{ borderTop: "1px solid rgba(184,151,90,0.2)" }}
      >
        <p className="font-sans text-xs text-muted-black mb-3">© 2025 Philowona.com</p>
        <button
          className="text-xs text-muted-black underline underline-offset-2 font-sans"
          onClick={() => go("admin-login")}
        >
          Espace Administration
        </button>
      </footer>
    </div>
  );
}

/* ─── REGISTER ──────────────────────────────────────────────── */
function RegisterScreen({ go }: { go: (s: Screen) => void }) {
  const [method, setMethod] = useState<"phone" | "email">("phone");
  const [value, setValue] = useState("");
  const [password, setPassword] = useState("");
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit() {
    setError("");
    go("otp");
  }

  const inputStyle = (hasError: boolean) => ({
    border: `1.5px solid ${hasError ? "#c0392b" : "rgba(138,109,58,0.28)"}`,
    borderRadius: "2px",
    outline: "none",
  });

  return (
    <div className="flex flex-col h-full bg-cream overflow-y-auto">
      <div
        className="flex items-center px-5 pt-12 pb-5 shrink-0"
        style={{ borderBottom: "1px solid rgba(138,109,58,0.28)" }}
      >
        <button className="mr-4 text-ink text-xl font-sans" onClick={() => go("home")}>←</button>
        <span className="font-serif text-ink text-xl font-bold" style={{ fontFamily: "Playfair Display, serif" }}>
          Créer un compte
        </span>
      </div>

      <div className="flex-1 px-5 pt-6 pb-6">
        <p
          className="italic text-gold text-sm mb-6"
          style={{ fontFamily: "Cormorant Garamond, serif" }}
        >
          Votre parcours patrimonial commence ici
        </p>

        {/* Toggle */}
        <div
          className="flex p-1 mb-5"
          style={{ background: "#EEE5D2", border: "1px solid rgba(138,109,58,0.28)", borderRadius: "2px" }}
        >
          {(["phone", "email"] as const).map((m) => (
            <button
              key={m}
              className="flex-1 py-2 text-sm font-sans font-medium transition-all"
              style={{
                borderRadius: "1px",
                background: method === m ? "#F6F1E7" : "transparent",
                color: method === m ? "#211C13" : "#6E6353",
                boxShadow: method === m ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
              }}
              onClick={() => setMethod(m)}
            >
              {m === "phone" ? "Téléphone" : "Email"}
            </button>
          ))}
        </div>

        <div className="mb-4">
          <label className="block text-xs font-sans font-medium text-ink mb-1.5">
            {method === "phone" ? "Numéro de téléphone" : "Adresse email"}
          </label>
          <input
            type={method === "phone" ? "tel" : "email"}
            placeholder={method === "phone" ? "+221 77 000 00 00" : "vous@exemple.com"}
            value={value}
            onChange={(e) => { setValue(e.target.value); setError(""); }}
            className="w-full px-4 py-3 text-sm font-sans text-ink bg-white"
            style={inputStyle(!!error && !value)}
          />
        </div>

        <div className="mb-5">
          <label className="block text-xs font-sans font-medium text-ink mb-1.5">Mot de passe</label>
          <input
            type="password"
            placeholder="Au moins 8 caractères"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 text-sm font-sans text-ink bg-white"
            style={inputStyle(!!error && !password)}
          />
        </div>

        <label className="flex items-start gap-3 mb-5 cursor-pointer">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-0.5"
            style={{ accentColor: "#B8975A" }}
          />
          <span className="text-xs font-sans text-muted-cream leading-relaxed">
            J&apos;accepte les{" "}
            <span className="text-gold underline">Conditions d&apos;utilisation</span> et la{" "}
            <span className="text-gold underline">Politique de confidentialité</span>.
            Mes données sont traitées conformément au RGPD.
          </span>
        </label>

        {error && <p className="text-xs text-red-600 mb-4 font-sans">{error}</p>}

        <button
          className="w-full py-4 font-sans font-semibold text-sm text-black mb-4 transition-opacity hover:opacity-90"
          style={{ background: GOLD_GRAD, borderRadius: "2px" }}
          onClick={handleSubmit}
        >
          Créer mon compte
        </button>

        <p className="text-center text-xs font-sans text-muted-cream">
          Déjà inscrit ?{" "}
          <button className="text-gold underline" onClick={() => go("login")}>
            Se connecter
          </button>
        </p>
      </div>

      {/* RGPD footer */}
      <div
        className="shrink-0 px-5 py-3"
        style={{ background: "#1b1b1a", borderTop: `1px solid ${LINE_BLACK}` }}
      >
        <p className="text-xs font-sans text-muted-black text-center leading-relaxed flex items-center justify-center gap-2">
          <LockIcon size={13} color="#B7AB92" />
          Données sécurisées, hébergées en Europe. Aucun partage tiers sans consentement.
        </p>
      </div>
    </div>
  );
}

/* ─── OTP ───────────────────────────────────────────────────── */
function OtpScreen({ go }: { go: (s: Screen) => void }) {
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const [timer] = useState(30);
  const [error, setError] = useState("");

  function handleDigit(i: number, val: string) {
    if (!/^\d?$/.test(val)) return;
    const next = [...digits];
    next[i] = val;
    setDigits(next);
    setError("");
  }

  function handleValidate() {
    setError("");
    go("dashboard");
  }

  return (
    <div className="flex flex-col h-full bg-cream">
      <div
        className="flex items-center px-5 pt-12 pb-5 shrink-0"
        style={{ borderBottom: "1px solid rgba(138,109,58,0.28)" }}
      >
        <button className="mr-4 text-ink text-xl" onClick={() => go("register")}>←</button>
        <span className="font-serif text-ink text-xl font-bold" style={{ fontFamily: "Playfair Display, serif" }}>
          Vérification
        </span>
      </div>

      <div className="flex-1 px-5 pt-10 text-center flex flex-col items-center">
        <p
          className="italic text-gold text-base mb-2"
          style={{ fontFamily: "Cormorant Garamond, serif" }}
        >
          Code envoyé par SMS
        </p>
        <p className="font-sans text-sm text-muted-cream mb-8">
          Saisissez le code à 6 chiffres envoyé au<br />
          <strong className="text-ink">+221 77 *** ** 42</strong>
        </p>

        {/* OTP fields */}
        <div className="flex justify-center gap-2.5 mb-4">
          {digits.map((d, i) => (
            <input
              key={i}
              type="tel"
              maxLength={1}
              value={d}
              onChange={(e) => handleDigit(i, e.target.value)}
              className="text-center text-xl font-bold text-ink bg-white"
              style={{
                width: "44px",
                height: "56px",
                border: `2px solid ${error ? "#c0392b" : "rgba(138,109,58,0.35)"}`,
                borderRadius: "2px",
                outline: "none",
                fontFamily: "Montserrat, sans-serif",
              }}
            />
          ))}
        </div>

        {error && <p className="text-xs text-red-600 mb-3 font-sans">{error}</p>}

        <p className="text-xs font-sans text-muted-cream mb-2">
          Renvoyer le code dans{" "}
          <strong>00:{String(timer).padStart(2, "0")}</strong>
        </p>
        <p className="text-xs text-muted-cream italic font-sans mb-8">
          Pour la démo, saisir : 1 2 3 4 5 6
        </p>

        <button
          className="w-full max-w-sm py-4 font-sans font-semibold text-sm text-black transition-opacity hover:opacity-90"
          style={{ background: GOLD_GRAD, borderRadius: "2px" }}
          onClick={handleValidate}
        >
          Valider
        </button>
      </div>
    </div>
  );
}

/* ─── LOGIN ─────────────────────────────────────────────────── */
function LoginScreen({ go }: { go: (s: Screen) => void }) {
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");

  const inputStyle = {
    border: "1.5px solid rgba(138,109,58,0.28)",
    borderRadius: "2px",
    outline: "none",
  };

  return (
    <div className="flex flex-col h-full bg-cream overflow-y-auto">
      <div
        className="flex items-center px-5 pt-12 pb-5 shrink-0"
        style={{ borderBottom: "1px solid rgba(138,109,58,0.28)" }}
      >
        <button className="mr-4 text-ink text-xl" onClick={() => go("home")}>←</button>
        <span className="font-serif text-ink text-xl font-bold" style={{ fontFamily: "Playfair Display, serif" }}>
          Connexion
        </span>
      </div>

      <div className="flex-1 px-5 pt-8">
        <p
          className="italic text-gold text-sm mb-8"
          style={{ fontFamily: "Cormorant Garamond, serif" }}
        >
          Bon retour parmi nous
        </p>

        <div className="mb-4">
          <label className="block text-xs font-sans font-medium text-ink mb-1.5">
            Email ou téléphone
          </label>
          <input
            type="text"
            placeholder="vous@exemple.com"
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="w-full px-4 py-3 text-sm font-sans text-ink bg-white"
            style={inputStyle}
          />
        </div>

        <div className="mb-2">
          <label className="block text-xs font-sans font-medium text-ink mb-1.5">Mot de passe</label>
          <input
            type="password"
            placeholder="••••••••"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            className="w-full px-4 py-3 text-sm font-sans text-ink bg-white"
            style={inputStyle}
          />
        </div>

        <button
          className="text-xs text-gold underline mb-8 font-sans block"
          onClick={() => go("forgot-password")}
        >
          Mot de passe oublié ?
        </button>

        <button
          className="w-full py-4 font-sans font-semibold text-sm text-black mb-4 transition-opacity hover:opacity-90"
          style={{ background: GOLD_GRAD, borderRadius: "2px" }}
          onClick={() => go("dashboard")}
        >
          Se connecter
        </button>

        <p className="text-center text-xs font-sans text-muted-cream">
          Pas encore de compte ?{" "}
          <button className="text-gold underline" onClick={() => go("register")}>
            S&apos;inscrire
          </button>
        </p>
      </div>
    </div>
  );
}

/* ─── FORGOT PASSWORD ───────────────────────────────────────── */
function ForgotPasswordScreen({ go }: { go: (s: Screen) => void }) {
  const [step, setStep] = useState<"form" | "sent" | "reset">("form");
  const [id, setId] = useState("");

  const inputStyle = {
    border: "1.5px solid rgba(138,109,58,0.28)",
    borderRadius: "2px",
    outline: "none",
  };

  if (step === "sent")
    return (
      <div className="flex flex-col h-full bg-cream">
        <div
          className="flex items-center px-5 pt-12 pb-5 shrink-0"
          style={{ borderBottom: "1px solid rgba(138,109,58,0.28)" }}
        >
          <button className="mr-4 text-ink text-xl" onClick={() => go("login")}>←</button>
          <span className="font-serif text-ink text-xl font-bold" style={{ fontFamily: "Playfair Display, serif" }}>
            Email envoyé
          </span>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
          <div
            className="w-16 h-16 flex items-center justify-center mb-6"
            style={{ background: "rgba(184,151,90,0.12)", borderRadius: "50%" }}
          >
            <MailIcon size={28} color="#B8975A" />
          </div>
          <h2
            className="text-ink font-bold text-2xl mb-3"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Vérifiez votre messagerie
          </h2>
          <p className="font-sans text-sm text-muted-cream leading-relaxed mb-8">
            Un lien de réinitialisation a été envoyé à<br />
            <strong className="text-ink">{id || "vous@exemple.com"}</strong>
          </p>
          <button
            className="text-sm text-gold underline font-sans"
            onClick={() => setStep("reset")}
          >
            Saisir un nouveau mot de passe →
          </button>
        </div>
      </div>
    );

  if (step === "reset")
    return (
      <div className="flex flex-col h-full bg-cream overflow-y-auto">
        <div
          className="flex items-center px-5 pt-12 pb-5 shrink-0"
          style={{ borderBottom: "1px solid rgba(138,109,58,0.28)" }}
        >
          <button className="mr-4 text-ink text-xl" onClick={() => setStep("sent")}>←</button>
          <span className="font-serif text-ink text-xl font-bold" style={{ fontFamily: "Playfair Display, serif" }}>
            Nouveau mot de passe
          </span>
        </div>
        <div className="flex-1 px-5 pt-8">
          <div className="mb-4">
            <label className="block text-xs font-sans font-medium text-ink mb-1.5">Nouveau mot de passe</label>
            <input type="password" placeholder="Au moins 8 caractères" className="w-full px-4 py-3 text-sm font-sans text-ink bg-white" style={inputStyle} />
          </div>
          <div className="mb-8">
            <label className="block text-xs font-sans font-medium text-ink mb-1.5">Confirmer le mot de passe</label>
            <input type="password" placeholder="Répétez le mot de passe" className="w-full px-4 py-3 text-sm font-sans text-ink bg-white" style={inputStyle} />
          </div>
          <button
            className="w-full py-4 font-sans font-semibold text-sm text-black transition-opacity hover:opacity-90"
            style={{ background: GOLD_GRAD, borderRadius: "2px" }}
            onClick={() => go("login")}
          >
            Enregistrer le nouveau mot de passe
          </button>
        </div>
      </div>
    );

  return (
    <div className="flex flex-col h-full bg-cream overflow-y-auto">
      <div
        className="flex items-center px-5 pt-12 pb-5 shrink-0"
        style={{ borderBottom: "1px solid rgba(138,109,58,0.28)" }}
      >
        <button className="mr-4 text-ink text-xl" onClick={() => go("login")}>←</button>
        <span className="font-serif text-ink text-xl font-bold" style={{ fontFamily: "Playfair Display, serif" }}>
          Mot de passe oublié
        </span>
      </div>
      <div className="flex-1 px-5 pt-8">
        <p className="font-sans text-sm text-muted-cream leading-relaxed mb-6">
          Saisissez votre email ou numéro de téléphone. Nous vous enverrons un lien pour réinitialiser votre accès.
        </p>
        <div className="mb-8">
          <label className="block text-xs font-sans font-medium text-ink mb-1.5">Email ou téléphone</label>
          <input
            type="text"
            placeholder="vous@exemple.com"
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="w-full px-4 py-3 text-sm font-sans text-ink bg-white"
            style={inputStyle}
          />
        </div>
        <button
          className="w-full py-4 font-sans font-semibold text-sm text-black transition-opacity hover:opacity-90"
          style={{ background: GOLD_GRAD, borderRadius: "2px" }}
          onClick={() => setStep("sent")}
        >
          Réinitialiser mon mot de passe
        </button>
      </div>
    </div>
  );
}

/* ─── ROUTER ─────────────────────────────────────────────────── */
export default function PublicScreens({ screen, go, setSelectedModuleId }: Props) {
  switch (screen) {
    case "home": return <HomeScreen go={go} setSelectedModuleId={setSelectedModuleId} />;
    case "register": return <RegisterScreen go={go} />;
    case "otp": return <OtpScreen go={go} />;
    case "login": return <LoginScreen go={go} />;
    case "forgot-password": return <ForgotPasswordScreen go={go} />;
    default: return null;
  }
}
