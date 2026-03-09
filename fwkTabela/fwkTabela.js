let tabelas = document.getElementsByTagName("tabela")

import {Tabela} from "./Tabela.js"

for (let i = 0; i < tabelas.length; i++) {
    let tabela = tabelas[i]

    let linhas = tabela.getAttribute("linhas")
    let colunas = tabela.getAttribute("colunas")
    let bordaAttr = tabela.getAttribute("borda")
    let expands = tabela.getElementsByTagName("expand")

    let objetoTabela = new Tabela(linhas, colunas, expands, bordaAttr)

    objetoTabela.criarTabela()
    objetoTabela.gerarMatriz()
    objetoTabela.gerarTabela()

    tabela.appendChild(objetoTabela.tabela)
}