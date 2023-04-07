function calculate(ans, op, num){
    if (op===""){
        op="plus";
    };
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
let resetable = false;

const operatorButton = document.querySelectorAll(".operator");
operatorButton.forEach(button => {
    button.addEventListener("click", function(){
        if (resetable===false){
            let result = calculate(lastAnswer, operator, inputNumber);
            display(result);
            lastAnswer = result;
        };
        operator = this.id;
        dotPressed = false;
        inputNumber = "";
        resetable = false;
        //add pressed style toggle logic here
    });
});

const numberButton = document.querySelectorAll(".number");
numberButton.forEach(button => {
    button.addEventListener("click", function(){
        buttonNumber = this.textContent
        if (resetable===true && operator===""){
            lastAnswer = 0;
        };
        if (this.id === "dot" && dotPressed === true){
            buttonNumber = "";
        };
        if (this.id === "dot" && dotPressed === false){
            buttonNumber = ".";
            if (!inputNumber) {
                buttonNumber = "0.";
            };
            dotPressed = true;
        };
        resetable = false;
        inputNumber = inputNumber.concat(buttonNumber);
        display(inputNumber);
    });
});

document.getElementById("equals").addEventListener("click", function(){
    let result = calculate(lastAnswer, operator, inputNumber);
    display(result);
    lastAnswer = result;
    dotPressed = false;
    operator = "";
    inputNumber = "";
    resetable = true;    
});