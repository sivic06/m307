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
                    <td>${item.reisezeit}</td>
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
                reisezeit: form.reisezeit.value,
                begruendung: form.begruendung.value
            })
        }).then(() => {
            window.location = "place-list.html";
        });
    };
}

// Daten
 function loadDates() {
    const res =  fetch(`${pbURL}/date/records`);
    const data =  res.json();
    const tbody = document.getElementById("date-table");
    tbody.innerHTML = "";
    data.items.forEach(item => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${item.datum}</td>
            <td>${item.ja_nein}</td>
            <td>${item.uhrzeit}</td>
            <td>${item.begruendung}</td>
            <td><button onclick="deleteDate('${item.id}')">Löschen</button></td>
        `;
        tbody.appendChild(tr);
    });
}
 function deleteDate(id) {
     fetch(`${pbURL}/date/records/${id}`, { method: "DELETE" });
    loadDates();
}
function setupDateForm() {
    document.getElementById("date-form").onsubmit =  (e) => {
        e.preventDefault();
        const form = e.target;
         fetch(`${pbURL}/date/records`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                datum: form.datum.value,
                ja_nein: form.ja_nein.value,
                uhrzeit: form.uhrzeit.value,
                begruendung: form.begruendung.value
            })
        });
        window.location = "date-list.html";
    };
}

// Aktivitäten
 function loadActivities() {
    const res =  fetch(`${pbURL}/activity/records`);
    const data =  res.json();
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
}
 function deleteActivity(id) {
     fetch(`${pbURL}/activity/records/${id}`, { method: "DELETE" });
    loadActivities();
}
function setupActivityForm() {
    document.getElementById("activity-form").onsubmit =  (e) => {
        e.preventDefault();
        const form = e.target;
         fetch(`${pbURL}/activity/records`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                aktivitaet: form.aktivitaet.value,
                coolness: form.coolness.value,
                kosten: form.kosten.value,
                zeitaufwand: form.zeitaufwand.value
            })
        });
        window.location = "activity-list.html";
    };
}