
var __el = (css) => {
	return document.querySelectorAll(css)
}

var translate = {
	lang: null,
	defaultLang: defaultLang,
	selectedLang: null,
	translations: null,
	langs: langs,
	checkSelectedLang: function() {
		let lang = localStorage.getItem('selected_lang')
		if (lang && Object.keys(this.langs).includes(lang)) {
		} else {
			lang = defaultLang
		}
		this.setLanguage(lang)
	},
	setLanguage: function(lang) {
		if (Object.keys(this.langs).includes(lang)) {
			localStorage.setItem('selected_lang', lang)
			this.lang = lang
			this.selectedLang = this.langs[lang]
			this.translations = this.langs[lang].translations
			this.startTranslation()
			this.activateLangButton()
		}
	},
	startTranslation: function() {
		__el('[data-lang]').forEach(item => {
			let attr = item.getAttribute('data-lang'), trans = this.translations[attr]
			item.innerText = trans ? trans : attr
		})
		__el('[data-direction]').forEach(item => {
			item.setAttribute('dir', this.selectedLang.direction)
		})
	},
	activateLangButton: function() {
		__el('[data-select-lang]').forEach(item => {
			if (item.getAttribute('data-select-lang') === translate.lang) {
				item.classList.add('active-lang')
			} else {
				item.classList.remove('active-lang')
			}
		})
	}
}
translate.checkSelectedLang()

__el('[data-select-lang]').forEach(item => {
	item.onclick = (e) => {
		e.preventDefault()
		translate.setLanguage(e.target.getAttribute('data-select-lang'))
	}
})
