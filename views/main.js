const html = require("html-template-tag");
const layout = require("./layout");

module.exports = (pages) => layout(html`
  <h3>Pages</h3>
  <hr>
  <form method="GET" action="/wiki/search">
    <input type="text" name="search" />
    <button type="submit">Search</button>
  </form>
  <hr>
  <ul class="list-unstyled">
    <ul>
    ${pages.map(
      page => html`
        <li>
          <a href="/wiki/${page.slug}"><h2>${page.title}</h2></a>
          <h4>Author: ${page.name}</h4>
          <h4>Author's Email: ${page.authorId}</h4>
        </li>
      `
    )}
    </ul>
  </ul>`);
