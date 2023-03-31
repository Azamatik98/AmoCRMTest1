const inputEl = document.querySelector("input");
const buttonEl = document.querySelector("button");
const timerEl = document.querySelector("span");

const createTimerAnimator = () => {
  return (seconds) => {
    const specifiedTime = seconds * 1000;
    const startingTime = Date.now();
    const stoppingTime = startingTime + specifiedTime;
    const timerStartTime = setInterval(() => {
      const currentTime = Date.now();
      const leftTime = stoppingTime - currentTime;

      const hours = Math.floor(
        (leftTime / (1000 * 60 * 60)) % 24
      ).toLocaleString("en-Us", { minimumIntegerDigits: 2 });
      const minutes = Math.floor((leftTime / (1000 * 60)) % 60).toLocaleString(
        "en-Us",
        { minimumIntegerDigits: 2 }
      );
      const seconds = Math.floor((leftTime / 1000) % 60).toLocaleString(
        "en-Us",
        { minimumIntegerDigits: 2 }
      );

      if (leftTime / 1000 < 1) {
        clearInterval(timerStartTime);
      }

      timerEl.innerHTML = `
      <span>${hours}</span>
      <span class="colon">:</span>
      <span>${minutes}</span>
      <span class="colon">:</span>
      <span>${seconds}</span>
      `;
    });
  };
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener("input", () => {
  inputEl.setAttribute("type", "number");
});

buttonEl.addEventListener("click", () => {
  const seconds = Number(inputEl.value);

  animateTimer(seconds);

  inputEl.value = "";
});
