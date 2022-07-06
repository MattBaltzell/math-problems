const container= document.querySelector('.quiz')

class MathQuiz{
    constructor(numProblems, operations, maxNumber=100, minNumber=0){
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
                arr.push(MathProblem.create('add',20))
            }
            return arr
        }
    }

    static create(numProblems, operations=['add']){
        return new MathQuiz(numProblems,operations)
    }

    generateHTML(){
        this.problems.forEach(p=>p.createHTML())
    }

}

class MathProblem{
    constructor(operation, num1, num2){
        this.id = operation + "_" + Math.floor(Math.random() * 99999999)
        this.operation = operation
        this.num1 = num1
        this.num2 = num2
        this.solution = this.solve()
        this.userAnswer;
    }

    static create(operation,maxNumber,minNumber=0){
        const num1 = Math.floor(Math.random() * (maxNumber - minNumber + 1) + minNumber)
        const num2 = Math.floor(Math.random() * (maxNumber - minNumber + 1) + minNumber)
        return new MathProblem(operation, num1, num2)
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
        <div class="problem" data-problem-id="${this.id}">
            <div class="question">
                <p class="line-1">${this.num1}</p>
                <p class="line-2">+ ${this.num2}</p>
            </div>
            <div class="answer">
                    <input type="number">
        </div>
        `
        container.insertAdjacentHTML('beforeend', html)

    }

}