# Checklist de validação

Marque um item somente depois de verificá-lo. As marcações abaixo registram verificações automáticas desta sessão; itens sem marca continuam pendentes. Execute `npm run check` novamente após alterar código ou conteúdo.

Os **13 testes de interação e conteúdo** passaram em jsdom, incluindo contatos confirmados, retrato local e quatro certificados, com requisições e área de transferência simuladas. Build, verificação de tipos e validação da exportação estática também passaram nesta sessão. Esses testes não confirmam a entrega de mensagens a um serviço real.

A revisão visual e os testes em navegador não puderam ser executados: o ambiente gerenciado não disponibilizou a ferramenta `cua_repl.js`. Responsividade, aparência e compatibilidade entre navegadores permanecem sem verificação visual.

## Código e build

- [ ] Instalação a partir do arquivo de lock concluída sem erro.
- [x] `npm run typecheck` concluído sem erro nesta sessão.
- [x] `npm test` concluído: 13 testes de interação e conteúdo passaram.
- [x] `npm run build` concluído sem erro nesta sessão.
- [x] `npm run test:export` confirma página inicial, páginas dos quatro projetos, 404 e destinos dos links internos.
- [ ] Arquivos `.env.local`, segredos e dependências não estão no repositório.

## Navegação e interação

- [x] Âncoras e destinos internos conferidos na exportação HTML.
- [ ] Rolagem e posicionamento visual das âncoras conferidos no navegador.
- [ ] Header indica a seção ativa e preserva espaço para títulos.
- [x] Estado do menu abre e fecha com Escape ou seleção de seção, em teste de componente.
- [x] Filtro de categorias mostra os projetos correspondentes e restaura a lista completa.
- [x] Links dos cards apontam para páginas existentes, conforme validação da exportação.
- [ ] Páginas de projeto abrem diretamente pela URL e voltam para a página inicial.
- [ ] Rota inexistente apresenta a página 404.
- [ ] Links externos reais abrem de forma segura e apontam ao destino correto.
- [x] E-mail, GitHub e LinkedIn confirmados aparecem com os destinos corretos no componente; links sociais usam `noopener noreferrer`.
- [x] Cópia do e-mail configurado apresenta confirmação, com área de transferência simulada.
- [x] Abas de tecnologia respondem às setas, Home e End e atualizam foco e atributos ARIA, em jsdom.

## Formulário

- [x] Sem endpoint, a interface explica que nenhum dado foi enviado e não realiza uma requisição.
- [x] Nome, e-mail, assunto e mensagem apresentam erros associados aos campos inválidos.
- [x] Envio apresenta carregamento e impede duplicação durante a requisição simulada.
- [x] Resposta de erro do serviço apresenta feedback e mantém o texto para nova tentativa.
- [x] Aceitação simulada do endpoint apresenta sucesso e limpa o formulário.
- [ ] Sucesso é exibido somente após aceitação pelo endpoint real.
- [ ] CORS funciona a partir do domínio publicado.
- [ ] A mensagem de teste chega ao destino configurado.
- [ ] Endpoint aplica validação, limites e proteção contra abuso no servidor.
- [ ] Aviso de privacidade reflete o serviço e a retenção realmente utilizados.

## Acessibilidade e responsividade

- [ ] Layout revisado em celular, tablet e desktop, sem rolagem horizontal acidental.
- [ ] Menu, botões, links e formulário acessíveis pelo teclado.
- [ ] Foco visível e ordem de navegação coerente.
- [ ] Campos associados aos seus rótulos e erros acessíveis.
- [ ] Contraste e legibilidade revisados nos diferentes estados.
- [ ] Preferência `prefers-reduced-motion` respeitada.
- [ ] Chrome, Firefox e Safari atuais revisados, conforme disponibilidade.

## Conteúdo e publicação

- [ ] Nome, localização e narrativa conferidos com Matheus.
- [ ] Status dos projetos confirmados antes de alterá-los de Conceito.
- [ ] Prévia conceitual não é apresentada como captura de produto publicado.
- [ ] Familiaridade com tecnologias confirmada antes de atribuir níveis.
- [ ] Empresas, datas, cursos e certificados incluídos apenas com confirmação.
- [x] E-mail e perfis sociais preenchidos com os dados fornecidos por Matheus.
- [x] HTML, CSS, JavaScript e Python apresentados como certificados obtidos, conforme confirmação de Matheus.
- [x] Quatro certificados e ausência de links de comprovantes não fornecidos conferidos por teste de componente.
- [x] Retrato local `/matheus-sathler.jpg` e texto alternativo conferidos por teste de componente.
- [ ] Instituições, datas e comprovantes dos certificados recebidos e adicionados.
- [ ] Logo provisória substituída pelo arquivo original e favicon revisado.
- [ ] Título, descrição, Open Graph e URL canônica conferidos para o domínio final.
- [ ] Build publicado corresponde à versão revisada do código.
