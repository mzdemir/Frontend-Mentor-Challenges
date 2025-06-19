const body = document.querySelector("body")
const logo = document.querySelector(".logo")
const themeBtn = document.querySelector(".theme-btn")
const themeIcon = document.querySelector(".theme-icon")

const logoLightSrc = "./images/logo.svg"
const logoDarkSrc = "./images/logo-dark.svg"
const moonIconSrc = "./images/icon-moon.svg"
const sunIconSrc = "./images/icon-sun.svg"

themeBtn.addEventListener("click", () => {
	const isDarkModeOn = body.getAttribute("data-dark-mode") === "true"
	body.setAttribute("data-dark-mode", !isDarkModeOn)

	logo.src = isDarkModeOn ? logoLightSrc : logoDarkSrc
	themeIcon.src = isDarkModeOn ? moonIconSrc : sunIconSrc
})

const response = await fetch("./data.json")
let data = await response.json()

let currentFilter = "All"

const extensionHtml = (item) => `
  <article class="extension-card">
    <div class="extension-info">
      <img class="extension-icon" src="${item.logo}" alt="" />
      <div class="extension-details">
        <h2 class="extension-name">${item.name}</h2>
        <p class="extension-description">${item.description}</p>
      </div>
    </div>
    <div class="extension-actions">
      <button class="remove-btn" data-name="${item.name}" 
				aria-label="Remove ${item.name} extension">Remove
			</button>
      <label >
        <input class="toggle-active" type="checkbox"
					data-name="${item.name}" ${item.isActive ? "checked" : ""} 
					aria-label="Toggle ${item.name} active status">
      </label>
    </div>
  </article>
`

function renderExtensions(dataToRender) {
	const extensionsSection = document.querySelector(".extensions")
	extensionsSection.innerHTML = dataToRender.map(extensionHtml).join("")

	removeExtension()
	toggleExtensions()
}

function removeExtension() {
	const removeBtns = document.querySelectorAll(".remove-btn")

	removeBtns.forEach((removeBtn) => {
		removeBtn.addEventListener("click", () => {
			const name = removeBtn.dataset.name
			data = data.filter((item) => item.name !== name)
			applyFilter()
		})
	})
}

function toggleExtensions() {
	const toggleActiveBtns = document.querySelectorAll(".toggle-active")

	toggleActiveBtns.forEach((toggleBtn) => {
		toggleBtn.addEventListener("click", () => {
			const name = toggleBtn.dataset.name
			const extension = data.find((item) => item.name === name)
			if (extension) {
				extension.isActive = toggleBtn.checked
			}
			applyFilter()
		})
	})
}

function applyFilter() {
	if (currentFilter === "All") {
		renderExtensions(data)
	} else if (currentFilter === "Active") {
		renderExtensions(data.filter((item) => item.isActive))
	} else if (currentFilter === "Inactive") {
		renderExtensions(data.filter((item) => !item.isActive))
	}
}

function filterData() {
	const filterBtns = document.querySelectorAll(".filter-btn")

	filterBtns.forEach((filterBtn) => {
		filterBtn.addEventListener("click", (event) => {
			filterBtns.forEach((btn) => btn.classList.remove("active"))
			event.currentTarget.classList.add("active")

			currentFilter = event.currentTarget.textContent
			applyFilter()
		})
	})
}

renderExtensions(data)
filterData()
