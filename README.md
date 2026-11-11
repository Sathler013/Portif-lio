# Matheus Sathler — Portfólio

Portfólio pessoal em português para apresentar a trajetória de Matheus Sathler em desenvolvimento de sistemas, seus projetos e seu aprendizado. O projeto usa Next.js com App Router e exportação estática: não precisa de banco de dados nem de servidor próprio para exibir suas páginas.

## Tecnologias

- Next.js 15, React 19 e TypeScript.
- Tailwind CSS 4 para estilos.
- Motion para React para animações com suporte a movimento reduzido.
- Lucide React para ícones.
- React Hook Form e Zod para formulário e validação.
- Vitest e Testing Library para testes de interação em jsdom.

A fonte variável **Manrope** é distribuída localmente pelo pacote `@fontsource-variable/manrope` e carregada por `next/font/local`, com `display: swap`. O visitante não depende de uma requisição ao Google Fonts. Os ícones de tecnologias disponíveis são SVGs locais em `public/icons/`, obtidos do projeto **Simple Icons**; ícones de interface usam Lucide React. Preserve as licenças e orientações de marca aplicáveis ao substituir esses arquivos.

## Executar localmente

Use uma versão LTS do Node.js compatível com Next.js 15, como Node.js 22, e npm.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Abra `http://localhost:3000`. As configurações de contato são opcionais para desenvolver e navegar no site.

```bash
npm run typecheck
npm test
npm run build
npm run test:export
```

`npm test` executa os testes de interação e conteúdo: contatos confirmados, retrato local, certificados, menu, categorias de projetos, abas por teclado, cópia do e-mail e estados do formulário, com requisições simuladas. `npm run test:export` confere as páginas e os links internos do build gerado. Para executar a sequência completa de tipos, testes, build e validação da exportação, use `npm run check`. Os testes de exportação refletem os quatro projetos iniciais; atualize suas expectativas ao mudar esse conjunto de conteúdo.

O build gera a pasta `out/`, pronta para uma hospedagem estática. `npm run start` depende do servidor Next.js e não é o comando de visualização da exportação estática; para testar o resultado publicado, use uma hospedagem ou servidor de arquivos estáticos.

## Organização

```text
src/
  app/
    page.tsx                 # Página inicial
    layout.tsx               # Estrutura global e metadata
    projetos/[slug]/page.tsx # Páginas individuais dos projetos
    not-found.tsx            # Página 404
  components/               # Componentes reutilizáveis
  data/portfolio.ts         # Conteúdo tipado e editável
public/                     # Logo, favicon e outros arquivos públicos
tests/                      # Testes de interação e da exportação estática
.env.example                # Configurações públicas de contato
VALIDACAO.md                # Checklist de revisão
```

Edite o conteúdo em `src/data/portfolio.ts`, preservando seus tipos. Novos projetos incluídos na lista geram suas próprias páginas no próximo build. Altere descrições, categorias, tecnologias, funcionalidades, desafios e status nessa fonte, sem duplicar informações nos componentes.

- `profile` reúne nome, função, localização, foto, contatos, textos do hero, apresentação e rodapé. Para personalizar a narrativa, edite `heroHeadline`, `heroDescription`, `aboutTitle`, `aboutLead` e `aboutParagraphs`. `photo` aponta ao arquivo local usado no retrato.
- `projects` aceita os status `Conceito`, `Em desenvolvimento` e `Concluído`. Preencha `demo` e `repository` apenas com URLs reais. Use `image` para a imagem de apresentação e `screenshots: [{ src, alt }]` para capturas reais com descrição acessível. Arquivos em `public/projetos/` podem ser referenciados por `/projetos/nome-do-arquivo.webp`; deixe os campos ausentes enquanto só houver prévias conceituais.
- `skills` organiza as categorias e permite editar `level` e `status` individualmente, sem atribuir a mesma familiaridade a todas as tecnologias.
- `experience` guarda a experiência profissional confirmada. `education` diferencia cursos concluídos, em andamento, planejados e interesses futuros. Cada formação pode receber `institution`, `period`, `validationUrl` e `documentUrl`, quando disponíveis. Para documentos públicos, use arquivos autorizados em `public/` e evite expor dados pessoais desnecessários.
- `certifications` registra os certificados de HTML, CSS, JavaScript e Python informados por Matheus. Preencha `issuer`, `issuedAt`, `validationUrl` e `documentUrl` somente quando essas informações forem fornecidas. A ausência de um comprovante não gera um link simulado.

## Conteúdo a confirmar

Os projetos começam como **Conceito**, pois não foram fornecidas comprovações de conclusão ou publicação. As imagens das interfaces são prévias conceituais, não capturas de produtos publicados. Só adicione links de demonstração e repositórios quando forem reais.

