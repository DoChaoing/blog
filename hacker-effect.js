document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    if (!header) return;

    const h1 = header.querySelector('h1');
    const p = header.querySelector('p');

    if (!h1 || !p) return;

    const originalH1Text = h1.textContent;
    const originalPText = p.textContent;
    const h1Prompt = 'user@host:~$ ';
    const pPrompt = '> ';

    h1.textContent = '';
    p.textContent = '';
    p.style.display = 'none'; // Hide paragraph initially

    function type(element, text, prompt, callback) {
        element.textContent = prompt;
        element.classList.add('typing-cursor');
        let index = 0;
        const typingInterval = setInterval(() => {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
            } else {
                clearInterval(typingInterval);
                element.classList.remove('typing-cursor');
                if (callback) {
                    callback();
                }
            }
        }, 100); // Typing speed
    }

    // Start typing animation
    type(h1, originalH1Text, h1Prompt, () => {
        // After h1 is done, show and type p
        p.style.display = 'block';
        type(p, originalPText, pPrompt, null);
    });
}); 