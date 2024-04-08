const { Consultorio } = require('../models');

// Busca todos os registros de consultórios
exports.findAllConsultorios = async (_, res) => {
    try {
        const consultorios = await Consultorio.findAll();
        res.send(consultorios);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Algum erro ocorreu ao buscar os consultórios."
        });
    }
};

// Buscar um consultório pelo ID
exports.findConsultorioById = async (req, res) => {
    try {
        const consultorio = await Consultorio.findByPk(req.params.id);
        if (consultorio) {
            res.send(consultorio);
        } else {
            res.status(404).send({
                message: `Não foi possível encontrar o consultório com o id=${req.params.id}.`
            });
        }
    } catch (error) {
        res.status(500).send({
            message: "Erro ao buscar o consultório com id=" + req.params.id
        });
    }
};

// Criar um novo consultório
exports.createConsultorio = async (req, res) => {
    const { identificacao, complemento, LocalidadeId } = req.body;

    if (!identificacao || !LocalidadeId) {
        return res.status(400).send({
            message: "Identificação e id de localidade são obrigatórios!"
        });
    }

    try {
        const consultorio = await Consultorio.create({ identificacao, complemento, LocalidadeId });
        res.send(consultorio);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Algum erro ocorreu ao criar o consultório."
        });
    }
};

// Atualizando registro de consultório
exports.updateConsultorio = async (req, res) => {
    const id = req.params.id;
    try {
        const [updated] = await Consultorio.update(req.body, {
            where: { id: id }
        });
        if (updated) {
            const updatedConsultorio = await Consultorio.findByPk(id);
            res.send(updatedConsultorio);
        } else {
            res.status(404).send({
                message: `Não foi possível encontrar o consultório com o id=${id}.`
            });
        }
    } catch (error) {
        res.status(500).send({
            message: "Erro ao atualizar o consultório com id=" + id
        });
    }
};

// Remover um consultório pelo ID
exports.deleteConsultorio = async (req, res) => {
    const id = req.params.id;
    try {
        const deleted = await Consultorio.destroy({
            where: { id: id }
        });
        if (deleted) {
            res.send({ message: "Consultório foi deletado com sucesso!" });
        } else {
            res.status(404).send({
                message: `Não foi possível deletar o consultório com o id=${id}. Talvez o consultório não tenha sido encontrado!`
            });
        }
    } catch (error) {
        res.status(500).send({
            message: "Não foi possível deletar o consultório com o id=" + id
        });
    }
};
