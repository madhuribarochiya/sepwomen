// Dynamically inject HTML structure into the page
document.body.innerHTML = `
  <div class="container">
    <div class="form-container">
      <div class="image-container">
        <img src="login-image.jpg" class="hover-image" alt="Login Illustration">
      </div>
      <form id="signup-form">
        <h2>Signup</h2>
        <input type="text" id="name" placeholder="Name" required />
        <input type="email" id="email" placeholder="Email" required />
        <input type="password" id="password" placeholder="Password" required />
        <button type="submit">Signup</button>
        <p id="signup-feedback"></p>
      </form>
      <form id="login-form">
        <h2>Login</h2>
        <input type="email" id="login-email" placeholder="Email" required />
        <input type="password" id="login-password" placeholder="Password" required />
        <button type="submit">Login</button>
        <p id="login-feedback"></p>
      </form>
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
    width: 400px;
    position: relative;
  }
  .image-container {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }
  .hover-image {
    width: 100%;
    transition: transform 0.3s;
  }
  .hover-image:hover {
    transform: scale(1.1);
  }
  form {
    display: flex;
    flex-direction: column;
  }
  input {
    margin-bottom: 15px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
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
`;
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

// JavaScript for Signup and Login form handling

// Handle Signup Form
document.getElementById('signup-form').addEventListener('submit', async function (e) {
  e.preventDefault();
  
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    });
    const data = await response.json();
    if (response.ok) {
      document.getElementById('signup-feedback').innerText = 'Signup successful!';
      document.getElementById('signup-feedback').style.color = 'green';
    } else {
      document.getElementById('signup-feedback').innerText = data.message;
    }
  } catch (error) {
    document.getElementById('signup-feedback').innerText = 'Error during signup.';
  }
});

// Handle Login Form
document.getElementById('login-form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    if (response.ok) {
      document.getElementById('login-feedback').innerText = 'Login successful!';
      document.getElementById('login-feedback').style.color = 'green';
    } else {
      document.getElementById('login-feedback').innerText = data.message;
    }
  } catch (error) {
    document.getElementById('login-feedback').innerText = 'Error during login.';
  }
});
