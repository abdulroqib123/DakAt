const CSS_FILE = "dark.css";

chrome.runtime.onMessage.addListener((msg, sender) => {
  if (msg.action === "injectCSS") {
    chrome.scripting.insertCSS({
      target: { tabId: sender.tab.id },
      files: [CSS_FILE],
    });
  }
});
