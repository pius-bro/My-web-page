function sendMessage() {
    let input = document.getElementById("user-input");
    let message = input.value.trim();

    if (message === "") return;

    let chatBox = document.getElementById("chat-box");

    // Create user message
    let userMsg = document.createElement("div");
    userMsg.classList.add("message", "user");
    userMsg.textContent = message;
    chatBox.appendChild(userMsg);

    // Clear input
    input.value = "";

    // Auto scroll
    chatBox.scrollTop = chatBox.scrollHeight;

    // Bot reply (after delay)
    setTimeout(() => {
        let botMsg = document.createElement("div");
        botMsg.classList.add("message", "bot");

        botMsg.textContent = getBotReply(message);
        chatBox.appendChild(botMsg);

        chatBox.scrollTop = chatBox.scrollHeight;
    }, 500);
}


// Simple chatbot logic
function getBotReply(message) {
    message = message.toLowerCase();

    if (message.includes("hello") || message.includes("hi")) {
        return "Hello! 👋";
    } 
    else if (message.includes("how are you")) {
        return "I'm just code, but I'm doing great 😄";
    } 
    else if (message.includes("programming")) {
        return "Start with Python or JavaScript 👍";
    } 
    else if (message.includes("bye")) {
        return "Goodbye! 👋";
    } 
    else {
        return "I don't understand that yet 🤔";
    }


}
document.getElementById("user-input").addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        sendMessage();
    }
     });