Matheus confirmou certificados de **HTML, CSS, JavaScript e Python**; essas tecnologias aparecem como “Certificado obtido”. Instituições emissoras, datas, links de validação e documentos ainda não foram fornecidos. O nível de familiaridade permanece “A confirmar”: possuir certificado não implica domínio profissional. As demais tecnologias continuam organizadas como interesses de estudo. O conteúdo não atribui graduação concluída ou experiência profissional em desenvolvimento; empresas, datas e formações adicionais dependem de confirmação.

O retrato em `public/matheus-sathler.jpg` usa a mesma fotografia disponibilizada no avatar público do perfil GitHub informado por Matheus, na versão quadrada de **460 × 460 pixels**, sem edição do arquivo. O arquivo direto da imagem enviada no chat não estava acessível no ambiente. Para usar o original em maior resolução, substitua esse arquivo por uma cópia autorizada e preserve o texto alternativo acessível.

A imagem da logo foi apresentada no chat, mas seu arquivo original não estava disponível para integração direta. O vetor incluído é uma reconstrução provisória inspirada no monograma MS, não o arquivo original. Substitua `public/logo.svg` pelo arquivo autorizado da marca e atualize o favicon correspondente antes do uso definitivo.

## Contato real

Os contatos abaixo foram confirmados por Matheus e já estão definidos como valores padrão em `profile`:

- E-mail: `matheus.sathler2020@gmail.com`.
- GitHub: <https://github.com/Sathler013>.
- LinkedIn: <https://www.linkedin.com/in/matheus-sathler-320bb3315>.

As variáveis em `.env.local` podem substituir esses valores quando necessário. O endpoint de envio do formulário continua sem configuração:

| Variável                       | Uso                                                                            |
| ------------------------------ | ------------------------------------------------------------------------------ |
| `NEXT_PUBLIC_CONTACT_ENDPOINT` | URL HTTPS de um serviço real de recebimento do formulário.                     |
| `NEXT_PUBLIC_CONTACT_EMAIL`    | Endereço exibido para contato e cópia.                                         |
| `NEXT_PUBLIC_GITHUB_URL`       | URL completa do perfil GitHub.                                                 |
| `NEXT_PUBLIC_LINKEDIN_URL`     | URL completa do perfil LinkedIn.                                               |
| `NEXT_PUBLIC_SITE_URL`         | Origem HTTPS definitiva do portfólio, usada na metadata e no compartilhamento. |

O formulário envia uma requisição `POST`, com `Content-Type: application/json` e este corpo:

```json
{
  "name": "Nome informado pelo visitante",
  "email": "visitante@exemplo.com",
  "subject": "Assunto informado",
  "message": "Mensagem informada pelo visitante"
}
```

O endpoint deve aceitar a origem da hospedagem por CORS, responder às requisições de preflight quando necessário e devolver um status HTTP `2xx` apenas depois de aceitar a mensagem. Uma resposta de erro deve usar um status fora de `2xx`. Sem endpoint, a interface informa que o envio ainda não está configurado; ela não apresenta um sucesso fictício.

O site exportado não inclui um serviço de envio próprio. Configure um provedor compatível ou um endpoint sob seu controle. Valide os campos também no servidor, aplique limites de tamanho e de frequência e proteja o destino contra abuso. Não confie na validação do navegador como proteção do serviço.

Todas as variáveis com prefixo `NEXT_PUBLIC_` ficam expostas no JavaScript enviado ao visitante e são incorporadas durante o build. Nunca use esses campos para segredos. Depois de alterar valores, gere um novo build e publique novamente.

Antes de habilitar o envio, informe ao visitante quem recebe os dados, a finalidade e a política de retenção, conforme seu serviço e sua prática real. Não armazene mensagens ou dados pessoais sem necessidade.

## Publicar na Vercel

1. Envie o código para um repositório Git de sua escolha.
2. Importe o repositório na Vercel e use o preset **Next.js**.
3. Mantenha a instalação com `npm install` e o build com `npm run build`. O `output: 'export'` em `next.config.ts` gera a saída estática `out/`.
4. Cadastre os valores confirmados de `.env.example` nas variáveis de ambiente da Vercel. Não envie `.env.local` para o Git.
5. Publique e confira navegação por âncoras, acesso direto às páginas dos projetos, 404, visual mobile e o formulário com seu endpoint real.
6. Ao usar um domínio próprio, defina `NEXT_PUBLIC_SITE_URL` com a origem definitiva, como `https://seu-dominio.com`, e publique um novo build. Isso ajusta a base das URLs canônicas e de compartilhamento; a imagem Open Graph está em `public/og.png`.

O código também pode ser servido por outras hospedagens estáticas. Preserve a estrutura de diretórios gerada, pois as páginas usam URLs com barra final.

## Revisão final

Use [VALIDACAO.md](./VALIDACAO.md) para registrar as verificações executadas. Resultados de build e tipos não substituem a revisão visual, os testes de teclado e o teste de entrega com o serviço real de contato.
