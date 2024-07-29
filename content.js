document.addEventListener('input', function(event) {
    let target = event.target;
    // Check if the input is a text field
    if (target.tagName === 'INPUT' && target.type === 'text') {
        // Regular expressions for email and number
        const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
        const numberRegex = /\d+/;
        
        if (emailRegex.test(target.value) || numberRegex.test(target.value)) {
            target.style.borderColor = 'red'; // Add red border
        } else {
            target.style.borderColor = ''; // Remove red border
        }
    }
});
