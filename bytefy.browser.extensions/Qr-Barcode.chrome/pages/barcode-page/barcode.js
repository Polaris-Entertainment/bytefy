document.addEventListener('DOMContentLoaded', function() {
  const urlParams = new URLSearchParams(window.location.search);
  const content = urlParams.get('content');
  const type = urlParams.get('type');
  generateBarcode(content, type);
});

function generateBarcode(content, type) {
  if (type === "ean13") {
    JsBarcode("#barcode", content, { format: "EAN13" });
    document.getElementById("type").innerText = "EAN-13";
  } else if (type === "ean8") {
    JsBarcode("#barcode", content, { format: "EAN8" });
    document.getElementById("type").innerText = "EAN-8";
  }
}
