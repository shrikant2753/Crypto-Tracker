const base_url = "https://api.coingecko.com/api/v3/";
const container = document.getElementById("main-container");
const topGrid = document.getElementById("top-grid");
const topList = document.getElementById("top-list");
const gridContainer = document.getElementById("grid");
const listContainer = document.getElementById("list");

topGrid.addEventListener("click", function () {
  topGrid.classList.add("active");
  topList.classList.remove("active");
  gridContainer.style.display = "grid";
  listContainer.style.display = "none";
});

topList.addEventListener("click", function () {
  topList.classList.add("active");
  topGrid.classList.remove("active");
  listContainer.style.display = "flex";
  gridContainer.style.display = "none";
});

async function fetchData() {
  const url = base_url+`coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`;
  let response = await fetch(url);
  let data = await response.json();
  console.log(data);
  addDomOnGrid(data)
  addDomOnList(data);
}

async function trending(){
    let url = base_url+`search/trending`
    let response = await fetch(url)
    let data = await response.json();
    console.log(data);
    addDomOnList(data)
}

function addDomOnGrid(data) {
  let grid = document.getElementById("grid");

  data.forEach((crypto) => {
    let card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
        <div class="crypto-info">
          <div class="profile">
            <img src="${crypto.image}" alt="">
          </div>
          <div class="info">
            <div class="id">${crypto.symbol.toUpperCase()}</div>
            <div class="name">${crypto.name}</div>
          </div>
        </div>
        <div class="price-change ${crypto.price_change_percentage_24h < 0 ? "negative" : ""}">${crypto.price_change_percentage_24h}</div>
        <div class="c-price ${crypto.price_change_percentage_24h < 0 ?"negative" : ""}">${crypto.current_price}</div>
        <div class="prices">
          <div class="total-volume">total volume: ${crypto.total_volume}</div>
          <div class="market-cap">market cap: ${crypto.market_cap}</div>
        </div>`;
    grid.appendChild(card);
  });
  container.appendChild(grid);
}
function addDomOnList(data){
    let list = document.getElementById("list");

    data.forEach((crypto) => {
        let listf = document.createElement("div");
        listf.className = "list-format";
        listf.innerHTML = 
        `<div class="crypto-info">
            <div class="profile">
                <img src="${crypto.image}" alt="">
            </div>
            <div class="info">
                <div class="id">${crypto.symbol.toUpperCase()}</div>
                <div class="name">${crypto.name}</div>
            </div>
        </div>
        <div>
            <div class="price-change ${crypto.price_change_percentage_24h < 0 ? "negative" : ""}">${crypto.price_change_percentage_24h}</div>
        </div>
            <div class="c-price ${crypto.price_change_percentage_24h < 0 ?"negative" : ""}">${crypto.current_price}</div>
        <div class="total-volume">${crypto.total_volume}</div>
        <div class="market-cap">${crypto.market_cap}</div>`
        list.appendChild(listf);
    });
    container.appendChild(list);
}
fetchData();