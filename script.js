class Calculator
{

    constructor(previousOpTextElem, currentOpTextElem)
    {
        this.previousOpTextElem = previousOpTextElem;
        this.currentOpTextElem = currentOpTextElem;

        //clear upon creation
        this.clear();
    }

    clear()
    {
        this.currentOp = '';
        this.prevOp = '';
        this.operation = undefined;
    }

    //current display displays new number on click
    appendNumber(number)
    {
        if(number == '.' && this.currentOp.includes('.')) return
        if(this.currentOp.length < 30) this.currentOp += number;

         
    }

    chooseOperation(operation)
    {
        if(this.currentOp == "") return;

        if(this.prevOp != "")
        {
            this.calculate();
        }

        this.operation = operation
        this.prevOp = this.currentOp
        this.currentOp = "";
    }

    calculate()
    {
        let result;
        const prev = parseFloat(this.prevOp);
        const current = parseFloat(this.currentOp);



        if(isNaN(prev) || isNaN(current)) return

        switch(this.operation)
        {
            case "+":
                result = prev + current;
                break;

            case "-":
                result = prev - current;
                break;
            
            case "X":
                result = prev * current;
                break;
               
            case "÷":
                result = prev / current;
                break;

            default:
                return;
        }
 
        this.currentOp = result;
        this.operation = undefined;
        this.prevOp = "";

    }

    //calculate percent
    percent()
    {
        if(this.currentOp != "")
            this.currentOp = parseFloat(this.currentOp) * .01;
    }

    //change html element to reflect that
    updateDisplay()
    {
        this.currentOpTextElem.innerText = this.currentOp;
        this.previousOpTextElem.innerText = this.prevOp;
    }
}






//creating constants for each button and text element
const numberButtons = document.querySelectorAll('[data-number]')
const opButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOpTextElem = document.querySelector('[data-prev-op]')
const currentOpTextElem = document.querySelector('[data-current-op]')
const percentButton = document.querySelector('[data-percent]')

//creating calculator
const calculator = new Calculator(previousOpTextElem, currentOpTextElem);



////EVENT LISTENERS////

//update number buttons per click
numberButtons.forEach(button =>
    {
        button.addEventListener('click', () =>
        {
            calculator.appendNumber(button.innerText)
            calculator.updateDisplay();
        })
    })

//update operation buttons
opButtons.forEach(button =>
{
    button.addEventListener('click', () =>
    {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay();
    })
})

//equals sign
equalsButton.addEventListener('click', button =>
{
    calculator.calculate();
    calculator.updateDisplay();
})

//clear
allClearButton.addEventListener('click', button =>
{
    calculator.clear();
    calculator.updateDisplay();
})


//percent button
percentButton.addEventListener('click', button =>
{
    calculator.percent();
    calculator.updateDisplay();
})