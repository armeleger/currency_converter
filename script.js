let rates = {};
const fromCurrency = document.getElementById("from-currency");
const toCurrency = document.getElementById("to-currency");

fetch("https://api.exchangerate-api.com/v4/latest/USD")
  .then(res => res.json())
  .then(data => {
    rates = data.rates;
    populateSelect(fromCurrency, rates);
    populateSelect(toCurrency, rates);

    fromCurrency.value = "USD";
    toCurrency.value = "RWF";
  });

function populateSelect(select, rateObj) {
  for (let currency in rateObj) {
    const option = document.createElement("option");
    option.value = currency;
    option.text = currency;
    select.appendChild(option);
  }
}

function convert() {
  const amount = parseFloat(document.getElementById("amount").value);
  const from = fromCurrency.value;
  const to = toCurrency.value;

  if (isNaN(amount)) {
    document.getElementById("result").textContent = "Please enter a valid amount.";
    return;
  }

  const usdAmount = amount / rates[from];
  const converted = usdAmount * rates[to];
  document.getElementById("result").textContent =
    `${amount.toLocaleString()} ${from} = ${converted.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} ${to}`;
}