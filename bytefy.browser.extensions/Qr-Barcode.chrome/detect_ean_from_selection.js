let lastIsEAN13 = false;
let lastIsEAN8 = false;

document.addEventListener("selectionchange", () => {
  const selection = window.getSelection().toString().trim();
  const isEAN13 = /^\d{12,13}$/.test(selection);
  const isEAN8 = /^\d{7}$/.test(selection);

  if (isEAN13 || isEAN8) {
    if (isEAN13 !== lastIsEAN13 || isEAN8 !== lastIsEAN8) {
      chrome.runtime.sendMessage({
        type: "updateContextMenu",
        isEAN13: isEAN13,
        isEAN8: isEAN8
      });
      lastIsEAN13 = isEAN13;
      lastIsEAN8 = isEAN8;
    }
  } else {
    if (lastIsEAN13 || lastIsEAN8) {
      chrome.runtime.sendMessage({
        type: "updateContextMenu",
        isEAN13: false,
        isEAN8: false
      });
      lastIsEAN13 = false;
      lastIsEAN8 = false;
    }
  }
});