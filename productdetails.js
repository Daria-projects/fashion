const productId = new URLSearchParams(window.location.search).get("id");
const productContainer = document.querySelector("#productContainer");

fetch(`https://kea-alt-del.dk/t7/api/products/${productId}`)
  .then((res) => res.json())
  .then(visProdukt);

function visProdukt(data) {
  console.log(data);
  productContainer.innerHTML = `
    <a href="productlist.html">Tilbage</a>
    <img src="https://kea-alt-del.dk/t7/images/webp/640/${data.id}.webp" alt="Produktbillede" />
    <h2>${data.productdisplayname}</h2>
    <p>Type: ${data.articletype}</p>
    <p>Kategori: ${data.category}</p>
    <p>Pris: ${data.price},-</p>
    <button>Køb nu</button>
  `;
}
