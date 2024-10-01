// Initialize the navbar amount
let navbarAmount = 5500;

// Add event listeners to all "Write Donation Amount" buttons
document.querySelectorAll(".writeDonationButton").forEach(function (button) {
  button.addEventListener("click", function () {
    // Prompt user to enter donation amount
    let donationAmount = prompt("Enter your donation amount in BDT:");

    // Trim the input to remove unnecessary spaces
    donationAmount = donationAmount ? donationAmount.trim() : null;

    // Ensure the input is a valid number and not negative
    if (
      donationAmount !== null &&
      !isNaN(donationAmount) &&
      donationAmount !== ""
    ) {
      donationAmount = parseFloat(donationAmount); // Convert input to a number

      // Check for negative donation amount
      if (donationAmount < 0) {
        alert("Invalid amount! Please enter a positive donation amount.");
        return; // Exit the function if the amount is negative
      }

      // Find the button with the donation amount using a safer selector
      let currentButton =
        this.closest(".hero-content").querySelector(".btn-sm"); // Finds the correct button
      let currentAmount = parseFloat(
        currentButton.textContent.replace(" BDT", "")
      );
      currentAmount += donationAmount; // Update the button amount
      currentButton.textContent = `${currentAmount} BDT`; // Set the new amount

      // Update the navbar amount
      navbarAmount -= donationAmount; // Deduct from navbar amount
      document.getElementById(
        "navbarAmount"
      ).textContent = `${navbarAmount} BDT`; // Update navbar amount

      // Show notification
      const notification = document.getElementById("notification");
      notification.classList.remove("hidden");
    } else if (donationAmount !== null) {
      alert("Invalid Donation Amount.");
    }
  });
});

// Add event listener to the close notification button
document
  .getElementById("closeNotification")
  .addEventListener("click", function () {
    document.getElementById("notification").classList.add("hidden");
  });
