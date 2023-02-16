class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement
    this.clear()
  }

  clear() {
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = undefined
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return
    this.currentOperand = this.currentOperand.toString() + number.toString()
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return
    if (this.previousOperand !== '') {
      this.compute()
    }
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
  }

  chooseOperationMath(operation) {
    this.chooseOperation(operation)
    this.currentOperand = 0
    this.compute()
  }

  compute() {
    let result
    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
      case '+':
        result = prev + current
        break
      case '-':
        result = prev - current
        break
      case '*':
        result = prev * current
        break
      case '÷':
        result = prev / current
        break
      case '1/x':
        result = 1 / prev
        break
      case 'x²':
        result = prev * prev
        break
      case '√':
        result = Math.sqrt(prev)
        break
      default:
        return
    }
    this.currentOperand = result
    this.operation = undefined
    this.previousOperand = ''
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText =
      this.getDisplayNumber(this.currentOperand)
    if (this.operation != null) {
      this.previousOperandTextElement.innerText =
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
    } else {
      this.previousOperandTextElement.innerText = ''
    }
  }
}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const mathButtons = document.querySelectorAll('[data-math]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const specialButton = document.querySelector('[data-special]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

mathButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperationMath(button.innerText)
    calculator.updateDisplay()
  })
})

equalsButton.addEventListener('click', button => {
  calculator.compute()
  calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
  calculator.delete()
  calculator.updateDisplay()
})

specialButton.addEventListener('click', button => {
  document.body.classList.toggle('animated-gradient')
  document.body.classList.toggle('radial-gradient')
  if (document.body.classList.contains('animated-gradient')) {
    document.removeEventListener('mousemove', handleMouseMove)
    document.body.style.removeProperty('background')
  }
  else {
    document.addEventListener('mousemove', handleMouseMove)
  }
})

function handleMouseMove(event) {
  var radialGradient = document.querySelector('.radial-gradient')
  if (radialGradient == null) return
  
  var windowWidth = window.innerWidth
  var windowHeight = window.innerHeight
  
  var mouseXpercentage = Math.round(event.pageX / windowWidth * 100)
  var mouseYpercentage = Math.round(event.pageY / windowHeight * 100)
  
  radialGradient.style.background = 'radial-gradient(at ' + mouseXpercentage + '% ' + mouseYpercentage + '%, #3498db, #9b59b6)'
};
if (document.body.classList.contains('radial-gradient'))
  document.addEventListener('mousemove', handleMouseMove)