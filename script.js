const keys = document.querySelectorAll('button');
const output = document.querySelector('.data-previous-operand');
const result = document.querySelector('.data-current-operand');


result.textContent = 0;


keys.forEach(key => {
    key.addEventListener('click', calculate);
});

function calculate() {
    let buttonText = this.innerText;
    if(buttonText == "AC") {
        output.innerText = "";
        result.innerText = "0";
        return;
    }

    if(buttonText == "⟵") {
        output.textContent = output.textContent.substr(0, output.textContent.length-1);
        return;
    }

    if(buttonText == "=") {
        checkInifinity();
        result.innerText = eval(output.innerText);
        checkDecimals();
        output.innerText = result.innerText;
        return;
    }

    // if(buttonText == "=" && )

    else {
        output.textContent += buttonText;
        return;
    }
}

//check Decimals

const checkDecimals = () => {
    if(Number(result.innerText) % 1 != 0) {
        let roundNum = parseFloat(Number(result.innerText)).toFixed(2);
        output.innerText = roundNum;
        result.innerText = roundNum;
    }
}


//check divided by 0 

const checkInifinity = () => {
    if(((output.innerText).includes("/0"))) {
        result.innerText = "ERROR";
        output.innerText = "ERROR";
    }
}


//keyboard functionality

let numOpArr = [];
let specialCharArr = [];

keys.forEach(key => {
    (key.textContent != "=" && key.textContent != "⟵" && key.textContent != "AC") ? 
        numOpArr.push(key.textContent) : 
        specialCharArr.push(key.textContent)
})

window.addEventListener('keyup', function(e) {
    let keycode = String(e.key);

    const map = numOpArr.map(elem => {
        if(String(elem) == String(keycode)) {
            output.innerText += elem;
        } 
    })

    const map1 = specialCharArr.map(elem => {

        if(String(elem) == String(keycode) && String(keycode) == "=") {
            checkInifinity();
            result.innerText = eval(output.innerText);
            checkDecimals();
        output.innerText = result.innerText;
        return;
        };
        if(String(keycode) == "Backspace" && String(elem) == "⟵") {
            output.textContent = output.textContent.substr(0, output.textContent.length-1);
        }
        if(String(keycode) == "Delete" && String(elem) == "AC") {
            output.innerText = "";
            result.innerText = "0";
        };

    });
});