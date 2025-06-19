const pbURL = 'https://pb18.toiwxr.easypanel.host/api/collections'; // Die Basis-URL zur Datenbank

// Holt alle Orte aus der Datenbank und zeigt sie in der Tabelle an
function loadPlaces() {
    fetch(pbURL + '/place/records') // Holt alle Orte von der API
        .then(res => res.json()) // Wandelt die Antwort in ein JS-Objekt um
        .then(data => { // Wenn die Daten da sind, mache weiter
            const tbody = document.getElementById("place-table"); // Holt das Tabellen-Element
            tbody.innerHTML = ""; // Macht die Tabelle leer
            data.items.forEach(item => { // Für jeden Ort in den Daten
                const tr = document.createElement("tr"); // Neue Tabellenzeile machen
                tr.innerHTML = `
                    <td>${item.ort}</td> // Ort einfügen
                    <td>${item.kanton}</td> // Kanton einfügen
                    <td>${item.reisezeit}</td> // Reisezeit einfügen
                    <td>${item.begruendung}</td> // Begründung einfügen
                    <td><button onclick="deletePlace('${item.id}')">Löschen</button></td> // Löschen-Button einfügen
                `;
                tbody.appendChild(tr); // Zeile zur Tabelle hinzufügen
            });
        });
}

// Löscht einen Ort aus der Datenbank
function deletePlace(id) {
    fetch(pbURL + '/place/records/' + id, { method: "DELETE" }) // Löscht den Ort mit der ID
        .then(() => loadPlaces()); // Lädt danach die Orte neu
}
window.deletePlace = deletePlace; // Macht die Funktion im HTML verfügbar

// Sorgt dafür, dass beim Abschicken des Formulars ein neuer Ort gespeichert wird
function setupPlaceForm() {
    document.getElementById("place-form").onsubmit = function(e) { // Wenn das Formular abgeschickt wird
        e.preventDefault(); // Verhindert das Neuladen der Seite
        const form = e.target; // Holt das Formular
        fetch(pbURL + '/place/records', { // Schickt die Daten an die API
            method: "POST", // Sagt, dass etwas hinzugefügt wird
            headers: { "Content-Type": "application/json" }, // Sagt, dass es JSON ist
            body: JSON.stringify({ // Macht aus den Formulardaten ein JSON-Objekt
                ort: form.ort.value, // Wert vom Feld "ort"
                kanton: form.kanton.value, // Wert vom Feld "kanton"
                reisezeit: form.reisezeit.value, // Wert vom Feld "reisezeit"
                begruendung: form.begruendung.value // Wert vom Feld "begruendung"
            })
        }).then(() => {
            window.location = "place-list.html"; // Geht nach dem Speichern zurück zur Liste
        });
    };
}

// Holt alle Daten (Termine) aus der Datenbank und zeigt sie in der Tabelle an
function loadDates() {
    fetch(pbURL + '/date/records') // Holt alle Termine von der API
        .then(res => res.json()) // Antwort in JS-Objekt umwandeln
        .then(data => { // Wenn die Daten da sind, mache weiter
            const tbody = document.getElementById("date-table"); // Holt das Tabellen-Element
            tbody.innerHTML = ""; // Macht die Tabelle leer
            data.items.forEach(item => { // Für jeden Termin in den Daten
                const tr = document.createElement("tr"); // Neue Tabellenzeile machen
                tr.innerHTML = `
                    <td>${item.datum}</td> // Datum einfügen
                    <td>${item.ja_nein}</td> // Ja/Nein einfügen
                    <td>${item.uhrzeit}</td> // Uhrzeit einfügen
                    <td>${item.begruendung}</td> // Begründung einfügen
                    <td><button onclick="deleteDate('${item.id}')">Löschen</button></td> // Löschen-Button einfügen
                `;
                tbody.appendChild(tr); // Zeile zur Tabelle hinzufügen
            });
        });
}

