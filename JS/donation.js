let accountBalance = 5500;

// Donation data
const donationSectionData = [
  {
    id: 1,
    title: "Donate for Flood at Noakhali, Bangladesh",
    bannerImg: "/assets/noakhali.png",
    amountDonated: 0,
    des: "The recent floods in Noakhali have caused significant damage to homes and infrastructure. Your donation will help provide essential supplies and support to those affected by this disaster.",
  },
  {
    id: 2,
    title: "Donate for Flood Relief in Feni, Bangladesh",
    bannerImg: "/assets/feni.png",
    amountDonated: 600,
    des: "The recent floods in Feni have devastated local communities, leading to severe disruption and loss. Your generous donation will help provide immediate aid, including food, clean water, and medical supplies, to those affected by this calamity.",
  },
  {
    id: 3,
    title: "Aid for Injured in the Quota Movement",
    bannerImg: "/assets/quota-protest.png",
    amountDonated: 2400,
    des: "The recent Quota movement has resulted in numerous injuries and significant hardship for many individuals. Your support is crucial in providing medical assistance, rehabilitation, and necessary supplies to those affected.",
  },
];


let donationHistory = [];

const balance = document.getElementById("accountBalance");
balance.textContent = accountBalance;


function populateDonationSection() {
  const donationSection = document.getElementById("donationSection");
  donationSection.innerHTML = ""; 

  const cards = donationSectionData.map((item) => {
    let donatedAmount = item.amountDonated;

    return `
      <div
        class="hero-content mb-4 flex-col lg:flex-row items-center justify-center p-6 rounded-3xl max-w-7xl gap-2 border border-gray-100 shadow-lg bg-white">
        <img
          src="${item.bannerImg}"
          class="rounded-lg lg:max-w-md h-full object-cover"
          alt="${item.title}" />
        <div
          class="flex flex-col items-center lg:items-start max-w-lg lg:ml-8 h-full">
          <div class="flex items-center mb-2 btn btn-sm">
            <img
              src="/assets/coin.png"
              alt="Coin"
              class="current-donation-amount w-6 h-6" />
            <span aria-label="${item.title}" id="donatedAmount-${item.id}">${donatedAmount}</span> BDT
          </div>
          <h1 class="text-xl font-bold text-center lg:text-left">
            ${item.title}
          </h1>
          <p class="py-4 text-justify">
            ${item.des}
          </p>
          <input
            type="number"
            id="donationInput-${item.id}"
            class="donation-input w-full mb-4 border border-gray-300 p-2 rounded"
            placeholder="Write Donation Amount" />
          <button 
            class="btn w-full bg-lime-300 text-justify text-xl donateNowButton"
            data-id="${item.id}">
            Donate Now
          </button>
        </div>
      </div>
    `;
  });


  donationSection.innerHTML = cards.join("");


  const donateButtons = document.querySelectorAll(".donateNowButton");
  donateButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const itemId = event.target.getAttribute("data-id");
      const donationInput = document.getElementById(`donationInput-${itemId}`);
      const donationValue = parseInt(donationInput.value, 10);

      // Input Validation
      if (isNaN(donationValue) || donationValue <= 0) {
        alert("Please enter a valid donation amount greater than 0.");
        return;
      }


      if (donationValue > accountBalance) {
        alert("Donation amount exceeds the available account balance.");
        return;
      }

 
      const itemIndex = donationSectionData.findIndex(
        (item) => item.id === parseInt(itemId)
      );
      donationSectionData[itemIndex].amountDonated += donationValue;


      const donatedAmountElement = document.getElementById(
        `donatedAmount-${itemId}`
      );
      donatedAmountElement.textContent =
        donationSectionData[itemIndex].amountDonated;


      accountBalance -= donationValue;
      balance.textContent = accountBalance;

     
      const notification = document.getElementById("notification");
      notification.classList.remove("hidden");

     
      const closeNotificationButton =
        document.getElementById("closeNotification");
      closeNotificationButton.addEventListener("click", () => {
        notification.classList.add("hidden");
 
        donationInput.value = "";
      });

     
      saveToHistory(donationSectionData[itemIndex].title, donationValue);
    });
  });
}

populateDonationSection();


function saveToHistory(name, amount) {
 
  const entry = {
    name: name,
    amount: amount,
    date: new Date().toString(),
  };


  donationHistory.push(entry);
}


function updateHistoryDisplay() {
  const historySection = document.getElementById("historySection");
  historySection.innerHTML = ""; 

  if (donationHistory.length === 0) {
    historySection.innerHTML = `<p class="text-lg text-gray-600">No donation history available.</p>`;
    return;
  }


  donationHistory.forEach((entry) => {
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
      <h1 class="font-bold text-xl text-left">${entry.amount} BDT is Donated for ${entry.name}</h1>
      <p class="mt-5 text-left">Date : ${entry.date}</p>
    `;
    historySection.appendChild(historyEntryDiv);
  });
}


function clearHistory() {

  donationHistory = [];


  updateHistoryDisplay();
}


document.getElementById("historyButton").addEventListener("click", () => {
  const donationSection = document.getElementById("donationSection");
  const historySection = document.getElementById("historySection");


  historySection.classList.remove("hidden");
  donationSection.classList.add("hidden");


  document.getElementById("historyButton").classList.add("bg-lime-300");
  document.getElementById("donationButton").classList.remove("bg-lime-300");


  updateHistoryDisplay();
});


document.getElementById("donationButton").addEventListener("click", () => {
  const donationSection = document.getElementById("donationSection");
  const historySection = document.getElementById("historySection");


  donationSection.classList.remove("hidden");
  historySection.classList.add("hidden");


  document.getElementById("donationButton").classList.add("bg-lime-300");
  document.getElementById("historyButton").classList.remove("bg-lime-300");
});