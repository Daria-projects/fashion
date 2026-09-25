const cat = new URLSearchParams(window.location.search).get("cat");
const endpoint = `https://kea-alt-del.dk/t7/api/products?category=${cat}`;

document.querySelector("h2").textContent = cat;
const produktListe = document.querySelector(".produktliste");

fetch(endpoint)
  .then((res) => res.json())
  .then((json) => visData(json));

function visData(json) {
  console.log(json);
  produktListe.innerHTML = json
    .map(
      (element) => `
      <a href="productdetails.html?id=${element.id}" class="card-link">
        <article class="card">
          <img src="https://kea-alt-del.dk/t7/images/webp/640/${element.id}.webp" alt="produktbillede" />
          <h2>${element.productdisplayname}</h2>
          <h3>${element.brandname}</h3>
          <p>${element.price}</p>
          <p>${element.articletype}</p>
        </article>
      </a>
    `
    )
    .join("");
}
