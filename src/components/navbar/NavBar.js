import './NavBar.css';
import {AppBar, Button, TextField, IconButton, InputAdornment} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import KeyboardIcon from '@material-ui/icons/Keyboard';
import FormCreateDoc from '../../components/formcreatedoc/FormCreateDoc';

const NavBar = (props) => {

  return (
    <AppBar position="sticky" elevation={10} color="secondary">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div className="header-search">
            <TextField
            className="nav-textfield"
            placeholder="Pesquisar"
            variant="outlined"
            onChange={text => props.setSearchValue(text.target.value)}
            size="small"
            InputProps={{
              style: { borderRadius: '4px 0px 0px 4px', padding: 0, height: 35 },
              endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <KeyboardIcon color="primary"/>
                </IconButton>
              </InputAdornment>
              )
            }}
            />
            <Button
            color="primary"
            style={{ borderRadius: '0px 4px 4px 0px', padding: 0 }}
            className='nav-button-search'
            >
              <SearchIcon/>
            </Button>
          </div>
          <div className="header-icon-buttons">
            <FormCreateDoc setData={props.setData}/>
          </div>
        </header>
    </AppBar>
  );
}

const logo = 'https://festivalabcr.org.br/wp-content/uploads/2020/04/fabcr20_logo_SOCIALDOCS-v2.png';

export default NavBar;
