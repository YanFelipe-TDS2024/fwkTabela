export default class Tabela {
    constructor(linhas, colunas, expands, bordaAttr) {
        this.linhas = linhas
        this.colunas = colunas

        this.expands = expands
        this.bordaAttr = bordaAttr
        
        this.matrizTabela = []
    }

    criarTabela() {
        let tabela = document.createElement("table")

        this.tabela = tabela
    }

    gerarTabelaExpand(expand) {
        let linha = Number(expand.getAttribute("linha")) || 0
        let coluna = Number(expand.getAttribute("coluna")) || 0
        let tamanho = Number(expand.getAttribute("tamanho")) || 1
        let tipo = expand.getAttribute("tipo") || "coluna"

        if (linha > this.linhas) {
            alert("Expand pulado: Número da linha fora da tabela.")

            return
        }

        if (coluna > this.colunas) {
            alert("Expand pulado: Número da coluna fora da tabela.")

            return
        }

        let tabelaExpand = [
            linha,
            coluna,
            tamanho,
            tipo,
        ]

        return tabelaExpand
    }

    gerarMatrizExpands() {
        let matriz = []
        let expands = this.expands

        for (let i=0; i<expands.length; i++) {
            let expand = expands[i]

            let tabelaExpand = this.gerarTabelaExpand(expand)

            matriz.push(tabelaExpand)
        }
        
        this.matriz = matriz
    }

    pegarSpan(numLinha, numColuna) {
        let span = 1
        let tipo = "coluna"
        let matriz = this.matriz

        for (let i = 0; i < matriz.length; i++) {
            if (!(matriz[i][0] == numLinha && matriz[i][1] == numColuna)) 
                continue

            span=matriz[i][2]
            tipo=matriz[i][3]
        }

        let spanData = [
            span,
            tipo
        ]

        return spanData
    }

    setarSpan(td, span, tipo){
        let linhaAtual = this.linhaAtual
        let colunaAtual = this.colunaAtual

        if (tipo == "coluna"){
            for (let coluna = colunaAtual; coluna < colunaAtual + span; coluna++) {
                this.salvarCelulaMatriz(linhaAtual, coluna)
            }

            td.setAttribute("colspan", span)
        }else if (tipo == "linha"){
            for (let linha = linhaAtual; linha < linhaAtual + span; linha++) {
                this.salvarCelulaMatriz(linha, colunaAtual)
            }

            td.setAttribute("rowspan", span)
        }
    }

    gerarColuna(tr) {
        let td = document.createElement("td")
       
        let linhaAtual = this.linhaAtual
        let colunaAtual = this.colunaAtual

        if (this.checarOcupada(linhaAtual, colunaAtual))
            return

        let spanData = this.pegarSpan(linhaAtual, colunaAtual)

        let span = spanData[0]
        let tipo = spanData[1]

        if(span > 1){
            this.setarSpan(td, span, tipo)
        }else{
            this.salvarCelulaMatriz(linhaAtual, colunaAtual)
        }

        this.gerarBorda(td)

        tr.appendChild(td)
    }

    salvarCelulaMatriz(linha, coluna) {
        if(!this.matrizTabela[linha])
            return

        this.matrizTabela[linha][coluna] = true
    }

    checarOcupada(linha, coluna) {
        if (!this.matrizTabela[linha])
            return false

        return (this.matrizTabela[linha][coluna]) || false
    }

    gerarLinha() {
        let tabela = this.tabela
        let colunas = this.colunas

        let tr = document.createElement("tr")

        for (this.colunaAtual = 0; this.colunaAtual < colunas; this.colunaAtual++) {
            this.gerarColuna(tr)
        }

        tabela.appendChild(tr)
    }

    gerarBorda(td) {
        if (!this.bordaAttr) return

        let bordaAttr = this.bordaAttr
        let vetBorda = bordaAttr.split(" ")

        let tamanho = vetBorda[0]
        let cor = vetBorda[1]
        let tipo = vetBorda[2]

        td.style.setProperty('--cor-borda', cor) 
        td.style.setProperty('--tipo-borda', tipo) 
        td.style.setProperty('--tamanho-borda', tamanho) 
    }

    gerarMatrizTabela() {
        let linhas = this.linhas
        let colunas = this.colunas

        for (let linhaAtual = 0; linhaAtual < linhas; linhaAtual++) {
            let vetorLinha = []

            for (let colunaAtual = 0; colunaAtual < colunas; colunaAtual++) {
                vetorLinha[colunaAtual] = false
            }

            this.matrizTabela[linhaAtual] = vetorLinha
        }
    }

    gerarTabela() {
        let linhas = this.linhas

        for (this.linhaAtual = 0; this.linhaAtual < linhas; this.linhaAtual++) {
            this.gerarLinha()
        }
    }
}