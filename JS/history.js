// Load history data from local storage and display
document.addEventListener("DOMContentLoaded", function () {
  const historyContainer = document.getElementById("historyContainer");
  const history = JSON.parse(localStorage.getItem("donationHistory")) || [];

  history.forEach((entry) => {
    const historyEntryDiv = document.createElement("div");
    historyEntryDiv.classList.add(
      "h-32",
      "border",
      "border-gray-100",
      "shadow-md",
      "rounded-xl",
      "p-5",
      "mb-10",
      "w-full",
      "max-w-7xl",
      "pl-10"
    );
    historyEntryDiv.innerHTML = `
      <h1 class="font-bold text-xl text-left">${entry.amount} Taka is Donated for ${entry.name}</h1>
      <p class="mt-5 text-left">Date : ${entry.date}</p>
    `;
    historyContainer.appendChild(historyEntryDiv);
  });
});
