import { useState } from "react";
import PublicScreens from "./screens/PublicScreens";
import AppScreens from "./screens/AppScreens";
import AdminScreens from "./screens/AdminScreens";

export type Screen =
  | "home"
  | "register"
  | "otp"
  | "login"
  | "forgot-password"
  | "dashboard"
  | "catalogue"
  | "module-detail"
  | "video-player"
  | "quiz"
  | "result"
  | "profile"
  | "premium"
  | "payment"
  | "payment-confirm"
  | "admin-login"
  | "admin-dashboard"
  | "admin-modules"
  | "admin-module-edit"
  | "admin-users"
  | "admin-payments";

const PUBLIC: Screen[] = [
  "home",
  "register",
  "otp",
  "login",
  "forgot-password",
];
const ADMIN: Screen[] = [
  "admin-login",
  "admin-dashboard",
  "admin-modules",
  "admin-module-edit",
  "admin-users",
  "admin-payments",
];

export default function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [isPremium, setIsPremium] = useState(false);
  const [selectedModuleId, setSelectedModuleId] = useState("2");

  const go = (s: Screen) => setScreen(s);

  const isPublic = PUBLIC.includes(screen);
  const isAdmin = ADMIN.includes(screen);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div
        className="relative w-full max-w-[430px] overflow-hidden flex flex-col bg-cream"
        style={{
          height: "100dvh",
          boxShadow: "0 0 80px rgba(184,151,90,0.12), 0 0 0 1px rgba(184,151,90,0.08)",
        }}
      >
        {isPublic && (
          <PublicScreens screen={screen} go={go} setSelectedModuleId={setSelectedModuleId} />
        )}
        {!isPublic && !isAdmin && (
          <AppScreens
            screen={screen}
            go={go}
            isPremium={isPremium}
            setIsPremium={setIsPremium}
            selectedModuleId={selectedModuleId}
            setSelectedModuleId={setSelectedModuleId}
          />
        )}
        {isAdmin && <AdminScreens screen={screen} go={go} />}
      </div>
    </div>
  );
}
