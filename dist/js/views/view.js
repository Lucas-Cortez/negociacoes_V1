export class View {
    constructor(seletor, escapar) {
        this.escapar = false;
        const elemento = document.querySelector(seletor);
        if (elemento) {
            this.elemento = elemento;
        }
        else {
            throw new Error(`Seletor ${seletor} não existe no DOM`);
        }
        if (escapar)
            this.escapar = escapar;
    }
    update(model) {
        const template = this.escapar
            ? this.template(model).replace(/<script>[\s\S]*?<script>/, "")
            : this.template(model);
        this.elemento.innerHTML = template;
    }
}
