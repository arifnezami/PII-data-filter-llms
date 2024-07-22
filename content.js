document.addEventListener('DOMContentLoaded', function() {
  const inputs = document.querySelectorAll('input[type="text"], textarea');
  inputs.forEach(input => {
    input.addEventListener('input', function() {
      this.value = removePIIData(this.value); // Function to remove PII data
    });
  });
});

function removePIIData(text) {
  // Here, you would implement the logic to find and remove PII.
  // For simplicity, let's just replace digits (as an example).
  return text.replace(/\d+/g, '[REMOVED]');
}
