/*  Fetch and print the rates from the API
*/

const URL = "https://api.frankfurter.dev/v1/latest?base=USD";

async function main() {
    const response = await fetch(URL);
    const data = await response.json(); // 1. fetch the URL and await the response
    const ratesArray = Object.entries(data.rates); // 3. data.rates is an object. Turn it into an array of [code, rate] pairs
    const sortedRates = ratesArray.sort((a,b) => a[0].localeCompare(b[0])); // 4. sort that array by code
    console.table(sortedRates); // 5. console.table(...) the result
}

main();
