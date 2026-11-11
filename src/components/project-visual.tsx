import {
  ArrowUpRight,
  Search,
  Plus,
  Bell,
  LayoutDashboard,
  Wallet,
  TrendingUp,
  Radar,
  ArrowDown,
  SlidersHorizontal,
} from "lucide-react";
export default function ProjectVisual({ slug }: { slug: string }) {
  if (slug === "myfinance")
    return (
      <div
        className="project-visual finance"
        role="img"
        aria-label="Prévia conceitual de um dashboard financeiro"
      >
        <div className="mock-window">
          <aside>
            <b>
              <Wallet size={15} /> myfinance<span>.</span>
            </b>
            <small>VISÃO GERAL</small>
            <i>
              <LayoutDashboard size={12} /> Dashboard
            </i>
            <p>↗ &nbsp; Transações</p>
            <p>◎ &nbsp; Planejamento</p>
            <p>▧ &nbsp; Relatórios</p>
            <div className="mock-user">
              M <span>Minha conta</span>
            </div>
          </aside>
          <main>
            <div className="mock-top">
              Visão geral <Bell size={12} />
            </div>
            <strong>Seu dinheiro, com clareza.</strong>
            <p>Acompanhe suas finanças em um só lugar.</p>
            <div className="mini-balances">
              <div>
                <small>Saldo total</small>
                <b>R$ —</b>
                <em>Resumo financeiro</em>
              </div>
              <div>
                <small>Receitas</small>
                <b>↗ R$ —</b>
                <em>Este mês</em>
              </div>
              <div>
                <small>Despesas</small>
                <b>↘ R$ —</b>
                <em>Este mês</em>
              </div>
            </div>
            <div className="chart">
              <div>
                Fluxo financeiro <span>Últimos meses ↗</span>
              </div>
              <div className="bars">
                {[35, 60, 47, 78, 57, 90, 72, 98, 74, 112, 92, 125].map(
                  (v, i) => (
                    <i key={i} style={{ height: v }} />
                  ),
                )}
              </div>
              <div className="chart-labels">
                JAN <span>FEV</span> MAR <span>ABR</span> MAI <span>JUN</span>
              </div>
            </div>
          </main>
        </div>
        <span className="concept-label">
          ESTUDO DE INTERFACE · DADOS ILUSTRATIVOS
        </span>
      </div>
    );
  if (slug === "freelix")
    return (
      <div
        className="project-visual freelix"
        role="img"
        aria-label="Prévia conceitual de uma plataforma freelancer"
      >
        <div className="freelix-screen">
          <nav>
            <b>
              freelix<span>✳</span>
            </b>
            <small>Encontre talentos &nbsp; Como funciona</small>
            <span className="tiny-pill">Começar ↗</span>
          </nav>
          <div className="freelix-copy">
            <span>BOAS CONEXÕES. GRANDES IDEIAS.</span>
            <h3>
              Seu próximo projeto.
              <br />O talento certo<span>.</span>
            </h3>
            <p>Ideias encontram quem faz acontecer.</p>
            <div className="mock-search">
              <Search size={12} /> Que talento você procura? <b>↗</b>
            </div>
          </div>
          <div className="talent t-one">
            <div className="avatar avatar-one">✳</div>
            <div>
              <b>Design & criatividade</b>
              <p>Novas perspectivas</p>
            </div>
            <ArrowUpRight size={14} />
          </div>
          <div className="talent t-two">
            <div className="avatar avatar-two">⌘</div>
            <div>
              <b>Desenvolvimento</b>
              <p>Ideias em código</p>
            </div>
            <ArrowUpRight size={14} />
          </div>
          <div className="freelix-orbit">✳</div>
        </div>
        <span className="concept-label">PRÉVIA CONCEITUAL</span>
      </div>
    );
  if (slug === "ofertaradar-hub")
    return (
      <div
        className="project-visual radar"
        role="img"
        aria-label="Prévia conceitual de um monitor de ofertas"
      >
        <div className="radar-screen">
          <nav>
            <b>
              <Radar size={19} /> OfertaRadar<span>HUB</span>
            </b>
            <small>Visão geral &nbsp; Ofertas &nbsp; Histórico</small>
          </nav>
          <div className="radar-content">
            <div>
              <span className="radar-eyebrow">NO SEU RADAR</span>
              <h3>
                Boas ofertas.
                <br />
                Decisões melhores.
              </h3>
              <p>Organize, acompanhe e descubra.</p>
              <div className="radar-button">
                Explorar ofertas <ArrowUpRight size={12} />
              </div>
            </div>
            <div className="radar-circle">
              <Radar size={110} strokeWidth={0.6} />
              <i />
              <em />
            </div>
          </div>
          <div className="radar-bottom">
            <span>
              <TrendingUp size={16} /> Histórico de preços
            </span>
            <span>
              <Bell size={16} /> Alertas inteligentes
            </span>
            <span>
              <SlidersHorizontal size={16} /> Tudo organizado
            </span>
          </div>
        </div>
        <span className="concept-label">PRÉVIA CONCEITUAL</span>
      </div>
    );
  return (
    <div
      className="project-visual brasil"
      role="img"
      aria-label="Prévia conceitual de um portal de informações"
    >
      <div className="brasil-screen">
        <nav>
          <b>
            atualiza<span>brasil.</span>
          </b>
          <Search size={13} />
        </nav>
        <div className="brasil-menu">
          INÍCIO &nbsp; BRASIL &nbsp; TECNOLOGIA &nbsp; CULTURA &nbsp; COTIDIANO
        </div>
        <div className="brasil-grid">
          <div>
            <div className="editorial-art">
              <span>
                Um olhar
                <br />
                para o agora.
              </span>
              <i />
              <em />
            </div>
            <small>INFORMAÇÃO EM MOVIMENTO</small>
            <h3>
              Conexões que ampliam
              <br />a sua visão de mundo.
            </h3>
          </div>
          <aside>
            <small>EXPLORE NOVAS IDEIAS</small>
            <h4>Tecnologia e as possibilidades do amanhã.</h4>
            <div className="editorial-small">↗</div>
            <small>LEITURA & DESCOBERTA</small>
            <h4>Conteúdos organizados, novas perspectivas.</h4>
          </aside>
        </div>
      </div>
      <span className="concept-label">
        PRÉVIA CONCEITUAL · CONTEÚDO ILUSTRATIVO
      </span>
    </div>
  );
}
