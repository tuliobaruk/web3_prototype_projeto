const { Servicos } = require('../models');

// Busca todos os serviços
exports.findAllServicos = async (_, res) => {
    try {
        const servicos = await Servicos.findAll();
        res.send(servicos);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Algum erro ocorreu ao buscar os serviços."
        });
    }
};

// Buscar um serviço pelo ID
exports.findServicoById = async (req, res) => {
    try {
        const servico = await Servicos.findByPk(req.params.id);
        if (servico) {
            res.send(servico);
        } else {
            res.status(404).send({
                message: `Não foi possível encontrar o serviço com o id=${req.params.id}.`
            });
        }
    } catch (error) {
        res.status(500).send({
            message: "Erro ao buscar o serviço com id=" + req.params.id
        });
    }
};

// Criar um novo serviço
exports.createServico = async (req, res) => {
    const { nome, descricao, preco } = req.body;

    if (!nome || preco === null) {
        return res.status(400).send({
            message: "Nome e Preço são obrigatórios!"
        });
    }

    try {
        const servico = await Servicos.create({ nome, descricao, preco });
        res.send(servico);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Algum erro ocorreu ao criar o serviço."
        });
    }
};

// Atualizando registro de serviço
exports.updateServico = async (req, res) => {
    const id = req.params.id;
    try {
        const [updated] = await Servicos.update(req.body, {
            where: { id: id }
        });
        if (updated) {
            const updatedServico = await Servicos.findByPk(id);
            res.send(updatedServico);
        } else {
            res.status(404).send({
                message: `Não foi possível encontrar o serviço com o id=${id}.`
            });
        }
    } catch (error) {
        res.status(500).send({
            message: "Erro ao atualizar o serviço com id=" + id
        });
    }
};

// Remover um serviço pelo ID
exports.deleteServico = async (req, res) => {
    const id = req.params.id;
    try {
        const deleted = await Servicos.destroy({
            where: { id: id }
        });
        if (deleted) {
            res.send({ message: "Serviço foi deletado com sucesso!" });
        } else {
            res.status(404).send({
                message: `Não foi possível deletar o serviço com o id=${id}. Talvez o serviço não tenha sido encontrado!`
            });
        }
    } catch (error) {
        res.status(500).send({
            message: "Não foi possível deletar o serviço com o id=" + id
        });
    }
};
