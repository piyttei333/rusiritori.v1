const messages = document.getElementById('messages');
const input = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

sendButton.addEventListener('click', () => {
    const message = input.value.trim();
    if (message) {
        const newMessage = document.createElement('div');
        newMessage.textContent = message;
        newMessage.style.marginTop = '5px';
        messages.appendChild(newMessage);
        input.value = '';
        messages.scrollTop = messages.scrollHeight;
    }
});
