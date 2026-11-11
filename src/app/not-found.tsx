import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100svh",
        background: "#111313",
        color: "#f4f4f1",
        display: "grid",
        placeItems: "center",
        padding: "32px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ maxWidth: 600 }}>
        <p style={{ fontSize: 12, letterSpacing: "0.16em", color: "#a9bba5" }}>
          ERRO 404 / CAMINHO NÃO ENCONTRADO
        </p>
        <h1
          style={{
            fontSize: "clamp(42px,8vw,80px)",
            lineHeight: 1.03,
            letterSpacing: "-0.05em",
            margin: "28px 0",
          }}
        >
          Essa ideia ainda
          <br />
          não tem endereço.
        </h1>
        <p style={{ color: "#a6aaa8", lineHeight: 1.7, maxWidth: 430 }}>
          A página que você procura não está disponível. Volte ao portfólio para
          conhecer minha trajetória e meus projetos.
        </p>
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 28,
            background: "#c6d7b5",
            color: "#111313",
            padding: "17px 22px",
            borderRadius: 5,
            textDecoration: "none",
            marginTop: 28,
            fontSize: 14,
          }}
        >
          Voltar ao início <ArrowUpRight size={18} />
        </Link>
      </div>
    </main>
  );
}
