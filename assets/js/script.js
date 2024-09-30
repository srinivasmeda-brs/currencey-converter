
const countryList = {
    AED: "AE",
    AFN: "AF",
    XCD: "AG",
    ALL: "AL",
    AMD: "AM",
    ANG: "AN",
    AOA: "AO",
    AQD: "AQ",
    ARS: "AR",
    AUD: "AU",
    AZN: "AZ",
    BAM: "BA",
    BBD: "BB",
    BDT: "BD",
    XOF: "BE",
    BGN: "BG",
    BHD: "BH",
    BIF: "BI",
    BMD: "BM",
    BND: "BN",
    BOB: "BO",
    BRL: "BR",
    BSD: "BS",
    NOK: "BV",
    BWP: "BW",
    BYR: "BY",
    BZD: "BZ",
    CAD: "CA",
    CDF: "CD",
    XAF: "CF",
    CHF: "CH",
    CLP: "CL",
    CNY: "CN",
    COP: "CO",
    CRC: "CR",
    CUP: "CU",
    CVE: "CV",
    CYP: "CY",
    CZK: "CZ",
    DJF: "DJ",
    DKK: "DK",
    DOP: "DO",
    DZD: "DZ",
    ECS: "EC",
    EEK: "EE",
    EGP: "EG",
    ETB: "ET",
    EUR: "FR",
    FJD: "FJ",
    FKP: "FK",
    GBP: "GB",
    GEL: "GE",
    GGP: "GG",
    GHS: "GH",
    GIP: "GI",
    GMD: "GM",
    GNF: "GN",
    GTQ: "GT",
    GYD: "GY",
    HKD: "HK",
    HNL: "HN",
    HRK: "HR",
    HTG: "HT",
    HUF: "HU",
    IDR: "ID",
    ILS: "IL",
    INR: "IN",
    IQD: "IQ",
    IRR: "IR",
    ISK: "IS",
    JMD: "JM",
    JOD: "JO",
    JPY: "JP",
    KES: "KE",
    KGS: "KG",
    KHR: "KH",
    KMF: "KM",
    KPW: "KP",
    KRW: "KR",
    KWD: "KW",
    KYD: "KY",
    KZT: "KZ",
    LAK: "LA",
    LBP: "LB",
    LKR: "LK",
    LRD: "LR",
    LSL: "LS",
    LTL: "LT",
    LVL: "LV",
    LYD: "LY",
    MAD: "MA",
    MDL: "MD",
    MGA: "MG",
    MKD: "MK",
    MMK: "MM",
    MNT: "MN",
    MOP: "MO",
    MRO: "MR",
    MTL: "MT",
    MUR: "MU",
    MVR: "MV",
    MWK: "MW",
    MXN: "MX",
    MYR: "MY",
    MZN: "MZ",
    NAD: "NA",
    XPF: "NC",
    NGN: "NG",
    NIO: "NI",
    NPR: "NP",
    NZD: "NZ",
    OMR: "OM",
    PAB: "PA",
    PEN: "PE",
    PGK: "PG",
    PHP: "PH",
    PKR: "PK",
    PLN: "PL",
    PYG: "PY",
    QAR: "QA",
    RON: "RO",
    RSD: "RS",
    RUB: "RU",
    RWF: "RW",
    SAR: "SA",
    SBD: "SB",
    SCR: "SC",
    SDG: "SD",
    SEK: "SE",
    SGD: "SG",
    SKK: "SK",
    SLL: "SL",
    SOS: "SO",
    SRD: "SR",
    STD: "ST",
    SVC: "SV",
    SYP: "SY",
    SZL: "SZ",
    THB: "TH",
    TJS: "TJ",
    TMT: "TM",
    TND: "TN",
    TOP: "TO",
    TRY: "TR",
    TTD: "TT",
    TWD: "TW",
    TZS: "TZ",
    UAH: "UA",
    UGX: "UG",
    USD: "US",
    UYU: "UY",
    UZS: "UZ",
    VEF: "VE",
    VND: "VN",
    VUV: "VU",
    YER: "YE",
    ZAR: "ZA",
    ZMK: "ZM",
    ZWD: "ZW",
};


// Convert the keys into an array
const convertCountryList = Object.keys(countryList);

const dropdown = document.querySelectorAll('.sub-container select');
const btnEl = document.getElementById('btn');
const paraEl = document.getElementsByClassName('para')[0]; // Access the first element

// Set default input value
document.getElementById('input').value = 1; // Set default input to 1

// Populate dropdowns
dropdown.forEach((select) => {
    convertCountryList.forEach((list) => {
        const optionEl = document.createElement('option');
        optionEl.text = list; // Set option text to currency code
        optionEl.value = list; // Use currency code as value

        // Set default selected options based on dropdown name
        if (select.name === 'from' && list === 'USD') {
            optionEl.selected = true;
        } else if (select.name === 'to' && list === 'INR') {
            optionEl.selected = true;
        }

        select.appendChild(optionEl); // Append option to dropdown
    });

    // Add change event listener for each dropdown
    select.addEventListener('change', (event) => {
        updateCountryList();
    });
});

// Function to get currency converter values
const getCurrencyConverter = async (from, to) => {
    const inptEl = document.getElementById('input').value; // Get the input value
    if (!inptEl || isNaN(inptEl)) {
        console.error('Please enter a valid number');
        return;
    }

    const url = 'https://api.exchangerate-api.com/v4/latest/' + from; // URL for fetching conversion rates
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        
        // Get the exchange rate for the selected currencies
        const rate = data.rates[to];
        const convertedValue = (inptEl * rate).toFixed(2); // Calculate converted value
        
        // Log or display the result
        console.log(`${inptEl} ${from} is equal to ${convertedValue} ${to}`);
        paraEl.textContent = `${inptEl} ${from} is equal to ${convertedValue} ${to}`; // Display in an alert
    } catch (error) {
        console.error('Error:', error);
    }
}

// Update country list and call currency converter
function updateCountryList() {
    const fromSelect = dropdown[0].value; // Get selected 'from' currency
    const toSelect = dropdown[1].value; // Get selected 'to' currency

    getCurrencyConverter(fromSelect, toSelect); // Call currency conversion function
}

btnEl.addEventListener('click', () => {
    updateCountryList();
});
