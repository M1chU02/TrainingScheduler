const saveSessionToLocalStorage = (session) => {
  let sessions = JSON.parse(localStorage.getItem("sessions")) || [];
  sessions.push(session);
  localStorage.setItem("sessions", JSON.stringify(sessions));
};

const getSessionsFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("sessions")) || [];
};

const updateSessionInLocalStorage = (index, updatedSession) => {
  let sessions = JSON.parse(localStorage.getItem("sessions")) || [];
  sessions[index] = updatedSession;
  localStorage.setItem("sessions", JSON.stringify(sessions));
};

const deleteSessionFromLocalStorage = (index) => {
  let sessions = JSON.parse(localStorage.getItem("sessions")) || [];
  sessions.splice(index, 1);
  localStorage.setItem("sessions", JSON.stringify(sessions));
};

const updateDashboard = () => {
  const sessions = getSessionsFromLocalStorage();
  // Calculate summary statistics for the current week
  // Update the DOM elements with the calculated statistics
};

document.addEventListener("DOMContentLoaded", updateDashboard);

document.getElementById("add-session").addEventListener("click", () => {
  const activityType = document.getElementById("activity-type").value;
  const distance = parseFloat(document.getElementById("distance").value);
  const duration = parseFloat(document.getElementById("duration").value);
  const intensity = document.getElementById("intensity").value;
  const notes = document.getElementById("notes").value;

  if (!isNaN(distance) && !isNaN(duration)) {
    const session = {
      activityType,
      distance,
      duration,
      intensity,
      notes,
      date: new Date(),
    };
    saveSessionToLocalStorage(session);
    updateDashboard();
    // Update the UI accordingly
  } else {
    alert("Please enter valid distance and duration.");
  }
});

// Use FullCalendar.js or similar library to implement calendar view
// Add functionality to add planned activities

const updateWeeklyView = () => {
  const sessions = getSessionsFromLocalStorage();
  // Calculate weekly totals for each activity type
  // Populate the weekly calendar view with planned and completed sessions
};

document.addEventListener("DOMContentLoaded", updateWeeklyView);

const updateProgressTracking = () => {
  const sessions = getSessionsFromLocalStorage();
  // Use Chart.js or D3.js to create charts/graphs
};

document.addEventListener("DOMContentLoaded", updateProgressTracking);

const exportData = () => {
  const sessions = getSessionsFromLocalStorage();
  const dataStr = JSON.stringify(sessions);
  const dataUri =
    "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

  const exportFileDefaultName = "workout-data.json";

  const linkElement = document.createElement("a");
  linkElement.setAttribute("href", dataUri);
  linkElement.setAttribute("download", exportFileDefaultName);
  linkElement.click();
};

document.getElementById("export-data").addEventListener("click", exportData);

const importData = (file) => {
  const reader = new FileReader();
  reader.onload = (event) => {
    const sessions = JSON.parse(event.target.result);
    localStorage.setItem("sessions", JSON.stringify(sessions));
    updateDashboard();
    updateWeeklyView();
    updateProgressTracking();
  };
  reader.readAsText(file);
};

document.getElementById("import-data").addEventListener("change", (event) => {
  importData(event.target.files[0]);
});
