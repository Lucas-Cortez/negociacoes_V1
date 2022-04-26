import { NegociacaoController } from "./controllers/negociacao_controller.js";
const negociationController = new NegociacaoController();
const form = document.querySelector(".form");
if (form) {
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        negociationController.adiciona();
    });
}
else {
    throw new Error("Não foi possivel iniciar a aplicação");
}
