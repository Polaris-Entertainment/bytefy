document.addEventListener('DOMContentLoaded', function() {
  const urlParams = new URLSearchParams(window.location.search);
  const content = urlParams.get('content');
  generateQRCode(content);
});

function generateQRCode(content) {
  let qrCodeElement = document.getElementById('qrcode');
  qrCodeElement.innerHTML = "";

  document.getElementById('content').innerText = content;
  new QRCode(qrCodeElement, {
    text: content,
    width: 256,
    height: 256,
    correctLevel: QRCode.CorrectLevel.L
  });
}
