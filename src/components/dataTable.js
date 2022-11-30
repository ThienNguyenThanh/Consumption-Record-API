import { useEffect, useState, useRef} from 'react';



function DataRow({roomId, oldElec, oldElec0, oldWater, oldWater0}) {
  return(
    <>
    <tr>
      <th scope="row" rowSpan="2" class="room-id">{roomId}</th>
      <td>Cũ: {oldElec}</td>
      <td>Cũ: <i class={oldElec0 === 1 ? "bx bxs-check-square" : "bx bxs-x-square"} ></i></td>
      <td>Cũ: {oldWater}</td>
      <td>Cũ: <i class={oldWater0 === 1 ? "bx bxs-check-square" : "bx bxs-x-square"} ></i></td>
    </tr>
    <tr>
      <td>
        <input class="form-control" type="text" placeholder="Số mới"></input>
      </td>
      <td>
        <div class="form-group">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" id="elecFrom0"></input>
            <label class="form-check-label" for="elecFrom0">
              Mới
            </label>
          </div>
        </div>
      </td>
      <td>
        <input class="form-control" type="text" placeholder="Số mới"></input>
      </td>
      <td>
      <div class="form-group">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" id="waterFrom0"></input>
            <label class="form-check-label" for="waterFrom0">
              Mới
            </label>
          </div>
        </div>
      </td>
    </tr>
    </>
  );
}

function DataTable() {
  const [consump, setConsump] = useState([])
  const nextConsump = useRef([])
  const prevConsump  = useRef([])
  const [isLoading, setIsLoading] = useState(false)
  const [err, setErr] = useState('')
  

  // useEffect(() =>  {
  //   //  fetch('/.netlify/functions/consump-read-all')
  //     fetch('http://localhost:9000/consump-read-all')
  //     .then(response => response.json())
  //     .then(result => setConsump(result.data)) 
  // },[])

  async function getNextConump(){
    if(consump.length === 0){
      setIsLoading(true)
    }
    
    try{
      setErr('')
      const res = await fetch('/.netlify/functions/consump-next', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Request-Headers': "Origin"
        },
        body: JSON.stringify({afterData: nextConsump.current})
      })

      const consumption = await res.json();
      console.log(consumption)
      if(consumption.after){
        // console.log(`After value: ${consumption.after}`)
        nextConsump.current = [consumption.data[1][0], consumption.data[1][5]["@ref"]["id"]]
      }else{
        nextConsump.current = []
      }

      
      if(consumption.before){
        // console.log(`After value: ${consumption.after}`)
        prevConsump.current = [consumption.before[0], consumption.before[1]["@ref"]["id"]]
      }else{
        prevConsump.current = []
      }
      setConsump(consumption.data)
      
    }
    catch(err){
      setErr(err.message)
    }finally{
      setIsLoading(false)
      console.log(`Invoked next method`)
    console.log(`Current prev: ${prevConsump.current} & Current next: ${nextConsump.current}`)
    }
  }

  async function getPrevConump(){
    
    if(consump.length === 0){
      setIsLoading(true)
    }
    
    try{
      setErr('')
      const res = await fetch('/.netlify/functions/consump-prev', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Request-Headers': "Origin"
        },
        body: JSON.stringify({prevData: prevConsump.current})
      })

      const consumption = await res.json();
      console.log(consumption)
      if(consumption.after){
        // console.log(`After value: ${consumption.after}`)
        nextConsump.current = [consumption.after[0], consumption.after[1]["@ref"]["id"]]
      }else{
        nextConsump.current = []
      }

      if(consumption.before){
        // console.log(`After value: ${consumption.after}`)
        prevConsump.current = [consumption.before[0], consumption.before[5]["@ref"]["id"]]
      }else{
        prevConsump.current = []
      }
      setConsump(consumption.data)
      
    }
    catch(err){
      setErr(err.message)
    }finally{
      setIsLoading(false)
      console.log(`Invoked prev method`)
      console.log(`Current prev: ${prevConsump.current} & Current next: ${nextConsump.current}`)
    }
  }


  async function getAllConsump(){
    if(consump.length === 0){
      setIsLoading(true)
    }
    
    try{
      setErr('')
      const res = await fetch('/.netlify/functions/consump-read-all')

      const consumption = await res.json();
      
      // console.log(consumption)
      if(consumption.after){
        // console.log(`After value: ${consumption.after}`)
        nextConsump.current = [consumption.data[2][0], consumption.data[2][5]["@ref"]["id"]]
      }
      
      setConsump(consumption.data)
      
    }
    catch(err){
      setErr(err.message)
    }finally{
      setIsLoading(false)
      console.log(`Invoked fetch method`)
      console.log(`Current prev: ${prevConsump.current} & Current next: ${nextConsump.current}`)
    }
  }

  function createConsump() {
    console.log('run new create')
    // return fetch('http://localhost:9000/consump-create', {
    //   body: JSON.stringify(data),
    //   method: 'POST'
    // }).then(response => {
    //   return response.json()
    // })
  }

  return(
    <>
    <button onClick={getAllConsump}>Fetch</button>
    <button onClick={getPrevConump}>Prev</button>
    <button onClick={getNextConump}>After</button>

    <form class="consumption-form">
      <table class="table table-bordered">
        <thead id="table-header" class="thead-dark" >
          <tr>
            <th scope="col">Phòng</th>
            <th scope="col">Số điện</th>
            <th scope="col">Điện từ 0</th>
            <th scope="col">Số nước</th>
            <th scope="col">Nước từ 0</th>
          </tr>
        </thead>
        <tbody class="table-content">
          {err && <h2>{err}</h2>}
          {isLoading && <h2>Loading...</h2>}
          {consump.map(consum => (
            <DataRow key={consum[0]} roomId={consum[0]} oldElec={consum[1]} oldElec0={consum[2]} oldWater={consum[3]} oldWater0={consum[4]} />
          ))}
          
        </tbody>
    </table>
    
    </form>
    
    
    </> 
  )
}

export default DataTable