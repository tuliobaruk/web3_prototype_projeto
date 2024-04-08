const { Dentista, Pessoa } = require('../models');

// Busca todos os registros de dentistas
exports.findAllDentistas = async (_, res) =>{
    try {
        const dentistas = await Dentista.findAll();
        res.send(dentistas)
    } catch (error) {
        res.status(500).send({
            message: error.message || "Algum erro ocorreu ao buscar os dentistas."
        })
    }
}

// Buscar um dentista pelo ID
exports.findDentistaById = async (req, res) => {
    try {
        const dentista = await Dentista.findByPk(req.params.id);
        if (dentista) {
            res.send(dentista);
        } else {
            res.status(404).send({
                message: `Não foi possível encontrar o dentista com o id=${req.params.id}.`
            });
        }
    } catch (error) {
        res.status(500).send({
            message: "Erro ao buscar o dentista com id=" + req.params.id
        });
    }
};

// Criar um novo dentista
exports.createDentista = async (req, res) => {
    const { cro, estadoCro, PessoaId } = req.body;

    if (!cro || !estadoCro || !PessoaId) {
        return res.status(400).send({
            message: "CRO, Estado do CRO e id da Pessoa são obrigatórios!"
        });
    }

    if (!/^[a-zA-Z0-9]{5,20}$/.test(cro)) {
        return res.status(400).send({
            message: "Formato do CRO inválido. Deve ser alfanumérico e ter entre 5 e 20 caracteres."
        });
    }

    if (!/^[a-zA-Z]{2}$/.test(estadoCro)) {
        return res.status(400).send({
            message: "Estado do CRO inválido. Deve ser uma sigla de 2 letras."
        });
    }

    try {
        const PessoaExistente = await Pessoa.findOne({
            where: {
                id: PessoaId
            }
        })

        if (!PessoaExistente) {
            return res.status(400).send({
                message: "Não é possivel criar um registro de dentista para uma pessoa que não existe."
            });
        }

        // Verifica se o CRO e estadoCro juntos não são duplicados
        const dentistaExistente = await Dentista.findOne({
            where: {
                cro,
                estadoCro
            }
        });

        if (dentistaExistente) {
            return res.status(400).send({
                message: "Um dentista com este CRO e Estado já está cadastrado."
            });
        }

        // Criando o Dentista
        const dentista = await Dentista.create({ cro, estadoCro, PessoaId });
        res.send(dentista);

    } catch (error) {
        res.status(500).send({
            message: error.message || "Algum erro ocorreu ao criar o dentista."
        });
    }
};

// Atualizando registro de dentista
exports.updateDentista = async (req, res) => {
    const id = req.params.id;
    try {
        const [updated] = await Dentista.update(req.body, {
            where: { id: id }
        });
        if (updated) {
            const updatedDentista = await Dentista.findByPk(id);
            res.send(updatedDentista);
        } else {
            res.status(404).send({
                message: `Não foi possível encontrar o dentista com o id=${id}.`
            });
        }
    } catch (error) {
        res.status(500).send({
            message: "Erro ao atualizar o dentista com id=" + id
        });
    }
};

// Remover um dentista pelo ID
exports.deleteDentista = async (req, res) => {
    const id = req.params.id;
    try {
        const deleted = await Dentista.destroy({
            where: { id: id }
        });
        if (deleted) {
            res.send({ message: "Dentista foi deletado com sucesso!" });
        } else {
            res.status(404).send({
                message: `Não foi possível deletar o dentista com o id=${id}. Talvez o dentista não tenha sido encontrado!`
            });
        }
    } catch (error) {
        res.status(500).send({
            message: "Não foi possível deletar o dentista com o id=" + id
        });
    }
};

