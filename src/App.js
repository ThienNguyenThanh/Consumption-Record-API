import React from 'react';

import DataTable from './components/dataTable';
import PopUpWinodw from './components/popupWin';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

// import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<PopUpWinodw />} />
        <Route path='/consumptions' element={<DataTable inputMonth={"9"} inputYear={"2022"}/>}/>
      </Routes>
    
    </BrowserRouter>
   
  );
}

export default App;
