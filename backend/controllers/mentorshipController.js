// Dynamically inject HTML structure for mentorship sign-up and matching
document.body.innerHTML = `
  <div class="container">
    <div class="form-container">
      <h2>Sign Up for Mentorship</h2>
      <form id="signup-mentorship-form">
        <select id="role" required>
          <option value="">Select Role</option>
          <option value="Mentor">Mentor</option>
          <option value="Mentee">Mentee</option>
        </select>
        <input type="text" id="expertise" placeholder="Your Expertise" required />
        <button type="submit">Sign Up</button>
        <p id="signup-feedback"></p>
      </form>

      <h2>Available Mentors</h2>
      <div id="mentors-list"></div>

      <h2>Match Mentor with Mentee</h2>
      <form id="match-mentor-form">
        <input type="text" id="mentorId" placeholder="Mentor ID" required />
        <input type="text" id="menteeId" placeholder="Mentee ID" required />
        <button type="submit">Match Mentor and Mentee</button>
        <p id="match-feedback"></p>
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
    width: 600px;
    position: relative;
  }
  form {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }
  input, select {
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
  #mentors-list {
    padding: 10px;
    border-top: 1px solid #ddd;
  }
  .mentor {
    border-bottom: 1px solid #ddd;
    padding: 10px;
    margin-bottom: 10px;
  }
`;
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

// JavaScript logic to handle mentorship signup, fetching mentors, and matching mentors with mentees

// Handle Mentorship Signup
document.getElementById('signup-mentorship-form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const role = document.getElementById('role').value;
  const expertise = document.getElementById('expertise').value;

  try {
    const response = await fetch('/api/mentorship/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ role, expertise })
    });
    const data = await response.json();
    if (response.ok) {
      document.getElementById('signup-feedback').innerText = 'Signup successful!';
      document.getElementById('signup-feedback').style.color = 'green';
      fetchMentors(); // Refresh mentor list
    } else {
      document.getElementById('signup-feedback').innerText = data.message;
    }
  } catch (error) {
    document.getElementById('signup-feedback').innerText = 'Error during signup.';
  }
});

// Fetch and Display Available Mentors
async function fetchMentors() {
  try {
    const response = await fetch('/api/mentorship/mentors');
    const mentors = await response.json();
    const mentorsList = document.getElementById('mentors-list');
    mentorsList.innerHTML = ''; // Clear current list
    mentors.forEach(mentor => {
      const mentorDiv = document.createElement('div');
      mentorDiv.className = 'mentor';
      mentorDiv.innerHTML = `
        <h3>${mentor.user.name}</h3>
        <p>Expertise: ${mentor.expertise}</p>
        <p>Status: ${mentor.status}</p>
      `;
      mentorsList.appendChild(mentorDiv);
    });
  } catch (error) {
    console.error('Error fetching mentors:', error);
  }
}

// Handle Matching Mentor with Mentee
document.getElementById('match-mentor-form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const mentorId = document.getElementById('mentorId').value;
  const menteeId = document.getElementById('menteeId').value;

  try {
    const response = await fetch('/api/mentorship/match', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ mentorId, menteeId })
    });
    const data = await response.json();
    if (response.ok) {
      document.getElementById('match-feedback').innerText = 'Mentor and Mentee matched successfully!';
      document.getElementById('match-feedback').style.color = 'green';
    } else {
      document.getElementById('match-feedback').innerText = data.message;
    }
  } catch (error) {
    document.getElementById('match-feedback').innerText = 'Error during matching.';
  }
}

// Initial fetch of available mentors
fetchMentors();
