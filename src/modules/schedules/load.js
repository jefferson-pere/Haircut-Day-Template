import { hoursLoad } from "../form/hours-load.js";
import { scheduleFetchByDay } from "../../services/schedule-fetch-by-day.js";
import { scheduleShow } from "../schedules/show.js";

// Seleciona o elemento de data
const selectedDate = document.getElementById("date");

export async function schedulesDay() {
  // Atualiza os horários ao mudar a data
  const date = selectedDate.value;
  // Busca os horários agendados para a data selecionada
  const dailySchedules = await scheduleFetchByDay({ date });

  // Exibe os horários agendados
  scheduleShow({ dailySchedules });

  // Carrega os horários disponíveis
  hoursLoad({ date, dailySchedules });
}