// Löscht einen Termin aus der Datenbank
function deleteDate(id) {
    fetch(pbURL + '/date/records/' + id, { method: "DELETE" }) // Löscht den Termin mit der ID
        .then(() => loadDates()); // Lädt danach die Termine neu
}
window.deleteDate = deleteDate; // Macht die Funktion im HTML verfügbar

// Sorgt dafür, dass beim Abschicken des Formulars ein neuer Termin gespeichert wird
function setupDateForm() {
    document.getElementById("date-form").onsubmit = function(e) { // Wenn das Formular abgeschickt wird
        e.preventDefault(); // Verhindert das Neuladen der Seite
        const form = e.target; // Holt das Formular
        fetch(pbURL + '/date/records', { // Schickt die Daten an die API
            method: "POST", // Sagt, dass etwas hinzugefügt wird
            headers: { "Content-Type": "application/json" }, // Sagt, dass es JSON ist
            body: JSON.stringify({ // Macht aus den Formulardaten ein JSON-Objekt
                datum: form.datum.value, // Wert vom Feld "datum"
                ja_nein: form.ja_nein.value, // Wert vom Feld "ja_nein"
                uhrzeit: form.uhrzeit.value, // Wert vom Feld "uhrzeit"
                begruendung: form.begruendung.value // Wert vom Feld "begruendung"
            })
        }).then(() => {
            window.location = "date-list.html"; // Geht nach dem Speichern zurück zur Liste
        });
    };
}

// Holt alle Aktivitäten aus der Datenbank und zeigt sie in der Tabelle an
function loadActivities() {
    fetch(pbURL + '/activity/records') // Holt alle Aktivitäten von der API
        .then(res => res.json()) // Antwort in JS-Objekt umwandeln
        .then(data => { // Wenn die Daten da sind, mache weiter
            const tbody = document.getElementById("activity-table"); // Holt das Tabellen-Element
            tbody.innerHTML = ""; // Macht die Tabelle leer
            data.items.forEach(item => { // Für jede Aktivität in den Daten
                const tr = document.createElement("tr"); // Neue Tabellenzeile machen
                tr.innerHTML = `
                    <td>${item.aktivitaet}</td> // Aktivität einfügen
                    <td>${item.coolness}</td> // Coolness einfügen
                    <td>${item.kosten}</td> // Kosten einfügen
                    <td>${item.zeitaufwand}</td> // Zeitaufwand einfügen
                    <td><button onclick="deleteActivity('${item.id}')">Löschen</button></td> // Löschen-Button einfügen
                `;
                tbody.appendChild(tr); // Zeile zur Tabelle hinzufügen
            });
        });
}

// Löscht eine Aktivität aus der Datenbank
function deleteActivity(id) {
    fetch(pbURL + '/activity/records/' + id, { method: "DELETE" }) // Löscht die Aktivität mit der ID
        .then(() => loadActivities()); // Lädt danach die Aktivitäten neu
}
window.deleteActivity = deleteActivity; // Macht die Funktion im HTML verfügbar

// Sorgt dafür, dass beim Abschicken des Formulars eine neue Aktivität gespeichert wird
function setupActivityForm() {
    document.getElementById("activity-form").onsubmit = function(e) { // Wenn das Formular abgeschickt wird
        e.preventDefault(); // Verhindert das Neuladen der Seite
        const form = e.target; // Holt das Formular
        fetch(pbURL + '/activity/records', { // Schickt die Daten an die API
            method: "POST", // Sagt, dass etwas hinzugefügt wird
            headers: { "Content-Type": "application/json" }, // Sagt, dass es JSON ist
            body: JSON.stringify({ // Macht aus den Formulardaten ein JSON-Objekt
                aktivitaet: form.aktivitaet.value, // Wert vom Feld "aktivitaet"
                coolness: form.coolness.value, // Wert vom Feld "coolness"
                kosten: form.kosten.value, // Wert vom Feld "kosten"
                zeitaufwand: form.zeitaufwand.value // Wert vom Feld "zeitaufwand"
            })
        }).then(() => {
            window.location = "activity-list.html"; // Geht nach dem Speichern zurück zur Liste
        });
    };
}
