export type Project = {
  slug: string;
  name: string;
  description: string;
  category: "Sistemas" | "Plataformas" | "Conteúdo";
  status: "Concluído" | "Em desenvolvimento" | "Conceito";
  tech: string[];
  problem: string;
  solution: string;
  features: string[];
  challenges: string[];
  color: string;
  demo?: string;
  repository?: string;
  image?: string;
  screenshots?: { src: string; alt: string }[];
};
export const profile = {
  firstName: "Matheus",
  lastName: "Sathler",
  name: "Matheus Sathler",
  photo: "/matheus-sathler.jpg",
  role: "Desenvolvedor em formação",
  heroGreeting: "Olá, eu sou",
  heroHeadline: {
    lead: "Transformando ideias em",
    emphasis: "soluções digitais.",
  },
  heroDescription:
    "Tecnologia, curiosidade e vontade de construir. Uma trajetória em desenvolvimento de sistemas e Engenharia de Software, um projeto de cada vez.",
  aboutTitle: {
    first: "Curiosidade que move.",
    second: "Propósito que",
    emphasis: "direciona.",
  },
  aboutLead:
    "Acredito no poder da tecnologia para simplificar o dia a dia e transformar boas ideias em algo útil.",
  aboutParagraphs: [
    "Minha experiência em rotinas administrativas me ensinou a organizar informações, compreender processos e cuidar dos detalhes. Hoje, levo esse olhar para minha jornada no desenvolvimento de sistemas.",
    "Tenho interesse em automação, plataformas web e Engenharia de Software. Meu objetivo é aprender continuamente e participar da criação de soluções que tenham impacto real.",
  ],
  locationShort: "Guarujá, SP",
  locationArt: "Guarujá / São Paulo",
  country: "Brasil",
  footerLead: "Ideias em evolução.",
  footerDescription: "Uma linha de código de cada vez.",
  location: "Guarujá, São Paulo, Brasil",
  email:
    process.env.NEXT_PUBLIC_CONTACT_EMAIL || "matheus.sathler2020@gmail.com",
  github: process.env.NEXT_PUBLIC_GITHUB_URL || "https://github.com/Sathler013",
  linkedin:
    process.env.NEXT_PUBLIC_LINKEDIN_URL ||
    "https://www.linkedin.com/in/matheus-sathler-320bb3315",
  contactEndpoint: process.env.NEXT_PUBLIC_CONTACT_ENDPOINT || "",
};
export const projects: Project[] = [
  {
    slug: "myfinance",
    name: "MyFinance",
    category: "Sistemas",
    status: "Conceito",
    description:
      "Clareza para organizar o presente e planejar o futuro financeiro.",
    tech: [],
    color: "#b3c9a2",
    problem:
      "Reunir receitas, despesas e objetivos em uma visão organizada pode tornar o planejamento financeiro mais acessível.",
    solution:
      "Uma proposta de plataforma de gestão financeira pessoal, com foco em controle e visualização de informações.",
    features: [
      "Controle de receitas e despesas",
      "Dashboard financeiro",
      "Planejamento e organização de metas",
    ],
    challenges: [
      "Estruturar dados financeiros com clareza",
      "Criar visualizações úteis e acessíveis",
      "Definir cuidados de privacidade desde o início",
    ],
  },
  {
    slug: "freelix",
    name: "Freelix",
    category: "Plataformas",
    status: "Conceito",
    description: "Conectando talentos independentes a novas possibilidades.",
    tech: [],
    color: "#c4b7e6",
    problem:
      "Profissionais independentes e clientes precisam de caminhos claros para se encontrar e apresentar suas necessidades.",
    solution:
      "Uma proposta de plataforma digital para conectar freelancers a clientes, valorizando a descoberta de profissionais.",
    features: [
      "Perfis de profissionais",
      "Descoberta de talentos",
      "Apresentação de oportunidades",
    ],
    challenges: [
      "Organizar a descoberta de perfis",
      "Desenhar uma jornada simples para os dois públicos",
      "Construir confiança na experiência",
    ],
  },
  {
    slug: "ofertaradar-hub",
    name: "OfertaRadar Hub",
    category: "Sistemas",
    status: "Conceito",
    description:
      "Informação organizada para encontrar oportunidades de verdade.",
    tech: [],
    color: "#c6dc95",
    problem:
      "Acompanhar ofertas em diferentes lugares e entender variações de preço pode exigir muito trabalho manual.",
    solution:
      "Uma proposta de hub para monitorar e organizar ofertas, acompanhar preços e explorar automações de conteúdo promocional.",
    features: [
      "Organização de ofertas",
      "Histórico de preços",
      "Automação de conteúdos promocionais",
    ],
    challenges: [
      "Manter informações consistentes",
      "Apresentar histórico de preços de forma compreensível",
      "Planejar automações com fontes confiáveis",
    ],
  },
  {
    slug: "atualiza-brasil",
    name: "Atualiza Brasil",
    category: "Conteúdo",
    status: "Conceito",
    description: "Um novo olhar para apresentar e organizar informações.",
    tech: [],
    color: "#c4d6df",
    problem:
      "Uma grande quantidade de informações exige boa hierarquia para tornar a leitura e a descoberta mais simples.",
    solution:
      "Uma proposta de portal digital voltado à apresentação e à organização de informações com navegação clara.",
    features: [
      "Organização por temas",
      "Hierarquia editorial",
      "Leitura adaptada a diferentes telas",
    ],
    challenges: [
      "Definir uma arquitetura de informação útil",
      "Equilibrar conteúdo e legibilidade",
      "Criar uma experiência responsiva e acessível",
    ],
  },
];
export type SkillItem = { name: string; level: string; status: string };
export type SkillGroup = {
  category:
    | "Front-End"
    | "Back-End"
    | "Banco de Dados"
    | "Ferramentas"
    | "Em Aprendizado";
  items: SkillItem[];
};
// Edit familiarity and learning status individually after confirming each skill.
export const skills: SkillGroup[] = [
  {
    category: "Front-End",
    items: [
      { name: "HTML", level: "A confirmar", status: "Certificado obtido" },
      { name: "CSS", level: "A confirmar", status: "Certificado obtido" },
      {
        name: "JavaScript",
        level: "A confirmar",
        status: "Certificado obtido",
      },
      {
        name: "TypeScript",
        level: "A confirmar",
        status: "Interesse de estudo",
      },
      { name: "React", level: "A confirmar", status: "Interesse de estudo" },
      { name: "Next.js", level: "A confirmar", status: "Interesse de estudo" },
    ],
  },
  {
    category: "Back-End",
    items: [
      { name: "Node.js", level: "A confirmar", status: "Interesse de estudo" },
      { name: "Python", level: "A confirmar", status: "Certificado obtido" },
    ],
  },
  {
    category: "Banco de Dados",
    items: [
      { name: "SQL", level: "A confirmar", status: "Interesse de estudo" },
    ],
  },
  {
    category: "Ferramentas",
    items: [
      { name: "Git", level: "A confirmar", status: "Interesse de estudo" },
    ],
  },
  {
    category: "Em Aprendizado",
    items: [
      {
        name: "Engenharia de Software",
        level: "A confirmar",
        status: "Interesse de estudo",
      },
      {
        name: "Automação de processos",
        level: "A confirmar",
        status: "Interesse de estudo",
      },
      {
        name: "Desenvolvimento web",
        level: "A confirmar",
        status: "Interesse de estudo",
      },
    ],
  },
];
export type Experience = {
  role: string;
  area: string;
  description: string;
  activities: string[];
  company?: string;
  date?: string;
};
export const experience: Experience[] = [
  {
    role: "Jovem aprendiz",
    area: "Rotinas administrativas e apoio a processos internos",
    description:
      "Uma base profissional construída com organização, responsabilidade e atenção aos detalhes.",
    activities: [
      "Organização de informações e registros",
      "Utilização de sistemas de gestão",
      "Controle documental",
      "Apoio às rotinas de RH",
    ],
  },
];
export type Certification = {
  technology: string;
  issuer?: string;
  issuedAt?: string;
  validationUrl?: string;
  documentUrl?: string;
};
// Certificados informados pelo titular. Instituições e comprovantes ainda não fornecidos.
export const certifications: Certification[] = [
  { technology: "HTML" },
  { technology: "CSS" },
  { technology: "JavaScript" },
  { technology: "Python" },
];
export type Education = {
  title: string;
  status:
    | "Concluído"
    | "Em andamento"
    | "Planejado"
    | "Interesse de formação"
    | "Objetivo futuro";
  description: string;
  institution?: string;
  period?: string;
  validationUrl?: string;
  documentUrl?: string;
};
export const education: Education[] = [
  {
    title: "Análise e Desenvolvimento de Sistemas",
    status: "Interesse de formação",
    description:
      "Interesse em aprofundar a base técnica e o desenvolvimento de sistemas.",
  },
  {
    title: "Engenharia de Software",
    status: "Objetivo futuro",
    description:
      "Uma direção para a continuidade dos estudos e a evolução profissional.",
  },
];
export const navigation = [
  { id: "inicio", label: "Início" },
  { id: "sobre", label: "Sobre" },
  { id: "projetos", label: "Projetos" },
  { id: "tecnologias", label: "Tecnologias" },
  { id: "experiencia", label: "Experiência" },
  { id: "contato", label: "Contato" },
];
