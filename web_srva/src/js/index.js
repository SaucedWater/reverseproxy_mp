document.addEventListener("DOMContentLoaded", () => {
  const chatToggleBtn = document.getElementById("chat-toggle-btn");
  const chatWidget = document.getElementById("chat-widget");
  const chatCloseBtn = document.getElementById("chat-close-btn");

  const chatMessages = document.getElementById("chat-messages");
  const chatInput = document.getElementById("chat-input");
  const sendBtn = document.getElementById("send-btn");

  const OLLAMA_API_URL = "/ollama/api/generate";
  const MODEL_NAME = "qwen2.5:1.5b";

  function openChat() {
    chatWidget.classList.remove("hidden");
    chatWidget.setAttribute("aria-hidden", "false");
    chatInput.focus();
  }

  function closeChat() {
    chatWidget.classList.add("hidden");
    chatWidget.setAttribute("aria-hidden", "true");
  }

  function addMessage(text, who) {
    const row = document.createElement("div");
    row.className = `msg ${who}`;

    const bubble = document.createElement("div");
    bubble.className = "bubble";
    bubble.textContent = text;

    row.appendChild(bubble);
    chatMessages.appendChild(row);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  async function sendMessage() {
    const message = chatInput.value.trim();
    if (!message) return;

    addMessage(message, "user");
    chatInput.value = "";
    sendBtn.disabled = true;

    try {
      const payload = {
        model: MODEL_NAME,
        prompt: message,
        stream: false
      };

      const res = await fetch(OLLAMA_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      const reply = data?.response ? data.response : "(No response returned)";
      addMessage(reply, "bot");
    } catch (err) {
      addMessage(`Error: ${err.message}`, "bot");
    } finally {
      sendBtn.disabled = false;
      chatInput.focus();
    }
  }

  // Wire up UI
  chatToggleBtn?.addEventListener("click", openChat);
  chatCloseBtn?.addEventListener("click", closeChat);

  sendBtn?.addEventListener("click", sendMessage);
  chatInput?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") sendMessage();
    if (e.key === "Escape") closeChat();
  });

  // Optional: auto-close on load
  closeChat();
});
