const BASE_URL = "http://127.0.0.1:8090/api/collections"; // Passe ggf. an

// Orte
async function loadPlaces() {
    const res = await fetch(`${BASE_URL}/Ort/records`);
    const data = await res.json();
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
}
async function deletePlace(id) {
    await fetch(`${BASE_URL}/Ort/records/${id}`, { method: "DELETE" });
    loadPlaces();
}
function setupPlaceForm() {
    document.getElementById("place-form").onsubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        await fetch(`${BASE_URL}/Ort/records`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ort: form.ort.value,
                kanton: form.kanton.value,
                reisezeit: form.reisezeit.value,
                begruendung: form.begruendung.value
            })
        });
        window.location = "place-list.html";
    };
}

// Daten
async function loadDates() {
    const res = await fetch(`${BASE_URL}/Datum/records`);
    const data = await res.json();
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
async function deleteDate(id) {
    await fetch(`${BASE_URL}/Datum/records/${id}`, { method: "DELETE" });
    loadDates();
}
function setupDateForm() {
    document.getElementById("date-form").onsubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        await fetch(`${BASE_URL}/Datum/records`, {
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
async function loadActivities() {
    const res = await fetch(`${BASE_URL}/Aktivitaet/records`);
    const data = await res.json();
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
async function deleteActivity(id) {
    await fetch(`${BASE_URL}/Aktivitaet/records/${id}`, { method: "DELETE" });
    loadActivities();
}
function setupActivityForm() {
    document.getElementById("activity-form").onsubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        await fetch(`${BASE_URL}/Aktivitaet/records`, {
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