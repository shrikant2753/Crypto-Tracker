const base_url = "https://api.coingecko.com/api/v3/";
const container = document.getElementById("main-container");
const topGrid = document.getElementById("top-grid");
const topList = document.getElementById("top-list");
const gridContainer = document.getElementById("grid");
const listContainer = document.getElementById("list");
let cryptoData = [];

// document.addEventListener("DOMContentLoaded", () => {
//   fetchData("grid");
// });

window.onload = function () {
  fetchData('grid');
};

topGrid.addEventListener("click", function () {
  topGrid.classList.add("active");
  topList.classList.remove("active");
  gridContainer.style.display = "grid";
  listContainer.style.display = "none";
  fetchData('grid');
});

topList.addEventListener("click", function () {
  topList.classList.add("active");
  topGrid.classList.remove("active");
  listContainer.style.display = "flex";
  gridContainer.style.display = "none";
  fetchData('list');
});

async function fetchData(view) {
  const url = base_url+`coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`;
  let response = await fetch(url);
  let data = await response.json();
  // console.log(data);
  cryptoData = data
  if (view === 'grid') {
    addDomOnGrid(data);
  } else if (view === 'list') {
    addDomOnList(data);
  }
}

async function trending(){
    let url = base_url+`search/trending`
    let response = await fetch(url)
    let data = await response.json();
    // console.log(data);
    addDomOnList(data)
}

function addDomOnGrid(data) {
  // console.log('grid');
  let grid = document.getElementById("grid");
  grid.innerHTML=''

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
  // console.log('list');
    let list = document.getElementById("list");
    list.innerHTML=''

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

const searchBar = document.getElementById('searchbar');
// console.log(searchBar);
searchBar.addEventListener('input', (event) => {
    const query = event.target.value;
    searchCrypto(query);
});

function searchCrypto(query) {
  const filteredCrypto = cryptoData.filter((cryptoData) =>
      cryptoData.name.toLowerCase().includes(query.toLowerCase()) || 
      cryptoData.symbol.toUpperCase().includes(query.toUpperCase())
  );
  if(topGrid.classList.contains("active"))
    return addDomOnGrid(filteredCrypto);
  else
    return addDomOnList(filteredCrypto)
}

// Add click event listeners to the sort buttons
const sortMktCapButton = document.getElementById("sortMktCap");
const sortPercentageButton = document.getElementById("sortPercentage");

sortMktCapButton.addEventListener("click", () => {
  sortCryptoByMarketCapDescending(cryptoData);
  updateCryptoDisplay();
});

sortPercentageButton.addEventListener("click", () => {
  sortCryptoByPercentageDescending(cryptoData);
  updateCryptoDisplay();
});

function sortCryptoByMarketCapDescending(data) {
  data.sort((a, b) => b.market_cap - a.market_cap);
}

function sortCryptoByPercentageDescending(data) {
  data.sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
}

function updateCryptoDisplay() {
  const view = topGrid.classList.contains("active") ? "grid" : "list";
  if (view === 'grid') {
    addDomOnGrid(cryptoData);
  } else if (view === 'list') {
    addDomOnList(cryptoData);
  }
}
