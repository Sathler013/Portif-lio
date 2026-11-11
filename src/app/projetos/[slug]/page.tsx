import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Code2,
} from "lucide-react";
import { projects } from "@/data/portfolio";
import "../../details.css";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return { title: "Projeto não encontrado" };
  return {
    title: project.name,
    description: project.description,
    alternates: { canonical: `/projetos/${project.slug}/` },
    openGraph: {
      title: `${project.name} — Matheus Sathler`,
      description: project.description,
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();
  const index = projects.findIndex((item) => item.slug === slug);
  const next = projects[(index + 1) % projects.length];
  return (
    <main
      className="detail-page"
      style={{ "--project-color": project.color } as React.CSSProperties}
    >
      <a className="detail-skip" href="#project-content">
        Pular para o conteúdo
      </a>
      <header className="detail-header">
        <Link
          href="/"
          className="detail-brand"
          aria-label="Matheus Sathler, início"
        >
          <img src="/logo.svg" width="40" height="34" alt="MS" />
          <span>MATHEUS SATHLER</span>
        </Link>
        <Link href="/#projetos" className="detail-back">
          <ArrowLeft size={16} /> Todos os projetos
        </Link>
      </header>
      <div className="detail-wrap" id="project-content">
        <section className="detail-hero" aria-labelledby="project-title">
          <p className="detail-eyebrow">
            <span>PROJETO {String(index + 1).padStart(2, "0")}</span>
            <i />
            {project.category}
          </p>
          <div className="detail-title-row">
            <h1 id="project-title">
              {project.name}
              <span>.</span>
            </h1>
            <span className="detail-status">
              <i />
              {project.status}
            </span>
          </div>
          <p className="detail-intro">{project.description}</p>
          <div className="detail-tech" aria-label="Tecnologias previstas">
            {project.tech.length ? (
              project.tech.map((tech) => <span key={tech}>{tech}</span>)
            ) : (
              <span>Tecnologias a confirmar</span>
            )}
          </div>
          <p className="detail-disclosure">
            As funcionalidades abaixo descrevem a proposta do projeto. A prévia
            é um estudo conceitual; tecnologias e capturas reais serão
            adicionadas após confirmação.
          </p>
        </section>
        <section
          className="detail-preview"
          aria-label={`Prévia conceitual de ${project.name}`}
        >
          <div className="detail-preview-top">
            <span>
              <i />
              <i />
              <i />
            </span>
            <p>
              Estudo de interface <span> / {project.name}</span>
            </p>
            <Code2 size={16} />
          </div>
          <div className="detail-app">
            <aside className="detail-app-sidebar">
              <strong>{project.name}</strong>
              <div className="detail-app-avatar">
                M<span>Meu espaço</span>
              </div>
              <div className="detail-app-nav active">Visão geral</div>
              <div className="detail-app-nav">Explorar</div>
              <div className="detail-app-nav">Atividades</div>
              <div className="detail-app-nav">Configurações</div>
              <small>Uma ideia em construção.</small>
            </aside>
            <div className="detail-app-main">
              <div className="detail-app-heading">
                <div>
                  <p>SEU ESPAÇO, MAIS SIMPLES</p>
                  <h3>Uma nova perspectiva.</h3>
                </div>
                <span>MS</span>
              </div>
              <div className="detail-app-metrics">
                {["Organize", "Acompanhe", "Evolua"].map((label, i) => (
                  <div key={label}>
                    <span>0{i + 1}</span>
                    <h4>{label}</h4>
                    <div />
                  </div>
                ))}
              </div>
              <div className="detail-app-chart">
                <div>
                  <p>Clareza para o próximo passo</p>
                  <span>Visualização ilustrativa</span>
                </div>
                <div className="detail-chart-bars">
                  {[32, 48, 39, 62, 50, 71, 58, 78, 68, 90, 81, 100].map(
                    (height, i) => (
                      <i key={i} style={{ height: `${height}%` }} />
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
          <p className="detail-preview-label">
            <span /> PRÉVIA CONCEITUAL · NÃO REPRESENTA UMA CAPTURA DO PRODUTO
          </p>
        </section>
        {project.screenshots?.length ? (
          <section
            className="detail-screenshots"
            aria-label="Capturas de tela do projeto"
          >
            <p className="detail-section-label">CAPTURAS DO PROJETO</p>
            <div>
              {project.screenshots.map((shot) => (
                <figure key={shot.src}>
                  <img
                    src={shot.src}
                    alt={shot.alt}
                    width={1200}
                    height={800}
                    loading="lazy"
                  />
                  <figcaption>{shot.alt}</figcaption>
                </figure>
              ))}
            </div>
          </section>
        ) : null}
        <section className="detail-story" aria-label="Sobre o projeto">
          <div className="detail-section-label">01 / CONTEXTO</div>
          <div>
            <h2>
              O problema é o<br />
              ponto de partida.
            </h2>
            <p>{project.problem}</p>
          </div>
        </section>
        <section className="detail-story" aria-label="Solução proposta">
          <div className="detail-section-label">02 / DIREÇÃO</div>
          <div>
            <h2>
              Uma solução pensada
              <br />
              para simplificar.
            </h2>
            <p>{project.solution}</p>
          </div>
        </section>
        <section className="detail-features" aria-labelledby="features-heading">
          <div>
            <p className="detail-section-label">03 / POSSIBILIDADES</p>
            <h2 id="features-heading">
              O que faz parte
              <br />
              da proposta.
            </h2>
          </div>
          <ul>
            {project.features.map((feature) => (
              <li key={feature}>
                <Check size={17} />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </section>
        <section
          className="detail-story detail-challenges"
          aria-labelledby="challenges-heading"
        >
          <div className="detail-section-label">04 / APRENDIZADO</div>
          <div>
            <h2 id="challenges-heading">Desafios a explorar.</h2>
            <ul>
              {project.challenges.map((challenge) => (
                <li key={challenge}>
                  <ArrowUpRight size={17} />
                  <span>{challenge}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
        <section
          className="detail-links"
          aria-label="Disponibilidade do projeto"
        >
          <Code2 size={24} />
          <div>
            <h3>Construindo, aprendendo, evoluindo.</h3>
            <p>
              {project.demo || project.repository
                ? "Explore o projeto nos links disponíveis."
                : "Os links da demonstração e do repositório serão publicados após confirmação. Por enquanto, conheça os outros projetos."}
            </p>
          </div>
          <div className="detail-actions">
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer">
                Demonstração <ArrowUpRight size={17} />
              </a>
            )}
            {project.repository && (
              <a
                href={project.repository}
                target="_blank"
                rel="noopener noreferrer"
              >
                Repositório <ArrowUpRight size={17} />
              </a>
            )}
            {!project.demo && !project.repository && (
              <Link href="/#projetos">
                Explorar projetos <ArrowUpRight size={17} />
              </Link>
            )}
          </div>
        </section>
        <Link href={`/projetos/${next.slug}/`} className="detail-next">
          <div>
            <p>PRÓXIMO PROJETO</p>
            <h2>
              {next.name}
              <span>.</span>
            </h2>
          </div>
          <ArrowRight size={46} strokeWidth={1} />
        </Link>
      </div>
      <footer className="detail-footer">
        <Link href="/">Matheus Sathler</Link>
        <span>Ideias em movimento. Código em evolução.</span>
        <Link href="/#contato">
          Vamos conversar <ArrowUpRight size={14} />
        </Link>
      </footer>
    </main>
  );
}
