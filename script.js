let memory = 0; // Variable to hold memory value

function appendToDisplay(value) {
    const display = document.getElementById("display");
    display.value += value;
    addGlitchEffectToButton(event.target); // Add glitch effect when a button is pressed
}

function clearDisplay() {
    document.getElementById("display").value = '';
}

function deleteLast() {
    const display = document.getElementById("display");
    const value = display.value;
    const lastChar = value[value.length - 1];

    if (lastChar.match(/[\d.]/)) {
        display.value = value.slice(0, -1); // Simply delete the last digit
    } else {
        const lastOperatorIndex = Math.max(
            value.lastIndexOf('+'),
            value.lastIndexOf('-'),
            value.lastIndexOf('*'),
            value.lastIndexOf('/'),
            value.lastIndexOf('%')
        );

        if (lastOperatorIndex !== -1) {
            display.value = value.slice(0, lastOperatorIndex + 1); // Keep the operator
        } else {
            display.value = ''; // If no operators, clear the display
        }
    }

    addGlitchEffect(); // Add glitch effect on delete
}

function toggleSign() {
    const display = document.getElementById("display");
    if (display.value) {
        if (display.value.charAt(0) === '-') {
            display.value = display.value.slice(1); // Remove negative sign
        } else {
            display.value = '-' + display.value; // Add negative sign
        }
        addGlitchEffect(); // Add glitch effect on toggle sign
    }
}

function calculateResult() {
    const display = document.getElementById("display");
    try {
        display.value = eval(display.value.replace(/%/g, '/100')); // Treat % as a division by 100
    } catch (error) {
        display.value = 'Error: Invalid Input';
        addGlitchEffect(); // Trigger glitch effect on error
    }
}

function calculateSquareRoot() {
    const display = document.getElementById("display");
    try {
        const result = Math.sqrt(eval(display.value));
        display.value = result;
    } catch (error) {
        display.value = 'Error: Invalid Input';
        addGlitchEffect(); // Trigger glitch effect on error
    }
}

function performConversion() {
    const display = document.getElementById("display");
    const conversionType = document.getElementById("conversionSelect").value;
    let inputValue = parseFloat(display.value);

    if (isNaN(inputValue)) {
        display.value = 'Error: Invalid Input';
        addGlitchEffect(); // Trigger glitch effect on error
        return;
    }

    switch (conversionType) {
        case 'temp':
            display.value = (inputValue * 9 / 5) + 32; // Convert °C to °F
            break;
        case 'length':
            display.value = inputValue * 3.28084; // Convert meters to feet
            break;
        case 'currency':
            display.value = (inputValue * 0.85).toFixed(2); // Convert USD to EUR (approx)
            break;
        default:
            display.value = 'Error: Select Conversion';
            addGlitchEffect(); // Trigger glitch effect on error
    }
}

function addGlitchEffect() {
    const display = document.getElementById("display");
    display.classList.add("glitch");
    setTimeout(() => display.classList.remove("glitch"), 300);
}

function addGlitchEffectToButton(button) {
    button.classList.add("glitch");
    setTimeout(() => button.classList.remove("glitch"), 300);
}

function toggleFullscreen() {
    const calculator = document.getElementById("calculator");
    if (!document.fullscreenElement) {
        calculator.requestFullscreen().catch(err => {
            console.error(`Error attempting to enable full-screen mode: ${err.message}`);
        });
    } else {
        document.exitFullscreen();
    }
}
