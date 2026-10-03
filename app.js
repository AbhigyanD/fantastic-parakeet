
const API_URL = "https://api.frankfurter.dev/v1/latest?base=USD";

// ---------- STATE (plain variables for now) ----------
let allRates = [];          // array of { code, rate }, filled after fetch
let searchText = "";         // current text in the search box
let sortAscending = true;    // true = A->Z, false = Z->A
let favorites = new Set();   // Set of currency codes (like a Python set)
//          (look up: Set.add, Set.has, Set.delete)

// ---------- BLOCK 2: render ----------
for (const row of rows) {
    const tr = document.createElement("tr");

    const tdStar = document.createElement("td");
    const starBtn = document.createElement("button");
    starBtn.textContent = favorites.has(row.code) ? "★" : "☆";
    starBtn.addEventListener("click", () => toggleFavorite(row.code));
    tdStar.append(starBtn);

    const tdCode = document.createElement("td");
    tdCode.textContent = row.code;
    const tdRate = document.createElement("td");
    tdRate.textContent = row.rate;

    tr.append(tdStar, tdCode, tdRate);
    tbody.append(tr);
}

// ---------- BLOCK 3: search + sort ----------
function getVisibleRates() {
    let rows = allRates.filter(row => row.code.toUpperCase().includes(searchText.toUpperCase())); // 1. filter by searchText
    rows = [...rows].sort((a, b) => sortAscending ? a.code.localeCompare(b.code) : b.code.localeCompare(a.code)); // 2. sort by code, direction depends on sortAscending
    return rows; // 3. return the new array
}
//
function updates() {
    renderRates(getVisibleRates()); // 1. get the visible rates and render them
}
//
// Wire up events (after the page loads, so after defer it is safe at top level):
const searchInput = document.querySelector("#search");
searchInput.addEventListener("input", (event) => { searchText = event.target.value; updates(); });
const sortBtn = document.querySelector("#sort-btn");
const sortLabel = () => `Sort: ${sortAscending ? "A→Z" : "Z→A"}`;
sortBtn.textContent = sortLabel();
sortBtn.addEventListener("click", () => {
    sortAscending = !sortAscending;
    sortBtn.textContent = sortLabel();
    updates();
});

// ---------- BLOCK 4: favorites ----------
function toggleFavorite(code) {
    if (favorites.has(code)){
        favorites.delete(code);
    }
    else {
        favorites.add(code);
    }
    updates();
}
// ---------- LOAD DATA ----------
async function main() {
    const response = await fetch(API_URL);
    const data = await response.json();
    const rows = Object.entries(data.rates).map(([code, rate]) => ({ code, rate }));
    allRates = rows;
    updates();
    // BLOCK 3+: set allRates = rows and call updates() instead of renderRates(rows)
}

main();
