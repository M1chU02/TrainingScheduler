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

const getCurrentWeek = () => {
  const now = new Date();
  const firstDayOfWeek = now.getDate() - now.getDay();
  const lastDayOfWeek = firstDayOfWeek + 6;

  const startOfWeek = new Date(now.setDate(firstDayOfWeek));
  const endOfWeek = new Date(now.setDate(lastDayOfWeek));

  return { startOfWeek, endOfWeek };
};

const updateDashboard = () => {
  const sessions = getSessionsFromLocalStorage();
  const { startOfWeek, endOfWeek } = getCurrentWeek();

  const currentWeekSessions = sessions.filter((session) => {
    const sessionDate = new Date(session.date);
    return sessionDate >= startOfWeek && sessionDate <= endOfWeek;
  });

  let summaryHTML = "";
  currentWeekSessions.forEach((session) => {
    summaryHTML += `
      <div class="summary-item">
        <h3>${session.activityType}</h3>
        <p>Distance: ${session.distance} km</p>
        <p>Duration: ${session.duration} minutes</p>
        <p>Intensity: ${session.intensity}</p>
        <p>Notes: ${session.notes}</p>
        <p>Date: ${new Date(session.date).toLocaleDateString()}</p>
      </div>
    `;
  });

  document.getElementById("summary-stats").innerHTML = summaryHTML;
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
    updateWeeklyView();
    updateProgressTracking();
  } else {
    alert("Please enter valid distance and duration.");
  }
});

const updateWeeklyView = () => {
  const sessions = getSessionsFromLocalStorage();
  const { startOfWeek, endOfWeek } = getCurrentWeek();

  const currentWeekSessions = sessions.filter((session) => {
    const sessionDate = new Date(session.date);
    return sessionDate >= startOfWeek && sessionDate <= endOfWeek;
  });

  let weeklyCalendarHTML = "";
  currentWeekSessions.forEach((session) => {
    weeklyCalendarHTML += `
      <div class="calendar-item">
        <h3>${session.activityType}</h3>
        <p>Distance: ${session.distance} km</p>
        <p>Duration: ${session.duration} minutes</p>
        <p>Intensity: ${session.intensity}</p>
        <p>Notes: ${session.notes}</p>
        <p>Date: ${new Date(session.date).toLocaleDateString()}</p>
      </div>
    `;
  });

  document.getElementById("weekly-calendar").innerHTML = weeklyCalendarHTML;
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
