let tabelas = document.getElementsByTagName("tabela")

import Tabela from "./Tabela.js"

for (let i = 0; i < tabelas.length; i++) {
    let tabela = tabelas[i]

    let linhas = tabela.getAttribute("linhas")
    let colunas = tabela.getAttribute("colunas")
    let bordaAttr = tabela.getAttribute("borda")
    let expands = tabela.getElementsByTagName("expand")

    if (!linhas) {
        alert("Argumento 'linhas' faltando na tabela!")

        continue
    }

    if (!colunas) {
        alert("Argumento 'colunas' faltando na tabela!")

        continue
    }

    let numLinhas = Number(linhas)
    let numColunas = Number(colunas)

    if (! (numLinhas && numLinhas > 0)) {
        alert("Argumento 'linhas' inválido!")

        continue
    }

    if (! (numColunas && numColunas > 0)) {
        alert("Argumento 'colunas' inválido!")

        continue
    }

    let objetoTabela = new Tabela(numLinhas, numColunas, expands, bordaAttr)

    objetoTabela.criarTabela()
    objetoTabela.gerarMatrizTabela()
    objetoTabela.gerarMatrizExpands()
    objetoTabela.gerarTabela()

    tabela.appendChild(objetoTabela.tabela)
}