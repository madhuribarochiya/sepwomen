// Dynamically inject HTML structure for loan application and status display
document.body.innerHTML = `
  <div class="container">
    <div class="form-container">
      <h2>Apply for Loan</h2>
      <form id="apply-loan-form">
        <input type="number" id="loan-amount" placeholder="Loan Amount" required />
        <button type="submit">Apply for Loan</button>
        <p id="apply-feedback"></p>
      </form>

      <h2>Your Loan Status</h2>
      <div id="loan-status-list"></div>
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
  #loan-status-list {
    padding: 10px;
    border-top: 1px solid #ddd;
  }
  .loan {
    border-bottom: 1px solid #ddd;
    padding: 10px;
    margin-bottom: 10px;
  }
`;
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

// JavaScript logic to handle loan application and display loan status

// Handle Loan Application
document.getElementById('apply-loan-form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const amount = document.getElementById('loan-amount').value;

  try {
    const response = await fetch('/api/loans', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ amount })
    });
    const data = await response.json();
    if (response.ok) {
      document.getElementById('apply-feedback').innerText = 'Loan applied successfully!';
      document.getElementById('apply-feedback').style.color = 'green';
      fetchLoanStatus(); // Refresh loan status list
    } else {
      document.getElementById('apply-feedback').innerText = data.message;
    }
  } catch (error) {
    document.getElementById('apply-feedback').innerText = 'Error applying for loan.';
  }
});

// Fetch and Display Loan Status
async function fetchLoanStatus() {
  try {
    const response = await fetch('/api/loans/status');
    const loans = await response.json();
    const loanStatusList = document.getElementById('loan-status-list');
    loanStatusList.innerHTML = ''; // Clear current list
    loans.forEach(loan => {
      const loanDiv = document.createElement('div');
      loanDiv.className = 'loan';
      loanDiv.innerHTML = `
        <h3>Loan Amount: $${loan.amount}</h3>
        <p>Status: ${loan.status}</p>
        <p>Applied on: ${new Date(loan.createdAt).toLocaleDateString()}</p>
      `;
      loanStatusList.appendChild(loanDiv);
    });
  } catch (error) {
    console.error('Error fetching loan status:', error);
  }
}

// Initial fetch of loan status
fetchLoanStatus();
