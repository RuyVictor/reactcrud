import { useState } from 'react';
import axios from 'axios';
import {Button, TextField, Dialog, DialogTitle, Typography,
  DialogContent, DialogActions, LinearProgress} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckIcon from '@material-ui/icons/Check';
import PublishIcon from '@material-ui/icons/Publish';

const FormDialogEdit = (props) => {
  const [progress, setProgress] = useState(0);


  const [open, setOpen] = useState(false);

  //Ao editar um documento, os campos de textos já devem possuir seu valor próprio.
  const [nome, setNome] = useState(props.doc.nome);
  const [endereco, setEndereco] = useState(props.doc.endereco);
  const [municipio, setMunicipio] = useState(props.doc.municipio);
  const [fone, setFone] = useState(props.doc.fone);
  const [data_emissao, setDataEmissao] = useState(props.doc.data_emissao);

  const [file, setFile] = useState([]);
  const [extension, setExtension] = useState('');

  const submitValues = async () => {

    const data = new FormData();

    data.append("nome", nome);
    data.append("endereco", endereco);
    data.append("municipio", municipio);
    data.append("fone", fone);
    data.append("data_emissao", data_emissao);
    data.append("image_name", Date.now() + "." + extension);

    data.append("file", file);

    var config = {
      onUploadProgress: function(progressEvent) {
        setProgress(Math.round( (progressEvent.loaded * 100) / progressEvent.total ));
      }
    }

    try {
      await axios.put(`/api/documentos/atualizar/${props.doc.id}`, data, config);
    } catch (e) {
      alert(e)
    }
  }
  

  
  if (progress === 100) {
    //Delay de 1seg para animação do Loading, caso o arquivo seja muito pequeno.
    setTimeout(() => {
      setOpen(false);
      setProgress(0);
      setFile([]);
      axios.get('/api/documentos')
      .then(response => props.setData(response.data));
    }, 1000);
  }

  return (
    <>
      <Button
      variant="outlined"
      color="primary"
      className='nav-button-login'
      onClick={() => setOpen(true)}
      style={{ borderRadius: 0, whiteSpace: 'nowrap'}}
      startIcon={<EditIcon style={{fontSize: '24px'}}/>}
      >
        EDITAR
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} disableBackdropClick>
        <LinearProgress color="secondary" variant="determinate" value={progress} />
        <DialogTitle id="form-dialog-title">Editar documento: {props.doc.nome} ID: {props.doc.id}</DialogTitle>
        <DialogContent>
          <Typography variant="h7">
            Nome:
          </Typography>
          <TextField
          value={nome}
          className="nav-textfield"
          placeholder="Nome"
          color="secondary"
          variant="outlined"
          margin="dense"
          fullWidth
          onChange={text => setNome(text.target.value)}
          InputProps={{style: { borderRadius: 4, padding: 0, height: 35}}}
          />
          <Typography variant="h7">
            Endereço:
          </Typography>
          <TextField
          value={endereco}
          className="nav-textfield"
          placeholder="Endereço"
          color="secondary"
          variant="outlined"
          margin="dense"
          fullWidth
          onChange={text => setEndereco(text.target.value)}
          InputProps={{style: { borderRadius: 4, padding: 0, height: 35}}}
          />
          <Typography variant="h7">
            Município:
          </Typography>
          <TextField
          value={municipio}
          className="nav-textfield"
          placeholder="Município"
          color="secondary"
          variant="outlined"
          margin="dense"
          fullWidth
          onChange={text => setMunicipio(text.target.value)}
          InputProps={{style: { borderRadius: 4, padding: 0, height: 35}}}
          />
          <Typography variant="h7">
            Fone:
          </Typography>
          <TextField
          value={fone}
          className="nav-textfield"
          placeholder="Fone"
          color="secondary"
          variant="outlined"
          margin="dense"
          fullWidth
          onChange={text => setFone(text.target.value)}
          InputProps={{style: { borderRadius: 4, padding: 0, height: 35}}}
          />
          <Typography variant="h7">
            Data de Emissão:
          </Typography>
          <TextField
          value={data_emissao}
          className="nav-textfield"
          placeholder="Data de Emissão"
          color="secondary"
          variant="outlined"
          margin="dense"
          fullWidth
          onChange={text => setDataEmissao(text.target.value)}
          InputProps={{style: { borderRadius: 4, padding: 0, height: 35}}}
          />
          <input
          accept="image/*"
          hidden
          style={{ display: 'none' }}
          id="doc_image"
          type="file"
          onChange={event => {
            setFile(event.target.files[0]);
            setExtension(event.target.files[0].name.substring(event.target.files[0].name.lastIndexOf('.') + 1));
          }}
          />
          <label htmlFor="doc_image" style={{display: 'flex', alignItems: 'center'}}>
            <Button
            variant="outlined"
            color="secondary"
            component="span"
            className='nav-button-login'
            style={{ borderRadius: 0, whiteSpace: 'nowrap', marginRight: 20}}
            startIcon={<PublishIcon style={{fontSize: '24px'}}/>}
            >
              IMAGEM
            </Button>
            <label>
              {file.name}
            </label>
          </label>
        </DialogContent>
        <DialogActions style={{margin: 18}}>
          <Button
          variant="outlined"
          color="secondary"
          className='nav-button-login'
          onClick={() => setOpen(false)}
          style={{ borderRadius: 0, whiteSpace: 'nowrap'}}
          startIcon={<CancelIcon style={{fontSize: '24px'}}/>}
          >
            CANCELAR
          </Button>
          <Button
          variant="outlined"
          color="secondary"
          className='nav-button-login'
          onClick={submitValues}
          style={{ borderRadius: 0, whiteSpace: 'nowrap'}}
          startIcon={<CheckIcon style={{fontSize: '24px'}}/>}
          >
            CONFIRMAR
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default FormDialogEdit;
