const express = require('express');
const knex = require('./config/knex');
const multer  = require('multer');
const path = require('path');
const fs = require('fs');

//Configuração do Express
const app = express();
app.use(express.json());
app.use('/images', express.static('doc_images'));
const port = 3002;

//Configuração do multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "doc_images/")
  },
  filename: (req, file, cb) => {
    cb(null, req.body.id + path.extname(file.originalname))
  },
})
const upload = multer({storage, limits: 6 * 1024 * 1024}) //6MB para o limite de imagem.


app.listen(port, () => {
  console.log(`Servidor Express rodando em http://localhost:${port}`)
})

//--------------------------------------------------
app.get('/api/documentos', async (req, res) => {
  try {
    const result = await knex.withSchema('documentos').select().from('nfe')
    res.json(result);
  }catch (e) {
    console.log(e)
  }
});
//--------------------------------------------------

app.post('/api/documentos/cadastrar', upload.single('file'), async (req, res) => {
  let documento = {
    nome: req.body.nome,
    endereco: req.body.endereco,
    municipio: req.body.municipio,
    fone: req.body.fone,
    data_emissao: req.body.data_emissao
  }

  try {
    await knex.withSchema('documentos').table('nfe').insert(documento)
    res.send(`Documento cadastrado!`);
  }catch (e) {
    console.log(e)
  }


});
//--------------------------------------------------

app.delete('/api/documentos/deletar/:id', async (req, res) => {
  try {
    await knex.withSchema('documentos').table('nfe').where('id', req.params.id).del()

    try {
      if (fs.existsSync(`doc_images/${req.params.id}.png`)) {
        fs.unlink(`doc_images/${req.params.id}.png`, (err) => {
          if (err) throw err;
        });
      }
    } catch(err) {
      console.error(err)
    }

    res.send(`Documento deletado!`);
  }catch (e) {
    console.log(e)
  }
});
//--------------------------------------------------
app.put('/api/documentos/atualizar/:id', upload.single('file'), async (req, res) => {
  let documento = {
    nome: req.body.nome,
    endereco: req.body.endereco,
    municipio: req.body.municipio,
    fone: req.body.fone,
    data_emissao: req.body.data_emissao
  }

  try {
    await knex.withSchema('documentos').table('nfe').where('id', req.params.id).update(documento)

    res.send(`Documento atualizado!`);
  }catch (e) {
    console.log(e)
  }
});
