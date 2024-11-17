document.addEventListener('DOMContentLoaded', function() {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    let url = tabs[0].url;
    generateQRCode(url);
  });
});

function generateQRCode(url) {
  let qrCodeElement = document.getElementById('qrcode');
  qrCodeElement.innerHTML = "";

  if (typeof QRCode !== 'undefined') {
    new QRCode(qrCodeElement, {
      text: url,
      width: 256,
      height: 256
    });
  } else {
    console.error("QRCode library is not loaded.");
  }
}
