import type { ReactNode } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  act,
  cleanup,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Portfolio from "@/components/portfolio";
import { profile, skills } from "@/data/portfolio";

// Preserve the confirmed production defaults before isolated form tests clear them.
const confirmedContact = {
  email: profile.email,
  github: profile.github,
  linkedin: profile.linkedin,
};

// Keep these interaction tests independent of animation timing and layout APIs.
vi.mock("@/components/reveal", () => ({
  default: ({
    children,
    className,
  }: {
    children: ReactNode;
    className?: string;
  }) => <div className={className}>{children}</div>,
}));

class IntersectionObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}

beforeEach(() => {
  vi.stubGlobal("IntersectionObserver", IntersectionObserverStub);
  profile.contactEndpoint = "";
  profile.email = "";
  profile.github = "";
  profile.linkedin = "";
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

async function fillContact(user: ReturnType<typeof userEvent.setup>) {
  await user.type(
    screen.getByRole("textbox", { name: /Seu nome/ }),
    "Pessoa Visitante",
  );
  await user.type(
    screen.getByRole("textbox", { name: /Seu e-mail/ }),
    "pessoa@example.com",
  );
  await user.type(
    screen.getByRole("textbox", { name: /Assunto/ }),
    "Oportunidade de estágio",
  );
  await user.type(
    screen.getByRole("textbox", { name: /Sua mensagem/ }),
    "Gostaria de conversar sobre uma oportunidade de estágio.",
  );
}

describe("Personalização confirmada por Matheus", () => {
  it("apresenta o e-mail e os perfis reais com destinos seguros", () => {
    Object.assign(profile, confirmedContact);
    expect(confirmedContact).toEqual({
      email: "matheus.sathler2020@gmail.com",
      github: "https://github.com/Sathler013",
      linkedin: "https://www.linkedin.com/in/matheus-sathler-320bb3315",
    });
    render(<Portfolio />);
    expect(
      screen
        .getByRole("link", { name: /matheus.sathler2020@gmail.com/ })
        .getAttribute("href"),
    ).toBe("mailto:matheus.sathler2020@gmail.com");
    for (const [name, href] of [
      ["GitHub", confirmedContact.github],
      ["LinkedIn", confirmedContact.linkedin],
    ]) {
      const links = screen.getAllByRole("link", { name });
      expect(links.length).toBeGreaterThan(0);
      for (const link of links) {
        expect(link.getAttribute("href")).toBe(href);
        expect(link.getAttribute("target")).toBe("_blank");
        expect(link.getAttribute("rel")).toBe("noopener noreferrer");
      }
    }
  });

  it("usa o retrato local com descrição acessível", () => {
    render(<Portfolio />);
    const portrait = screen.getByRole("img", {
      name: "Retrato de Matheus Sathler",
    });
    expect(portrait.getAttribute("src")).toBe("/matheus-sathler.jpg");
  });

  it("apresenta os quatro certificados confirmados sem inventar comprovantes", () => {
    render(<Portfolio />);
    const region = screen.getByRole("region", {
      name: /Certificações concluídas/,
    });
    expect(within(region).getAllByRole("heading", { level: 4 })).toHaveLength(
      4,
    );
    for (const technology of ["HTML", "CSS", "JavaScript", "Python"]) {
      expect(
        skills
          .flatMap((group) => group.items)
          .find((skill) => skill.name === technology)?.status,
      ).toBe("Certificado obtido");
      const heading = within(region).getByRole("heading", {
        level: 4,
        name: technology,
      });
      const card = heading.closest("article");
      expect(card).not.toBeNull();
      expect(within(card!).getByText("Certificado obtido")).toBeTruthy();
    }
    expect(within(region).queryByRole("link")).toBeNull();
    expect(
      within(region).getByText(
        /Instituições, datas e links de validação serão adicionados/,
      ),
    ).toBeTruthy();
  });
});

describe("Navegação e descoberta de conteúdo", () => {
  it("navega pelas abas de tecnologia com setas, Home e End", async () => {
    const user = userEvent.setup();
    render(<Portfolio />);
    const frontend = screen.getByRole("tab", { name: "Front-End" });
    const backend = screen.getByRole("tab", { name: "Back-End" });
    const learning = screen.getByRole("tab", { name: "Em Aprendizado" });
    frontend.focus();

    await user.keyboard("{ArrowRight}");
    expect(document.activeElement).toBe(backend);
    expect(backend.getAttribute("aria-selected")).toBe("true");
    expect(frontend.getAttribute("tabindex")).toBe("-1");
    expect(backend.getAttribute("tabindex")).toBe("0");

    await user.keyboard("{End}");
    expect(document.activeElement).toBe(learning);
    expect(learning.getAttribute("aria-selected")).toBe("true");
    await user.keyboard("{ArrowRight}");
    expect(document.activeElement).toBe(frontend);
    await user.keyboard("{ArrowLeft}");
    expect(document.activeElement).toBe(learning);
    await user.keyboard("{Home}");
    expect(document.activeElement).toBe(frontend);
    expect(frontend.getAttribute("aria-selected")).toBe("true");
    expect(
      within(screen.getByRole("tabpanel")).getByRole("heading", {
        name: "React",
      }),
    ).toBeTruthy();
  });

  it("copia o endereço de contato configurado e confirma a ação", async () => {
    profile.email = "contato@example.com";
    const user = userEvent.setup();
    const writeText = vi.spyOn(navigator.clipboard, "writeText");
    render(<Portfolio />);
    expect(
      screen
        .getByRole("link", { name: /contato@example.com/ })
        .getAttribute("href"),
    ).toBe("mailto:contato@example.com");
    await user.click(
      screen.getByRole("button", { name: "Copiar endereço de e-mail" }),
    );
    expect(writeText).toHaveBeenCalledExactlyOnceWith("contato@example.com");
    expect(await screen.findByText("Copiado!")).toBeTruthy();
  });

  it("abre o menu, fecha com Escape e fecha ao escolher uma seção", async () => {
    const user = userEvent.setup();
    render(<Portfolio />);
    const toggle = screen.getByRole("button", { name: "Abrir menu" });
    expect(toggle.getAttribute("aria-expanded")).toBe("false");

    await user.click(toggle);
    expect(toggle.getAttribute("aria-expanded")).toBe("true");
    expect(toggle.getAttribute("aria-controls")).toBe("primary-navigation");

    await user.keyboard("{Escape}");
    expect(toggle.getAttribute("aria-expanded")).toBe("false");

    await user.click(toggle);
    const navigation = screen.getByRole("navigation", {
      name: "Navegação principal",
    });
    await user.click(
      within(navigation).getByRole("link", { name: "Projetos" }),
    );
    expect(toggle.getAttribute("aria-expanded")).toBe("false");
    expect(window.location.hash).toBe("#projetos");
  });

  it("filtra os projetos por categoria e restaura a seleção completa", async () => {
    const user = userEvent.setup();
    render(<Portfolio />);
    expect(
      screen.getByRole("link", { name: /MyFinance/ }).getAttribute("href"),
    ).toMatch(/^\/projetos\/myfinance\/?$/);
    expect(screen.getByRole("link", { name: /Freelix/ })).toBeTruthy();

    const filters = screen.getByRole("group", { name: "Filtrar projetos" });
    const systems = within(filters).getByRole("button", { name: "Sistemas" });
    await user.click(systems);
    expect(systems.getAttribute("aria-pressed")).toBe("true");
    expect(screen.getByRole("link", { name: /MyFinance/ })).toBeTruthy();
    expect(screen.getByRole("link", { name: /OfertaRadar Hub/ })).toBeTruthy();
    expect(screen.queryByRole("link", { name: /Freelix/ })).toBeNull();
    expect(screen.queryByRole("link", { name: /Atualiza Brasil/ })).toBeNull();

    await user.click(within(filters).getByRole("button", { name: /Todos/ }));
    expect(screen.getByRole("link", { name: /Freelix/ })).toBeTruthy();
    expect(screen.getByRole("link", { name: /Atualiza Brasil/ })).toBeTruthy();
  });

  it("troca o painel de tecnologias e mantém o relacionamento acessível das abas", async () => {
    const user = userEvent.setup();
    render(<Portfolio />);
    const frontend = screen.getByRole("tab", { name: "Front-End" });
    expect(frontend.getAttribute("aria-selected")).toBe("true");
    expect(
      within(screen.getByRole("tabpanel")).getByRole("heading", {
        name: "React",
      }),
    ).toBeTruthy();

    const backend = screen.getByRole("tab", { name: "Back-End" });
    await user.click(backend);
    const panel = screen.getByRole("tabpanel");
    expect(backend.getAttribute("aria-selected")).toBe("true");
    expect(frontend.getAttribute("aria-selected")).toBe("false");
    expect(panel.id).toBe(backend.getAttribute("aria-controls"));
    expect(panel.getAttribute("aria-labelledby")).toBe(backend.id);
    expect(within(panel).getByRole("heading", { name: "Python" })).toBeTruthy();
    expect(
      within(panel).getByRole("heading", { name: "Node.js" }),
    ).toBeTruthy();
    expect(within(panel).queryByRole("heading", { name: "React" })).toBeNull();
    expect(within(panel).getAllByText("A confirmar")).toHaveLength(2);
  });
});

describe("Formulário de contato", () => {
  it("mostra carregamento e impede um segundo envio enquanto aguarda o serviço", async () => {
    profile.contactEndpoint = "https://contact.example.com/messages";
    const user = userEvent.setup();
    let resolveFetch!: (value: { ok: boolean }) => void;
    const fetchMock = vi.fn(
      () =>
        new Promise<{ ok: boolean }>((resolve) => {
          resolveFetch = resolve;
        }),
    );
    vi.stubGlobal("fetch", fetchMock);
    render(<Portfolio />);
    await fillContact(user);
    await user.click(screen.getByRole("button", { name: "Enviar mensagem" }));
    const pendingButton = await screen.findByRole("button", {
      name: "Enviando…",
    });
    expect((pendingButton as HTMLButtonElement).disabled).toBe(true);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(
      screen.queryByText("Mensagem enviada. Obrigado pelo contato!"),
    ).toBeNull();

    await user.click(pendingButton);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(
      (screen.getByRole("textbox", { name: /Seu nome/ }) as HTMLInputElement)
        .value,
    ).toBe("Pessoa Visitante");

    await act(async () => resolveFetch({ ok: true }));
    expect(
      await screen.findByText("Mensagem enviada. Obrigado pelo contato!"),
    ).toBeTruthy();
    expect(
      (
        screen.getByRole("button", {
          name: "Enviar mensagem",
        }) as HTMLButtonElement
      ).disabled,
    ).toBe(false);
  });

  it("associa erros aos campos inválidos e não envia dados", async () => {
    const user = userEvent.setup();
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    render(<Portfolio />);
    await user.click(screen.getByRole("button", { name: "Validar mensagem" }));

    await screen.findByText("Informe seu nome (mínimo de 2 caracteres).");
    expect(screen.getByText("Informe um e-mail válido.")).toBeTruthy();
    expect(
      screen.getByText("Informe o assunto (mínimo de 3 caracteres)."),
    ).toBeTruthy();
    expect(screen.getByText("Escreva pelo menos 10 caracteres.")).toBeTruthy();
    const name = screen.getByRole("textbox", { name: /Seu nome/ });
    expect(name.getAttribute("aria-invalid")).toBe("true");
    expect(name.getAttribute("aria-describedby")).toBe("name-error");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("informa que nenhum dado foi enviado quando o endpoint não está configurado", async () => {
    const user = userEvent.setup();
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    render(<Portfolio />);
    await fillContact(user);
    await user.click(screen.getByRole("button", { name: "Validar mensagem" }));

    expect(await screen.findByText(/nenhum dado foi enviado/)).toBeTruthy();
    expect(
      screen.queryByText("Mensagem enviada. Obrigado pelo contato!"),
    ).toBeNull();
    expect(fetchMock).not.toHaveBeenCalled();
    expect(
      (screen.getByRole("textbox", { name: /Seu nome/ }) as HTMLInputElement)
        .value,
    ).toBe("Pessoa Visitante");
  });

  it("envia JSON ao endpoint configurado e limpa os campos apenas após aceitação", async () => {
    profile.contactEndpoint = "https://contact.example.com/messages";
    const user = userEvent.setup();
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);
    render(<Portfolio />);
    await fillContact(user);
    await user.click(screen.getByRole("button", { name: "Enviar mensagem" }));

    expect(
      await screen.findByText("Mensagem enviada. Obrigado pelo contato!"),
    ).toBeTruthy();
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, request] = fetchMock.mock.calls[0];
    expect(url).toBe(profile.contactEndpoint);
    expect(request.method).toBe("POST");
    expect(request.headers).toEqual({ "Content-Type": "application/json" });
    expect(JSON.parse(request.body)).toEqual({
      name: "Pessoa Visitante",
      email: "pessoa@example.com",
      subject: "Oportunidade de estágio",
      message: "Gostaria de conversar sobre uma oportunidade de estágio.",
    });
    await waitFor(() =>
      expect(
        (screen.getByRole("textbox", { name: /Seu nome/ }) as HTMLInputElement)
          .value,
      ).toBe(""),
    );
  });

  it("mantém a mensagem e apresenta erro quando o serviço recusa o envio", async () => {
    profile.contactEndpoint = "https://contact.example.com/messages";
    const user = userEvent.setup();
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: false, status: 503 }),
    );
    render(<Portfolio />);
    await fillContact(user);
    await user.click(screen.getByRole("button", { name: "Enviar mensagem" }));

    expect((await screen.findByRole("alert")).textContent).toContain(
      "Não foi possível enviar a mensagem.",
    );
    expect(
      screen.queryByText("Mensagem enviada. Obrigado pelo contato!"),
    ).toBeNull();
    expect(
      (
        screen.getByRole("textbox", {
          name: /Sua mensagem/,
        }) as HTMLTextAreaElement
      ).value,
    ).toBe("Gostaria de conversar sobre uma oportunidade de estágio.");
  });
});
