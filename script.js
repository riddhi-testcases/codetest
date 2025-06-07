let quotes = [];

async function loadQuotes() {
  try {
    const response = await fetch("quotes.json");
    quotes = await response.json();
    generateQuote(); // generate once loaded
  } catch (error) {
    console.error("Failed to load quotes:", error);
    document.getElementById("quote").innerText = "Failed to load quotes.";
  }
}

function generateQuote() {
  if (quotes.length === 0) return;

  const category = document.getElementById("category").value;
  let filteredQuotes = category === "all" ? quotes : quotes.filter(q => q.category === category);

  if (filteredQuotes.length === 0) {
    document.getElementById("quote").innerText = "No quotes found for this category.";
    document.getElementById("author").innerText = "";
    return;
  }

  const random = Math.floor(Math.random() * filteredQuotes.length);
  const selected = filteredQuotes[random];

  document.getElementById("quote").innerText = `"${selected.quote}"`;
  document.getElementById("author").innerText = `- ${selected.author}`;
}

function copyQuote() {
  const quote = document.getElementById("quote").innerText;
  const author = document.getElementById("author").innerText;
  const text = `${quote} ${author}`;
  navigator.clipboard.writeText(text).then(() => {
    alert("Quote copied to clipboard!");
  });
}

function tweetQuote() {
  const quote = document.getElementById("quote").innerText;
  const author = document.getElementById("author").innerText;
  const tweetText = encodeURIComponent(`${quote} ${author}`);
  window.open(`https://twitter.com/intent/tweet?text=${tweetText}`, "_blank");
}

function updateClock() {
  const now = new Date();
  const timeString = now.toLocaleTimeString();
  document.getElementById("clock").innerText = `🕒 ${timeString}`;
}

setInterval(updateClock, 1000);
document.addEventListener("DOMContentLoaded", () => {
  updateClock();
  loadQuotes();
});

document.body.addEventListener("keydown", function (e) {
  if (e.code === "Space") {
    e.preventDefault();
    generateQuote();
  }
});
