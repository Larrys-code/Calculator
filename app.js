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
    if (typeof(result) !== "number" || result === Infinity || result === "NaN"){return result = "ERROR";};
    result = +(Math.round(result + "e+2")  + "e-2")
    return result;
};

function display(num){
    document.querySelector(".display").textContent = `${num}`;
};

function activeOperator(element){
    operatorButton.forEach(button => {
        button.classList.remove("operatorActive");
    });
    if (element.classList.contains("operator")){
        element.classList.add("operatorActive");
    };
};

let lastAnswer = 0; //Stores the last answer
let inputNumber = ""; //Stores the inputted number to work on the last answer
let operator = ""; //Stores the operator
let dotPressed = false; //Tracks if a dot has been pressed
let equalsed = false; //Tracks if the user just pressed equals, changes some logic
let operated = false; //Tracks if the user just used an operator, changes some logic


const operatorButton = document.querySelectorAll(".operator");
operatorButton.forEach(button => {
    button.addEventListener("click", function(){
        if (equalsed===false && operated===false){
            let result = calculate(lastAnswer, operator, inputNumber);
            display(result);
            if(result ==="ERROR"){result = "0";};
            lastAnswer = result;
        };
        activeOperator(this);    
        operator = this.id;
        dotPressed = false;
        inputNumber = "";
        equalsed = false;
        operated = true;
        //add pressed style toggle logic here
    });
});

const numberButton = document.querySelectorAll(".number");
numberButton.forEach(button => {
    button.addEventListener("click", function(){
        buttonNumber = this.textContent
        if (equalsed===true && operator===""){
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
        equalsed = false;
        operated = false;
        inputNumber = inputNumber.concat(buttonNumber);
        display(inputNumber);
    });
});

document.getElementById("equals").addEventListener("click", function(){
    let result = calculate(lastAnswer, operator, inputNumber);
    display(result);
    activeOperator(this);    
    if(result ==="ERROR"){result = "0";};
    lastAnswer = result;
    dotPressed = false;
    operator = "";
    inputNumber = "";
    equalsed = true;
    operated = false;
});

document.getElementById("AC").addEventListener("click", function(){
    lastAnswer = 0;
    inputNumber = "";
    operator = "";
    dotPressed = false;
    equalsed = false;
    operated = false;
    display(0);
    activeOperator(this);    
});