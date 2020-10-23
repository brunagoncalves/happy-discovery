//create map
const map = L.map("mapid").setView([-27.2109325, -49.6448719], 15);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

const icon = L.icon({
  iconUrl: "/images/map-marker.svg",
  iconSize: [58, 68],
  iconAnchor: [29, 68],
});

let marker;

map.on("click", (event) => {
  const lat = event.latlng.lat;
  const lng = event.latlng.lng;

  document.querySelector("[name=lat]").value = lat;
  document.querySelector("[name=lng]").value = lng;

  marker && map.removeLayer(marker);

  marker = L.marker([lat, lng], { icon }).addTo(map);
});

function addPhotoField() {
  const container = document.querySelector("#images");

  const fieldsContainer = document.querySelectorAll(".new-upload");

  const newFieldContainer = fieldsContainer[
    fieldsContainer.length - 1
  ].cloneNode(true);

  const input = newFieldContainer.children[0];

  if (input.value == "") {
    return;
  }

  input.value = "";

  container.appendChild(newFieldContainer);
}

function deleteField(event) {
  const span = event.currentTarget;

  const fieldsContainer = document.querySelectorAll(".new-upload");

  if (fieldsContainer.length <= 1) {
    span.parentNode.children[0].value = "";
    return;
  }

  span.parentNode.remove();
}

function toggleSelect(event) {
  document
    .querySelectorAll(".button-select button")
    .forEach((button) => button.classList.remove("active"));

  const button = event.currentTarget;
  button.classList.add("active");

  const input = document.querySelector('[name="open_on_weekends"]');
  input.value = button.dataset.value;
}

// Mask Phone
const inputValue = document.querySelector('input[name="whatsapp"]');
const field = inputValue.dataset.js;

inputValue.addEventListener(
  "input",
  (e) => {
    e.target.value = mask[field](e.target.value);
  },
  false
);

const mask = {
  phone(value) {
    return value
      .replace(/\D/g, "") //Remove tudo o que não é dígito.
      .replace(/(\d{2})(\d)/, "($1) $2") // Coloca parênteses em volta dos dois primeiros dígitos.
      .replace(/(\d{4})(\d)/, "$1-$2") // Coloca hífen entre o quarto e o quinto dígitos.
      .replace(/(\d{4})-(\d)(\d{4})/, "$1$2-$3") // Coloca o quinto digito para esquerda.
      .replace(/(-\d{4})\d+?/, "$1"); // Depois do hifen ele permite somente 4 digitos.
  },
};
