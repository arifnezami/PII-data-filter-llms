// Function to detect potential PII (simplified for example)
function detectPII(text) {
    const piiPatterns = {
        "email": /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi,
        "phone": /(\b\d{3}[-.]?\d{3}[-.]?\d{4}\b)/g,
        // Add more patterns as necessary
    };
    let matches = [];
    for (let type in piiPatterns) {
        let match;
        while ((match = piiPatterns[type].exec(text)) !== null) {
            matches.push({
                type: type,
                value: match[0],
                index: match.index
            });
        }
    }
    return matches;
}

// Function to create highlight for detected PII
function highlightPII(input, piiData) {
    let content = input.value;
    let newContent = '';
    let lastIndex = 0;

    piiData.forEach(pii => {
        newContent += content.substring(lastIndex, pii.index);
        newContent += `<span class="pii-highlight" pii-type="${pii.type}" title="Click to remove PII">${pii.value}</span>`;
        lastIndex = pii.index + pii.value.length;
    });
    newContent += content.substring(lastIndex);
    
    // Replace input with a rich text editor or overlay
    const div = document.createElement('div');
    div.innerHTML = newContent;
    div.contentEditable = true;
    div.classList.add('pii-editor');
    input.style.display = 'none';
    input.parentNode.insertBefore(div, input);

    // Event to remove PII when clicked
    div.querySelectorAll('.pii-highlight').forEach(span => {
        span.addEventListener('click', function() {
            let replaceText = '[REMOVED]';
            if (this.getAttribute('pii-type') === 'email') {
                replaceText = '[EMAIL REMOVED]';
            } else if (this.getAttribute('pii-type') === 'phone') {
                replaceText = '[PHONE REMOVED]';
            }
            this.outerHTML = replaceText;
            updateOriginalInput(div, input);
        });
    });
}

// Function to update the original input based on editable div content
function updateOriginalInput(div, input) {
    let textContent = div.textContent || div.innerText;
    input.value = textContent;
}

document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input[type="text"], textarea');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            let piiData = detectPII(this.value);
            if (piiData.length > 0) {
                highlightPII(this, piiData);
            }
        });
    });
});

// Basic styles for highlights
const style = document.createElement('style');
style.textContent = `
    .pii-highlight {
        background-color: yellow;
        cursor: pointer;
    }
    .pii-editor {
        border: 1px solid #ccc;
        padding: 8px;
        min-height: 20px;
    }
`;
document.head.appendChild(style);
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');
    const inputs = document.querySelectorAll('input[type="text"], textarea');
    console.log('Inputs found:', inputs.length);
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            console.log('Input event triggered');
            let piiData = detectPII(this.value);
            console.log('PII Data detected:', piiData);
            if (piiData.length > 0) {
                highlightPII(this, piiData);
            }
        });
    });
});
