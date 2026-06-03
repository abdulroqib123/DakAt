(function () {
  const domain = location.hostname;

  chrome.storage.sync.get([domain], (data) => {
    const enabled = data[domain];

    if (enabled) {
      chrome.runtime.sendMessage({ action: "injectCSS" });
    }
  });
})();
