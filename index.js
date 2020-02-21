const steps = [
	{
		name: 'Step 1',
		label: 'Short description',
		last: false,
		inputs: [
			{
				name: 'name',
				title: 'Name',
				placeholder: 'Enter your name',
				type: 'text',

			},
			{
				name: 'secname',
				title: 'Second Name',
				placeholder: 'Enter your second name',
				type: 'text'
			},
		]
	},
	{
		name: 'Step 2',
		label: 'Short description',
		last: false,
		inputs: [
			{
				name: 'email',
				title: 'Email',
				placeholder: '',
				type: 'email'
			},
			{
				name: 'password',
				title: 'Password',
				placeholder: '',
				type: 'password'
			},
		]
	},
	{
		name: 'Step 3',
		label: 'Short description',
		last: true,
		inputs: [
			{
				name: 'sendnews',
				title: 'Send me news',
				placeholder: '',
				type: 'checkbox'
			},
			{
				name: 'agreement',
				title: 'I agree to policy',
				placeholder: '',
				type: 'checkbox'
			},
		]
	},
]

const form = document.querySelector('.form')

const inputsRenderer = (inputs) => {
	let inputsHtml = '<div class="inputs-block">'
	inputs.forEach(input => {
		inputsHtml += `
			<label class="input-label">
				${input.title}
				<input class="input" type="${input.type}" placeholder="${input.placeholder}"/>
			</label>
			`
	})
	inputsHtml += '</div>'
	return inputsHtml
}

let state = {
	activeStep: 0,
}

const switchStep = (direction) => {
	const steps = document.querySelectorAll('.step')
	const {activeStep} = state
		if(direction === 'next') {
			steps[activeStep].classList.remove('active')
			steps[activeStep].classList.add('passed')
			steps[activeStep + 1].classList.add('active')
			state = {
				...state,
				activeStep: activeStep + 1
			}
		} else if (direction === 'prev') {
			steps[activeStep].classList.remove('active')
			steps[activeStep - 1].classList.remove('passed')
			steps[activeStep - 1].classList.add('active')
			state = {
				...state,
				activeStep: activeStep - 1
			}
		}
	
}

const StepRenderer = (step, i) => {
	const newStep =  document.createElement('div')
	newStep.classList.add('step')
	if(i===0) {
		newStep.classList.add('active')
	}
	newStep.innerHTML = `
		<h2>${step.name}</h2>
		<span>${step.label}</span>
		`
		+ inputsRenderer(step.inputs)
		+`<div class="navigation">`
		+(i !== 0 ?`<button class="nav-button" type="button" onClick="switchStep('prev')">Back</button>` : '')
		+(!step.last ? `<button class="nav-button" type="button" onClick="switchStep('next')">Continue</button>` : '')
		+`</div>`
		+ (step.last ? '<button class="submit-button">Submit</button>' : '')
	return newStep
}

steps.forEach((step, i) => form.appendChild(StepRenderer(step, i)))
