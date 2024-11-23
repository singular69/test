document.addEventListener("DOMContentLoaded", () => {
  const screens = document.querySelectorAll(".screen");
  const playerNameInput = document.getElementById("player-name");
  let selectedGender = null;

  function showScreen(screenId) {
    screens.forEach((screen) => screen.classList.remove("active"));
    document.getElementById(screenId).classList.add("active");
  }

  document.getElementById("start-game").addEventListener("click", () => {
    const playerName = playerNameInput.value.trim();
    if (playerName) {
      alert(`ยินดีต้อนรับ, ${playerName}!`);
      showScreen("description-screen");
    } else {
      alert("กรุณาใส่ชื่อของคุณ!");
    }
  });

  document.getElementById("proceed").addEventListener("click", () => {
    showScreen("character-screen");
  });

  document.querySelectorAll(".character").forEach((button) => {
    button.addEventListener("click", (e) => {
      selectedGender = e.target.dataset.gender;
      alert(`คุณเลือกตัวละคร: ${selectedGender === "male" ? "ผู้ชาย" : "ผู้หญิง"}`);
      showScreen("map-screen");
    });
  });

  document.getElementById("next-scenario").addEventListener("click", () => {
    showScreen("scenario-screen");
  });

  document.getElementById("investigate").addEventListener("click", () => {
    alert("เริ่มสืบสวนเหตุการณ์...");
    // เพิ่มฟีเจอร์การสืบสวนเพิ่มเติมที่นี่
  });
});
