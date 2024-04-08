const { Consulta, Pessoa, Dentista, Consultorio } = require('../models');

// Buscar todas as consultas
exports.findAllConsultas = async (_, res) => {
    try {
        const consultas = await Consulta.findAll();
        res.send(consultas);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Algum erro ocorreu ao buscar as consultas."
        });
    }
};

// Buscar uma consulta pelo ID
exports.findConsultaById = async (req, res) => {
    try {
        const { id } = req.params;
        const consulta = await Consulta.findByPk(id);
        if (consulta) {
            res.send(consulta);
        } else {
            res.status(404).send({
                message: `Consulta com id=${id} não encontrada.`
            });
        }
    } catch (error) {
        res.status(500).send({
            message: error.message || "Erro ao buscar a consulta com id=" + id
        });
    }
};

// Cria uma nova consulta
exports.createConsulta = async (req, res) => {
    const { nome, relatorio, data, hora, taxa, taxaDescricao, status, valorFinal, PessoaId, DentistumId, ConsultorioId } = req.body;

    if (!nome || !data || !hora || taxa === undefined || !taxaDescricao || !status || valorFinal === undefined || !PessoaId || !DentistumId || !ConsultorioId) {
        return res.status(400).send({
            message: "Todos os campos obrigatórios devem ser preenchidos."
        });
    }

    try {
        const pessoaExists = await Pessoa.findByPk(PessoaId);
        if (!pessoaExists) return res.status(404).send({ message: "Não foi possível criar a consulta: Pessoa não encontrada." });

        const dentistaExists = await Dentista.findByPk(DentistumId);
        if (!dentistaExists) return res.status(404).send({ message: "Não foi possível criar a consulta: Dentista não encontrado." });

        const consultorioExists = await Consultorio.findByPk(ConsultorioId);
        if (!consultorioExists) return res.status(404).send({ message: "Não foi possível criar a consulta: Consultório não encontrado." });

        const novaConsulta = await Consulta.create({
            nome, relatorio, data, hora, taxa, taxaDescricao, status, valorFinal, PessoaId, DentistumId, ConsultorioId
        });
        res.send(novaConsulta);
        
    } catch (error) {
        res.status(500).send({
            message: error.message || "Algum erro ocorreu ao criar a consulta."
        });
    }
};


// Atualiza Consulta
exports.updateConsulta = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await Consulta.update(req.body, { where: { id: id } });
        if (updated) {
            const updatedConsulta = await Consulta.findByPk(id);
            res.send(updatedConsulta);
        } else {
            res.status(404).send({ message: "Consulta não encontrada." });
        }
    } catch (error) {
        res.status(500).send({
            message: error.message || "Algum erro ocorreu ao atualizar a consulta."
        });
    }
};

// Deleta consulta com base no id passado como parâmetro
exports.deleteConsulta = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Consulta.destroy({ where: { id: id } });
        if (deleted) {
            res.send({ message: "Consulta excluída com sucesso." });
        } else {
            res.status(404).send({ message: "Consulta não encontrada." });
        }
    } catch (error) {
        res.status(500).send({
            message: error.message || "Algum erro ocorreu ao excluir a consulta."
        });
    }
};
