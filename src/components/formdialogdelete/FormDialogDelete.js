import { useState } from 'react';
import axios from 'axios';
import {Button, Dialog, DialogTitle, DialogContent,
  DialogContentText, DialogActions} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckIcon from '@material-ui/icons/Check';

const FormDialogDelete = (props) => {
  const [open, setOpen] = useState(false);

  const deleteDoc = async () => {

    try {
      let result = await axios.delete(`/api/documentos/deletar/${props.docid}`);
      if(result) {
        //Pega os dados do banco e atualiza na tela novamente.
        axios.get('/api/documentos')
        .then(response => props.setData(response.data));
        //O Dialog só será fechado se realmente a promessa for um sucesso.
        setOpen(false);
      }
    }catch (e) {
      console.log(e)
    }
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
        DELETAR
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Deletar documento: {props.docnome} ID: {props.docid}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Deseja realmente deletar este documento?
          </DialogContentText>
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
          onClick={deleteDoc}
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

export default FormDialogDelete;
