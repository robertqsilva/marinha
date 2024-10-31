const Joi = require("joi");

const cadastroSchema = Joi.object({
  numero: Joi.number().required(),
  nome: Joi.string().required(),
  tiposanguineo: Joi.string().required(),
  mangam: Joi.number().required(),
  mangag: Joi.number().required(),
  mangagg: Joi.number().required(),
  regatam: Joi.number().required(),
  regatag: Joi.number().required(),
  regatagg: Joi.number().required(),
});

const editarSchema = Joi.object({
  nome: Joi.string().required(),
  tiposanguineo: Joi.string().required(),
  mangam: Joi.number().required(),
  mangag: Joi.number().required(),
  mangagg: Joi.number().required(),
  regatam: Joi.number().required(),
  regatag: Joi.number().required(),
  regatagg: Joi.number().required(),
}).required();

const validarCadastro = (req, res, next) => {
  const { error } = cadastroSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ mensagem: error.details[0].message });
  }
  next();
};

const validarEdicao = (req, res, next) => {
  const { error } = editarSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ mensagem: error.details[0].message });
  }
  next();
};

module.exports = {
  validarCadastro,
  validarEdicao,
};
