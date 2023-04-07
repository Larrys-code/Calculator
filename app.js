function calculate(ans, op, num){
    if (op===""){op="plus"};
    if (num===""){num="0"};
    let result = "";
    switch (op){
        case "plus":
            result = +ans + +num;
            break;
        case "minus":
            result = +ans - +num;
            break;
        case "divide":
            result = +ans / +num;
            break;
        case "multiply":
            result = +ans * +num;
    }
    if (typeof(result) !== "number" || result === Infinity){return result = "ERROR";};
    result = +(Math.round(result + "e+2")  + "e-2")
    return result;
}

function display(num){
    document.querySelector(".display").textContent = `${num}`;
}

let lastAnswer = 0;
let inputNumber = "";
let operator = "";
let dotPressed = false;

const operatorButton = document.querySelectorAll(".operator");
operatorButton.forEach(button => {
    button.addEventListener("click", function(){
        let result = calculate(lastAnswer, operator, inputNumber);
        display(result);
        operator = this.id;
        lastAnswer = result;
        dotPressed = false;
        inputNumber = "";
    });
});

const numberButton = document.querySelectorAll(".number");
numberButton.forEach(button => {
    button.addEventListener("click", function(){
        buttonNumber = this.textContent
        if (this.id === "dot" && dotPressed === false){
            buttonNumber = ".";
            if (!inputNumber) {
                buttonNumber = "0.";
            };
        };
        if (this.id === "dot" && dotPressed === true){
            buttonNumber = "";
        }
        inputNumber = inputNumber.concat(buttonNumber);
        display(inputNumber);
    });
});