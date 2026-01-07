/* --- Auth Check Logic --- */
fetch('/oauth2/userinfo')
  .then(response => {
    if (response.ok) {
      document.getElementById('loginBtn').style.display = 'none';
      document.getElementById('logoutBtn').style.display = 'block';
    } else {
      document.getElementById('loginBtn').style.display = 'block';
      document.getElementById('logoutBtn').style.display = 'none';
    }
  });

/* --- XSS Reflected Logic --- */
// VULNERABILITY: Directly inserting user input without sanitization
const urlParams = new URLSearchParams(window.location.search);
const searchQuery = urlParams.get('search');
if (searchQuery) {
  // XSS VULNERABILITY - directly writing user input to innerHTML
  document.getElementById('searchResults').innerHTML = 
    `<p>You searched for: <strong>${searchQuery}</strong></p>`;
}

/* --- XSS Stored Logic --- */
// Fake database (stored XSS demonstration)
let messages = [];

const contactForm = document.querySelector('#contact form');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const message = this.querySelector('textarea').value;

    // VULNERABLE: Storing unsanitized inputs
    messages.push({ name, email, message });

    // Display messages
    displayMessages();

    this.reset();
  });
}

function displayMessages() {
  const formContainer = document.querySelector('.contact-form');

  // Remove existing message area
  const existing = document.querySelector('.message-display');
  if (existing) existing.remove();

  // Create new message container
  const resultsDiv = document.createElement('div');
  resultsDiv.className = 'message-display';
  resultsDiv.innerHTML = `<h3>Recent Messages:</h3>`;

  // XSS happens here (user input is inserted directly)
  messages.forEach(msg => {
    resultsDiv.innerHTML += `
      <div class="message-item">
        <p class="name">${msg.name}</p>
        <p class="email">${msg.email}</p>
        <p class="text">${msg.message}</p>
      </div>
    `;
  });

  formContainer.appendChild(resultsDiv);
}

/* --- Smooth Scroll Logic --- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

/* --- Chatbot Logic --- */
// Chatbot Popup Functionality
const chatbotToggle = document.getElementById('chatbotToggle');
const chatbotPopup = document.getElementById('chatbotPopup');
const minimizeBtn = document.getElementById('minimizeBtn');
const chatbotMessages = document.getElementById('chatbotMessages');
const chatbotInput = document.getElementById('chatbotInput');
const chatbotSend = document.getElementById('chatbotSend');
const chatbotTyping = document.getElementById('chatbotTyping');
const statusDot = document.getElementById('statusDot');
const statusText = document.getElementById('statusText');

// File Upload Elements
const chatFileInput = document.getElementById('chatFileInput');
const filePreview = document.getElementById('filePreview');
const fileNameSpan = document.getElementById('fileName');
const removeFileBtn = document.getElementById('removeFileBtn');

const OLLAMA_API_URL = '/ollama/api/generate';
const MODEL_NAME = 'qwen2.5:1.5b';

let isOpen = false;
let currentFile = null; // Store the selected file data

// Toggle chatbot
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

// Minimize button
if (minimizeBtn) {
  minimizeBtn.addEventListener('click', () => {
    isOpen = false;
    chatbotPopup.classList.remove('active');
    document.querySelector('.chat-icon').style.display = 'block';
    document.querySelector('.close-icon').style.display = 'none';
  });
}

// --- File Handling Logic ---

if (chatFileInput) {
  chatFileInput.addEventListener('change', function(e) {
    if (this.files && this.files[0]) {
      const file = this.files[0];
      currentFile = file;
      
      // Show preview
      fileNameSpan.textContent = file.name;
      filePreview.classList.add('active');
      chatbotInput.focus();
    }
  });
}

if (removeFileBtn) {
  removeFileBtn.addEventListener('click', clearFileSelection);
}

function clearFileSelection() {
  currentFile = null;
  chatFileInput.value = ''; // Reset input
  filePreview.classList.remove('active');
}

// Helper to read file as Base64 (for images)
function readFileAsBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      // Remove "data:*/*;base64," prefix for Ollama
      const base64String = reader.result.split(',')[1];
      resolve(base64String);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// Helper to read file as Text (for code/docs)
function readFileAsText(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsText(file);
  });
}

// --- End File Handling Logic ---

// Add message to chat
function addChatMessage(message, isUser, attachmentName = null) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `chat-message ${isUser ? 'user' : 'bot'}`;
  
  let attachmentHtml = '';
  if (attachmentName) {
    attachmentHtml = `<div class="msg-attachment">📎 ${attachmentName}</div>`;
  }

  messageDiv.innerHTML = `
    <div class="message-avatar">${isUser ? '👤' : '🤖'}</div>
    <div class="message-bubble">
        ${attachmentHtml}
        ${message}
    </div>
  `;
  
  chatbotMessages.appendChild(messageDiv);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Show typing indicator
function showChatTyping() {
  chatbotTyping.classList.add('active');
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Hide typing indicator
function hideChatTyping() {
  chatbotTyping.classList.remove('active');
}

// Show error
function showChatError(message) {
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-msg';
  errorDiv.textContent = message;
  chatbotMessages.appendChild(errorDiv);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Update status
function updateChatStatus(connected) {
  if (connected) {
    statusDot.classList.remove('disconnected');
    statusText.textContent = 'Online';
  } else {
    statusDot.classList.add('disconnected');
    statusText.textContent = 'Offline';
  }
}

// Send message
async function sendChatMessage() {
  const message = chatbotInput.value.trim();
  // Allow sending if there's a file, even if message is empty
  if (!message && !currentFile) return;

  const fileName = currentFile ? currentFile.name : null;
  addChatMessage(message || (currentFile ? "Sent a file." : ""), true, fileName);
  
  chatbotInput.value = '';
  chatbotSend.disabled = true;
  showChatTyping();

  try {
    let promptToSend = message;
    let imagesToSend = [];

    // Process File if exists
    if (currentFile) {
      if (currentFile.type.startsWith('image/')) {
        // It's an image
        try {
          const base64 = await readFileAsBase64(currentFile);
          imagesToSend.push(base64);
        } catch (err) {
          console.error("Error reading image:", err);
        }
      } else {
        // Assume text/code
        try {
          const textContent = await readFileAsText(currentFile);
          promptToSend = `[User uploaded file: ${currentFile.name}]\n\n${textContent}\n\n[User Message]: ${message}`;
        } catch (err) {
          console.error("Error reading text file:", err);
          promptToSend += `\n(Error reading attached file: ${currentFile.name})`;
        }
      }
      // Clear file after processing
      clearFileSelection();
    }

    const payload = {
      model: MODEL_NAME,
      prompt: promptToSend,
      stream: false
    };

    // Add images to payload if any (Ollama support)
    if (imagesToSend.length > 0) {
      payload.images = imagesToSend;
    }

    const response = await fetch(OLLAMA_API_URL, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
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

// Event listeners
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

// Test connection on load
async function testChatConnection() {
  try {
    const response = await fetch('/ollama/api/tags', {credentials: 'include'});
    if (response.ok) {
      updateChatStatus(true);
    }
  } catch (error) {
    updateChatStatus(false);
  }
}

testChatConnection();