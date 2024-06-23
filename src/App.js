import React,{useState} from 'react';
import TableOne from './components/TableOne.js';
import TableTwo from './components/TableTwo.js';
import { Button } from '@mantine/core';
import "./App.css"

function App() {
  const [showTableOne, setShowTableOne] = useState(true);

  return (
    <>
    <div>
      <Button className='btn' onClick={() => setShowTableOne(!showTableOne)}>
        {showTableOne ? 'Show Table With Min and Max Production' : 'Show Table With Average Yeild and Area'}
      </Button>
      <div>
        {showTableOne ? <TableOne /> : <TableTwo />}
      </div>
    </div>

      {/* <div>
        <TableOne />
      </div>
      <div>
        <TableTwo />
      </div> */}
    </>
  );
}

export default App;