const conversions = {
    milliMeter: {
        milliToCenti: (x) => x / 10,
        milliToDeci: (x) => x / 100,
        milliToMeter: (x) => x / 1000,
        milliToHeca: (x) => x / 10000,
        milliToDeca: (x) => x / 100000,
        milliToKilo: (x) => x / 1000000,
    },
    centiMeter: {
        centiToMilli: (x) => x * 10,
        centiToDeci: (x) => x / 10,
        centiToMeter: (x) => x / 100,
        centiToHeca: (x) => x / 1000,
        centiToDeca: (x) => x / 10000,
        centiToKilo: (x) => x / 100000,
    },
    meter: {
        metersToDeci: (x) => x * 10,
        metersToCenti: (x) => x * 100,
        metersToMilli: (x) => x * 1000,
        metersToHeca: (x) => x / 10,
        metersToDeca: (x) => x / 100,
        metersToKilo: (x) => x / 1000,
    },
};

const convert = (fromUnit, toFunction, value) => {
    if (conversions[fromUnit] && conversions[fromUnit][toFunction]) {
        return conversions[fromUnit][toFunction](value);
    }
    else {
        return `The conversion of ${toFunction} not found in the algorithm`;
    }
};

// Unit options for the dropdowns
const unitOptions = {
    milliMeter: [
        { value: "milliToCenti", label: "Centimeter" },
        { value: "milliToDeci", label: "Decimeter" },
        { value: "milliToMeter", label: "Meter" },
        { value: "milliToHeca", label: "Hectometer" },
        { value: "milliToDeca", label: "Decameter" },
        { value: "milliToKilo", label: "Kilometer" },
    ],
    centiMeter: [
        { value: "centiToMilli", label: "Millimeter" },
        { value: "centiToDeci", label: "Decimeter" },
        { value: "centiToMeter", label: "Meter" },
        { value: "centiToHeca", label: "Hectometer" },
        { value: "centiToDeca", label: "Decameter" },
        { value: "centiToKilo", label: "Kilometer" },
    ],
    meter: [
        { value: "metersToMilli", label: "Millimeter" },
        { value: "metersToCenti", label: "Centimeter" },
        { value: "metersToDeci", label: "Decimeter" },
        { value: "metersToHeca", label: "Hectometer" },
        { value: "metersToDeca", label: "Decameter" },
        { value: "metersToKilo", label: "Kilometer" },
    ],
};

// DOM elements
const fromUnitSelect = document.getElementById('fromUnit');
const toUnitSelect = document.getElementById('toUnit');
const inputValueField = document.getElementById('inputValue');
const resultDisplay = document.getElementById('result');

// Function to populate the "to" dropdown based on the selected "from" unit
function populateToUnitOptions(fromUnit) {
    // Clear existing options
    toUnitSelect.innerHTML = '';

    // Add new options based on the selected fromUnit
    unitOptions[fromUnit].forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option.value;
        optionElement.textContent = option.label;
        toUnitSelect.appendChild(optionElement);
    });
}

// Function to update the result
function updateResult() {
    const fromUnit = fromUnitSelect.value;
    const toFunction = toUnitSelect.value;
    const inputValue = parseFloat(inputValueField.value) || 0;

    const conversionResult = convert(fromUnit, toFunction, inputValue);

    if (typeof conversionResult === 'number') {
        resultDisplay.textContent = conversionResult.toFixed(6);
    } else {
        resultDisplay.textContent = conversionResult;
    }
}

// Initialize the "to" dropdown with options for the default "from" unit
populateToUnitOptions(fromUnitSelect.value);

// Add event listeners
fromUnitSelect.addEventListener('change', function () {
    populateToUnitOptions(this.value);
    updateResult();
});

toUnitSelect.addEventListener('change', updateResult);

inputValueField.addEventListener('input', updateResult);

// Initial calculation
updateResult();
