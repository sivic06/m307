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

// Daten laden (Termine)
function loadDates() {
  fetch(pbURL + "/date/records") // Holt alle Termine von der API
    .then((res) => res.json()) // Wandelt die Antwort in JSON um
    .then((data) => {
      const tbody = document.getElementById("date-table"); // Holt das Tabellen-Body-Element
      tbody.innerHTML = ""; // Leert die Tabelle
      data.items.forEach((item) => { // Für jeden Termin...
        const date = new Date(item.datum); // Erstellt ein Date-Objekt aus dem Datum
        const formattedDate = date.toLocaleDateString("de-DE", {
          weekday: "short", // Wochentag abgekürzt
          day: "2-digit",   // Tag zweistellig
          month: "long",    // Monat ausgeschrieben
          year: "numeric",  // Jahr vierstellig
        });
        const tr = document.createElement("tr"); // Neue Tabellenzeile erstellen
        tr.innerHTML = `
                    <td>${formattedDate}</td> <!-- Datum anzeigen -->
                    <td>${item.ja_nein}</td> <!-- Ja/Nein anzeigen -->
                    <td>${item.uhrzeit}</td> <!-- Uhrzeit anzeigen -->
                    <td>${item.begruendung}</td> <!-- Begründung anzeigen -->
                    <td>
                      <button onclick="editDateRow(this.parentNode.parentNode, ${JSON.stringify(
                        item
                      ).replace(/"/g, "&quot;")})">Bearbeiten</button> <!-- Bearbeiten-Button -->
                      <button onclick="deleteDate('${item.id}')">Löschen</button> <!-- Löschen-Button -->
                    </td>
                `;
        tbody.appendChild(tr); // Zeile zur Tabelle hinzufügen
      });
    });
}

// Datum löschen
function deleteDate(id) {
  fetch(pbURL + "/date/records/" + id, { method: "DELETE" }) // Löscht einen Termin per API
    .then(() => loadDates()); // Lädt die Termine neu
}
window.deleteDate = deleteDate; // Macht die Funktion global verfügbar

// Datum hinzufügen
function setupDateForm() {
  document.getElementById("date-form").onsubmit = function (e) { // Beim Absenden des Formulars...
    e.preventDefault(); // Verhindert das Standard-Absendeverhalten
    const form = e.target; // Holt das Formular-Element
    fetch(pbURL + "/date/records", { // Sendet die Daten an die API
      method: "POST", // HTTP-Methode POST
      headers: { "Content-Type": "application/json" }, // Setzt den Content-Type auf JSON
      body: JSON.stringify({
        datum: form.datum.value, // Wert aus dem Feld "datum"
        ja_nein: form.ja_nein.value, // Wert aus dem Feld "ja_nein"
        uhrzeit: form.uhrzeit.value, // Wert aus dem Feld "uhrzeit"
        begruendung: form.begruendung.value, // Wert aus dem Feld "begruendung"
      }),
    }).then(() => {
      window.location = "date-list.html"; // Nach dem Speichern zurück zur Liste
    });
  };
}

// Aktivitäten laden
function loadActivities() {
  fetch(pbURL + "/activity/records") // Holt alle Aktivitäten von der API
    .then((res) => res.json()) // Wandelt die Antwort in JSON um
    .then((data) => {
      const tbody = document.getElementById("activity-table"); // Holt das Tabellen-Body-Element
      tbody.innerHTML = ""; // Leert die Tabelle
      data.items.forEach((item) => { // Für jede Aktivität...
        const tr = document.createElement("tr"); // Neue Tabellenzeile erstellen
        // Kosten formatieren (z.B. 1'000.00 CHF)
        const formattedKosten =
          Number(item.kosten).toLocaleString("de-CH", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }) + " CHF";
        tr.innerHTML = `
                    <td>${item.aktivitaet}</td> <!-- Aktivität anzeigen -->
                    <td>${item.coolness}</td> <!-- Coolness anzeigen -->
                    <td>${formattedKosten}</td> <!-- Kosten anzeigen -->
                    <td>${item.zeitaufwand}</td> <!-- Zeitaufwand anzeigen -->
                    <td>
                      <button onclick="editActivityRow(this.parentNode.parentNode, ${JSON.stringify(
                        item
                      ).replace(/"/g, "&quot;")})">Bearbeiten</button> <!-- Bearbeiten-Button -->
                      <button onclick="deleteActivity('${item.id}')">Löschen</button> <!-- Löschen-Button -->
                    </td>
                `;
        tbody.appendChild(tr); // Zeile zur Tabelle hinzufügen
      });
    });
}

// Aktivität löschen
function deleteActivity(id) {
  fetch(pbURL + "/activity/records/" + id, { method: "DELETE" }) // Löscht eine Aktivität per API
    .then(() => loadActivities()); // Lädt die Aktivitäten neu
}
window.deleteActivity = deleteActivity; // Macht die Funktion global verfügbar

// Aktivität hinzufügen
function setupActivityForm() {
    document.getElementById("activity-form").onsubmit = function(e) { // Beim Absenden des Formulars...
        e.preventDefault(); // Verhindert das Standard-Absendeverhalten
        const form = e.target; // Holt das Formular-Element
        fetch(pbURL + '/activity/records', { // Sendet die Daten an die API
            method: "POST", // HTTP-Methode POST
            headers: { "Content-Type": "application/json" }, // Setzt den Content-Type auf JSON
            body: JSON.stringify({
                aktivitaet: form.aktivitaet.value, // Wert aus dem Feld "aktivitaet"
                coolness: form.coolness.value, // Wert aus dem Feld "coolness"
                kosten: form.kosten.value, // Wert aus dem Feld "kosten"
                zeitaufwand: form.zeitaufwand.value // Wert aus dem Feld "zeitaufwand"
            })
        }).then(() => {
            window.location = "activity-list.html"; // Nach dem Speichern zurück zur Liste
        });
    };
}

