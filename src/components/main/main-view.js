import React from 'react';
import {useState} from 'react';
import Button from '@material-ui/core/Button';
import logo from '../../logo.svg';
import '../../App.css';
import DialogView from '../utils/dialog';

const Main = (props) => {
  const [open, setOpen] = useState(false);
  const [variant, setVariant] = useState('horcruxify');


  const handleOpenHorcruxify = () => {
    setVariant('horcruxify');
    setOpen(true);
  }

  const handleOpenDeHorcruxify = () => {
    setVariant('de-horcruxify');
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  };
  return (
        <div>
            <img src={logo} alt="logo" className="App-logo" />
            <div>
                <Button variant="contained" color="primary" onClick={handleOpenHorcruxify}>Horcruxify</Button>
                <Button variant="contained" color="primary" onClick={handleOpenDeHorcruxify}>De-Horcruxify</Button>

                <DialogView 
                    onClose={handleClose}
                    {...{open, variant}}
                />
            </div>
            
        </div>
    );
};

export default Main;