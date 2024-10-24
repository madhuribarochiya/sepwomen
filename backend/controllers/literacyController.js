// Dynamically inject HTML structure for literacy tools
document.body.innerHTML = `
  <div class="container">
    <div class="form-container">
      <h2>Create New Literacy Tool</h2>
      <form id="create-tool-form">
        <input type="text" id="toolName" placeholder="Tool Name" required />
        <input type="number" id="progress" placeholder="Progress (%)" required />
        <button type="submit">Create Tool</button>
        <p id="create-feedback"></p>
      </form>

      <h2>Update Tool Progress</h2>
      <form id="update-tool-form">
        <input type="text" id="toolId" placeholder="Tool ID" required />
        <input type="number" id="newProgress" placeholder="New Progress (%)" required />
        <button type="submit">Update Progress</button>
        <p id="update-feedback"></p>
      </form>

      <h2>All Literacy Tools</h2>
      <div id="tools-list"></div>
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
  input {
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
  #tools-list {
    padding: 10px;
    border-top: 1px solid #ddd;
  }
  .tool {
    border-bottom: 1px solid #ddd;
    padding: 10px;
    margin-bottom: 10px;
  }
`;
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

// JavaScript logic to handle creating, updating, and displaying literacy tools

// Handle Tool Creation
document.getElementById('create-tool-form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const toolName = document.getElementById('toolName').value;
  const progress = document.getElementById('progress').value;

  try {
    const response = await fetch('/api/tools', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ toolName, progress })
    });
    const data = await response.json();
    if (response.ok) {
      document.getElementById('create-feedback').innerText = 'Tool created successfully!';
      document.getElementById('create-feedback').style.color = 'green';
      fetchTools(); // Refresh tool list
    } else {
      document.getElementById('create-feedback').innerText = data.message;
    }
  } catch (error) {
    document.getElementById('create-feedback').innerText = 'Error creating tool.';
  }
});

// Handle Tool Progress Update
document.getElementById('update-tool-form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const toolId = document.getElementById('toolId').value;
  const newProgress = document.getElementById('newProgress').value;

  try {
    const response = await fetch('/api/tools/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: toolId, progress: newProgress })
    });
    const data = await response.json();
    if (response.ok) {
      document.getElementById('update-feedback').innerText = 'Progress updated successfully!';
      document.getElementById('update-feedback').style.color = 'green';
      fetchTools(); // Refresh tool list
    } else {
      document.getElementById('update-feedback').innerText = data.message;
    }
  } catch (error) {
    document.getElementById('update-feedback').innerText = 'Error updating progress.';
  }
});

// Fetch and Display All Literacy Tools
async function fetchTools() {
  try {
    const response = await fetch('/api/tools');
    const tools = await response.json();
    const toolsList = document.getElementById('tools-list');
    toolsList.innerHTML = ''; // Clear current list
    tools.forEach(tool => {
      const toolDiv = document.createElement('div');
      toolDiv.className = 'tool';
      toolDiv.innerHTML = `
        <h3>${tool.toolName}</h3>
        <p>Progress: ${tool.progress}%</p>
      `;
      toolsList.appendChild(toolDiv);
    });
  } catch (error) {
    console.error('Error fetching tools:', error);
  }
}

// Initial fetch of tools
fetchTools();
