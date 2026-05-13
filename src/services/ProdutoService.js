const ProdutoRepository = require("../repositories/ProdutoRepository");

class ProdutoService {
  async listarProdutos() {
    const listaprodutos = await ProdutoRepository.listarTodosProdutos();
    return {
      sucesso: true,
      dados: listaprodutos,
    };
  }

  async buscarProdutoPorId(id) {
    if (!id || isNaN(id)) {
      throw { status: 400, mensagem: "ID inválido" }; //throw é usado para lançar um erro personalizado, que pode ser capturado e tratado em outro lugar do código, como em um bloco try-catch.
    }

    const produto = await ProdutoRepository.buscarPorId(id);
    if (!produto) {
      throw { status: 404, mensagem: "Produto não encontrado" };
    }
    return {
      sucesso: true,
      dados: produto,
    };
  }

  async cadastrarProduto(dados) {
    const { nome, descricao, preco, categoria, disponivel } = dados;

    if (!nome || !descricao || preco === undefined) {
      throw {
        status: 400,
        mensagem: "Nome, descrição ou preço são obrigatórios!",
      };
    }
    if (typeof preco !== "number" || preco <= 0) {
      throw { status: 400, mensagem: "Preço deve ser um número positivo!" };
    }
    const novoProduto = {
      nome: nome.trim(),
      descricao: descricao.trim(),
      preco,
      categoria: categoria || null,
      disponivel: disponivel ?? true,
    };

    const id = await ProdutoRepository.cadastrarNovoProduto(novoProduto);

    return {
      sucesso: true,
      mensagem: "Produto cadastrado!",
      id: id,
    };
  }

  async atualizarProduto(id, dados) {
    if (!id || isNaN(id)) {
      throw { status: 400, mensagem: "ID inválido!" };
    }

    const produto = await ProdutoRepository.buscarPorId(id);

    if (!produto) {
      throw { status: 404, mensagem: "Produto não encontrado!" };
    }

    const produtoAtualizado = {};
    const { nome, descricao, preco, categoria, disponivel } = dados;

    if (nome != undefined) produtoAtualizado.nome = nome.trim();
    if (descricao != undefined) produtoAtualizado.descricao = descricao.trim();
    if (preco != undefined) {
      if (typeof preco !== "number || preco <= 0") {
        throw {
          status: 400,
          mensagem: "Preço deve ser um numero maior que zero!",
        };
      }
    }
    if (categoria !== undefined) produtoAtualizado.categoria = categoria;
    if (disponivel !== undefined) produtoAtualizado.disponivel = disponivel;
    if (Object.keys(produtoAtualizado).length === 0) {
      throw { status: 400, mensagem: "Nenhum dado para ser atualizado." };
    }

    await ProdutoRepository.atualizarProdutoPorId(id, produtoAtualizado);
    return {
      sucesso: true,
      mensagem: "Produto atualizado com sucesso!",
    };
  }

  async deletarProduto(id) {
    if (!id || isNaN(id)) {
      throw { status: 400, mensagem: "ID inválido!" };
    }

    const produto = await ProdutoRepository.buscarPorId(id);
    if (!produto) {
      throw { status: 404, mensagem: "Produto não encontrado." };
    }

    await ProdutoRepository.deletarProdutoPorId(id);

    return {
      sucesso: true,
      mensagem: "Produto apagado com sucesso",
    };
  }
}

module.exports = new ProdutoService();
