// LiveKit API integration (basic example)
const API_KEY = "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";
const ROOM_URL = "your-livekit-room-url";

// Connect to LiveKit
async function connectToRoom() {
  const room = new LiveKit.Room();
  await room.connect(ROOM_URL, API_KEY);

  room.on("messageReceived", (message) => {
    displayMessage("bot", message.data);
  });

  return room;
}

// Display messages in the chat interface
function displayMessage(sender, message) {
  const chatOutput = document.getElementById("chat-output");
  const newMessage = document.createElement("div");
  newMessage.className = sender;
  newMessage.innerText = `${sender}: ${message}`;
  chatOutput.appendChild(newMessage);
}

// Handle user input and send to LiveKit
async function sendMessage(event) {
  event.preventDefault();
  const userMessage = document.getElementById("chat-input").value;
  if (userMessage.trim() === "") return;

  displayMessage("user", userMessage);

  const room = await connectToRoom();
  room.localParticipant.publishData(userMessage);
}

document.getElementById("send-button").addEventListener("click", sendMessage);

export const API_BASE_URL = "http://localhost:3000";
