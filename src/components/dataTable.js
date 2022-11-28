import { useEffect, useState} from 'react';

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

  useEffect(() => {
     fetch('/.netlify/functions/consump-read-all')
        .then(response => console.log(response.text()))
        // .then(result => setConsump(result)) 
  },[])

  return(
    <form>
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
          {consump.map(consum => (
            <DataRow key={consum[4]} roomId={consum[4]} oldElec={consum[0]} oldElec0={consum[1]} oldWater={consum[2]} oldWater0={consum[3]} />
          ))}
          
        </tbody>
    </table>
    </form>
  )
}

export default DataTable