const CSS_FILE = "dark.css";

async function getCurrentTab() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return tab;
}

function getDomain(url) {
  try {
    return new URL(url).hostname;
  } catch {
    return null;
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  const toggle = document.getElementById("toggle");
  const tab = await getCurrentTab();
  const domain = getDomain(tab.url);

  if (!domain) return;

  chrome.storage.sync.get([domain], (data) => {
    toggle.checked = !!data[domain];
  });

  toggle.addEventListener("change", async () => {
    const enabled = toggle.checked;

    if (enabled) {
      await chrome.scripting.insertCSS({
        target: { tabId: tab.id },
        files: [CSS_FILE],
      });
    } else {
      await chrome.scripting.removeCSS({
        target: { tabId: tab.id },
        files: [CSS_FILE],
      });
    }

    chrome.storage.sync.set({ [domain]: enabled });
  });
});
