import './App.css';
import axios from 'axios';
import { useState } from 'react';
import { Button, Paper } from '@mui/material';

function App() {
  const url = "https://jsonplaceholder.typicode.com/posts";
  const [data, setData] = useState(null);
  const [btnClicked, setBtnClicked] = useState(false);
  const [disabled, setDisabled] = useState(true);

  async function btnGet() {
    console.log('GET clicked');
    await axios.get(url, {
      params: {
        _limit: 25
      }
    })
      .then(res => {
        setData(res);
      })
      .catch(err => console.log(err));
    setBtnClicked(true);
    setDisabled(false);
  }

  function btnClear() {
    setBtnClicked(false);
    setDisabled(true);
    setData(null)
    console.log('Cleared')
  }

  async function btnPost() {
    console.log('POST clicked');
    await axios.post('https://jsonplaceholder.typicode.com/posts', {
      title: 'Liber primus',
      body: 'Exigitis rem magis... '
    })
      .then(res => { setData(res) })
      .catch(err => console.error(err));
    setDisabled(false);
    setBtnClicked(true);
  }

  async function btnPatch() {
    console.log('PATCH clicked');
    await axios.patch(url + '/26', {
      title: 'Update Liber primus ...',
      body: 'Exigitis rem magis uno ... '
    })
      .then(res => { setData(res) })
      .catch(err => console.error(err));
    setBtnClicked(true);
    setDisabled(false);
  }

  async function btnDelete() {
    console.log('DELETE clicked');
    await axios.delete(url + '/26', {
      title: 'Update Liber primus ...',
      body: 'Exigitis rem magis uno ... '
    })
      .then(res => { setData(res) })
      .catch(err => console.error(err));
    setBtnClicked(true);
    setDisabled(false);
  }

  axios.interceptors.request.use(config => {
    sessionStorage.setItem('Request', `${config.method.toLocaleUpperCase()} sent to ${config.url} at ${new Date().getTime()}`)

    return config;
  }, error => {
    return Promise.reject(error);
  })

  axios.interceptors.response.use(response => {
    sessionStorage.setItem('Response', `Response received at ${new Date().getTime()}`);

    return response;
  }, error => {
    return Promise.reject(error);
  })


  return (
    <div className="App">
      <div className='container'>
        <Button id="get-btn" onClick={btnGet}>GET</Button>
        <Button id="post-btn" onClick={btnPost}>POST</Button>
        <Button id="patch-btn" onClick={btnPatch}>PATCH</Button>
        <Button id="delete-btn" onClick={btnDelete}>DELETE</Button>
      </div>
      {disabled ?
        <Button id="btn-clear" onClick={() => btnClear()} disabled>Clear</Button> :
        <Button id="btn-clear" onClick={() => btnClear()}>Clear</Button>}
      {btnClicked ?
        <Paper elevation={3} sx={{ paddingTop: 2, width: 700 }}>
          <pre className='status'>
            <h4>Status: {data.status}</h4>
          </pre>
          <pre className='headers'>
            <h4>Headers:</h4>
            {JSON.stringify(data.config, null, 2)}
          </pre>
          <pre className='body'>
            <h4>Body:</h4>
          </pre>
          <pre className='card'>
            {JSON.stringify(data.data, null, 2)}
          </pre>
        </Paper>
        : <Paper elevation={3} sx={{ padding: 4, width: 700 }}>click button to show results ...</Paper>
      }
    </div>
  );
}

export default App;