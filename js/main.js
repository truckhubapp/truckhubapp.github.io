document.addEventListener("DOMContentLoaded", function () {
  initSoundToggle();
  initShowMoreEvents();
  initLoginTabs();
  initLoginForm();
});

function initSoundToggle() {
  const soundToggle = document.getElementById("soundToggle");
  if (!soundToggle) return;

  let soundEnabled = true;

  soundToggle.addEventListener("click", function () {
    soundEnabled = !soundEnabled;
    soundToggle.textContent = soundEnabled ? "🔊 Звук увімкнено" : "🔇 Звук вимкнено";

    if (soundEnabled) {
      playSoftBeep();
    }
  });

  window.truckHubSoundEnabled = function () {
    return soundEnabled;
  };
}

function initShowMoreEvents() {
  const showMore = document.getElementById("showMore");
  const moreEvents = document.querySelectorAll(".more-event");

  if (!showMore || !moreEvents.length) return;

  showMore.addEventListener("click", function () {
    moreEvents.forEach(function (eventCard, index) {
      setTimeout(function () {
        eventCard.classList.remove("is-hidden");
        requestAnimationFrame(function () {
          eventCard.style.opacity = "1";
          eventCard.style.transform = "translateY(0)";
        });
      }, index * 120);
    });

    showMore.textContent = "Більше подій показано";
    showMore.disabled = true;
    playSoftBeep();
  });
}

function playSoftBeep() {
  try {
    if (typeof window.truckHubSoundEnabled === "function" && !window.truckHubSoundEnabled()) {
      return;
    }

    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    const context = new AudioContext();
    const oscillator = context.createOscillator();
    const gain = context.createGain();

    oscillator.type = "sine";
    oscillator.frequency.value = 780;

    gain.gain.setValueAtTime(0.0001, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.035, context.currentTime + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.25);

    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.28);
  } catch (error) {
    // Audio is optional. Ignore browser restrictions.
  }
}

function initLoginTabs() {
  const customerTab = document.getElementById("customerTab");
  const carrierTab = document.getElementById("carrierTab");

  if (!customerTab || !carrierTab) return;

  customerTab.addEventListener("click", function () {
    setActiveRole(customerTab, carrierTab);
  });

  carrierTab.addEventListener("click", function () {
    setActiveRole(carrierTab, customerTab);
  });
}

function setActiveRole(activeTab, inactiveTab) {
  activeTab.classList.add("is-active");
  inactiveTab.classList.remove("is-active");
}

function initLoginForm() {
  const loginForm = document.getElementById("loginForm");
  if (!loginForm) return;

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    alert("Демо-версія V3: підключення backend буде наступним етапом.");
  });
}
