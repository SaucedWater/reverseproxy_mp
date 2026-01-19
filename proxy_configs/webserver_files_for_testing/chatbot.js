document.addEventListener('DOMContentLoaded', () => {
    // --- CONFIGURATION ---
    const OLLAMA_API_URL = '/ollama/api/generate';
    const MODEL_NAME = 'qwen2.5:1.5b';

    // --- DOM ELEMENTS ---
    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatbotPopup = document.getElementById('chatbotPopup');
    const minimizeBtn = document.getElementById('minimizeBtn');
    const chatbotMessages = document.getElementById('chatbotMessages');
    const chatbotInput = document.getElementById('chatbotInput');
    const chatbotSend = document.getElementById('chatbotSend');
    const chatbotTyping = document.getElementById('chatbotTyping');
    const statusDot = document.getElementById('statusDot');
    const statusText = document.getElementById('statusText');

    let isOpen = false;

    // --- TOGGLE VISIBILITY ---
    if (chatbotToggle) {
        chatbotToggle.addEventListener('click', () => {
            isOpen = !isOpen;
            chatbotPopup.classList.toggle('active');
            
            // Toggle icons
            const chatIcon = chatbotToggle.querySelector('.chat-icon');
            const closeIcon = chatbotToggle.querySelector('.close-icon');
            
            if (isOpen) {
                chatIcon.style.display = 'none';
                closeIcon.style.display = 'block';
                chatbotInput.focus();
            } else {
                chatIcon.style.display = 'block';
                closeIcon.style.display = 'none';
            }
        });
    }

    if (minimizeBtn) {
        minimizeBtn.addEventListener('click', () => {
            isOpen = false;
            chatbotPopup.classList.remove('active');
            document.querySelector('.chat-icon').style.display = 'block';
            document.querySelector('.close-icon').style.display = 'none';
        });
    }

    // --- UI HELPERS ---
    function addChatMessage(message, isUser) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${isUser ? 'user' : 'bot'}`;
        
        messageDiv.innerHTML = `
            <div class="message-avatar">${isUser ? '👤' : '🤖'}</div>
            <div class="message-bubble">${message}</div>
        `;
        
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function showChatTyping() {
        chatbotTyping.classList.add('active');
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function hideChatTyping() {
        chatbotTyping.classList.remove('active');
    }

    function showChatError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-msg';
        errorDiv.textContent = message;
        chatbotMessages.appendChild(errorDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function updateChatStatus(connected) {
        if (connected) {
            statusDot.classList.remove('disconnected');
            statusText.textContent = 'Online';
        } else {
            statusDot.classList.add('disconnected');
            statusText.textContent = 'Offline';
        }
    }

    // --- API INTERACTION ---
    async function sendChatMessage() {
        const message = chatbotInput.value.trim();
        if (!message) return;

	const timestamp = Date.now();

        addChatMessage(message, true);
        chatbotInput.value = '';
        chatbotSend.disabled = true;
        showChatTyping();

        try {
            const response = await fetch(OLLAMA_API_URL, {
                method: 'POST',
                credentials: 'include', 
                headers: { 
			'Content-Type': 'application/json', 
			'X-Request-Timestamp': timestamp.toString()
		},
                body: JSON.stringify({
                    model: MODEL_NAME,
                    prompt: message,
                    stream: false
                })
            });

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            const data = await response.json();
            hideChatTyping();

            if (data.response) {
                addChatMessage(data.response, false);
                updateChatStatus(true);
            } else {
                addChatMessage("Sorry, I didn't understand that. Try again!", false);
            }

        } catch (error) {
            console.error('Chat error:', error);
            hideChatTyping();
            
            if (error.message.includes('Failed to fetch')) {
                showChatError('Cannot connect to AI. Check if Ollama is running.');
                updateChatStatus(false);
            } else {
                showChatError('Error: ' + error.message);
                updateChatStatus(false);
            }
        }

        chatbotSend.disabled = false;
        chatbotInput.focus();
    }

    // --- EVENT LISTENERS ---
    if (chatbotSend) {
        chatbotSend.addEventListener('click', sendChatMessage);
    }
    
    if (chatbotInput) {
        chatbotInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                sendChatMessage();
            }
        });
    }

    // --- INITIAL CONNECTION TEST ---
    async function testChatConnection() {
        try {
            // Note: Also needs credentials if your /ollama endpoint is protected
            const response = await fetch('/ollama/api/tags', { credentials: 'include' });
            if (response.ok) {
                updateChatStatus(true);
            } else {
                updateChatStatus(false);
            }
        } catch (error) {
            updateChatStatus(false);
        }
    }

    testChatConnection();
});
