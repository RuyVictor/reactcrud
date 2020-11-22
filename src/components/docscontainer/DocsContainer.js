import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DocsContainer.css';
import {Typography, Divider, Button, Box} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import FormDialogEdit from '../../components/formdialogedit/FormDialogEdit';
import FormDialogDelete from '../../components/formdialogdelete/FormDialogDelete';


const DocsContainer = (props) => {

  //Implementação de um Loading em breve.
  const [isLoading, setLoading] = useState(true);

  const filteredData = props.data.filter(i => i.nome.toLowerCase().match(props.searchValue.toLowerCase()))

  useEffect(() => {
      axios.get('/api/documentos')
      .then(response => props.setData(response.data));
  }, []);

  return (
    <div className="all-container" style={{padding: 25}}>
      <div className="doc-container">
        {filteredData.map(doc =>
          <Box className="doc-card" bgcolor="secondary.main">
            <img src={thumbnail_main} className="doc-thumbnail" alt="logo" />
            <Divider/>
            <div className="doc-content" style={{display: 'block'}}>
              <Typography variant="button" display="block" gutterBottom>
                {doc.id} - {doc.nome}
              </Typography>
              <Typography style={{fontSize: 12}} variant="caption" display="block" gutterBottom>
                {doc.endereco}
              </Typography>
              <Typography style={{fontSize: 12}} variant="caption" display="block" gutterBottom>
                {doc.data_emissao}
              </Typography>
              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <FormDialogEdit doc={doc} setData={props.setData}/>
                <FormDialogDelete setData={props.setData} docid={doc.id} docnome={doc.nome}/>
              </div>
            </div>
          </Box>
        )}
      </div>
    </div>
  );
}

const thumbnail_main = 'https://jaleko-blog-files.s3.amazonaws.com/wp-content/uploads/2020/01/27193041/large-documentos-810x693.png';

export default DocsContainer;
