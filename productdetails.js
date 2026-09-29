const productId = new URLSearchParams(window.location.search).get("id");
const productContainer = document.querySelector("#productContainer");

fetch(`https://kea-alt-del.dk/t7/api/products/${productId}`)
  .then((res) => res.json())
  .then(visProdukt);

function visProdukt(data) {
  console.log(data);
  const tilbudspris = Math.round(data.price - (data.price * data.discount) / 100);
  productContainer.innerHTML = `
    <a href="productlist.html?cat=${data.category}">Tilbage</a>
    <div class="billede">
      <img src="https://kea-alt-del.dk/t7/images/webp/640/${data.id}.webp" alt="Produktbillede" />
      ${data.discount ? `<p class="tilbudslabel">-${data.discount}%</p>` : ""}
      ${data.soldout ? `<p class="udsolgtlabel">Udsolgt</p>` : ""}
    </div>
    <h2>${data.productdisplayname}</h2>
    <p>Type: ${data.articletype}</p>
    <p>Kategori: ${data.category}</p>
    ${data.discount ? `<p>Pris: Nu kr. ${tilbudspris},- <span>(før ${data.price},-)</span></p>` : `<p>Pris: kr. ${data.price},-</p>`}
    ${data.soldout ? `<p>Produktet er desværre udsolgt</p>` : `<button>Køb nu</button>`}
  `;
}
