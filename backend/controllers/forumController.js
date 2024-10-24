// Dynamically inject HTML structure for threads and comments
document.body.innerHTML = `
  <div class="container">
    <div class="form-container">
      <h2>Create Thread</h2>
      <form id="create-thread-form">
        <input type="text" id="title" placeholder="Thread Title" required />
        <input type="text" id="category" placeholder="Category" required />
        <button type="submit">Create Thread</button>
        <p id="thread-feedback"></p>
      </form>

      <h2>Add Comment</h2>
      <form id="add-comment-form">
        <textarea id="comment-text" placeholder="Comment Text" required></textarea>
        <input type="text" id="thread-id" placeholder="Thread ID" required />
        <button type="submit">Add Comment</button>
        <p id="comment-feedback"></p>
      </form>

      <h2>All Threads</h2>
      <div id="threads-list"></div>
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
  #threads-list {
    padding: 10px;
    border-top: 1px solid #ddd;
  }
  .thread {
    border-bottom: 1px solid #ddd;
    padding: 10px;
    margin-bottom: 10px;
  }
  .comments {
    padding-left: 20px;
  }
  .comment {
    margin-bottom: 5px;
  }
`;
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

// JavaScript logic to handle thread creation, comments, and display all threads

// Handle Thread Creation
document.getElementById('create-thread-form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const category = document.getElementById('category').value;

  try {
    const response = await fetch('/api/threads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, category })
    });
    const data = await response.json();
    if (response.ok) {
      document.getElementById('thread-feedback').innerText = 'Thread created successfully!';
      document.getElementById('thread-feedback').style.color = 'green';
      fetchThreads();
    } else {
      document.getElementById('thread-feedback').innerText = data.message;
    }
  } catch (error) {
    document.getElementById('thread-feedback').innerText = 'Error creating thread.';
  }
});

// Handle Comment Addition
document.getElementById('add-comment-form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const text = document.getElementById('comment-text').value;
  const threadId = document.getElementById('thread-id').value;

  try {
    const response = await fetch('/api/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text, threadId })
    });
    const data = await response.json();
    if (response.ok) {
      document.getElementById('comment-feedback').innerText = 'Comment added successfully!';
      document.getElementById('comment-feedback').style.color = 'green';
      fetchThreads();
    } else {
      document.getElementById('comment-feedback').innerText = data.message;
    }
  } catch (error) {
    document.getElementById('comment-feedback').innerText = 'Error adding comment.';
  }
});

// Fetch and Display Threads
async function fetchThreads() {
  try {
    const response = await fetch('/api/threads');
    const threads = await response.json();
    const threadsList = document.getElementById('threads-list');
    threadsList.innerHTML = ''; // Clear current list
    threads.forEach(thread => {
      const threadDiv = document.createElement('div');
      threadDiv.className = 'thread';
      threadDiv.innerHTML = `
        <h3>${thread.title}</h3>
        <p>Category: ${thread.category}</p>
        <p>By: ${thread.user.name}</p>
        <div class="comments">
          <h4>Comments:</h4>
          ${thread.comments.map(comment => `<p class="comment">${comment.text} by ${comment.user.name}</p>`).join('')}
        </div>
      `;
      threadsList.appendChild(threadDiv);
    });
  } catch (error) {
    console.error('Error fetching threads:', error);
  }
}

// Initial fetch of threads
fetchThreads();
