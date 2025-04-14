import dayjs from "dayjs";

const periodMorning = document.getElementById("period-morning");
const periodAfternoon = document.getElementById("period-afternoon");
const periodNight = document.getElementById("period-night");

export function scheduleShow({ dailySchedules }) {
  try {
    // Clear the schedule display
    periodMorning.innerHTML = "";
    periodAfternoon.innerHTML = "";
    periodNight.innerHTML = "";

    // Iterate through the daily schedules and display them in the appropriate period
    dailySchedules.forEach((schedule) => {
      const item = document.createElement("li");
      const time = document.createElement("strong");
      const name = document.createElement("span");

      //add id to the schedule
      item.setAttribute("data-id", schedule.id);
      time.textContent = dayjs(schedule.when).format("HH:mm");
      name.textContent = schedule.name;

      //icone de cancelamento
      const cancelIcon = document.createElement("img");
      cancelIcon.classList.add("cancel-icon");
      cancelIcon.setAttribute("src", "./src/assets/cancel.png");
      cancelIcon.setAttribute("alt", "cancelar agendamento");

      //add tempo e nome ao item
      item.append(time, name, cancelIcon);

      //obter hora
      const hour = dayjs(schedule.when).hour();

      //rederizar o item na lista de acordo com o horário
      if (hour <= 12) {
        periodMorning.appendChild(item);
      } else if (hour >= 12 && hour <= 18) {
        periodAfternoon.appendChild(item);
      } else {
        periodNight.appendChild(item);
      }
    });
  } catch (error) {
    alert("Não foi possível carregar os horários.");
    console.log(error);
  }
}
