chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "generateQRCodeFromText",
    title: "Generate QR code from selected text",
    contexts: ["selection"]
  });

  chrome.contextMenus.create({
    id: "generateQRCodeFromLink",
    title: "Generate QR code from link",
    contexts: ["link"]
  });

  chrome.contextMenus.create({
    id: "generateQRCodeFromImage",
    title: "Generate QR code from image",
    contexts: ["image"]
  });

  chrome.contextMenus.create({
    id: "generateEAN13Barcode",
    title: "Generate EAN-13 Barcode",
    contexts: ["selection"],
    enabled: false
  });

  chrome.contextMenus.create({
    id: "generateEAN8Barcode",
    title: "Generate EAN-8 Barcode",
    contexts: ["selection"],
    enabled: false
  });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log(message)
  if (message.type === "updateContextMenu") {
    chrome.contextMenus.update("generateEAN13Barcode", { enabled: message.isEAN13 });
    chrome.contextMenus.update("generateEAN8Barcode", { enabled: message.isEAN8 });
  }
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  let content = "";
  let type = "";
  let document = "";

  if (info.menuItemId === "generateQRCodeFromText" && info.selectionText) {
    content = info.selectionText;
    document = "qr";
  } else if (info.menuItemId === "generateQRCodeFromLink" && info.linkUrl) {
    content = info.linkUrl;
    document = "qr";
  } else if (info.menuItemId === "generateQRCodeFromImage" && info.srcUrl) {
    content = info.srcUrl;
    document = "qr";
  } else if (info.menuItemId === "generateEAN13Barcode" && info.selectionText) {
    content = info.selectionText;
    type = "ean13";
    document = "barcode";
  } else if (info.menuItemId === "generateEAN8Barcode" && info.selectionText) {
    content = info.selectionText;
    type = "ean8";
    document = "barcode";
  }

  if (content) {
    chrome.tabs.create({
      url: chrome.runtime.getURL(`pages/${document}-page/${document}.html?content=${encodeURIComponent(content)}${type ? `&type=${type}` : ''}`)
    });
  }
});
