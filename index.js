const endpoint = "https://kea-alt-del.dk/t7/api/categories";
const catListeContainer = document.querySelector("#catListeContainer");

fetch(endpoint)
  .then((res) => res.json())
  .then(visData);

function visData(json) {
  console.log(json);
  json.forEach((element) => {
    catListeContainer.innerHTML += `<a href="productlist.html?cat=${encodeURI(element.category)}">${element.category}</a>`;
  });
}
