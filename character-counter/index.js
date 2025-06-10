const body = document.querySelector("body")
const logo = document.querySelector(".logo")
const themeBtn = document.querySelector(".theme-btn")
const themeIcon = document.querySelector(".theme-icon")
const charValue = document.querySelector(".char-value")
const wordValue = document.querySelector(".word-value")
const sentenceValue = document.querySelector(".sentence-value")
const densityResults = document.querySelector(".density-results")
const form = document.querySelector(".form")
const seeMoreBtn = document.querySelector(".see-more-btn")

const logoLightSrc = "./images/logo-light-theme.svg"
const logoDarkSrc = "./images/logo-dark-theme.svg"
const moonIconSrc = "./images/icon-moon.svg"
const sunIconSrc = "./images/icon-sun.svg"

themeBtn.addEventListener("click", () => {
	const isDarkModeOn = body.getAttribute("data-dark-mode") === "true"
	body.setAttribute("data-dark-mode", !isDarkModeOn)

	logo.src = isDarkModeOn ? logoLightSrc : logoDarkSrc
	themeIcon.src = isDarkModeOn ? moonIconSrc : sunIconSrc
})

form.addEventListener("input", () => {
	const formData = new FormData(form)
	const formValues = {
		text: formData.get("text-input"),
		charLimit: formData.get("char-limit"),
		hasCharLimit: formData.has("has-char-limit"),
		excludeSpaces: formData.has("exclude-spaces"),
	}

	setCharLimit(formValues)
	readingTime(formValues)
	getStats(formValues)
	getLetterDensity(formValues)
})

seeMoreBtn.addEventListener("click", () => {
	const isSeeMoreOn = seeMoreBtn.getAttribute("data-see-more") === "true"
	seeMoreBtn.setAttribute("data-see-more", !isSeeMoreOn)
	seeMoreBtn.setAttribute("aria-expanded", !isSeeMoreOn)

	seeMoreBtn.textContent = isSeeMoreOn ? "See more" : "See less"

	handleSeeMore()
})

function setCharLimit({text, charLimit, hasCharLimit}) {
	const textArea = form.querySelector(".text-input")
	const charLimitEl = form.querySelector("input[type='number']")
	const hintText = form.querySelector(".hint-text")

	const resetHint = () => {
		hintText.innerHTML = null
		hintText.style.display = "none"
		textArea.setAttribute("data-exceeded", "false")
	}

	textArea.setAttribute("maxlength", hasCharLimit ? charLimit : null)
	charLimitEl.style.display = hasCharLimit ? "inline-block" : "none"

	if (hasCharLimit) {
		if (text.length >= charLimit) {
			hintText.innerHTML = `
        <img src='./images/icon-info.svg' alt="Info icon"/> 
        <p>Limit reached! Your text exceeds ${charLimit} characters.</p>
      `
			hintText.style.display = "flex"
			textArea.setAttribute("data-exceeded", "true")
		} else {
			resetHint()
		}
	} else {
		resetHint()
	}
}

function readingTime({text}) {
	const timeElement = document.querySelector(".time")
	const wpm = 300
	const words = (text.match(/\b\w+\b/g) || []).length
	const time = Math.ceil(words / wpm)

	timeElement.textContent = text.length > 0 ? `<${time}` : 0
}

function getStats({text, excludeSpaces}) {
	const charCount = excludeSpaces ? text.replace(/\s/g, "").length : text.length
	const wordCount = (text.match(/\b\w+\b/g) || []).length
	const sentenceCount = text.split(/[.!?]+/).map(s => s.trim()).filter(s => s.length > 0).length; //prettier-ignore

	charValue.textContent = charCount.toString().padStart(2, "0")
	wordValue.textContent = wordCount.toString().padStart(2, "0")
	sentenceValue.textContent = sentenceCount.toString().padStart(2, "0")
}

function getLetterDensity({text}) {
	const density = []
	const justLetters = text.toLowerCase().replace(/[^\p{L}]/gu, "")
	const totalLetters = text.length

	for (let letter of justLetters) {
		let existingLetter = density.find((item) => item.letter === letter)
		existingLetter ? existingLetter.count++ : density.push({letter, count: 1})
	}

	for (let item of density) {
		item.percentage = ((item.count / totalLetters) * 100).toFixed(2)
	}

	const sortedDensityArray = density.sort((a, b) => b.percentage - a.percentage)
	if (density.length == 0) {
		densityResults.textContent = "No characters found. Start typing to see letter density."
	} else {
		densityResults.innerHTML = sortedDensityArray
			.map((item) => {
				return `
					<li class="letter-data">
						<p class="letter">${item.letter.toUpperCase()}</p>
						<div class="progress-bar">
							<div class="bar-fill" style="width:${item.percentage}%"></div>
						</div>
						<p class="values">${item.count} (${item.percentage}%) </p>
					</li>
				`
			})
			.join("")
		handleSeeMore()
	}
}

function handleSeeMore() {
	const letterData = document.querySelectorAll(".letter-data")
	const isExpanded = seeMoreBtn.getAttribute("data-see-more") === "true"

	letterData.forEach((item, index) => {
		if (isExpanded) {
			item.style.display = "flex"
		} else {
			item.style.display = index > 4 ? "none" : "flex"
		}
	})

	seeMoreBtn.style.display = letterData.length > 5 ? "block" : "none"
}
