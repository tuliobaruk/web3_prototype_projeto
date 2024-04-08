
const express = require('express');
const router = express.Router();

const consultaController = require('./controllers/consultaController');
const pessoaController = require('./controllers/pessoaController');
const dentistaController = require('./controllers/dentistaController');
const consultorioController = require('./controllers/consultorioController');
const localidadeController = require('./controllers/localidadeController');
const servicosController = require('./controllers/servicosController');
const disponibilidadeController = require('./controllers/disponibilidadeController');


router.get('/consultas', consultaController.findAllConsultas);
router.get('/consultas/:id', consultaController.findConsultaById);
router.post('/consultas', consultaController.createConsulta);
router.put('/consultas/:id', consultaController.updateConsulta);
router.delete('/consultas/:id', consultaController.deleteConsulta);

router.get('/pessoas', pessoaController.findAllPessoas);
router.get('/pessoas/:id', pessoaController.findPessoaById);
router.post('/pessoas', pessoaController.createPessoa);
router.put('/pessoas/:id', pessoaController.updatePessoa);
router.delete('/pessoas/:id', pessoaController.deletePessoa);

router.get('/dentistas', dentistaController.findAllDentistas);
router.get('/dentistas/:id', dentistaController.findDentistaById);
router.post('/dentistas', dentistaController.createDentista);
router.put('/dentistas/:id', dentistaController.updateDentista);
router.delete('/dentistas/:id', dentistaController.deleteDentista);

router.get('/consultorios', consultorioController.findAllConsultorios);
router.get('/consultorios/:id', consultorioController.findConsultorioById);
router.post('/consultorios', consultorioController.createConsultorio);
router.put('/consultorios/:id', consultorioController.updateConsultorio);
router.delete('/consultorios/:id', consultorioController.deleteConsultorio);

router.get('/localidades', localidadeController.findAllLocalidades);
router.get('/localidades/:id', localidadeController.findLocalidadeById);
router.post('/localidades', localidadeController.createLocalidade);
router.put('/localidades/:id', localidadeController.updateLocalidade);
router.delete('/localidades/:id', localidadeController.deleteLocalidade);

router.get('/servicos', servicosController.findAllServicos);
router.get('/servicos/:id', servicosController.findServicoById);
router.post('/servicos', servicosController.createServico);
router.put('/servicos/:id', servicosController.updateServico);
router.delete('/servicos/:id', servicosController.deleteServico);

router.get('/disponibilidades', disponibilidadeController.findAllDisponibilidades);
router.get('/disponibilidades/:id', disponibilidadeController.findDisponibilidadeById);
router.post('/disponibilidades', disponibilidadeController.createDisponibilidade);
router.put('/disponibilidades/:id', disponibilidadeController.updateDisponibilidade);
router.delete('/disponibilidades/:id', disponibilidadeController.deleteDisponibilidade);

module.exports = router;
