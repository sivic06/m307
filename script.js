const pbURL = 'https://pb18.toiwxr.easypanel.host/api/collections';

// Orte laden
function loadPlaces() {
    fetch(pbURL + '/place/records')
        .then(res => res.json())
        .then(data => {
            const tbody = document.getElementById("place-table");
            tbody.innerHTML = "";
            data.items.forEach(item => {
                const tr = document.createElement("tr");
                tr.innerHTML = `
                    <td>${item.ort}</td>
                    <td>${item.kanton}</td>
                    <td>${item.zeitabhb}</td>
                    <td>${item.begruendung}</td>
                    <td><button onclick="deletePlace('${item.id}')">Löschen</button></td>
                `;
                tbody.appendChild(tr);
            });
        });
}

// Ort löschen
function deletePlace(id) {
    fetch(pbURL + '/place/records/' + id, { method: "DELETE" })
        .then(() => loadPlaces());
}
window.deletePlace = deletePlace;

// Ort hinzufügen
function setupPlaceForm() {
    document.getElementById("place-form").onsubmit = function(e) {
        e.preventDefault();
        const form = e.target;
        fetch(pbURL + '/place/records', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ort: form.ort.value,
                kanton: form.kanton.value,
                zeitabhb: form.reisezeit.value,
                begruendung: form.begruendung.value
            })
        }).then(() => {
           window.location = "place-list.html";
        });
    };
}

// Daten laden
function loadDates() {
    fetch(pbURL + '/date/records')
        .then(res => res.json())
        .then(data => {
            const tbody = document.getElementById("date-table");
            tbody.innerHTML = "";
            data.items.forEach(item => {
                const date = new Date(item.datum);
                const formattedDate = date.toLocaleDateString("de-DE", {
                    weekday: 'short',
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric'
                });
                const tr = document.createElement("tr");
                tr.innerHTML = `
                    <td>${formattedDate}</td>
                    <td>${item.ja_nein}</td>
                    <td>${item.uhrzeit}</td>
                    <td>${item.begruendung}</td>
                    <td><button onclick="deleteDate('${item.id}')">Löschen</button></td>
                `;
                tbody.appendChild(tr);
            });
        });
}

// Datum löschen
function deleteDate(id) {
    fetch(pbURL + '/date/records/' + id, { method: "DELETE" })
        .then(() => loadDates());
}
window.deleteDate = deleteDate;

// Datum hinzufügen
function setupDateForm() {
    document.getElementById("date-form").onsubmit = function(e) {
        e.preventDefault();
        const form = e.target;
        fetch(pbURL + '/date/records', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                datum: form.datum.value,
                ja_nein: form.ja_nein.value,
                uhrzeit: form.uhrzeit.value,
                begruendung: form.begruendung.value
            })
        }).then(() => {
            window.location = "date-list.html";
        });
    };
}

// Aktivitäten laden
function loadActivities() {
    fetch(pbURL + '/activity/records')
        .then(res => res.json())
        .then(data => {
            const tbody = document.getElementById("activity-table");
            tbody.innerHTML = "";
            data.items.forEach(item => {
                const tr = document.createElement("tr");
                tr.innerHTML = `
                    <td>${item.aktivitaet}</td>
                    <td>${item.coolness}</td>
                    <td>${item.kosten}</td>
                    <td>${item.zeitaufwand}</td>
                    <td><button onclick="deleteActivity('${item.id}')">Löschen</button></td>
                `;
                tbody.appendChild(tr);
            });
        });
}

// Aktivität löschen
function deleteActivity(id) {
    fetch(pbURL + '/activity/records/' + id, { method: "DELETE" })
        .then(() => loadActivities());
}
window.deleteActivity = deleteActivity;

// Aktivität hinzufügen
function setupActivityForm() {
    document.getElementById("activity-form").onsubmit = function(e) {
        e.preventDefault();
        const form = e.target;


        if (form.aktivitaet.value.trim().toLowerCase() === "illegale sachen machen,") {
            alert("Diese Aktivität ist nicht erlaubt.");
            return;
        }


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

