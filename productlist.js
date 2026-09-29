const cat = new URLSearchParams(window.location.search).get("cat");
const endpoint = `https://kea-alt-del.dk/t7/api/products?category=${cat}&limit=30`;

document.querySelector("h2").textContent = cat;
const produktListe = document.querySelector(".produktliste");

document.querySelectorAll("button").forEach((knap) => knap.addEventListener("click", filter));

let allData;

fetch(endpoint)
  .then((res) => res.json())
  .then((json) => {
    allData = json;
    visData(allData);
  });

function filter(e) {
  const valgt = e.target.textContent;
  if (valgt == "All") {
    visData(allData);
  } else {
    const udsnit = allData.filter((element) => element.gender == valgt);
    visData(udsnit);
  }
}

function visData(json) {
  console.log(json);
  document.querySelector(".antal").textContent = json.length;
  produktListe.innerHTML = json
    .map((element) => {
      const tilbudspris = Math.round(element.price - (element.price * element.discount) / 100);
      return `
      <a href="productdetails.html?id=${element.id}" class="card-link ${element.soldout ? "udsolgt" : ""}">
        <article class="card">
          ${element.discount ? `<p class="tilbudslabel">-${element.discount}%</p>` : ""}
          ${element.soldout ? `<p class="udsolgtlabel">Udsolgt</p>` : ""}
          <img src="https://kea-alt-del.dk/t7/images/webp/640/${element.id}.webp" alt="produktbillede" />
          <h2>${element.productdisplayname}</h2>
          <h3>${element.brandname}</h3>
          ${element.discount ? `<p>Nu kr. ${tilbudspris},- <span>(før ${element.price},-)</span></p>` : `<p>kr. ${element.price},-</p>`}
          <p>${element.articletype}</p>
        </article>
      </a>
    `;
    })
    .join("");
}
