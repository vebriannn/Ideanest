document.addEventListener("DOMContentLoaded", () => {
    // DOM Elements
    const menuToggle = document.getElementById("menuToggle")
    const navLinks = document.getElementById("navLinks")
    const signInBtn = document.getElementById("signInBtn")
    const signUpBtn = document.getElementById("signUpBtn")
    const mobileSignInBtn = document.getElementById("mobileSignInBtn")
    const mobileSignUpBtn = document.getElementById("mobileSignUpBtn")
    const signInModal = document.getElementById("signInModal")
    const signUpModal = document.getElementById("signUpModal")
    const closeModalButtons = document.querySelectorAll(".close-modal")
    const switchToSignUp = document.getElementById("switchToSignUp")
    const switchToSignIn = document.getElementById("switchToSignIn")
    const body = document.body
    const navbar = document.getElementById("navbar")
  
    // Mobile Menu Toggle
    if (menuToggle && navLinks) {
      menuToggle.addEventListener("click", () => {
        menuToggle.classList.toggle("active")
        navLinks.classList.toggle("active")
  
        // Prevent body scrolling when menu is open
        body.style.overflow = navLinks.classList.contains("active") ? "hidden" : ""
      })
    }
  
    // Add scroll event to change navbar background
    if (navbar) {
      window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
          navbar.classList.add("scrolled")
        } else {
          navbar.classList.remove("scrolled")
        }
      })
    }
  
    // Close mobile menu when clicking a link
    const navItems = document.querySelectorAll(".nav-link")
    navItems.forEach((item) => {
      item.addEventListener("click", () => {
        if (navLinks && navLinks.classList.contains("active")) {
          navLinks.classList.remove("active")
          if (menuToggle) menuToggle.classList.remove("active")
          body.style.overflow = ""
        }
      })
    })
  
    // Close mobile menu when clicking outside
    document.addEventListener("click", (e) => {
      if (
        navLinks &&
        navLinks.classList.contains("active") &&
        !navLinks.contains(e.target) &&
        menuToggle &&
        !menuToggle.contains(e.target)
      ) {
        navLinks.classList.remove("active")
        menuToggle.classList.remove("active")
        body.style.overflow = ""
      }
    })
  
    // Modal Functions
    function openModal(modal) {
      if (!modal) return
  
      // Close mobile menu if open
      if (navLinks && navLinks.classList.contains("active")) {
        navLinks.classList.remove("active")
        if (menuToggle) menuToggle.classList.remove("active")
      }
  
      // Close any open modals
      document.querySelectorAll(".modal").forEach((m) => {
        m.classList.remove("active")
      })
  
      // Open the requested modal
      modal.classList.add("active")
      body.style.overflow = "hidden" // Prevent scrolling
    }
  
    function closeModal(modal) {
      if (!modal) return
      modal.classList.remove("active")
      body.style.overflow = "" // Re-enable scrolling
    }
  
    function closeAllModals() {
      document.querySelectorAll(".modal").forEach((modal) => closeModal(modal))
    }
  
    // Event Listeners for Modals
    if (signInBtn && signInModal) {
      signInBtn.addEventListener("click", (e) => {
        e.preventDefault()
        openModal(signInModal)
      })
    }
  
    if (mobileSignInBtn && signInModal) {
      mobileSignInBtn.addEventListener("click", (e) => {
        e.preventDefault()
        openModal(signInModal)
      })
    }
  
    if (signUpBtn && signUpModal) {
      signUpBtn.addEventListener("click", (e) => {
        e.preventDefault()
        openModal(signUpModal)
      })
    }
  
    if (mobileSignUpBtn && signUpModal) {
      mobileSignUpBtn.addEventListener("click", (e) => {
        e.preventDefault()
        openModal(signUpModal)
      })
    }
  
    // Close modal buttons
    closeModalButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const modal = button.closest(".modal")
        if (modal) closeModal(modal)
      })
    })
  
    // Close modal when clicking outside of modal content
    document.addEventListener("click", (e) => {
      document.querySelectorAll(".modal.active").forEach((modal) => {
        if (e.target === modal) {
          closeModal(modal)
        }
      })
    })
  
    // Switch between sign in and sign up modals
    if (switchToSignUp && signInModal && signUpModal) {
      switchToSignUp.addEventListener("click", (e) => {
        e.preventDefault()
        closeModal(signInModal)
        setTimeout(() => {
          openModal(signUpModal)
        }, 300) // Small delay for better transition
      })
    }
  
    if (switchToSignIn && signUpModal && signInModal) {
      switchToSignIn.addEventListener("click", (e) => {
        e.preventDefault()
        closeModal(signUpModal)
        setTimeout(() => {
          openModal(signInModal)
        }, 300) // Small delay for better transition
      })
    }
  
    // Close modals with Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeAllModals()
      }
    })
  
    // Form Validation and Submission
    const authForms = document.querySelectorAll(".auth-form")
    authForms.forEach((form) => {
      form.addEventListener("submit", (e) => {
        e.preventDefault()
  
        // Check if all required fields are filled
        const requiredFields = form.querySelectorAll("[required]")
        let isValid = true
  
        requiredFields.forEach((field) => {
          if (!field.value.trim()) {
            isValid = false
            field.classList.add("error")
          } else {
            field.classList.remove("error")
          }
        })
  
        // Check if passwords match in signup form
        if (form.closest("#signUpModal")) {
          const password = form.querySelector("#signup-password")
          const confirmPassword = form.querySelector("#signup-confirm-password")
  
          if (password && confirmPassword && password.value !== confirmPassword.value) {
            isValid = false
            confirmPassword.classList.add("error")
            alert("Passwords do not match")
          }
        }
  
        if (!isValid) {
          alert("Please fill in all required fields correctly")
          return
        }
  
        // Simulate successful submission
        alert("Form submitted successfully!")
  
        // Close the modal
        const modal = form.closest(".modal")
        if (modal) closeModal(modal)
      })
    })
  
    
  })
  
  