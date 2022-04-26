import { DiasDaSemana } from "../enums/dias_da_semana.js";
import { Negociacao } from "../models/negociacao.js";
import { Negociacoes } from "../models/negociacoes.js";
import { MensagemView } from "../views/mensagem_view.js";
import { NegociacoesView } from "../views/negociacoes_view.js";

export class NegociacaoController {
  private inputData: HTMLInputElement;
  private inputQuantidade: HTMLInputElement;
  private inputValor: HTMLInputElement;

  private negociacoes = new Negociacoes();

  private negociacoesView = new NegociacoesView("#negociacoes", true);
  private mensagemView = new MensagemView("#mensagem");

  constructor() {
    this.inputData = <HTMLInputElement>document.querySelector("#data");
    this.inputQuantidade = <HTMLInputElement>document.querySelector("#quantidade");
    this.inputValor = <HTMLInputElement>document.querySelector("#valor");
    this.negociacoesView.update(this.negociacoes);
  }

  public adiciona(): void {
    const negociacao = Negociacao.criaDe(
      this.inputData.value,
      this.inputQuantidade.value,
      this.inputValor.value
    );

    if (this.ehDiaUtil(negociacao.data)) {
      this.mensagemView.update("Apenas negociações em dias úteis");
      return;
    }

    this.negociacoes.adiciona(negociacao);
    this.limparFormulario();
    this.atualizaView();
  }

  private ehDiaUtil(data: Date): boolean {
    const day = data.getDay();
    return day > DiasDaSemana.DOMINGO && day < DiasDaSemana.SABADO;
  }

  private limparFormulario(): void {
    this.inputData.value = "";
    this.inputQuantidade.value = "";
    this.inputValor.value = "";
    this.inputData.focus();
  }

  private atualizaView(): void {
    this.negociacoesView.update(this.negociacoes);
    this.mensagemView.update("Negociação adicionada com sucesso!");
  }
}
