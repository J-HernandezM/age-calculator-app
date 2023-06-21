const form = document.querySelector('form')
const btn = document.querySelector('button')
const allInputsNodes = document.querySelectorAll('.inputs')
const allLabelNodes = document.querySelectorAll('label')
const allInputs = [...allInputsNodes]
const allLabels = [...allLabelNodes]

const actualDay = document.querySelector('.actualDay')
const actualMonth = document.querySelector('.actualMonth')
const actualYear = document.querySelector('.actualYear')

let day
let month
let year

form.addEventListener('submit', (event)=>{
    event.preventDefault()
})
btn.addEventListener('click', (event)=>{
    let clicked = event.target
    if(clicked.nodeName==='IMG'){
        clicked = clicked.parentElement
    }

    day=clicked.parentElement[0].value
    month=clicked.parentElement[1].value
    year=clicked.parentElement[2].value
    
    const birthday = new Date (year, month-1, day)
    const today = new Date()
    const msToYears=365*24*60*60*1000

    const yearsLived = Math.floor((today.getTime()-birthday.getTime())/msToYears)

    const currenMonth = today.getMonth()
    const birthMonth = birthday.getMonth()
    const currenDay = today.getDate()
    const cumpleDay = birthday.getDate()



    let monthsSinceBirthday
    let daysSinceBirthday

    if((currenMonth-birthMonth)>0){
        if(cumpleDay<=currenDay){
            monthsSinceBirthday=currenMonth-birthMonth
        }else{
            monthsSinceBirthday=currenMonth-birthMonth-1
        }
    }else{
        monthsSinceBirthday=currenMonth-birthMonth+12
    }

    if(currenDay-cumpleDay>=0){
        daysSinceBirthday=currenDay-cumpleDay
    }else{
        daysSinceBirthday=30-(cumpleDay-currenDay)
    }

    actualDay.innerHTML=daysSinceBirthday
    actualMonth.innerHTML=monthsSinceBirthday
    actualYear.innerHTML=yearsLived
    
})
//Validations done, whole date validation missing
allInputs.forEach((input)=>{
    input.addEventListener('blur', (blurEvent)=>{
        let currentValue=Number(event.target.value)
        let isValid = false
        if(blurEvent.target.classList.contains('inputDay')){
            if(currentValue<=31 && currentValue>=1){
                isValid=true
            }
        }
        else if(blurEvent.target.classList.contains('inputMonth')){
            if(currentValue<=12 && currentValue>=1){
                isValid=true
            }
        }
        else if(blurEvent.target.classList.contains('inputYear')){
            if(currentValue<=2025 && currentValue>=1900){
                isValid=true
            }
        }
        if(!isValid){
            let currentLabel = blurEvent.target.previousElementSibling
            currentLabel.classList.add('errorLabel')
            blurEvent.target.classList.add('errorInput')
            let currentSpan = blurEvent.target.nextElementSibling
            currentSpan.classList.remove('inactive')
            if(currentValue===0){ //empty input
                currentSpan.innerHTML='This field is required'
            }
            else{
            }
        }else{
            let currentLabel = blurEvent.target.previousElementSibling
            currentLabel.classList.remove('errorLabel')
            blurEvent.target.classList.remove('errorInput')
            let currentSpan = blurEvent.target.nextElementSibling
            currentSpan.classList.add('inactive')
        }
    })
})
