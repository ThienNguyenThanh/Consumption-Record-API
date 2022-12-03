import { useState, useRef, useEffect, useCallback} from 'react';

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

function DataTable({inputMonth, inputYear}) {
  const [consump, setConsump] = useState([])
  const [pageNumber, setPageNumber] = useState(1)
  const nextConsump = useRef([])
  const [isLoading, setIsLoading] = useState(true)
  const [err, setErr] = useState(false)
  const [hasMore, setHasMore] = useState(false)

  const observer = useRef();
  const lastConsumpRef = useCallback(node =>{
    if(isLoading) return
    if(observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries =>{
      if(entries[0].isIntersecting && hasMore){
        setPageNumber(prevPageNumber => prevPageNumber + 1)
      }
    })

    if(node) observer.current.observe(node)
    // console.log(node)
  }, [isLoading, hasMore])


  useEffect(() =>{
    setIsLoading(true)
    setErr(false)

    try{
      setErr('')
      fetch(`/.netlify/functions/consump-read-all?month=${inputMonth}&year=${inputYear}&pageNumber=${pageNumber}`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Request-Headers': "Origin"
        },
        body: JSON.stringify({afterData: nextConsump.current})
      })
      .then(res => res.json())
      .then(consumption => {
        if(consumption.after){
          // console.log(`After value: ${consumption.after}`)
          nextConsump.current = [consumption.data[2][0], consumption.data[2][5]["@ref"]["id"]]
          setHasMore(true)
        }else{
          setHasMore(false)
        }
        setIsLoading(false)
        // setConsump(consumption.data)
        setConsump([...consump, ...consumption.data])
        // console.log(consumption)
      })
      
    }
    catch(err){
      setErr(err.message)
    }
  }, [pageNumber, inputMonth, inputYear]);



  return(
    <>
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
          
          
          {consump.map((consum, index) => {
            if(index % 3 === 2){
              console.log('ref');
              return <div ref={lastConsumpRef}>
                        <DataRow  key={consum[0]} roomId={consum[0]} oldElec={consum[1]} oldElec0={consum[2]} oldWater={consum[3]} oldWater0={consum[4]} />
                    </div> 
            }else{
              return <div>
               <DataRow key={consum[0]} roomId={consum[0]} oldElec={consum[1]} oldElec0={consum[2]} oldWater={consum[3]} oldWater0={consum[4]} />

              </div>
            }
          })}
          {err && <h2>{err}</h2>}
          <h2>{isLoading && "Loading ..."}</h2>
        </tbody>
    </table>
    
    </form>
    {/* {prevConsump.current.length !== 0 && <button onClick={getPrevConump}>Prev</button> }
    {currentPage.current !== 0 && <h5>Page {currentPage.current}</h5>}
    {nextConsump.current.length !== 0 && <button onClick={getNextConump}>After</button>} */}
     
    
   
    

    </> 
  )
}

export default DataTable