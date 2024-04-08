const { Disponibilidade } = require('../models');

// Busca todas as disponibilidades
exports.findAllDisponibilidades = async (_, res) => {
    try {
        const disponibilidades = await Disponibilidade.findAll();
        res.send(disponibilidades);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Algum erro ocorreu ao buscar as disponibilidades."
        });
    }
};

// Buscar uma disponibilidade pelo ID
exports.findDisponibilidadeById = async (req, res) => {
    try {
        const disponibilidade = await Disponibilidade.findByPk(req.params.id);
        if (disponibilidade) {
            res.send(disponibilidade);
        } else {
            res.status(404).send({
                message: `Não foi possível encontrar a disponibilidade com o id=${req.params.id}.`
            });
        }
    } catch (error) {
        res.status(500).send({
            message: "Erro ao buscar a disponibilidade com id=" + req.params.id
        });
    }
};

// Criar uma nova disponibilidade
exports.createDisponibilidade = async (req, res) => {
    const { diaDaSemana, horarioInicial, horarioFinal, DentistumId, ServicoId, ConsultorioId } = req.body;

    if (!diaDaSemana || !horarioInicial || !horarioFinal || !DentistumId || !ServicoId || !ConsultorioId) {
        return res.status(400).send({
            message: "Todos os campos são obrigatórios!"
        });
    }

    try {
        const disponibilidade = await Disponibilidade.create({
            diaDaSemana,
            horarioInicial,
            horarioFinal,
            DentistaId,
            ServicosId,
            ConsultorioId
        });
        res.send(disponibilidade);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Algum erro ocorreu ao criar a disponibilidade."
        });
    }
};

// Atualizando registro de disponibilidade
exports.updateDisponibilidade = async (req, res) => {
    const id = req.params.id;
    try {
        const [updated] = await Disponibilidade.update(req.body, {
            where: { id: id }
        });
        if (updated) {
            const updatedDisponibilidade = await Disponibilidade.findByPk(id);
            res.send(updatedDisponibilidade);
        } else {
            res.status(404).send({
                message: `Não foi possível encontrar a disponibilidade com o id=${id}.`
            });
        }
    } catch (error) {
        res.status(500).send({
            message: "Erro ao atualizar a disponibilidade com id=" + id
        });
    }
};

// Remover uma disponibilidade pelo ID
exports.deleteDisponibilidade = async (req, res) => {
    const id = req.params.id;
    try {
        const deleted = await Disponibilidade.destroy({
            where: { id: id }
        });
        if (deleted) {
            res.send({ message: "Disponibilidade foi deletada com sucesso!" });
        } else {
            res.status(404).send({
                message: `Não foi possível deletar a disponibilidade com o id=${id}. Talvez a disponibilidade não tenha sido encontrada!`
            });
        }
    } catch (error) {
        res.status(500).send({
            message: "Não foi possível deletar a disponibilidade com o id=" + id
        });
    }
};
