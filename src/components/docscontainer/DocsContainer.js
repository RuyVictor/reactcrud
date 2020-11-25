import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DocsContainer.css';
import {Typography, Divider, Box} from '@material-ui/core';
import FormDialogEdit from '../../components/formdialogedit/FormDialogEdit';
import FormDialogDelete from '../../components/formdialogdelete/FormDialogDelete';


const DocsContainer = (props) => {

  //Implementação de um Loading em breve.
  const [isLoading, setLoading] = useState(true);

  //                                   converte a coluna null para uma string.
  const filteredData = props.data.filter(row => row.nome.toLowerCase().match(props.searchValue.toLowerCase()));

  useEffect(() => {
      const fetchDocs = () => {
        axios.get('/api/documentos')
        .then(response => {
          props.setData(response.data)
          setLoading(false);
        })
      }
      fetchDocs();
  }, [props]);

  return (
    <div className="all-container" style={{padding: 25}}>
      <div className="doc-container">
        {filteredData.map(doc =>
          <Box className="doc-card" bgcolor="secondary.main">
            <img src={`/images/${doc.image_name}`} onError={event => {event.target.onerror = null; event.target.src = imageUrl;}} alt="a" className="doc-thumbnail" />
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

const imageUrl = "https://st3.depositphotos.com/4799321/12998/v/950/depositphotos_129987084-stock-illustration-document-icon-vector-flat-illustration.jpg";
export default DocsContainer;
