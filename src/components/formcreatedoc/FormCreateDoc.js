import { useState } from 'react';
import axios from 'axios';
import {Button, TextField, Dialog, DialogTitle, Typography,
  DialogContent, DialogActions, LinearProgress} from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckIcon from '@material-ui/icons/Check';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import PublishIcon from '@material-ui/icons/Publish';

const FormCreateDoc = (props) => {
  const [progress, setProgress] = useState(0);


  const [open, setOpen] = useState(false);

  const [nome, setNome] = useState('');
  const [endereco, setEndereco] = useState('');
  const [municipio, setMunicipio] = useState('');
  const [fone, setFone] = useState('');
  const [data_emissao, setDataEmissao] = useState('');

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

    data.append("file", file); //último

    var config = {
      onUploadProgress: function(progressEvent) {
        setProgress(Math.round( (progressEvent.loaded * 100) / progressEvent.total ));
      }
    }

    try {
      await axios.post('/api/documentos/cadastrar', data, config);
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
      style={{ borderRadius: 4, whiteSpace: 'nowrap'}}
      startIcon={<NoteAddIcon style={{fontSize: '24px'}}/>}
      >
        CRIAR DOCUMENTO
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} disableBackdropClick>
        <LinearProgress color="secondary" variant="determinate" value={progress} />
        <DialogTitle id="form-dialog-title">Criar documento</DialogTitle>
        <DialogContent>
          <Typography variant="h7">
            Nome:
          </Typography>
          <TextField
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

export default FormCreateDoc;
