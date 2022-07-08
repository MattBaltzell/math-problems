const quiz= document.querySelector('.quiz')
const container= document.querySelector('.container')
const submitBtn = document.getElementById('submit-btn')
const newQuizBtn = document.getElementById('new-quiz-btn')
let mathQuiz;

const NUM_QUESTIONS = 10;

class MathQuiz{
    constructor(numProblems, operations, maxNumber=20, minNumber=0){
        this.id = "quiz_" + Math.floor(Math.random() * 99999999)
        this.numProblems = numProblems
        this.operations = operations
        this.maxNumber = maxNumber
        this.minNumber = minNumber
        this.problems = getProblems()
        this.solutions = this.problems.map(p=>p.solution)
        
        function getProblems(){
            const arr = []
            for(let i = 0; i < numProblems; i++){
                const operation = Math.floor(Math.random() * operations.length)
                arr.push(MathProblem.create(operations[operation],maxNumber))
            }
            return arr
        }
    }

    static create(numProblems, operations=['add','subtract']){
        return new MathQuiz(numProblems,operations)
    }

    generateHTML(){
        quiz.innerHTML = ''
        this.problems.forEach(p=>p.createHTML())
    }

    submitAnswers(){
        const inputs = document.querySelectorAll('input')
        for(let i = 0; i < inputs.length; i++){
            this.problems[i].userAnswer = inputs[i].valueAsNumber
        }
        if(this.problems.every(p=>p.userAnswer !== null)){

            submitBtn.classList.add('hidden')
            newQuizBtn.classList.remove('hidden')
        }
    }

}

class MathProblem{
    constructor(operation, num1, num2){
        this.id = operation + "_" + Math.floor(Math.random() * 99999999)
        this.operation = operation
        this.num1 = num1
        this.num2 = num2
        this.solution = this.solve()
        this.userAnswer = null;
    }

    static create(operation,maxNumber,minNumber=0){
        const num1 = Math.floor(Math.random() * (maxNumber - minNumber + 1) + minNumber)
        const num2 = Math.floor(Math.random() * (maxNumber - minNumber + 1) + minNumber)
        const nums = [num1,num2].sort((a,b)=>a-b)
        return new MathProblem(operation, nums[1], nums[0])
    }

    solve(){
        if(this.operation === 'add'){
            return this.num1 + this.num2
        }

        if(this.operation === 'subtract'){
            return this.num1 - this.num2
        }

        if(this.operation === 'multiply'){
            return this.num1 * this.num2
        }

        if(this.operation === 'divide'){
            return this.num1 / this.num2
        }
    }

    createHTML(){
        const html = `
        ${this.userAnswer === null 
            ? `<div class="problem" id="${this.id}">`
            :`<div class="problem ${this.userAnswer === this.solution 
                ? `correct` 
                : `incorrect`}" id="${this.id}">`}
        
            <div class="question">
                <p class="line-1">${this.num1}</p>
                <p class="line-2">${this.operation === 'add' ? '+' : '-'} ${this.num2}</p>
            </div>
            <div class="answer">${
                    this.userAnswer === null ? `<input type="number" name="${this.id}" required>` : `<p class="user_answer">${this.userAnswer}</p>`}
            </div>
        </div>`

        quiz.insertAdjacentHTML('beforeend', html)

    }

    checkAnswer(){
        return this.solution === this.userAnswer
    }

}

function init(){
    mathQuiz = MathQuiz.create(NUM_QUESTIONS)
    mathQuiz.generateHTML()
    submitBtn.classList.remove('hidden')
    newQuizBtn.classList.add('hidden')

}

newQuizBtn.addEventListener('click',(e=>{
    e.preventDefault();
    init();
}))

submitBtn.addEventListener('click',(e)=>{
    e.preventDefault()

    const inputs = Array.from(document.querySelectorAll('input'))

    if(inputs.some(el=>el.value === '')) return
    // store all user answers to question objects
    mathQuiz.submitAnswers()
    
    // regenerate html with answers as text instead of input elements
    // indicate if user answered correctly
    // -- if not, show correct answer beside incorrect answer
    mathQuiz.generateHTML()
    
    // logging to console to be able to see the object
    console.log(mathQuiz)
})