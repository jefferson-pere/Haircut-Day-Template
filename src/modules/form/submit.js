import dayjs from "dayjs";
import { scheduleNew } from "../../services/schedule-new.js";
import { schedulesDay } from "../schedules/load.js";

const form = document.querySelector("form");

const clientName = document.getElementById("client");

const selectedDate = document.getElementById("date");
const inputToday = dayjs(new Date()).format("YYYY-MM-DD");
selectedDate.value = inputToday; //atual
selectedDate.min = inputToday; //data minima

form.onsubmit = async (event) => {
  event.preventDefault();

  try {
    const name = clientName.value.trim();

    if (!name) {
      return alert("Por favor, insira um nome.");
    }
    const hoursSelected = document.querySelector(".hour-selected");
    if (!hoursSelected) {
      return alert("Por favor, selecione um horário.");
    }
    //Recupera somente a hora
    const [hour] = hoursSelected.innerText.split(":");

    //Insere a data e hora no formato correto
    const when = dayjs(selectedDate.value).add(hour, "hour");

    //Gera ID para o agendamento
    const id = new Date().getTime();

    //Faz o agendamento
    await scheduleNew({ id, name, when });

    //Recarrega a página de agendamento
    await schedulesDay();

    clientName.value = ""; //limpa o campo de nome
  } catch (error) {
    console.log(error);
    alert("Erro ao enviar o formulário");
  }
};
