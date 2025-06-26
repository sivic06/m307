const pbURL = "https://pb18.toiwxr.easypanel.host/api/collections";

// Orte laden
function loadPlaces() {
  fetch(pbURL + "/place/records")
    .then((res) => res.json())
    .then((data) => {
      const tbody = document.getElementById("place-table");
      tbody.innerHTML = "";
      data.items.forEach((item) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
                    <td>${item.ort}</td>
                    <td>${item.kanton}</td>
                    <td>${item.zeitabhb}</td>
                    <td>${item.begruendung}</td>
                    <td>
                      <button onclick="editPlaceRow(this.parentNode.parentNode, ${JSON.stringify(
                        item
                      ).replace(/"/g, "&quot;")})">Bearbeiten</button>
                      <button onclick="deletePlace('${item.id}')">Löschen</button>
                    </td>
                `;
        tbody.appendChild(tr);
      });
    });
}

// Ort löschen
function deletePlace(id) {
  fetch(pbURL + "/place/records/" + id, { method: "DELETE" }).then(() =>
    loadPlaces()
  );
}
window.deletePlace = deletePlace;

// Ort hinzufügen
function setupPlaceForm() {
  document.getElementById("place-form").onsubmit = function (e) {
    e.preventDefault();
    const form = e.target;
    fetch(pbURL + "/place/records", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ort: form.ort.value,
        kanton: form.kanton.value,
        zeitabhb: form.reisezeit.value,
        begruendung: form.begruendung.value,
      }),
    }).then(() => {
      window.location = "place-list.html";
    });
  };
}

// Daten laden
function loadDates() {
  fetch(pbURL + "/date/records")
    .then((res) => res.json())
    .then((data) => {
      const tbody = document.getElementById("date-table");
      tbody.innerHTML = "";
      data.items.forEach((item) => {
        const date = new Date(item.datum);
        const formattedDate = date.toLocaleDateString("de-DE", {
          weekday: "short",
          day: "2-digit",
          month: "long",
          year: "numeric",
        });
        const tr = document.createElement("tr");
        tr.innerHTML = `
                    <td>${formattedDate}</td>
                    <td>${item.ja_nein}</td>
                    <td>${item.uhrzeit}</td>
                    <td>${item.begruendung}</td>
                    <td>
                      <button onclick="editDateRow(this.parentNode.parentNode, ${JSON.stringify(
                        item
                      ).replace(/"/g, "&quot;")})">Bearbeiten</button>
                      <button onclick="deleteDate('${item.id}')">Löschen</button>
                    </td>
                `;
        tbody.appendChild(tr);
      });
    });
}

// Datum löschen
function deleteDate(id) {
  fetch(pbURL + "/date/records/" + id, { method: "DELETE" }).then(() =>
    loadDates()
  );
}
window.deleteDate = deleteDate;

// Datum hinzufügen
function setupDateForm() {
  document.getElementById("date-form").onsubmit = function (e) {
    e.preventDefault();
    const form = e.target;
    fetch(pbURL + "/date/records", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        datum: form.datum.value,
        ja_nein: form.ja_nein.value,
        uhrzeit: form.uhrzeit.value,
        begruendung: form.begruendung.value,
      }),
    }).then(() => {
      window.location = "date-list.html";
    });
  };
}

// Aktivitäten laden
function loadActivities() {
  fetch(pbURL + "/activity/records")
    .then((res) => res.json())
    .then((data) => {
      const tbody = document.getElementById("activity-table");
      tbody.innerHTML = "";
      data.items.forEach((item) => {
        const tr = document.createElement("tr");
        // Format the kosten value as "1'000.00 CHF"
        const formattedKosten =
          Number(item.kosten).toLocaleString("de-CH", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }) + " CHF";
        tr.innerHTML = `
                    <td>${item.aktivitaet}</td>
                    <td>${item.coolness}</td>
                    <td>${formattedKosten}</td>
                    <td>${item.zeitaufwand}</td>
                    <td>
                      <button onclick="editActivityRow(this.parentNode.parentNode, ${JSON.stringify(
                        item
                      ).replace(/"/g, "&quot;")})">Bearbeiten</button>
                      <button onclick="deleteActivity('${item.id}')">Löschen</button>
                    </td>
                `;
        tbody.appendChild(tr);
      });
    });
}

// Aktivität löschen
function deleteActivity(id) {
  fetch(pbURL + "/activity/records/" + id, { method: "DELETE" }).then(() =>
    loadActivities()
  );
}
window.deleteActivity = deleteActivity;

// Aktivität hinzufügen
function setupActivityForm() {
    document.getElementById("activity-form").onsubmit = function(e) {
        e.preventDefault();
        const form = e.target;
        fetch(pbURL + '/activity/records', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                aktivitaet: form.aktivitaet.value,
                coolness: form.coolness.value,
                kosten: form.kosten.value,
                zeitaufwand: form.zeitaufwand.value
            })
        }).then(() => {
            window.location = "activity-list.html";
        });
    };
}

// --- Orte bearbeiten ---
function editPlaceRow(tr, item) {
  tr.innerHTML = `
    <td><input value="${item.ort}" id="edit-ort"></td>
    <td><input value="${item.kanton}" id="edit-kanton"></td>
    <td><input value="${item.zeitabhb}" id="edit-zeitabhb" type="time"></td>
    <td><input value="${item.begruendung}" id="edit-begruendung"></td>
    <td>
      <button onclick="savePlace('${item.id}')">Speichern</button>
      <button onclick="loadPlaces()">Abbrechen</button>
    </td>
  `;
}
function savePlace(id) {
  fetch(pbURL + "/place/records/" + id, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ort: document.getElementById("edit-ort").value,
      kanton: document.getElementById("edit-kanton").value,
      zeitabhb: document.getElementById("edit-zeitabhb").value,
      begruendung: document.getElementById("edit-begruendung").value,
    }),
  }).then(() => loadPlaces());
}
window.savePlace = savePlace;

// --- Daten bearbeiten ---
function editDateRow(tr, item) {
  tr.innerHTML = `
    <td><input type="date" value="${item.datum.slice(0,10)}" id="edit-datum"></td>
    <td>
      <select id="edit-ja_nein">
        <option value="Ja" ${item.ja_nein === "Ja" ? "selected" : ""}>Ja</option>
        <option value="Nein" ${item.ja_nein === "Nein" ? "selected" : ""}>Nein</option>
      </select>
    </td>
    <td><input type="time" value="${item.uhrzeit}" id="edit-uhrzeit"></td>
    <td><input value="${item.begruendung}" id="edit-begruendung"></td>
    <td>
      <button onclick="saveDate('${item.id}')">Speichern</button>
      <button onclick="loadDates()">Abbrechen</button>
    </td>
  `;
}
function saveDate(id) {
  fetch(pbURL + "/date/records/" + id, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      datum: document.getElementById("edit-datum").value,
      ja_nein: document.getElementById("edit-ja_nein").value,
      uhrzeit: document.getElementById("edit-uhrzeit").value,
      begruendung: document.getElementById("edit-begruendung").value,
    }),
  }).then(() => loadDates());
}
window.saveDate = saveDate;

// --- Aktivitäten bearbeiten ---
function editActivityRow(tr, item) {
  tr.innerHTML = `
    <td><input value="${item.aktivitaet}" id="edit-aktivitaet"></td>
    <td><input type="number" min="1" max="10" value="${item.coolness}" id="edit-coolness"></td>
    <td><input type="number" value="${item.kosten}" id="edit-kosten"></td>
    <td><input value="${item.zeitaufwand}" id="edit-zeitaufwand"></td>
    <td>
      <button onclick="saveActivity('${item.id}')">Speichern</button>
      <button onclick="loadActivities()">Abbrechen</button>
    </td>
  `;
}
function saveActivity(id) {
  fetch(pbURL + "/activity/records/" + id, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      aktivitaet: document.getElementById("edit-aktivitaet").value,
      coolness: document.getElementById("edit-coolness").value,
      kosten: document.getElementById("edit-kosten").value,
      zeitaufwand: document.getElementById("edit-zeitaufwand").value,
    }),
  }).then(() => loadActivities());
}
window.saveActivity = saveActivity;
