import './App.css';
import { useState } from 'react';
import axios from 'axios';

function App() {
  const [firstTableData, setFirstTableData] = useState([]);
  const [secondTableData, setSecondTableData] = useState([]);
  const [thirdTableData, setThirdTableData] = useState([]);

  const [insertId, setInsertId] = useState('');
  const [insertName, setInsertName] = useState('');

  const [deleteName, setDeleteName] = useState('');

  const handleScrapeClick = () => {
    axios
      .get('http://localhost:3030/scrape')
      .then((response) => {
        setFirstTableData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleInsertClick = () => {
    const newTableData = [...firstTableData, { id: insertId, name: insertName }];
    axios
      .post('http://localhost:3030/fighters', { id: insertId, name: insertName })
      .then((response) => {
        setSecondTableData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleRemoveClick = () => {
    console.log(deleteName);
    axios
      .delete('http://localhost:3030/fighters', { data: {name: deleteName} })
      .then((response) => {
        setThirdTableData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className='App'>
      <h1 style={{ margin: '2em' }}>Homepage</h1>
      <button
        onClick={() => {
          handleScrapeClick();
        }}>
        Web Scrape! (click me)
      </button>
      {!!firstTableData.length &&
        firstTableData.map((fighter, key) => (
          <div className='table-row'>
            <p>{fighter.id}</p>
            <p>{fighter.name}</p>
          </div>
        ))}
      {!!firstTableData.length && (
        <div className='form1'>
          <input
            placeholder='id'
            value={insertId}
            onChange={(event) => {
              setInsertId(event.target.value);
            }}></input>
          <input
            placeholder='name'
            value={insertName}
            onChange={(event) => {
              setInsertName(event.target.value);
            }}></input>
          <button
            onClick={() => {
              handleInsertClick();
            }}>
            Inserare in server
          </button>
        </div>
      )}
      {!!secondTableData.length &&
        secondTableData.map((fighter, key) => (
          <div className='table-row'>
            <p>{fighter.id}</p>
            <p>{fighter.name}</p>
          </div>
        ))}
      {!!secondTableData.length && (
        <div className='form1'>
          <input
            placeholder='name'
            value={deleteName}
            onChange={(event) => {
              setDeleteName(event.target.value);
            }}></input>
          <button
            onClick={() => {
              handleRemoveClick();
            }}>
            Stergere din server
          </button>
        </div>
      )}
      {!!thirdTableData.length &&
        thirdTableData.map((fighter, key) => (
          <div className='table-row'>
            <p>{fighter.id}</p>
            <p>{fighter.name}</p>
          </div>
        ))}
    </div>
  );
}

export default App;
