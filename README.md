# Reddit Usage Tracker Chrome Extension

## How to setup:
- Clone or download the repo to your local machine
- In your Chrome browser navigate to 'chrome://extensions'
- Toggle 'Developer mode' to on
- Click on 'Load unpacked'
- Select the directory containing the repo on your local machine
- You should now be able to open the extension through the extension widget

## Notable behavioural points
- The time counter only runs while the current tab is active
  - Have accounted for edge cases where a user may rapidly switch to and from the active tab
- When the pop-up window is opened it will grab the latest total logged time from chrome api storage
  - If the pop-up window is opened while the user is on a reddit page, the display will actively update

## Key concepts demonstrated and/or learnt during this project
- Writing and utilising asynchronous functions in javascript
- Using chrome api storage as opposed to generic localstorage
- Gracefully managing a function to only run when its parent page is active
- Using chrome.sendMessage and addListener to trigger functions
- When to use .catch() rather than try...catch for asynchronous functions

### Additional Notes:
Icon file generated through iOS image playground
