"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  ArrowDown,
  ArrowRight,
  Check,
  Copy,
  Menu,
  X,
  MapPin,
  GitBranch,
  Code2,
  Layers,
  Database,
  Wrench,
  BookOpen,
  Mail,
  Github,
  Linkedin,
  Send,
  LoaderCircle,
  Plus,
  CheckCircle2,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  profile,
  projects,
  skills,
  experience,
  education,
  certifications,
  navigation,
} from "@/data/portfolio";
import Reveal from "./reveal";
import ProjectVisual from "./project-visual";
const schema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Informe seu nome (mínimo de 2 caracteres).")
    .max(100, "Use até 100 caracteres."),
  email: z.string().trim().email("Informe um e-mail válido.").max(254),
  subject: z
    .string()
    .trim()
    .min(3, "Informe o assunto (mínimo de 3 caracteres).")
    .max(150, "Use até 150 caracteres."),
  message: z
    .string()
    .trim()
    .min(10, "Escreva pelo menos 10 caracteres.")
    .max(5000, "Use até 5.000 caracteres."),
});
type ContactData = z.infer<typeof schema>;
const techIcons: Record<string, string> = {
  HTML: "html",
  CSS: "css",
  JavaScript: "javascript",
  TypeScript: "typescript",
  React: "react",
  "Next.js": "nextjs",
  "Node.js": "nodejs",
  Python: "python",
  Git: "git",
};
function SocialLinks({ compact = false }: { compact?: boolean }) {
  return (
    <div className={"socials " + (compact ? "compact" : "")}>
      {[
        { label: "GitHub", url: profile.github, Icon: Github },
        { label: "LinkedIn", url: profile.linkedin, Icon: Linkedin },
      ].map(({ label, url, Icon }) =>
        url ? (
          <a key={label} href={url} target="_blank" rel="noopener noreferrer">
            <Icon size={16} />
            {label}
            <ArrowUpRight size={13} />
          </a>
        ) : (
          <span key={label} title="Link ainda não informado">
            <Icon size={16} />
            {label}
            <small>A configurar</small>
          </span>
        ),
      )}
    </div>
  );
}
function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("inicio");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-15% 0px -65% 0px", threshold: 0 },
    );
    navigation.forEach((n) => {
      const e = document.getElementById(n.id);
      if (e) observer.observe(e);
    });
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!open) return;
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);
  return (
    <header className="header">
      <div className="header-inner">
        <a
          className="brand"
          href="#inicio"
          aria-label={profile.name + " — início"}
          onClick={() => setOpen(false)}
        >
          <img src="/logo.svg" width="43" height="36" alt="MS" />
          <span>
            {profile.firstName.toUpperCase()}
            <br />
            <b>{profile.lastName.toUpperCase()}</b>
          </span>
        </a>
        <nav
          id="primary-navigation"
          aria-label="Navegação principal"
          className={open ? "nav open" : "nav"}
        >
          {navigation
            .filter((n) => n.id !== "contato")
            .map((n) => (
              <a
                key={n.id}
                href={"#" + n.id}
                aria-current={active === n.id ? "location" : undefined}
                className={active === n.id ? "active" : ""}
                onClick={() => setOpen(false)}
              >
                {n.label}
              </a>
            ))}
          <a
            className="mobile-contact"
            href="#contato"
            onClick={() => setOpen(false)}
          >
            Contato <ArrowUpRight size={16} />
          </a>
        </nav>
        <a href="#contato" className="header-cta">
          Vamos conversar <ArrowUpRight size={15} />
        </a>
        <button
          className="menu-toggle"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="primary-navigation"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}
