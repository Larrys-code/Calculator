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

    if(result.toString().includes(".")){
        result = +(Math.round(result + "e+5")  + "e-5");
    };
    if (typeof(result) !== "number" || result === Infinity || isNaN(result)){return result = "ERROR";};
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

document.getElementById("percentage").addEventListener("click", function(){
    result = calculate(document.querySelector(".display").textContent, "divide", "100");
    if(result ==="ERROR"){result = "0";};
    lastAnswer = result;

    display(result);
    activeOperator(this);
    inputNumber = "";
    operator = "";
    operated = false;
    dotPressed = false;
    equalsed = true;
});

document.getElementById("DEL").addEventListener("click", function(){
    if (document.querySelector(".display").textContent===inputNumber){
        const workingArray = inputNumber.split("");
        lastChar = workingArray.length - 1;
        if(workingArray[lastChar]==="."){dotPressed = false;};
        workingArray.pop();
        inputNumber = workingArray.join("");
        if(inputNumber===""){inputNumber=0};
        display(inputNumber);
    }else{
        lastAnswer = 0;
        inputNumber = "";
        operator = "";
        dotPressed = false;
        equalsed = false;
        operated = false;
        display(0);
        activeOperator(this);   
    }
});

window.addEventListener("keydown", function(key){
    let button = "";
    switch (key.key){
        case "1":
            button = document.getElementById("one");            
            break;
        case "2":
            button = document.getElementById("two");            
            break;
        case "3":
            button = document.getElementById("three");            
            break;
        case "4":
            button = document.getElementById("four");           
            break;
        case "5":
            button = document.getElementById("five");           
            break;
        case "6":
            button = document.getElementById("six");           
            break;
        case "7":
            button = document.getElementById("seven");           
            break;
        case "8":
            button = document.getElementById("eight");            
            break;
        case "9":
            button = document.getElementById("nine");            
            break;
        case "0":
            button = document.getElementById("zero");            
            break;
        case ".":
            button = document.getElementById("dot");           
            break;
        case "+":
            button = document.getElementById("plus");            
            break;
        case "-":
            button = document.getElementById("minus");           
            break;
        case "/":
            button = document.getElementById("divide");           
            break;
        case "*":
            button = document.getElementById("multiply");            
            break;
        case "x":
            button = document.getElementById("multiply");           
            break;
        case "=":
            button = document.getElementById("equals");            
            break;
        case "Enter":
            button = document.getElementById("equals");            
            break;
        case "Backspace":
            button = document.getElementById("DEL");           
            break;
        case " ":
            button = document.getElementById("AC");            
            break;
        case "%":
            button = document.getElementById("percentage");
            break;
        default:
            return;        
    }
    button.click();
})