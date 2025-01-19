// script.js
// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBmoopa0yCKQBK1qTowgFICn3dthegQzU8",
    authDomain: "iot-based-smart-cradle-dd40a.firebaseapp.com",
    databaseURL: "https://iot-based-smart-cradle-dd40a-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "iot-based-smart-cradle-dd40a",
    storageBucket: "iot-based-smart-cradle-dd40a.firebasestorage.app",
    messagingSenderId: "132652468205",
    appId: "1:132652468205:web:7c7647b684df301277c9e4",
    measurementId: "G-5PDE4WFPVH"
  };
  
  // Initialize Firebase
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
  import { getDatabase, ref, onValue, set } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-database.js";
  
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);
  
  // DOM Elements
  const temperatureEl = document.getElementById("temperature");
  const motionEl = document.getElementById("motion");
  const soundEl = document.getElementById("sound");
  const manualControlBtn = document.getElementById("manualControl");
  
  let manualControl = false;
  
  // Listen to real-time updates
  onValue(ref(database, "cradle/temperature"), (snapshot) => {
    const temperature = snapshot.val();
    temperatureEl.textContent = `${temperature} °C`;
  });
  
  onValue(ref(database, "cradle/motion"), (snapshot) => {
    const motionDetected = snapshot.val();
    motionEl.textContent = motionDetected ? "Yes" : "No";
  });
  
  onValue(ref(database, "cradle/sound"), (snapshot) => {
    const soundDetected = snapshot.val();
    soundEl.textContent = soundDetected ? "Yes" : "No";
  });
  
  // Toggle manual control
  function toggleManualControl() {
    manualControl = !manualControl;
    set(ref(database, "cradle/manualControl"), manualControl);
    manualControlBtn.textContent = manualControl ? "Stop Rocking" : "Start Rocking";
  }
  
