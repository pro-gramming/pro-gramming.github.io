// Typing effect functionality
export function initTypingEffect(config) {
    const typingText = document.getElementById('typing-text');
    const nameElement = document.getElementById('name');
    const text = "Hi, I'm";
    const name = config.name;
    let charIndex = 0;
    let nameIndex = 0;
    
    function type() {
        if (charIndex < text.length) {
            typingText.textContent += text.charAt(charIndex);
            charIndex++;
            setTimeout(type, 100);
        } else if (nameIndex < name.length) {
            if (nameIndex === 0) {
                nameElement.style.opacity = '1';
            }
            nameElement.textContent += name.charAt(nameIndex);
            nameIndex++;
            setTimeout(type, 100);
        }
    }

    // Start typing animation
    setTimeout(type, 500);
} 