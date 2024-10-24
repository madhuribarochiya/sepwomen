// Dynamically inject HTML structure for messaging
document.body.innerHTML = `
  <div class="container">
    <div class="form-container">
      <h2>Send a Message to Mentor</h2>
      <form id="send-message-form">
        <textarea id="message-text" placeholder="Your Message" required></textarea>
        <input type="text" id="mentorId" placeholder="Mentor ID" required />
        <button type="submit">Send Message</button>
        <p id="send-feedback"></p>
      </form>

      <h2>Messages with Mentor</h2>
      <form id="get-messages-form">
        <input type="text" id="mentorIdMessages" placeholder="Mentor ID" required />
        <button type="submit">Get Messages</button>
      </form>
      <div id="messages-list"></div>
    </div>
  </div>
`;

// Inject CSS styles dynamically
const styles = `
  body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
  }
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
  .form-container {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 600px;
    position: relative;
  }
  form {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }
  input, textarea {
    margin-bottom: 15px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    width: 100%;
  }
  button {
    padding: 10px;
    background-color: #28a745;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.3s;
  }
  button:hover {
    background-color: #218838;
  }
  h2 {
    text-align: center;
    margin-bottom: 20px;
  }
  p {
    text-align: center;
    color: red;
  }
  #messages-list {
    padding: 10px;
    border-top: 1px solid #ddd;
  }
  .message {
    border-bottom: 1px solid #ddd;
    padding: 10px;
    margin-bottom: 10px;
  }
`;
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

// JavaScript logic to handle sending and receiving messages

// Handle Sending Message
document.getElementById('send-message-form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const text = document.getElementById('message-text').value;
  const mentorId = document.getElementById('mentorId').value;

  try {
    const response = await fetch(`/api/messages/${mentorId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text })
    });
    const data = await response.json();
    if (response.ok) {
      document.getElementById('send-feedback').innerText = 'Message sent successfully!';
      document.getElementById('send-feedback').style.color = 'green';
    } else {
      document.getElementById('send-feedback').innerText = data.message;
    }
  } catch (error) {
    document.getElementById('send-feedback').innerText = 'Error sending message.';
  }
});

// Handle Getting Messages
document.getElementById('get-messages-form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const mentorId = document.getElementById('mentorIdMessages').value;

  try {
    const response = await fetch(`/api/messages/${mentorId}`);
    const messages = await response.json();
    const messagesList = document.getElementById('messages-list');
    messagesList.innerHTML = ''; // Clear current list
    messages.forEach(message => {
      const messageDiv = document.createElement('div');
      messageDiv.className = 'message';
      messageDiv.innerHTML = `
        <p><strong>${message.sender.name}</strong>: ${message.text}</p>
        <p><small>Sent on: ${new Date(message.createdAt).toLocaleDateString()}</small></p>
      `;
      messagesList.appendChild(messageDiv);
    });
  } catch (error) {
    console.error('Error fetching messages:', error);
  }
});