// --- Orte bearbeiten ---
function editPlaceRow(tr, item) {
tr.innerHTML = `
    <td><input class="edit_sponti" value="${item.ort}" id="edit-ort"></td> <!-- Eingabefeld für Ort -->
    <td><input class="edit_sponti" value="${item.kanton}" id="edit-kanton"></td> <!-- Eingabefeld für Kanton -->
    <td><input class="edit_sponti" value="${item.zeitabhb}" id="edit-zeitabhb" type="time"></td> <!-- Eingabefeld für Reisezeit -->
    <td><input class="edit_sponti" value="${item.begruendung}" id="edit-begruendung"></td> <!-- Eingabefeld für Begründung -->
    <td>
        <button onclick="savePlace('${item.id}')">Speichern</button> <!-- Speichern-Button -->
        <button onclick="loadPlaces()">Abbrechen</button> <!-- Abbrechen-Button -->
    </td>
`;
}
function savePlace(id) {
  fetch(pbURL + "/place/records/" + id, { // Sendet die Änderungen an die API
    method: "PATCH", // HTTP-Methode PATCH
    headers: { "Content-Type": "application/json" }, // Setzt den Content-Type auf JSON
    body: JSON.stringify({
      ort: document.getElementById("edit-ort").value, // Holt Wert aus Eingabefeld
      kanton: document.getElementById("edit-kanton").value,
      zeitabhb: document.getElementById("edit-zeitabhb").value,
      begruendung: document.getElementById("edit-begruendung").value,
    }),
  }).then(() => loadPlaces()); // Nach dem Speichern neu laden
}
window.savePlace = savePlace; // Macht die Funktion global verfügbar

// --- Daten bearbeiten ---
function editDateRow(tr, item) {
  tr.innerHTML = `
    <td><input class="edit_sponti" type="date" value="${item.datum.slice(0,10)}" id="edit-datum"></td> <!-- Eingabefeld für Datum -->
    <td>
      <select class="edit_sponti" id="edit-ja_nein"> <!-- Auswahlfeld für Ja/Nein -->
        <option value="Ja" ${item.ja_nein === "Ja" ? "selected" : ""}>Ja</option>
        <option value="Nein" ${item.ja_nein === "Nein" ? "selected" : ""}>Nein</option>
      </select>
    </td>
    <td><input class="edit_sponti" type="time" value="${item.uhrzeit}" id="edit-uhrzeit"></td> <!-- Eingabefeld für Uhrzeit -->
    <td><input class="edit_sponti" value="${item.begruendung}" id="edit-begruendung"></td> <!-- Eingabefeld für Begründung -->
    <td>
      <button onclick="saveDate('${item.id}')">Speichern</button> <!-- Speichern-Button -->
      <button onclick="loadDates()">Abbrechen</button> <!-- Abbrechen-Button -->
    </td>
  `;
}
function saveDate(id) {
  fetch(pbURL + "/date/records/" + id, { // Sendet die Änderungen an die API
    method: "PATCH", // HTTP-Methode PATCH
    headers: { "Content-Type": "application/json" }, // Setzt den Content-Type auf JSON
    body: JSON.stringify({
      datum: document.getElementById("edit-datum").value, // Holt Wert aus Eingabefeld
      ja_nein: document.getElementById("edit-ja_nein").value,
      uhrzeit: document.getElementById("edit-uhrzeit").value,
      begruendung: document.getElementById("edit-begruendung").value,
    }),
  }).then(() => loadDates()); // Nach dem Speichern neu laden
}
window.saveDate = saveDate; // Macht die Funktion global verfügbar

// --- Aktivitäten bearbeiten ---
function editActivityRow(tr, item) {
  tr.innerHTML = `
    <td><input class="edit_sponti" value="${item.aktivitaet}" id="edit-aktivitaet"></td> <!-- Eingabefeld für Aktivität -->
    <td><input class="edit_sponti" type="number" min="1" max="10" value="${item.coolness}" id="edit-coolness"></td> <!-- Eingabefeld für Coolness -->
    <td><input class="edit_sponti" type="number" value="${item.kosten}" id="edit-kosten"></td> <!-- Eingabefeld für Kosten -->
    <td><input class="edit_sponti" value="${item.zeitaufwand}" id="edit-zeitaufwand"></td> <!-- Eingabefeld für Zeitaufwand -->
    <td>
      <button onclick="saveActivity('${item.id}')">Speichern</button> <!-- Speichern-Button -->
      <button onclick="loadActivities()">Abbrechen</button> <!-- Abbrechen-Button -->
    </td>
  `;
}
function saveActivity(id) {
  fetch(pbURL + "/activity/records/" + id, { // Sendet die Änderungen an die API
    method: "PATCH", // HTTP-Methode PATCH
    headers: { "Content-Type": "application/json" }, // Setzt den Content-Type auf JSON
    body: JSON.stringify({
      aktivitaet: document.getElementById("edit-aktivitaet").value, // Holt Wert aus Eingabefeld
      coolness: document.getElementById("edit-coolness").value,
      kosten: document.getElementById("edit-kosten").value,
      zeitaufwand: document.getElementById("edit-zeitaufwand").value,
    }),
  }).then(() => loadActivities()); // Nach dem Speichern neu laden
}
window.saveActivity = saveActivity; // Macht die Funktion global verfügbar
