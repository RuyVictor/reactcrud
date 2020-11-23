import React, { useState } from 'react';
import './Home.css';
import NavBar from '../../components/navbar/NavBar';
import DocsContainer from '../../components/docscontainer/DocsContainer';

const Home = () => {
  //Passa valor do campo de texto entre os componentes NavBar e DocsContainer.
  const [searchValue, setSearchValue] = useState('');

  //Cria uma ponte de atualização entre os componentes para que possam atualizar as informações na tela.
  const [data, setData] = useState([]);

  return (
    <div className="home">
      <NavBar setSearchValue={setSearchValue} setData={setData}/>
      <DocsContainer searchValue={searchValue} data={data} setData={setData}/>
    </div>
  );
}

export default Home;
