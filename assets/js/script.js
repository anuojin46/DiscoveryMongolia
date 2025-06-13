document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/api/itineraries")
    .then(res => res.json())
    .then(itineraries => {
      const container = document.querySelector(".itinerary");
      container.innerHTML = "";

      if (!Array.isArray(itineraries) || itineraries.length === 0) {
        container.innerHTML = "<p>No itineraries available.</p>";
        return;
      }

      itineraries.forEach(itinerary => {
        const card = document.createElement("div");
        card.className = "itinerary-card";

        const title = document.createElement("h3");
        title.className = "itinerary-title";
        title.textContent = itinerary.name || "Unnamed Trip";
        title.style.cursor = "pointer";

        const detail = document.createElement("div");
        detail.className = "itinerary-details";
        detail.style.display = "none";

        
        let table = `
          <table class="itinerary-table">
            <thead>
              <tr>
                <th>Day</th><th>Time</th><th>Location</th><th>Activity</th><th>Transport</th>
              </tr>
            </thead>
            <tbody>
        `;

        itinerary.days.forEach(day => {
          day.schedule.forEach(s => {
            table += `<tr>
              <td>${day.day}</td>
              <td>${s[0]}</td>
              <td>${s[2]}</td>
              <td>${s[3]}</td>
              <td>${s[4] || 'N/A'}</td>
            </tr>`;
          });
        });

        table += "</tbody></table>";
        detail.innerHTML = `
          <p><strong>Region:</strong> ${itinerary.region}</p>
          <p><strong>Season:</strong> ${itinerary.season}</p>
          <p><strong>Duration:</strong> ${itinerary.duration}</p>
          ${table}
        `;

       
        title.addEventListener("click", () => {
          detail.style.display = detail.style.display === "none" ? "block" : "none";
        });

        card.appendChild(title);
        card.appendChild(detail);
        container.appendChild(card);
      });
    })
    .catch(err => {
      console.error("Error loading itineraries:", err);
      document.querySelector(".itinerary").innerHTML = "<p>Error loading itineraries.</p>";
    });
});
