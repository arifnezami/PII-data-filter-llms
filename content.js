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
        ne
