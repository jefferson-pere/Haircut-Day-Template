import dayjs from "dayjs";
import { openingHours } from "../../utils/opening-hours.js";
import { hoursClick } from "./hours-click.js";
const hours = document.getElementById("hours");

export function hoursLoad({ date, dailySchedules }) {
  //limpa a lista de horários
  hours.innerHTML = "";

  //Obtem o horário agendado
  const unavaiableHours = dailySchedules.map((schedule) =>
    dayjs(schedule.when).format("HH:mm")
  );

  const opening = openingHours.map((hour) => {
    //verifica se o horário já foi agendado
    const [schedulesHour] = hour.split(":");
    // adicona o horário agendado e verifica se está no passdo
    const isHourPast = dayjs(date).add(schedulesHour, "hour").isBefore(dayjs());

    //verifica se o horário já foi agendado
    const available = !unavaiableHours.includes(hour) && !isHourPast;

    return {
      hour,
      available,
    };
  });
  // rederiza o horário na lista
  opening.forEach(({ hour, available }) => {
    const li = document.createElement("li");
    li.classList.add("hour");
    li.classList.add(available ? "hour-available" : "hour-unavailable");

    li.textContent = hour;
    if (hour === "09:00") {
      hourHeaderAdd("Manhã");
    } else if (hour === "13:00") {
      hourHeaderAdd("Tarde");
    } else if (hour === "18:00") {
      hourHeaderAdd("Noite");
    }

    hours.append(li);
  });

  // Adicona o cliqie no horário
  hoursClick();
}

function hourHeaderAdd(title) {
  const header = document.createElement("li");
  header.classList.add("hour-period");
  header.textContent = title;
  hours.append(header);
}
