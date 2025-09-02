// Script révolutionnaire pour la section contact et footer améliorés
document.addEventListener("DOMContentLoaded", () => {
  // ===== GESTION DU FORMULAIRE MULTI-ÉTAPES =====
  const form = document.getElementById("contactForm")
  const steps = document.querySelectorAll(".contact__form-step")
  const prevBtn = document.getElementById("prevBtn")
  const nextBtn = document.getElementById("nextBtn")
  const submitBtn = document.getElementById("submitBtn")
  const progressFill = document.querySelector(".contact__progress-fill")
  const progressText = document.querySelector(".contact__progress-text")
  const messageTextarea = document.getElementById("message")
  const charCount = document.getElementById("charCount")

  let currentStep = 1
  const totalSteps = steps.length

  function showStep(step) {
    steps.forEach((stepEl, index) => {
      stepEl.classList.toggle("contact__form-step--active", index + 1 === step)
    })
    const progress = (step / totalSteps) * 100
    progressFill.style.width = `${progress}%`
    progressText.textContent = `Étape ${step} sur ${totalSteps}`
    prevBtn.style.display = step === 1 ? "none" : "block"
    nextBtn.style.display = step === totalSteps ? "none" : "block"
    submitBtn.style.display = step === totalSteps ? "flex" : "none"
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      if (validateCurrentStep()) {
        currentStep++
        showStep(currentStep)
      }
    })
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      currentStep--
      showStep(currentStep)
    })
  }

  function validateCurrentStep() {
    const currentStepEl = document.querySelector(".contact__form-step--active")
    if (!currentStepEl) return true
    const requiredFields = currentStepEl.querySelectorAll("[required]")
    let isValid = true
    requiredFields.forEach((field) => {
      if (!field.value.trim()) {
        field.style.borderColor = "#ef4444"
        isValid = false
        field.style.animation = "shake 0.5s ease-in-out"
        setTimeout(() => { field.style.animation = "" }, 500)
      } else {
        field.style.borderColor = "#10b981"
      }
    })
    return isValid
  }

  if (messageTextarea && charCount) {
    messageTextarea.addEventListener("input", function () {
      const count = this.value.length
      charCount.textContent = count
      if (count > 500) {
        charCount.style.color = "#ef4444"
      } else if (count > 400) {
        charCount.style.color = "#f59e0b"
      } else {
        charCount.style.color = "#9ca3af"
      }
    })
  }

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault()
      if (validateCurrentStep()) {
        const submitText = document.getElementById("submitText")
        const originalText = submitText ? submitText.textContent : "Envoyer"
        if (submitBtn) submitBtn.disabled = true
        if (submitText) submitText.textContent = "Envoi en cours..."
        emailjs.sendForm("service_3zn3y7h", "template_8fha5oc", form, "A8HvasbkNP7j9oXwI")
          .then(() => {
            const successMessage = document.getElementById("successMessage")
            if (successMessage) {
              successMessage.style.display = "block"
              form.style.display = "none"
            }
            if (submitBtn) submitBtn.disabled = false
            if (submitText) submitText.textContent = originalText
          })
          .catch((error) => {
            alert("Erreur lors de l'envoi : " + JSON.stringify(error))
            if (submitBtn) submitBtn.disabled = false
            if (submitText) submitText.textContent = originalText
          })
      }
    })
  }

  const inputs = document.querySelectorAll(".contact__form-input, .contact__form-select, .contact__form-textarea")
  inputs.forEach((input) => {
    input.addEventListener("focus", function () {
      this.parentElement.classList.add("focused")
    })
  })

  if (steps.length > 0) showStep(currentStep)

  // ===== GESTION DU HEADER AU SCROLL =====
  const header = document.getElementById("header")
  const handleHeaderScroll = () => {
    if (window.scrollY > 80) {
      header.classList.add("header--scrolled")
    } else {
      header.classList.remove("header--scrolled")
    }
  }
  window.addEventListener("scroll", debounce(handleHeaderScroll, 10))
  handleHeaderScroll()

  // ===== GESTION DU MENU MOBILE (VERSION CORRIGÉE) =====
  const mobileToggle = document.getElementById("mobileToggle")
  const headerNav = document.getElementById("headerNav")

  if (mobileToggle && headerNav) {
    // Événement de clic sur le bouton burger
    mobileToggle.addEventListener("click", (e) => {
      e.preventDefault()
      console.log("Burger cliqué !") // Pour déboguer
      
      const isExpanded = mobileToggle.getAttribute("aria-expanded") === "true"
      
      // Toggle de l'état
      mobileToggle.setAttribute("aria-expanded", !isExpanded)
      headerNav.classList.toggle("open")
      mobileToggle.classList.toggle("active")
      
      // Change l'icône du burger
      if (!isExpanded) {
        mobileToggle.textContent = "✕" // Croix quand ouvert
      } else {
        mobileToggle.textContent = "☰" // Burger quand fermé
      }
    })

    // Fermer le menu quand on clique sur un lien
    const navLinks = headerNav.querySelectorAll("a")
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        headerNav.classList.remove("open")
        mobileToggle.classList.remove("active")
        mobileToggle.setAttribute("aria-expanded", "false")
        mobileToggle.textContent = "☰"
      })
    })

    // Fermer le menu si on clique en dehors
    document.addEventListener("click", (e) => {
      if (!header.contains(e.target)) {
        headerNav.classList.remove("open")
        mobileToggle.classList.remove("active")
        mobileToggle.setAttribute("aria-expanded", "false")
        mobileToggle.textContent = "☰"
      }
    })
  }

  // ===== BOUTON RETOUR EN HAUT =====
  const backToTopBtn = document.getElementById("backToTopBtn")
  if (backToTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add("show")
      } else {
        backToTopBtn.classList.remove("show")
      }
    })

    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" })
    })
  }

  // ===== FONCTION UTILITAIRE =====
  function debounce(func, wait) {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  }
})
       document.addEventListener("DOMContentLoaded", () => {
            const mobileToggle = document.getElementById("mobileToggle");
            const headerNav = document.getElementById("headerNav");

            console.log("Script chargé");
            console.log("mobileToggle:", mobileToggle);
            console.log("headerNav:", headerNav);

            if (mobileToggle && headerNav) {
                // Événement de clic sur le bouton burger
                mobileToggle.addEventListener("click", (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    console.log("Burger cliqué !");
                    
                    const isOpen = headerNav.classList.contains("open");
                    console.log("État actuel - isOpen:", isOpen);
                    
                    if (isOpen) {
                        // Fermer le menu
                        headerNav.classList.remove("open");
                        mobileToggle.classList.remove("active");
                        mobileToggle.setAttribute("aria-expanded", "false");
                        mobileToggle.innerHTML = "☰";
                        console.log("Menu fermé");
                    } else {
                        // Ouvrir le menu
                        headerNav.classList.add("open");
                        mobileToggle.classList.add("active");
                        mobileToggle.setAttribute("aria-expanded", "true");
                        mobileToggle.innerHTML = "✕";
                        console.log("Menu ouvert");
                    }
                });


            } else {
                console.error("Éléments non trouvés:", { 
                    mobileToggle: !!mobileToggle, 
                    headerNav: !!headerNav 
                });
            }
        });
