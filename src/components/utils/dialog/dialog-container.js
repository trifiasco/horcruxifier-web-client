import React from 'react';
import axios from 'axios';
import download from 'js-file-download';
import DialogView from './dialog-view';

const DialogContainer = props => {
    const cleanUp = async (url, filename) => {
        const response = await sendRequest('DELETE', url, null, {filename : filename});
        return response;
      } 

    const sendRequest = async (type, url, data, params) => {
      switch(type){
          case 'GET':
              return await fetch(`${url}?filename=${encodeURIComponent(params.filename)}`)
          case 'POST':
              return await axios.post(url, data, {})
          case 'DELETE':
              return await axios.delete(url, {params: params});
          default:
              return;
      }
    }

    const onUpload = async (selectedFile, password, variant) => {
      const data = new FormData();
      let baseUrl;
      const serverUrl = process.env.NODE_ENV === 'development' ? `http://localhost:5001` : ''
      if(variant === 'horcruxify'){
          data.append('file', selectedFile.selectedFile);
          baseUrl = `${serverUrl}/horcruxify`
      }
      else{
          for(var x = 0; x < selectedFile.selectedFile.length; x++){
              data.append('file', selectedFile.selectedFile[x]);
          }
          baseUrl = `${serverUrl}/dehorcruxify`
      }
      data.append('password', password);
      const res = await sendRequest('POST', baseUrl, data, {});
      if(res.status === 200){
          const response = await sendRequest('GET', baseUrl, null, {filename: res.data});
          const fileBlob = await response.blob();
          download(fileBlob, variant === 'horcruxify' ? 'horcruxes.zip' : 'original.txt');
          console.log('file should be downloaded by now!!');
          await cleanUp(baseUrl, res.data);
      }
    }

    return (
        <DialogView onUpload={onUpload} {...props}/>
    );
    
}

export default DialogContainer;