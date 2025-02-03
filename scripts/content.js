console.log("Content Script Triggered Correctly");

const totalTimeKey = "totalRedditTime";

localStorage.clear();

let active = true;
let oneActiveInstace = false;

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getStoredTotalTime() {
  storedTime = localStorage.getItem(totalTimeKey) ?? 0;
  // initialise local storage value-pair for this app
  if (storedTime == 0) {
    localStorage.setItem(totalTimeKey, storedTime);
  }
  return storedTime;
}

async function startActiveTracking() {

  if (oneActiveInstace) {
    console.log("Previous instance hadn't completed yet, will just resume that")
    return;
  }
  console.log("new instance of counter started");
  while (active) {
        oneActiveInstace = true;
        await delay(5000); // Count in 5-second increments
        let totalTime = Number(getStoredTotalTime());
        totalTime += 5;
        localStorage.setItem(totalTimeKey, totalTime);
        console.log(totalTime);
    }
  oneActiveInstace = false;
  console.log("Current instance has finished")
}

document.addEventListener("visibilitychange", function () {
    active = !active;
    if (active) {
        startActiveTracking();
    }
});

startActiveTracking();
