const totalTimeKey = "totalRedditTime";

const totalDisplayEl = document.getElementById("total-time-display");

function getStoredTotalTime() {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(totalTimeKey, (result) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        let res = result[totalTimeKey];
        if (res === undefined) {
            resolve("nothing yet");
        } else {
          resolve(res);
        }
      }
    });
  });
}

async function main() {
  try {
    let totalTime = await getStoredTotalTime();
    totalDisplayEl.innerHTML = `Total time spent on reddit: ${totalTime} seconds`;
  } catch (error) {
    console.log(error);
  }
}

main();
