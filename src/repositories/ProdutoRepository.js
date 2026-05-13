const pool = require('../config/database')

class ProdutoRepository{
    async listarTodosProdutos(){
        const [listaTodosprodutos] = await pool.query('SELECT * FROM produto') // O método query do pool é usado para executar uma consulta SQL no banco de dados. Ele retorna uma promessa que resolve com os resultados da consulta. A sintaxe [listaTodosprodutos] é uma forma de desestruturação de array, onde a primeira posição do array retornado pela consulta é atribuída à variável listaTodosprodutos.
        
        return listaTodosprodutos
    }

    async buscarPorId(id){
        const [produto] = await pool.query('SELECT * FROM produto WHERE id = ?', [id])

        return produto[0]
    }

    async cadastrarNovoProduto(dados){
        const{nome, descricao, preco, categoria, disponivel} = dados

        const [id] = await pool.query('INSERT INTO produto (nome, descricao, preco, categoria, disponivel) VALUES (?,?,?,?,?)', [nome, descricao, preco, categoria, disponivel]) 

        return id.insertId
    }

    async atualizarProdutoPorId(id, dados){
        const nomeCampo = []
        const valorCampo = []

        for(const [key, value] of Object.entries(dados)){
            nomeCampo.push(`${key} = ?`)
            valorCampo.push(value)
        } // O método Object.entries() é usado para obter um array de pares chave-valor a partir do objeto dados. O loop for...of é usado para iterar sobre esses pares, onde key representa a chave (nome do campo) e value representa o valor correspondente. Dentro do loop, as chaves são adicionadas ao array nomeCampo e os valores são adicionados ao array valorCampo.

        if(nomeCampo.length === 0) return null

        valorCampo.push(id)

        const query = `UPDATE produto SET ${nomeCampo.join(',')} WHERE id = ?` // A variável query é construída usando template literals para criar uma string SQL dinâmica. O método join(',') é usado para concatenar os elementos do array nomeCampo em uma única string, separando-os por vírgulas. O resultado final é uma consulta SQL que atualiza os campos especificados para o produto com o ID fornecido.

        const produtoAtualizado = await pool.query(query, valorCampo)

        return produtoAtualizado.affectedRows
    }

    async deletarProdutoPorId(id){
        const produto = await pool.query('DELETE FROM produto WHERRE id = ?', [id])

        return produto.affectedRows
    }
}

module.exports = new ProdutoRepository()