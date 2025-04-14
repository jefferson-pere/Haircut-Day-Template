import { scheduleCancel } from "../../services/schedule-cancel.js";
import { schedulesDay } from "./load.js";

const periods = document.querySelectorAll(".period");

//gerar evento de clikk para cada elemento
periods.forEach((period) => {
  period.addEventListener("click", async (event) => {
    //verifica se o elemento clicado é o icone de cancelar

    if (event.target.classList.contains("cancel-icon")) {
      // Obter o elemento <li> mais próximo
      const item = event.target.closest("li");

      if (!item) return;

      // Captura o id do dataset
      const { id } = item.dataset;

      // Se o id foi encontrado
      if (id) {
        const isConfirm = confirm("Você tem certeza que deseja cancelar?");

        if (isConfirm) {
          try {
            console.log("Cancelamento confirmado");

            await scheduleCancel({ id }); // Função assíncrona para cancelar
            schedulesDay(); // Recarrega a lista de agendamentos
          } catch (error) {
            console.error("Erro ao cancelar:", error);
          }
        }
      }
    }
  });
});
