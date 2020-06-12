import React from 'react';
import {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const getProperties = variant => {
    switch(variant) {
        case 'horcruxify':
            return {title: 'Horcruxify', sectionHeader: 'Upload a file'};
        case 'de-horcruxify':
            return {title: 'De-Horcruxify', sectionHeader: 'Upload a folder'};
        default:
            return {};
    }
}

const DialogView = (props) => {
  
  const {open, variant, onClose, onUpload} = props;

  const properties = getProperties(variant);
  const [selectedFile, setSelectedFile] = useState({selectedFile: null});
  const [password, setPassword] = useState('');

  const onChangeHandler = event => {
    if(variant === 'horcruxify'){
      const file = event.target.files[0];
      setSelectedFile({selectedFile: file, loaded: 0});
    }
    else{
      setSelectedFile({selectedFile: event.target.files})
    }
  };

  const handleUpload = async () => {
    await onUpload(selectedFile, password, variant);
    setSelectedFile({selectedFile:null});
    setPassword('');
    onClose();
  };

  const passwordOnChange = event => {
    const pass = event.target.value;
    setPassword(pass);
  }

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={onClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{properties.title}</DialogTitle>
        <DialogContent>
          {/* <DialogContentText id="alert-dialog-slide-description">
            Let Google help apps determine location. This means sending anonymous location data to
            Google, even when no apps are running.
          </DialogContentText> */}
          {variant === 'horcruxify' ? (
            <input type="file" name="file" onChange={onChangeHandler}/>
            ) : (
              <input type="file" name="file" multiple onChange={onChangeHandler}/>
            )
          }

          <div>
          <TextField id="standard-basic" label="Enter a password" onChange={passwordOnChange} />
          <DialogContentText style={{color: 'red'}}>If you forget your password, you won't be able to de-horcruxify</DialogContentText>
          </div>
          
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpload} color="primary">
            Process
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DialogView
