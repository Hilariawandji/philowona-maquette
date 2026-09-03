export interface Module {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: string;
  free: boolean;
  category: string;
  progress: number;
  completed: boolean;
}

export const modules: Module[] = [
  {
    id: "1",
    title: "Les fondamentaux du patrimoine",
    description:
      "Découvrez ce qu'est le patrimoine, comment l'évaluer et les premières étapes pour le construire durablement depuis votre situation actuelle.",
    duration: "18 min",
    level: "Débutant",
    free: true,
    category: "Patrimoine",
    progress: 100,
    completed: true,
  },
  {
    id: "2",
    title: "Épargne et investissement pour débutants",
    description:
      "Comprendre la différence entre épargne et investissement, et choisir les bons instruments selon votre profil de risque et vos objectifs.",
    duration: "24 min",
    level: "Débutant",
    free: true,
    category: "Épargne",
    progress: 60,
    completed: false,
  },
  {
    id: "3",
    title: "Comprendre la fiscalité africaine",
    description:
      "Tour d'horizon des régimes fiscaux en Afrique subsaharienne : impôts sur le revenu, cotisations sociales et optimisation légale pour les TPE.",
    duration: "32 min",
    level: "Intermédiaire",
    free: false,
    category: "Fiscalité",
    progress: 0,
    completed: false,
  },
  {
    id: "4",
    title: "Mobile money et portefeuille numérique",
    description:
      "Maîtrisez les outils de paiement mobile — MTN MoMo, Orange Money, Wave — et intégrez-les dans votre gestion quotidienne.",
    duration: "20 min",
    level: "Débutant",
    free: true,
    category: "Digital",
    progress: 0,
    completed: false,
  },
  {
    id: "5",
    title: "L'immobilier comme pilier patrimonial",
    description:
      "Investir dans la pierre en Afrique : marchés, modes de financement, rendements locatifs et les pièges classiques à éviter.",
    duration: "45 min",
    level: "Intermédiaire",
    free: false,
    category: "Immobilier",
    progress: 0,
    completed: false,
  },
  {
    id: "6",
    title: "Gérer une TPE : finances et comptabilité",
    description:
      "Les bases de la comptabilité d'entreprise, la gestion de trésorerie et le pilotage financier d'une très petite entreprise.",
    duration: "38 min",
    level: "Avancé",
    free: false,
    category: "Entreprise",
    progress: 0,
    completed: false,
  },
  {
    id: "7",
    title: "Assurance et protection du patrimoine",
    description:
      "Identifier les risques patrimoniaux et choisir les couvertures adaptées : assurance-vie, maladie et biens professionnels.",
    duration: "28 min",
    level: "Intermédiaire",
    free: false,
    category: "Assurance",
    progress: 0,
    completed: false,
  },
  {
    id: "8",
    title: "Investir en bourse depuis l'Afrique",
    description:
      "Accès aux marchés boursiers, BRVM, ETF panafricains et plateformes d'investissement accessibles depuis le continent.",
    duration: "52 min",
    level: "Avancé",
    free: false,
    category: "Bourse",
    progress: 0,
    completed: false,
  },
];

export const quizQuestions = [
  {
    question: "Qu'est-ce que le patrimoine net ?",
    options: [
      "La somme de tous vos revenus annuels",
      "La valeur totale de vos actifs moins vos dettes",
      "Uniquement la valeur de vos biens immobiliers",
      "Le montant de votre épargne bancaire",
    ],
    correct: 1,
  },
  {
    question: "Quelle est la règle classique de l'épargne d'urgence ?",
    options: [
      "1 mois de salaire",
      "3 à 6 mois de dépenses courantes",
      "10 % de votre patrimoine total",
      "Le double de vos crédits en cours",
    ],
    correct: 1,
  },
  {
    question:
      "Parmi ces instruments, lequel offre généralement le meilleur rendement à long terme ?",
    options: [
      "Livret d'épargne bancaire",
      "Compte courant rémunéré",
      "Actions diversifiées en bourse",
      "Bons de caisse à 3 mois",
    ],
    correct: 2,
  },
];

export const adminUsers = [
  {
    id: "001",
    name: "Amadou Diallo",
    email: "amadou@email.sn",
    city: "Dakar",
    status: "Premium",
    joined: "12 jan. 2025",
    modules: 6,
  },
  {
    id: "002",
    name: "Fatou Koné",
    email: "fatou.kone@mail.ci",
    city: "Abidjan",
    status: "Gratuit",
    joined: "18 jan. 2025",
    modules: 2,
  },
  {
    id: "003",
    name: "Jean-Baptiste Ouédraogo",
    email: "jbo@gmail.com",
    city: "Paris",
    status: "Premium",
    joined: "2 fév. 2025",
    modules: 8,
  },
  {
    id: "004",
    name: "Nathalie Mbeki",
    email: "n.mbeki@yahoo.fr",
    city: "Genève",
    status: "Gratuit",
    joined: "14 fév. 2025",
    modules: 3,
  },
  {
    id: "005",
    name: "Ibrahim Traoré",
    email: "ibrahim.t@mail.bf",
    city: "Ouagadougou",
    status: "Premium",
    joined: "1 mars 2025",
    modules: 7,
  },
  {
    id: "006",
    name: "Mariama Baldé",
    email: "m.balde@gmail.com",
    city: "Conakry",
    status: "Gratuit",
    joined: "9 mars 2025",
    modules: 1,
  },
];

export const adminPayments = [
  {
    id: "PAY-2025-0142",
    user: "Amadou Diallo",
    amount: "9 900 XOF",
    operator: "Orange Money",
    status: "Succès",
    date: "15 mars 2025",
  },
  {
    id: "PAY-2025-0141",
    user: "Jean-Baptiste Ouédraogo",
    amount: "9 900 XOF",
    operator: "MTN MoMo",
    status: "Succès",
    date: "14 mars 2025",
  },
  {
    id: "PAY-2025-0140",
    user: "Ibrahim Traoré",
    amount: "9 900 XOF",
    operator: "Wave",
    status: "Succès",
    date: "12 mars 2025",
  },
  {
    id: "PAY-2025-0139",
    user: "Keita Souleymane",
    amount: "9 900 XOF",
    operator: "Orange Money",
    status: "Échec",
    date: "11 mars 2025",
  },
  {
    id: "PAY-2025-0138",
    user: "Mariam Coulibaly",
    amount: "9 900 XOF",
    operator: "MTN MoMo",
    status: "Succès",
    date: "10 mars 2025",
  },
  {
    id: "PAY-2025-0137",
    user: "Aïssa Ndiaye",
    amount: "9 900 XOF",
    operator: "Wave",
    status: "Succès",
    date: "8 mars 2025",
  },
];
