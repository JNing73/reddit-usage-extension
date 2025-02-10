const totalTimeKey = "totalRedditTime";

let active = true;
let oneActiveInstace = false;

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getStoredTotalTime() {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(totalTimeKey, (result) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        let res = result[totalTimeKey];
        if (res === undefined) {
          chrome.storage.local.set({ [totalTimeKey]: 0 }, () => {
            resolve(0);
          });
        } else {
          resolve(res);
        }
      }
    });
  });
}

function setStoredTime(value) {
  return new Promise((resolve, reject) => {
    if (chrome.runtime.lastError) {
      reject(chrome.runtime.lastError);
    } else {
      chrome.storage.local.set({ [totalTimeKey]: value }, () => {
        resolve();
      });
    }
  });
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
        let totalTime = await getStoredTotalTime();
        
        // Check the active status again before writing to storage
        if (active) {
          totalTime += 5;
          await setStoredTime(totalTime);
          console.log(totalTime);
        }
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


async function main() {
  try {
    // chrome.storage.local.clear();
    startActiveTracking();
  }
  catch(error) {
    console.log(error);
  }
}

main();