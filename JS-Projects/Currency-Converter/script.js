document.addEventListener('DOMContentLoaded', function () {
    const amountInput = document.getElementById('amount');
    const fromCurrencySelect = document.getElementById('from-currency');
    const toCurrencySelect = document.getElementById('to-currency');
    const convertedAmountInput = document.getElementById('converted-amount');
    const convertBtn = document.getElementById('convert-btn');
    const swapBtn = document.getElementById('swap-btn');
    const rateInfo = document.getElementById('rate-info');

    // Popular currencies
    const currencies = [
        { code: 'USD', name: 'US Dollar' },
        { code: 'EUR', name: 'Euro' },
        { code: 'GBP', name: 'British Pound' },
        { code: 'JPY', name: 'Japanese Yen' },
        { code: 'AUD', name: 'Australian Dollar' },
        { code: 'CAD', name: 'Canadian Dollar' },
        { code: 'CNY', name: 'Chinese Yuan' },
        { code: 'INR', name: 'Indian Rupee' },
        { code: 'PKR', name: 'Pakistani Rupee' } // <-- Added PKR
    ];

    // Populate dropdowns
    currencies.forEach(currency => {
        const option1 = document.createElement('option');
        option1.value = currency.code;
        option1.textContent = `${currency.code} - ${currency.name}`;
        fromCurrencySelect.appendChild(option1);

        const option2 = document.createElement('option');
        option2.value = currency.code;
        option2.textContent = `${currency.code} - ${currency.name}`;
        toCurrencySelect.appendChild(option2);
    });

    // Set default values
    fromCurrencySelect.value = 'USD';
    toCurrencySelect.value = 'EUR';

    // Event listeners
    convertBtn.addEventListener('click', convertCurrency);
    swapBtn.addEventListener('click', swapCurrencies);
    amountInput.addEventListener('input', convertCurrency);
    fromCurrencySelect.addEventListener('change', convertCurrency);
    toCurrencySelect.addEventListener('change', convertCurrency);

    // Initial conversion
    convertCurrency();

    function convertCurrency() {
        const fromCurrency = fromCurrencySelect.value;
        const toCurrency = toCurrencySelect.value;
        const amount = parseFloat(amountInput.value) || 0;

        if (fromCurrency === toCurrency) {
            convertedAmountInput.value = amount.toFixed(2);
            rateInfo.textContent = `1 ${fromCurrency} = 1 ${toCurrency}`;
            return;
        }

        // Mock exchange rates
        const mockRates = {
            USD: { EUR: 0.85, GBP: 0.73, JPY: 110.15, PKR: 278.50 },
            EUR: { USD: 1.18, GBP: 0.86, JPY: 129.53, PKR: 324.20 },
            GBP: { USD: 1.37, EUR: 1.16, JPY: 150.27, PKR: 378.90 },
            PKR: { USD: 0.0036, EUR: 0.0031, GBP: 0.0026, JPY: 0.40 }
        };

        let rate = 1;
        if (mockRates[fromCurrency] && mockRates[fromCurrency][toCurrency]) {
            rate = mockRates[fromCurrency][toCurrency];
        } else if (mockRates[toCurrency] && mockRates[toCurrency][fromCurrency]) {
            rate = 1 / mockRates[toCurrency][fromCurrency];
        } else {
            // Fallback random rate for demo
            rate = Math.random() * 2 + 0.5;
        }

        const convertedAmount = amount * rate;
        convertedAmountInput.value = convertedAmount.toFixed(2);
        rateInfo.textContent = `1 ${fromCurrency} = ${rate.toFixed(4)} ${toCurrency}`;
    }

    function swapCurrencies() {
        const temp = fromCurrencySelect.value;
        fromCurrencySelect.value = toCurrencySelect.value;
        toCurrencySelect.value = temp;
        convertCurrency();
    }
});