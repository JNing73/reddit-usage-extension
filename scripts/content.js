console.log("Content Script Triggered Correctly");

let totalTime = localStorage.getItem("totalRedditTime") ?? 0;

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function startActiveTracking() {

    instaceTime = 0;

    while (true) {
        await delay(1000);
        instaceTime++;
        console.log(instaceTime);
    }

}

startActiveTracking();