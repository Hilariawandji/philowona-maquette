/* Jeu d'icônes SVG partagé — remplace les émoticônes par des glyphes
   cohérents avec la charte (traits fins, une seule couleur via `color`). */
import type { ReactElement } from "react";

interface IconProps {
  size?: number;
  color?: string;
}

export function HomeIcon({ size = 22, color = "#6E6353" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </svg>
  );
}

export function GridIcon({ size = 22, color = "#6E6353" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M4 4h6v6H4zm10 0h6v6h-6zM4 14h6v6H4zm10 0h6v6h-6z" />
    </svg>
  );
}

export function PersonIcon({ size = 22, color = "#6E6353" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
    </svg>
  );
}

export function LockIcon({ size = 16, color = "#6E6353" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
    </svg>
  );
}

export function StarIcon({ size = 14, color = "#B8975A" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

export function CheckCircleIcon({ size = 20, color = "#B8975A" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
    </svg>
  );
}

export function BellIcon({ size = 20, color = "#6E6353" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
    </svg>
  );
}

export function ChartIcon({ size = 18, color = "#B8975A" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M5 21V9h3v12H5zm6 0V3h3v18h-3zm6 0v-7h3v7h-3z" />
    </svg>
  );
}

export function PiggyBankIcon({ size = 18, color = "#B8975A" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6">
      <circle cx="9.5" cy="9.5" r="6" />
      <circle cx="14.5" cy="14.5" r="6" />
      <path d="M9.5 9.5v0M14.5 14.5v0" />
    </svg>
  );
}

export function DocumentIcon({ size = 18, color = "#B8975A" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6">
      <path d="M7 3h7l4 4v14H7z" />
      <path d="M14 3v4h4" />
      <path d="M9.5 12.5h5M9.5 16h5" strokeLinecap="round" />
    </svg>
  );
}

export function SmartphoneIcon({ size = 18, color = "#B8975A" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6">
      <rect x="7" y="2.5" width="10" height="19" rx="1.8" />
      <path d="M11 18.5h2" strokeLinecap="round" />
    </svg>
  );
}

export function BuildingIcon({ size = 18, color = "#B8975A" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6">
      <path d="M4 21V8l8-5 8 5v13" />
      <path d="M4 21h16" />
      <path d="M9.5 21v-6h5v6" />
      <path d="M9 11h.01M15 11h.01M9 15h.01M15 15h.01" strokeLinecap="round" />
    </svg>
  );
}

export function BriefcaseIcon({ size = 18, color = "#B8975A" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6">
      <rect x="3" y="7.5" width="18" height="12" rx="1.8" />
      <path d="M8.5 7.5V5.8A1.8 1.8 0 0 1 10.3 4h3.4a1.8 1.8 0 0 1 1.8 1.8V7.5" />
      <path d="M3 12.5h18" />
    </svg>
  );
}

export function ShieldIcon({ size = 18, color = "#B8975A" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6">
      <path d="M12 3l7 3v5.5c0 4.6-3 8.2-7 9.5-4-1.3-7-4.9-7-9.5V6z" />
      <path d="M9.2 12.2l1.9 1.9 3.7-3.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function TrendingUpIcon({ size = 18, color = "#B8975A" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6">
      <path d="M3 17l6-6 4 4 8-8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 7h6v6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function BookOpenIcon({ size = 18, color = "#B8975A" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6">
      <path d="M12 5.5c-1.6-1-3.9-1.5-6-1.5v13.5c2.1 0 4.4.5 6 1.5 1.6-1 3.9-1.5 6-1.5V4c-2.1 0-4.4.5-6 1.5z" />
      <path d="M12 5.5v13.5" />
    </svg>
  );
}

export function TrophyIcon({ size = 20, color = "#B8975A" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6">
      <path d="M7 4h10v4a5 5 0 0 1-10 0z" />
      <path d="M7 5H4v1.5A3.5 3.5 0 0 0 7.5 10M17 5h3v1.5A3.5 3.5 0 0 1 16.5 10" />
      <path d="M12 13v3M9 20h6M10 20v-3.5h4V20" strokeLinecap="round" />
    </svg>
  );
}

export function HeartIcon({ size = 20, color = "#B8975A", filled = false }: IconProps & { filled?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? color : "none"} stroke={color} strokeWidth="1.6">
      <path d="M12 20.5s-7.5-4.6-10-9.3C.4 8 2 4.5 5.4 4c2-.3 3.9.6 5.1 2.2A5.6 5.6 0 0 1 15.6 4c3.4.5 5 4 3.4 7.2-2.5 4.7-10 9.3-10 9.3z" strokeLinejoin="round" />
    </svg>
  );
}

export function SearchIcon({ size = 16, color = "#6E6353" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M20 20l-4.6-4.6" strokeLinecap="round" />
    </svg>
  );
}

export function UsersIcon({ size = 18, color = "#B8975A" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6">
      <circle cx="9" cy="8" r="3.2" />
      <path d="M2.5 20c0-3.3 2.9-5.5 6.5-5.5s6.5 2.2 6.5 5.5" />
      <path d="M16 8.2a3 3 0 1 1 3.6 4M18 14.6c2.3.4 3.9 2 3.9 4.4" strokeLinecap="round" />
    </svg>
  );
}

export function CreditCardIcon({ size = 18, color = "#B8975A" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6">
      <rect x="2.5" y="5.5" width="19" height="13" rx="1.8" />
      <path d="M2.5 9.5h19" />
      <path d="M6 14.5h4" strokeLinecap="round" />
    </svg>
  );
}

export function VideoIcon({ size = 20, color = "#B8975A" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6">
      <rect x="2.5" y="6" width="14" height="12" rx="1.6" />
      <path d="M16.5 10.5l5-2.7v8.4l-5-2.7" strokeLinejoin="round" />
    </svg>
  );
}

export function MapPinIcon({ size = 14, color = "#6E6353" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
      <path d="M12 21s-6.5-5.7-6.5-11A6.5 6.5 0 0 1 18.5 10c0 5.3-6.5 11-6.5 11z" />
      <circle cx="12" cy="10" r="2.3" />
    </svg>
  );
}

export function GlobeIcon({ size = 18, color = "#B8975A" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.5 4 6 4 9s-1.5 6.5-4 9c-2.5-2.5-4-6-4-9s1.5-6.5 4-9z" />
    </svg>
  );
}

export function MailIcon({ size = 24, color = "#B8975A" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6">
      <rect x="2.5" y="5" width="19" height="14" rx="1.8" />
      <path d="M3 6.5l9 6.5 9-6.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CheckIcon({ size = 16, color = "#B8975A" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PlayIcon({ size = 20, color = "#141414" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <polygon points="6 3 20 12 6 21 6 3" />
    </svg>
  );
}

export function PauseIcon({ size = 20, color = "#141414" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <rect x="6" y="4" width="4" height="16" rx="1" />
      <rect x="14" y="4" width="4" height="16" rx="1" />
    </svg>
  );
}

export function PhoneIcon({ size = 18, color = "#B8975A" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function HelpCircleIcon({ size = 18, color = "#B8975A" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6">
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="12" y1="17" x2="12.01" y2="17" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const CATEGORY_ICONS: Record<string, (props: IconProps) => ReactElement> = {
  Patrimoine: ChartIcon,
  Épargne: PiggyBankIcon,
  Fiscalité: DocumentIcon,
  Digital: SmartphoneIcon,
  Immobilier: BuildingIcon,
  Entreprise: BriefcaseIcon,
  Assurance: ShieldIcon,
  Bourse: TrendingUpIcon,
};

export function CategoryIcon({ category, size = 18, color = "#B8975A" }: IconProps & { category: string }) {
  const Cmp = CATEGORY_ICONS[category] ?? BookOpenIcon;
  return <Cmp size={size} color={color} />;
}

