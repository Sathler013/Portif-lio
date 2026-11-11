import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// These checks exercise the built HTML that is actually deployed.
// Run `npm run build` first; this script has no third-party dependencies.
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "out");
assert.ok(
  existsSync(join(out, "index.html")),
  "Missing static export. Run npm run build first.",
);
const source = readFileSync(join(root, "src/data/portfolio.ts"), "utf8");
const home = readFileSync(join(out, "index.html"), "utf8");
const navSource = source.split("export const navigation =")[1];
assert.ok(navSource, "Central navigation data is missing.");
const navIds = [...navSource.matchAll(/id:\s*['"]([^'"]+)['"]/g)].map(
  (m) => m[1],
);
assert.equal(
  navIds.length,
  6,
  "Six primary navigation sections should be configured.",
);
for (const id of navIds) {
  assert.ok(home.includes(`id="${id}"`), `Missing home section: ${id}`);
  assert.ok(
    home.includes(`href="#${id}"`) || home.includes(`href="/#${id}"`),
    `Missing navigation anchor: ${id}`,
  );
}

const projectSource = source
  .split("export const projects: Project[] = [")[1]
  ?.split("\n];")[0];
assert.ok(projectSource, "Central projects data is missing.");
const projects = [
  ...projectSource.matchAll(
    /slug:\s*['"]([^'"]+)['"],\s*name:\s*['"]([^'"]+)['"]/g,
  ),
].map((m) => ({ slug: m[1], name: m[2] }));
assert.equal(
  projects.length,
  4,
  "Four initial project routes should be configured.",
);
for (const project of projects) {
  const path = join(out, "projetos", project.slug, "index.html");
  assert.ok(existsSync(path), `Missing project route: ${project.slug}`);
  const html = readFileSync(path, "utf8");
  assert.ok(
    html.includes(`<title>${project.name} | Matheus Sathler</title>`),
    `Incorrect project title: ${project.slug}`,
  );
  assert.ok(
    html.includes("Conceito"),
    `Missing honest initial status: ${project.slug}`,
  );
  assert.ok(
    html.includes("Tecnologias a confirmar"),
    `Missing unconfirmed technology state: ${project.slug}`,
  );
  assert.ok(
    html.includes("PRÉVIA CONCEITUAL") &&
      html.includes("NÃO REPRESENTA UMA CAPTURA DO PRODUTO"),
    `Missing conceptual preview disclosure: ${project.slug}`,
  );
  assert.ok(
    html.includes("Estudo de interface"),
    `Preview should not imply a deployed application: ${project.slug}`,
  );
}
assert.ok(existsSync(join(out, "404.html")), "Custom 404 export is missing.");
assert.ok(
  readFileSync(join(out, "404.html"), "utf8").includes("Voltar ao início"),
  "404 should provide a route home.",
);

const htmlFiles = [];
function walk(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) walk(path);
    else if (entry.name.endsWith(".html")) htmlFiles.push(path);
  }
}
walk(out);
let checkedLinks = 0;
for (const file of htmlFiles) {
  const html = readFileSync(file, "utf8");
  const pagePath = "/" + file.slice(out.length + 1).replace(/index\.html$/, "");
  for (const match of html.matchAll(/<a\b[^>]*\bhref="([^"]*)"/g)) {
    const href = match[1].replaceAll("&amp;", "&");
    assert.ok(href && href !== "#", `Empty or placeholder link in ${pagePath}`);
    const target = new URL(href, `https://portfolio.test${pagePath}`);
    if (target.origin !== "https://portfolio.test") continue;
    const pathname = decodeURIComponent(target.pathname);
    const path = join(out, pathname, extname(pathname) ? "" : "index.html");
    assert.ok(
      existsSync(path),
      `Broken internal link ${href} from ${pagePath}`,
    );
    if (target.hash) {
      const id = decodeURIComponent(target.hash.slice(1));
      const targetHTML = readFileSync(path, "utf8");
      assert.ok(
        targetHTML.includes(`id="${id}"`),
        `Missing anchor ${href} from ${pagePath}`,
      );
    }
    checkedLinks++;
  }
}
console.log(
  `Static export verified: ${navIds.length} navigation sections, ${projects.length} projects, custom 404, ${checkedLinks} internal links.`,
);
