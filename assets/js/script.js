
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");
  const toast = document.getElementById("toast");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(form);

    try {
      await fetch("https://formsubmit.co/ajax/9ebe809b546c09ce6e6dc5a2d3e7b12c", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json"
        }
      });

      showToast();
      form.reset();
    } catch (error) {
      
    }
  });

  function showToast() {
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
    }, 3000);
  }

  document.querySelectorAll(".toggle-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".experience-card");
      card.classList.toggle("open");
      const icon = btn.querySelector("i");
      icon.setAttribute("data-lucide", card.classList.contains("open") ? "chevron-up" : "chevron-down");
      lucide.createIcons();
    });
  });

  lucide.createIcons();
});

document.addEventListener("DOMContentLoaded", () => {
  const switchers = document.querySelectorAll(".lang-btn");

  function setLanguage(lang) {
    const strings = window.i18n[lang];
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (strings[key]) el.innerHTML = strings[key];
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");
      if (strings[key]) el.setAttribute("placeholder", strings[key]);
    });

    updateResumeLink(lang);
    
    localStorage.setItem("lang", lang);

    switchers.forEach(btn => {
      btn.classList.toggle("active", btn.dataset.lang === lang);
    });
  }

  const savedLang = localStorage.getItem("lang") || "en";
  setLanguage(savedLang);

  switchers.forEach((btn) => {
    btn.addEventListener("click", () => {
      const lang = btn.dataset.lang;
      setLanguage(lang);
    });
  });
});

function updateResumeLink(lang) {
  const resumeBtn = document.getElementById("resume-download");
  if (resumeBtn) {
    if (lang === "pt") {
      resumeBtn.setAttribute("href", "assets/files/CV-Lucas-PT.pdf");
    } else {
      resumeBtn.setAttribute("href", "assets/files/CV-Lucas-EN.pdf");
    }
    resumeBtn.setAttribute("download", "CV-Lucas.pdf");
  }
}