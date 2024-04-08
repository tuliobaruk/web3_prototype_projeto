const { Pessoa } = require('../models');

// Buscar todas as pessoas
exports.findAllPessoas = async (_, res) => {
    try {
        const pessoas = await Pessoa.findAll();
        res.send(pessoas);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Algum erro ocorreu ao buscar as pessoas."
        });
    }
};

// Buscar uma pessoa pelo ID
exports.findPessoaById = async (req, res) => {
    try {
        const { id } = req.params;
        const pessoa = await Pessoa.findByPk(id);
        if (pessoa) {
            res.send(pessoa);
        } else {
            res.status(404).send({
                message: `Pessoa com id=${id} não encontrada.`
            });
        }
    } catch (error) {
        res.status(500).send({
            message: error.message || "Erro ao buscar a pessoa com id=" + id
        });
    }
};

// Criar uma nova pessoa
exports.createPessoa = async (req, res) => {
    const { nome, cpf, email, senha, ativo, tipo } = req.body;

    if (!nome || !cpf || !email || !senha || ativo || tipo){
        return res.status(400).send({
            message: "Campos necessários não foram preenchidos"
        });
    }
    try {
        const pessoa = await Pessoa.create(req.body);
        res.send(pessoa);
    } catch (error) {
        res.status(400).send({
            message: error.message || "Algum erro ocorreu ao criar a pessoa."
        });
    }
};

// Atualizar uma pessoa pelo ID
exports.updatePessoa = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await Pessoa.update(req.body, { where: { id: id } });
        if (updated) {
            const updatedPessoa = await Pessoa.findByPk(id);
            res.send(updatedPessoa);
        } else {
            res.status(404).send({ message: "Pessoa não encontrada." });
        }
    } catch (error) {
        res.status(500).send({
            message: error.message || "Algum erro ocorreu ao atualizar a pessoa."
        });
    }
};

// Excluir uma pessoa pelo ID
exports.deletePessoa = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Pessoa.destroy({ where: { id: id } });
        if (deleted) {
            res.send({ message: "Pessoa excluída com sucesso." });
        } else {
            res.status(404).send({ message: "Pessoa não encontrada." });
        }
    } catch (error) {
        res.status(500).send({
            message: error.message || "Algum erro ocorreu ao excluir a pessoa."
        });
    }
};
