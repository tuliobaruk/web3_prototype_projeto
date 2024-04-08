const { Localidade } = require('../models');

// Busca todas as localidades
exports.findAllLocalidades = async (_, res) => {
    try {
        const localidades = await Localidade.findAll();
        res.send(localidades);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Algum erro ocorreu ao buscar as localidades."
        });
    }
};

// Buscar uma localidade pelo ID
exports.findLocalidadeById = async (req, res) => {
    try {
        const localidade = await Localidade.findByPk(req.params.id);
        if (localidade) {
            res.send(localidade);
        } else {
            res.status(404).send({
                message: `Não foi possível encontrar a localidade com o id=${req.params.id}.`
            });
        }
    } catch (error) {
        res.status(500).send({
            message: "Erro ao buscar a localidade com id=" + req.params.id
        });
    }
};

// Criar uma nova localidade
exports.createLocalidade = async (req, res) => {
    const { descricao, cep, numero, complemento } = req.body;

    if (!descricao || !cep || !numero) {
        return res.status(400).send({
            message: "Descrição, CEP e Número são obrigatórios!"
        });
    }

    try {
        const localidade = await Localidade.create({ descricao, cep, numero, complemento });
        res.send(localidade);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Algum erro ocorreu ao criar a localidade."
        });
    }
};

// Atualizando registro de localidade
exports.updateLocalidade = async (req, res) => {
    const id = req.params.id;
    try {
        const [updated] = await Localidade.update(req.body, {
            where: { id: id }
        });
        if (updated) {
            const updatedLocalidade = await Localidade.findByPk(id);
            res.send(updatedLocalidade);
        } else {
            res.status(404).send({
                message: `Não foi possível encontrar a localidade com o id=${id}.`
            });
        }
    } catch (error) {
        res.status(500).send({
            message: "Erro ao atualizar a localidade com id=" + id
        });
    }
};

// Remover uma localidade pelo ID
exports.deleteLocalidade = async (req, res) => {
    const id = req.params.id;
    try {
        const deleted = await Localidade.destroy({
            where: { id: id }
        });
        if (deleted) {
            res.send({ message: "Localidade foi deletada com sucesso!" });
        } else {
            res.status(404).send({
                message: `Não foi possível deletar a localidade com o id=${id}. Talvez a localidade não tenha sido encontrada!`
            });
        }
    } catch (error) {
        res.status(500).send({
            message: "Não foi possível deletar a localidade com o id=" + id
        });
    }
};
