console.log("Content Script Triggered Correctly");

const totalTimeKey = "totalRedditTime";

active = true;

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getStoredTotalTime() {
    storedTime = localStorage.getItem(totalTimeKey) ?? 0;
    if (storedTime == 0) {
        localStorage.setItem(totalTimeKey, storedTime);
    }
    return storedTime;
}

async function startActiveTracking() {

    while (active) {
        await delay(5000); // Count in 5-second increments
        let totalTime = Number(getStoredTotalTime());
        totalTime += 5;
        localStorage.setItem(totalTimeKey, totalTime);
        console.log(totalTime);
    }

}

startActiveTracking();
