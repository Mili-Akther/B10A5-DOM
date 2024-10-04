// Toggling between Donation and History views
document
  .getElementById("donationButton")
  .addEventListener("click", function () {
    document.getElementById("donationSection").classList.remove("hidden");
    document.getElementById("historySection").classList.add("hidden");
  });

document.getElementById("historyButton").addEventListener("click", function () {
  document.getElementById("donationSection").classList.add("hidden");
  document.getElementById("historySection").classList.remove("hidden");
});

// Handling Donation Logic
const accountBalanceElement = document.getElementById("accountBalance");
let accountBalance = parseFloat(accountBalanceElement.textContent) || 0;

document.querySelectorAll(".donateNowButton").forEach((button) => {
  button.addEventListener("click", function () {
    const donationAmount = parseFloat(prompt("Enter your donation amount:"));
    if (isNaN(donationAmount) || donationAmount <= 0) {
      alert("Please enter a valid donation amount.");
      return;
    }

    if (donationAmount > accountBalance) {
      alert("Donation amount exceeds current balance.");
      return;
    }

    // Deduct the donation amount
    accountBalance -= donationAmount;
    accountBalanceElement.textContent = accountBalance.toFixed(2);

    // Update card's donation amount
    const donationAmountElement = this.parentElement.querySelector(".btn-sm");
    const currentAmount = parseFloat(donationAmountElement.textContent) || 0;
    donationAmountElement.textContent = (currentAmount + donationAmount).toFixed(2);

    // Add to history
    addDonationToHistory(this.dataset.donationName, donationAmount);

    // Show notification
    const notification = document.getElementById("notification");
    notification.classList.remove("hidden");

    // Close the modal and clear input (assuming donationModal and donationInput are defined)
    donationModal.classList.add("hidden");
    donationInput.value = '';
  });
});


document
  .getElementById("closeNotification")
  .addEventListener("click", function () {
    console.log("Close button clicked!"); // This should appear in the console
    document.getElementById("notification").classList.add("hidden");
  });

// Function to add donation to history
function addDonationToHistory(donationName, amount) {
  const date = new Date();
  const historyEntry = {
    name: donationName,
    amount: amount,
    date: date.toLocaleString(),
  };

  // Save to local storage
  let history = JSON.parse(localStorage.getItem("donationHistory")) || [];
  history.push(historyEntry);
  localStorage.setItem("donationHistory", JSON.stringify(history));
}

// Add event listener to the donation cancel button
document.getElementById("donationCancel").addEventListener("click", function () {
  donationModal.classList.add("hidden");
  donationInput.value = '';
});

// Add event listener to the close notification button
document.getElementById("closeNotification").addEventListener("click", function () {
  console.log("Close button clicked!"); // Debugging line to check if it works
  document.getElementById("notification").classList.add("hidden");
});