function SectionTitle({
  num,
  kicker,
  title,
  description,
}: {
  num: string;
  kicker: string;
  title: React.ReactNode;
  description?: string;
}) {
  return (
    <Reveal className="section-heading">
      <div>
        <div className="eyebrow">
          <span>{num} /</span> {kicker}
        </div>
        <h2>{title}</h2>
      </div>
      {description && <p>{description}</p>}
    </Reveal>
  );
}
function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactData>({ resolver: zodResolver(schema) });
  const [feedback, setFeedback] = useState<{
    type: "success" | "error" | "info";
    message: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);
  async function submit(data: ContactData) {
    setFeedback(null);
    if (!profile.contactEndpoint) {
      setFeedback({
        type: "info",
        message:
          "Sua mensagem está preenchida corretamente. O envio ainda não está disponível; nenhum dado foi enviado.",
      });
      return;
    }
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch(profile.contactEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        signal: controller.signal,
      });
      if (!response.ok) throw new Error();
      setFeedback({
        type: "success",
        message: "Mensagem enviada. Obrigado pelo contato!",
      });
      reset();
    } catch {
      setFeedback({
        type: "error",
        message:
          "Não foi possível enviar a mensagem. Tente novamente mais tarde.",
      });
    } finally {
      clearTimeout(timeout);
    }
  }
  async function copy() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setFeedback({
        type: "error",
        message:
          "Não foi possível copiar. Selecione o endereço de e-mail e copie manualmente.",
      });
    }
  }
  return (
    <section id="contato" className="section contact-section">
      <div className="contact-grid">
        <Reveal>
          <div className="eyebrow">
            <span>06 /</span> VAMOS CONVERSAR
          </div>
          <h2>
            Uma boa conversa.
            <br />
            Uma nova <span>possibilidade.</span>
          </h2>
          <p>
            Tem uma oportunidade, uma ideia ou quer trocar experiências sobre
            tecnologia? Vamos nos conectar.
          </p>
          {profile.email ? (
            <div className="email-row">
              <a href={"mailto:" + profile.email}>
                {profile.email}
                <ArrowUpRight size={19} />
              </a>
              <button onClick={copy} aria-label="Copiar endereço de e-mail">
                {copied ? <Check size={18} /> : <Copy size={18} />}
              </button>
              <span role="status">{copied ? "Copiado!" : ""}</span>
            </div>
          ) : (
            <div className="contact-pending">
              <Mail size={18} />
              <div>
                Contato direto em atualização
                <small>Endereço de e-mail ainda não informado.</small>
              </div>
            </div>
          )}
          <SocialLinks />
          <div className="location">
            <MapPin size={15} /> {profile.location}
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <form onSubmit={handleSubmit(submit)} noValidate>
            <div className="form-title">
              Deixe sua mensagem <ArrowUpRight size={20} />
            </div>
            <div className="form-pair">
              <label htmlFor="name">
                Seu nome
                <input
                  id="name"
                  placeholder="Como posso chamar você?"
                  autoComplete="name"
                  {...register("name")}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                {errors.name && (
                  <small id="name-error" className="field-error">
                    {errors.name.message}
                  </small>
                )}
              </label>
              <label htmlFor="email">
                Seu e-mail
                <input
                  id="email"
                  type="email"
                  placeholder="voce@exemplo.com"
                  autoComplete="email"
                  {...register("email")}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <small id="email-error" className="field-error">
                    {errors.email.message}
                  </small>
                )}
              </label>
            </div>
            <label htmlFor="subject">
              Assunto
              <input
                id="subject"
                placeholder="Sobre o que vamos conversar?"
                {...register("subject")}
                aria-invalid={!!errors.subject}
                aria-describedby={errors.subject ? "subject-error" : undefined}
              />
              {errors.subject && (
                <small id="subject-error" className="field-error">
                  {errors.subject.message}
                </small>
              )}
            </label>
            <label htmlFor="message">
              Sua mensagem
              <textarea
                id="message"
                rows={4}
                placeholder="Conte um pouco sobre sua ideia ou oportunidade…"
                {...register("message")}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "message-error" : undefined}
              />
              {errors.message && (
                <small id="message-error" className="field-error">
                  {errors.message.message}
                </small>
              )}
            </label>
            {!profile.contactEndpoint && (
              <p className="form-note">
                Envio em configuração. Por enquanto, você pode validar o
                preenchimento da mensagem.
              </p>
            )}
            <button
              type="submit"
              className="button primary submit"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Enviando…"
                : profile.contactEndpoint
                  ? "Enviar mensagem"
                  : "Validar mensagem"}
              {isSubmitting ? (
                <LoaderCircle className="spin" size={17} />
              ) : (
                <ArrowUpRight size={17} />
              )}
            </button>
            {feedback && (
              <div
                className={"form-feedback " + feedback.type}
                role={feedback.type === "error" ? "alert" : "status"}
              >
                {feedback.message}
              </div>
            )}
            <p className="privacy-note">
              {profile.contactEndpoint
                ? "Seus dados serão enviados apenas para responder ao contato."
                : "Nenhum dado é enviado enquanto o contato não estiver configurado."}
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
export default function Portfolio() {
  const [filter, setFilter] = useState("Todos");
  const [tech, setTech] = useState<string>(skills[0]?.category || "");
  function handleTechnologyKeyDown(
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    let next = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown")
      next = (index + 1) % skills.length;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp")
      next = (index - 1 + skills.length) % skills.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = skills.length - 1;
    else return;
    event.preventDefault();
    setTech(skills[next].category);
    document.getElementById("tech-tab-" + next)?.focus();
  }
  const icons = [Code2, Layers, Database, Wrench, BookOpen];
  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo">
        <section id="inicio" className="hero">
          <div className="hero-grain" />
          <div className="hero-layout">
            <div className="hero-content">
              <Reveal>
                <div className="hero-kicker">
                  <span className="status-dot" /> {profile.role.toUpperCase()}
                </div>
                <p className="hero-greeting">{profile.heroGreeting}</p>
                <h1>
                  {profile.firstName}
                  <br />
                  <span>{profile.lastName}.</span>
                  <i>↗</i>
                </h1>
                <h2>
                  {profile.heroHeadline.lead}
                  <br />
                  <em>{profile.heroHeadline.emphasis}</em>
                </h2>
                <p className="hero-description">{profile.heroDescription}</p>
                <div className="hero-actions">
                  <a className="button primary" href="#projetos">
                    Conhecer projetos <ArrowUpRight size={18} />
                  </a>
                  <a className="button secondary" href="#contato">
                    Entrar em contato <ArrowRight size={17} />
                  </a>
                </div>
                <SocialLinks compact />
              </Reveal>
            </div>
            <Reveal className="hero-art" delay={0.15}>
              <div className="art-top">
                <span>{profile.name.toUpperCase()}</span>
                <span>{profile.role.toUpperCase()}</span>
              </div>
              {profile.photo ? (
                <div className="portrait-frame">
                  <img
                    className="hero-portrait"
                    src={profile.photo}
                    width={460}
                    height={460}
                    alt={"Retrato de " + profile.name}
                    fetchPriority="high"
                  />
                </div>
              ) : (
                <div className="monogram-frame">
                  <div className="art-grid" />
                  <div className="art-orbit" />
                  <img
                    className="hero-monogram"
                    src="/logo.svg"
                    alt={"Monograma MS — " + profile.name}
                    width={600}
                    height={500}
                  />
                </div>
              )}
              <div className="art-bottom">
                <span>IDEIAS. CÓDIGO. PROPÓSITO.</span>
                <span className="art-coordinates">
                  {profile.locationArt.toUpperCase()}
                </span>
              </div>
            </Reveal>
          </div>
          <div className="hero-bottom">
            <a href="#sobre" className="scroll-link">
              <span className="scroll-icon">
                <ArrowDown size={15} />
              </span>{" "}
              EXPLORE MINHA TRAJETÓRIA
            </a>
            <div>
              <span>BASEADO EM</span> {profile.locationShort.toUpperCase()}{" "}
              <span className="small-dot">•</span>{" "}
              {profile.country.toUpperCase()}
            </div>
            <span className="hero-index">PORTFÓLIO / 2026</span>
          </div>
        </section>
        <div className="ticker" aria-hidden="true">
          <div>
            DESENVOLVIMENTO <span>✳</span> CRIATIVIDADE <span>✳</span>{" "}
            APRENDIZADO CONTÍNUO <span>✳</span> SOLUÇÕES DIGITAIS <span>✳</span>
          </div>
        </div>
        <section id="sobre" className="section about-section">
          <div className="about-grid">
            <Reveal>
              <div className="eyebrow">
                <span>01 /</span> SOBRE MIM
              </div>
              <h2>
                {profile.aboutTitle.first}
                <br />
                {profile.aboutTitle.second}{" "}
                <em>{profile.aboutTitle.emphasis}</em>
              </h2>
              <div className="about-signature">
                {profile.name}
                <span>{profile.role.toUpperCase()}</span>
              </div>
            </Reveal>
            <Reveal delay={0.1} className="about-copy">
              <p className="lead">{profile.aboutLead}</p>
              {profile.aboutParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <div className="about-principles">
                <div>
                  <Code2 size={19} />
                  <span>
                    Construir com
                    <br />
                    <b>intenção</b>
                  </span>
                </div>
                <div>
                  <GitBranch size={19} />
                  <span>
                    Evoluir com
                    <br />
                    <b>cada projeto</b>
                  </span>
                </div>
                <div>
                  <BookOpen size={19} />
                  <span>
                    Aprender
                    <br />
                    <b>sempre</b>
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
        <section id="projetos" className="section projects-section">
          <SectionTitle
            num="02"
            kicker="IDEIAS EM CONSTRUÇÃO"
            title={
              <>
                Projetos com <em>propósito.</em>
              </>
            }
            description="Explorando possibilidades, conectando ideias e construindo minha trajetória através de projetos."
          />
          <div className="project-toolbar">
            <div
              className="filter-list"
              role="group"
              aria-label="Filtrar projetos"
            >
              {["Todos", "Sistemas", "Plataformas", "Conteúdo"].map((f) => (
                <button
                  key={f}
                  aria-pressed={filter === f}
                  className={filter === f ? "selected" : ""}
                  onClick={() => setFilter(f)}
                >
                  {f}
                  {f === "Todos" && <span>04</span>}
                </button>
              ))}
            </div>
            <span>SELEÇÃO DE PROJETOS / 01—04</span>
          </div>
          <div className="project-grid grid grid-cols-1 sm:grid-cols-2">
            {projects
              .filter((p) => filter === "Todos" || p.category === filter)
              .map((p, i) => (
                <Reveal key={p.slug} delay={(i % 2) * 0.06}>
                  <Link
                    className="project-card"
                    href={"/projetos/" + p.slug + "/"}
                  >
                    <div className="project-image">
                      {p.image ? (
                        <img
                          src={p.image}
                          width={800}
                          height={520}
                          alt={"Interface do projeto " + p.name}
                        />
                      ) : (
                        <ProjectVisual slug={p.slug} />
                      )}
                      <span className="project-open" aria-hidden="true">
                        <ArrowUpRight size={21} />
                      </span>
                    </div>
                    <div className="project-meta">
                      <span>{p.category}</span>
                      <span className="project-status">
                        <i />
                        {p.status}
                      </span>
                    </div>
                    <div className="project-title">
                      <h3>{p.name}</h3>
                      <ArrowUpRight size={24} />
                    </div>
                    <p>{p.description}</p>
                    {p.tech.length > 0 && (
                      <div
                        className="project-tech"
                        aria-label="Tecnologias do projeto"
                      >
                        {p.tech.map((technology) => (
                          <span key={technology}>{technology}</span>
                        ))}
                      </div>
                    )}
                    <span className="project-details">
                      Explorar projeto <ArrowRight size={13} />
                    </span>
                  </Link>
                </Reveal>
              ))}
          </div>
          <p className="project-disclaimer">
            <span>↳</span> Cada projeto tem seu próprio ritmo. As interfaces são
            estudos conceituais; os status serão atualizados conforme a
            evolução.
          </p>
        </section>
        <section id="tecnologias" className="section tech-section">
          <SectionTitle
            num="03"
            kicker="REPERTÓRIO EM EVOLUÇÃO"
            title={
              <>
                Ferramentas para
                <br />
                dar vida às <em>ideias.</em>
              </>
            }
            description="Certificados em HTML, CSS, JavaScript e Python fazem parte da minha formação. Nas demais tecnologias, sigo explorando possibilidades; os níveis de familiaridade serão detalhados."
          />
          <div className="tech-layout">
            <div
              className="tech-tabs"
              role="tablist"
              aria-label="Categorias de tecnologias"
            >
              {skills.map((s, i) => {
                const Icon = icons[i] || Code2;
                return (
                  <button
                    key={s.category}
                    role="tab"
                    id={"tech-tab-" + i}
                    aria-selected={tech === s.category}
                    tabIndex={tech === s.category ? 0 : -1}
                    onKeyDown={(event) => handleTechnologyKeyDown(event, i)}
                    aria-controls={"tech-panel-" + i}
                    className={tech === s.category ? "selected" : ""}
                    onClick={() => setTech(s.category)}
                  >
                    <Icon size={18} />
                    {s.category}
                    <ArrowUpRight size={16} />
                  </button>
                );
              })}
            </div>
            {skills.map(
              (s, i) =>
                s.category === tech && (
                  <div
                    className="tech-panel"
                    key={s.category}
                    role="tabpanel"
                    id={"tech-panel-" + i}
                    aria-labelledby={"tech-tab-" + i}
                    tabIndex={0}
                  >
                    <div className="tech-panel-header">
                      <span>{s.category}</span>
                      <span>
                        {String(s.items.length).padStart(2, "0")} TECNOLOGIAS /
                        TEMAS
                      </span>
                    </div>
                    <div className="tech-items">
                      {s.items.map((item, j) => (
                        <div className="tech-item" key={item.name}>
                          <span className={"tech-symbol symbol-" + (j % 4)}>
                            {techIcons[item.name] ? (
                              <img
                                src={"/icons/" + techIcons[item.name] + ".svg"}
                                width={21}
                                height={21}
                                alt=""
                              />
                            ) : (
                              "↗"
                            )}
                          </span>
                          <div>
                            <h3>{item.name}</h3>
                            <span>{item.status}</span>
                          </div>
                          <small>{item.level}</small>
                        </div>
                      ))}
                    </div>
                  </div>
                ),
            )}
          </div>
        </section>
        <section id="experiencia" className="section experience-section">
          <SectionTitle
            num="04"
            kicker="TRAJETÓRIA PROFISSIONAL"
            title={
              <>
                Experiências que
                <br />
                constroem minha <em>base.</em>
              </>
            }
          />
          <div className="experience-layout">
            <Reveal className="experience-intro">
              <p>
                Antes do código, vieram os processos, as pessoas e a
                organização.
              </p>
              <span>
                Competências que levo comigo para cada novo desafio em
                tecnologia.
              </span>
              <div className="experience-mark">↗</div>
            </Reveal>
            <Reveal className="timeline">
              {experience.map((e) => (
                <article key={e.role}>
                  <div className="timeline-dot" />
                  <div className="eyebrow">EXPERIÊNCIA ADMINISTRATIVA</div>
                  <h3>{e.role}</h3>
                  <h4>{e.area}</h4>
                  <p>{e.description}</p>
                  <ul>
                    {e.activities.map((a) => (
                      <li key={a}>
                        <Check size={14} />
                        {a}
                      </li>
                    ))}
                  </ul>
                  <small>
                    {e.company || "Empresa a confirmar"} ·{" "}
                    {e.date || "Período a confirmar"}
                  </small>
                </article>
              ))}
            </Reveal>
          </div>
        </section>
        <section className="section education-section" id="formacao">
          <SectionTitle
            num="05"
            kicker="FORMAÇÃO & APRENDIZADO"
            title={
              <>
                O próximo passo começa
                <br />
                com <em>conhecimento.</em>
              </>
            }
            description="Certificações concluídas e novos caminhos de formação para continuar evoluindo na tecnologia."
          />
          <section
            className="certifications"
            aria-labelledby="certification-title"
          >
            <h3 id="certification-title" className="certification-title">
              Certificações concluídas <span>04 / APRENDIZADO EM PRÁTICA</span>
            </h3>
            <div className="certification-grid grid grid-cols-2 lg:grid-cols-4">
              {certifications.map((certificate, index) => (
                <Reveal key={certificate.technology} delay={index * 0.04}>
                  <article className="certification-card">
                    <div className="certificate-top">
                      <img
                        src={
                          "/icons/" + techIcons[certificate.technology] + ".svg"
                        }
                        width={27}
                        height={27}
                        alt=""
                      />
                      <CheckCircle2 size={18} />
                    </div>
                    <h4>{certificate.technology}</h4>
                    <span className="certificate-status">
                      Certificado obtido
                    </span>
                    {certificate.issuer && <p>{certificate.issuer}</p>}
                    {certificate.issuedAt && <p>{certificate.issuedAt}</p>}
                    {(certificate.validationUrl || certificate.documentUrl) && (
                      <div className="certificate-links">
                        {certificate.validationUrl && (
                          <a
                            href={certificate.validationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Validar certificado <ArrowUpRight size={13} />
                          </a>
                        )}
                        {certificate.documentUrl && (
                          <a
                            href={certificate.documentUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Ver certificado <ArrowUpRight size={13} />
                          </a>
                        )}
                      </div>
                    )}
                  </article>
                </Reveal>
              ))}
            </div>
            <p className="certification-note">
              Instituições, datas e links de validação serão adicionados quando
              informados.
            </p>
          </section>
          <div className="education-grid grid grid-cols-1 sm:grid-cols-2">
            {education.map((e, i) => (
              <Reveal key={e.title} delay={i * 0.08}>
                <div className="education-card">
                  <BookOpen size={23} />
                  <span className="education-status">{e.status}</span>
                  <h3>{e.title}</h3>
                  <p>{e.description}</p>
                  {(e.institution || e.period) && (
                    <p>
                      {[e.institution, e.period].filter(Boolean).join(" · ")}
                    </p>
                  )}
                  {e.validationUrl && (
                    <p>
                      <a
                        href={e.validationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Validar certificação <ArrowUpRight size={14} />
                      </a>
                    </p>
                  )}
                  {e.documentUrl && (
                    <p>
                      <a
                        href={e.documentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Ver documento <ArrowUpRight size={14} />
                      </a>
                    </p>
                  )}
                  <div>
                    <span>CAMINHO DE APRENDIZADO</span>
                    <ArrowUpRight size={18} />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="education-note">
            As formações acima representam interesses e objetivos futuros.
            Instituições e períodos serão incluídos após confirmação.
          </p>
        </section>
        <Contact />
      </main>
      <footer>
        <div className="footer-top">
          <a className="brand" href="#inicio">
            <img src="/logo.svg" alt="MS" width="43" height="36" />
            <span>
              {profile.firstName.toUpperCase()}
              <br />
              <b>{profile.lastName.toUpperCase()}</b>
            </span>
          </a>
          <p>
            {profile.footerLead}
            <br />
            <span>{profile.footerDescription}</span>
          </p>
          <a href="#inicio" className="back-top">
            Voltar ao topo <ArrowUpRight size={17} />
          </a>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {profile.name}. Todos os direitos
            reservados.
          </span>
          <nav aria-label="Links do rodapé">
            <a href="#sobre">Sobre</a>
            <a href="#projetos">Projetos</a>
            <a href="#contato">Contato</a>
          </nav>
          <span>
            FEITO COM PROPÓSITO <i>✳</i>
          </span>
        </div>
      </footer>
    </>
  );
}
