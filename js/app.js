const header = document.querySelector("header")

const firstSkill = document.querySelector(".skill:first-child")
const skCounters = document.querySelectorAll(".counter span")
const progressBars = document.querySelectorAll(".skills svg circle")

const mlSection = document.querySelector(".milestones")
const mlCounters = document.querySelectorAll(".number span")

const prtSection = document.querySelector(".portfolio")
const zoomIcons = document.querySelectorAll(".zoom-icon")
const modalOverlay = document.querySelector(".modal-overlay")
const images = document.querySelectorAll(".images img")
const prevBtn = document.querySelector(".prev-btn")
const nextBtn = document.querySelector(".next-btn")

const links = document.querySelectorAll(".nav-link")

const toggleBtn = document.querySelector(".toggle-btn")

const hamburger = document.querySelector(".hamburger")

const form = document.querySelector(".contact-form")
const input = document.querySelectorAll(".mail-form")

const subscription = document.querySelector(".subscription-form")
const subscriptionInput = document.querySelector(".subscription-input")

window.addEventListener("scroll", () => {
  activeLink()
  if (!skillsPlayed) skillsCounter()
  if (!mlPlayed) mlCounter()
})

const updateCount = (num, maxNum) => {
  let currentNum = Number(num.innerText)

  if (currentNum < maxNum) {
    num.innerText = currentNum + 1
    setTimeout(() => {
      updateCount(num, maxNum)
    }, 12)
  }
}

/* _________________________ Sticky Styling _________________________ */

const stickNavbar = () => {
  header.classList.toggle("scrolled", window.pageYOffset > 0)
}

stickNavbar()
window.addEventListener("scroll", stickNavbar)



/* _________________________ Reveal Animation _________________________ */

let scrollReveal = ScrollReveal({
  duration: 2500,
  distance: "60px",
})

scrollReveal.reveal(".showcase-info", {
  delay: 600
})
scrollReveal.reveal(".showcase-image", {
  origin: "top",
  delay: 700
})



/* _________________________ Skills Progress Bar Animation _________________________ */

const hasReached = (el) => {
  let topPosition = el.getBoundingClientRect().top

  if (window.innerWidth >= topPosition + el.offsetHeight) return true
  return false
}

let skillsPlayed = false

const skillsCounter = () => {
  if (!hasReached(firstSkill)) return

  skillsPlayed = true

  skCounters.forEach((counter, i) => {
    let target = Number(counter.dataset.target)
    let strokeValue = 427 - 427 * (target / 100)

    progressBars[i].style.setProperty("--target", strokeValue)

    setTimeout(() => {
      updateCount(counter, target)
    }, 400)
  })

  progressBars.forEach((p) => (p.style.animation = "progress 2s ease-in-out forwards"))
}



/* _________________________ Services Counter Animation _________________________ */

let mlPlayed = false


const mlCounter = () => {
  if (!hasReached(mlSection)) return
  mlPlayed = true

  mlCounters.forEach((ctr) => {
    let target = Number(ctr.dataset.target)

    setTimeout(() => {
      updateCount(ctr, target)
    }, 400)
  })
}


/* _________________________ Services Counter Animation _________________________ */

let mixer = mixitup('.portfolio-gallery', {
  selectors: {
    target: '.prt-card'
  },
  animation: {
    duration: 500
  }
});


/* _________________________ Modal Pop Up Animation _________________________ */

let currentIndex = 0

zoomIcons.forEach((icon, i) => icon.addEventListener("click", () => {
  prtSection.classList.add("open")
  document.body.classList.add("stop-scrolling")

  currentIndex = i
  changeImage(currentIndex)
}))

modalOverlay.addEventListener("click", () => {
  prtSection.classList.remove("open")
  document.body.classList.remove("stop-scrolling")
})

prevBtn.addEventListener("click", () => {
  if (currentIndex === 0) {
    currentIndex = 5
  } else {
    currentIndex--
  }
  changeImage(currentIndex)
})

nextBtn.addEventListener("click", () => {
  if (currentIndex === 5) {
    currentIndex = 0
  } else {
    currentIndex++
  }
  changeImage(currentIndex)
})

const changeImage = (index) => {
  images.forEach((img) => img.classList.remove("show-image"))
  images[index].classList.add("show-image")
}


/* _________________________ Swipper Testimonials Animation _________________________ */

const swiper = new Swiper('.swiper', {
  loop: true,
  speed: 1000,
  autoplay: true,

  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },
});


/* _________________________ Change Active Link _________________________ */

const activeLink = () => {
  let sections = document.querySelectorAll("section[id]")
  let passedSections = Array.from(sections).map((section, i) => {
      return {
        y: section.getBoundingClientRect().top - header.offsetHeight,
        id: i
      }
    })
    .filter((section) => section.y <= 0)

  let currentSectionID = passedSections.at(-1).id
  links.forEach(link => link.classList.remove("active"))
  links[currentSectionID].classList.add("active")
}

activeLink()


/* _________________________ Dark Mode Toggle _________________________ */

let firstTheme = localStorage.getItem("dark")
changeTheme(+firstTheme)

function changeTheme(isDark) {
  if (isDark) {
    document.body.classList.add("dark")
    toggleBtn.classList.replace("uil-moon", "uil-sun")
    localStorage.setItem("dark", 1)
  } else {
    document.body.classList.remove("dark")
    toggleBtn.classList.replace("uil-sun", "uil-moon")
    localStorage.setItem("dark", 0)
  }
}

toggleBtn.addEventListener("click", () => {
  changeTheme(!document.body.classList.contains("dark"))
})



/* _________________________ Open/Close Navbar Menu _________________________ */

hamburger.addEventListener("click", () => {
  document.body.classList.toggle("open")
  document.body.classList.toggle("stopScrolling")
})

links.forEach(link => {
  link.addEventListener("click", () => {
    document.body.classList.remove("open")
    document.body.classList.remove("stopScrolling")
  })
})

/* _________________________ SEND MAIL BY FORM _________________________ */


form.addEventListener("submit", (e) => {
  e.preventDefault()

  var templateParams = {
    name: input[0].value,
    email: input[1].value,
    message: input[2].value
  };

  emailjs.send('service_2gh2lay', 'template_jrzgdg9',
      templateParams) //Insert your email service ID and email template ID
    .then(function (response) {
      input.forEach(inp => {
        inp.value = ""
      })

      alert('ENVIADO!', response.status, response.text);
    }, function (error) {
      alert('Erro, tente novamente...', error);
    });

})

subscription.addEventListener("submit", (e) => {
  e.preventDefault()

  var templateParams = {
    email: subscriptionInput.value,
    message: "ADICIONAR A LISTA DE RECEPÇÃO"
  };

  emailjs.send('service_2gh2lay', 'template_n1rrkd9',
      templateParams) //Insert your email service ID and email template ID
    .then(function (response) {
      
      subscriptionInput.value = ""
      alert('ENVIADO!', response.status, response.text);

    }, function (error) {
      alert('Erro, tente novamente...', error);
    });
})
