const totalTimeKey = "totalRedditTime";
const noTimeYetMessage = "nothing yet";
const dynamicUpdateCommand = "dynamicUpdate";

const totalDisplayEl = document.getElementById("total-time-display");

chrome.runtime.onMessage.addListener((message) => { 
  if (message.command == dynamicUpdateCommand) {
    main();
  }
});

function getStoredTotalTime() {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(totalTimeKey, (result) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        let res = result[totalTimeKey];
        if (res === undefined) {
            resolve(noTimeYetMessage);
        } else {
          resolve(res);
        }
      }
    });
  });
}

function generateTotalTimeMessage(totalTime) {
  console.log("generateTotalTimeMessage called");
  let base = "Total time spent on reddit:";
  let displayMessage;
  if (totalTime === noTimeYetMessage) {
    displayMessage = `${base} ${totalTime}`;
  }
  else {
    displayMessage = `${base} ${totalTime} seconds`;
  }
  totalDisplayEl.innerHTML = displayMessage;
}

async function main() {
  try {
    let totalTime = await getStoredTotalTime();
    generateTotalTimeMessage(totalTime);
  } catch (error) {
    console.log(error);
  }
}

main();
