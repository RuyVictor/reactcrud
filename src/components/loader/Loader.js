import {CircularProgress} from '@material-ui/core';

const Loader = () => {

  return (
    <div style={{ height: 'calc(100% - 10vh)', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <CircularProgress color="secondary" />
    </div>
  );
}

export default Loader;
