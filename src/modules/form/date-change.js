import { schedulesDay } from "../schedules/load";

//seleciona o elemento de data
const selectedDate = document.getElementById("date");
//atualiza os horários ao mudar a data
selectedDate.onchange = () => schedulesDay();
