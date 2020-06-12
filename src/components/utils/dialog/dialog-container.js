import React from 'react';
import axios from 'axios';
import download from 'js-file-download';
import DialogView from './dialog-view';

const DialogContainer = props => {
    const cleanUp = async (url, filename) => {
        const response = await sendRequest('DELETE', url, null, {filename : filename});
        console.log(response);
        return;
      } 

    const sendRequest = async (type, url, data, params) => {
      switch(type){
          case 'GET':
              const urlObject = new URL(url);
              Object.keys(params).forEach(key => urlObject.searchParams.append(key, params[key]))
              return await fetch(urlObject);
          case 'POST':
              console.log('data: ', data);
              return await axios.post(url, data, {})
          case 'DELETE':
              return await axios.delete(url, {params: params});
          default:
              return;
      }
    }

    const onUpload = async (selectedFile, password, variant) => {
      console.log('here', selectedFile);
      const data = new FormData();
      let baseUrl;
      if(variant === 'horcruxify'){
          data.append('file', selectedFile.selectedFile);
          baseUrl = 'http://localhost:5001/horcruxify/'
      }
      else{
          for(var x = 0; x < selectedFile.selectedFile.length; x++){
              data.append('file', selectedFile.selectedFile[x]);
          }
          baseUrl = 'http://localhost:5001/dehorcruxify/'
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