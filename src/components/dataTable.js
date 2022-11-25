// import {useRef, useEffect} from 'react';

function DataRow({roomId, oldElec, oldElec0, oldWater, oldWater0}) {
  return(
    <>
    <tr>
      <th scope="row" rowSpan="2" class="room-id">{roomId}</th>
      <td>Cũ: {oldElec}</td>
      <td>Cũ: <i class={oldElec0} ></i></td>
      <td>Cũ: {oldWater}</td>
      <td>Cũ: <i class={oldWater0} ></i></td>
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
          
          <DataRow roomId={"1"} oldElec={"1234"} oldElec0={"bx bxs-check-square"} oldWater={"1234"} oldWater0={"bx bxs-x-square"} />
          
          

          <DataRow roomId={"1"} oldElec={"1234"} oldElec0={"bx bxs-check-square"} oldWater={"1234"} oldWater0={"bx bxs-x-square"} />
          <DataRow roomId={"2"} oldElec={"1234"} oldElec0={"bx bxs-check-square"} oldWater={"1234"} oldWater0={"bx bxs-x-square"} />
          <DataRow roomId={"3"} oldElec={"1234"} oldElec0={"bx bxs-check-square"} oldWater={"1234"} oldWater0={"bx bxs-x-square"} />
          <DataRow roomId={"4"} oldElec={"1234"} oldElec0={"bx bxs-check-square"} oldWater={"1234"} oldWater0={"bx bxs-x-square"} />
          <DataRow roomId={"5"} oldElec={"1234"} oldElec0={"bx bxs-check-square"} oldWater={"1234"} oldWater0={"bx bxs-x-square"} />
          <DataRow roomId={"6"} oldElec={"1234"} oldElec0={"bx bxs-check-square"} oldWater={"1234"} oldWater0={"bx bxs-x-square"} />
          <DataRow roomId={"1"} oldElec={"1234"} oldElec0={"bx bxs-check-square"} oldWater={"1234"} oldWater0={"bx bxs-x-square"} />
          <DataRow roomId={"1"} oldElec={"1234"} oldElec0={"bx bxs-check-square"} oldWater={"1234"} oldWater0={"bx bxs-x-square"} />
          <DataRow roomId={"1"} oldElec={"1234"} oldElec0={"bx bxs-check-square"} oldWater={"1234"} oldWater0={"bx bxs-x-square"} />
          <DataRow roomId={"1"} oldElec={"1234"} oldElec0={"bx bxs-check-square"} oldWater={"1234"} oldWater0={"bx bxs-x-square"} />
          <DataRow roomId={"1"} oldElec={"1234"} oldElec0={"bx bxs-check-square"} oldWater={"1234"} oldWater0={"bx bxs-x-square"} />
          <DataRow roomId={"1"} oldElec={"1234"} oldElec0={"bx bxs-check-square"} oldWater={"1234"} oldWater0={"bx bxs-x-square"} />
        </tbody>
    </table>
    </form>
  )
}

export default DataTable