import './popupWin.css'
import {useState} from 'react'
import {Checkbox, Container ,Form} from 'semantic-ui-react'
import { TextField } from './textField';
import { useNavigate } from 'react-router-dom';
// import DataTable from './components/dataTable';

const mockSave = val =>
  new Promise(resolve => setTimeout(() => resolve(val), 1000));

export default function PopUpWinodw(){
    const [otherMonth, setOtherMonth] = useState(false)
    const currentMonth = new Date().getMonth() + 1
    const currentYear = new Date().getFullYear()
    const navigate = useNavigate();

    return (
        <>
       <div className={"my-modal active"} id="modal">
            <div className="modal-body">
            <Container>
                <Form>
                    <Form.Group widths='equal'>
                        <TextField
                            width={8}
                            
                            placeholder="Số Mới"
                            onSave={mockSave}
                        />
                        <Checkbox label='Click me'/>
                        <TextField
                            width={8}
                            
                            placeholder="Số Mới"
                            onSave={mockSave}
                        />
                        <Checkbox label='Click me'/>
                    </Form.Group>
                    
                
                </Form>
                
                
            </Container>

                {!otherMonth && <div className="this-month">
                    <span>Bạn sẽ nhập điện nước cho tháng {currentMonth},{currentYear} ?</span>
                    <button type="button" className="btn btn-fail" onClick={() => {setOtherMonth(true)}}>Nope</button>
                    <button type="button" className="btn btn-success" onClick={() => navigate('/consumptions')}>Đúng rồi</button>
                
                </div>}
                
                {otherMonth && <div className="other-month">
                    <form className="form-inline">
                        <label className="my-1 mr-2" for="otherMonth">Không, tôi nhập cho tháng khác</label>
                        <select className="custom-select my-1 mr-sm-2" id="otherMonth">
                          <option selected>Nhấp để chọn tháng...</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                          <option value="9">9</option>
                          <option value="10">10</option>
                          <option value="11">11</option>
                          <option value="12">12</option>
                        </select>
                        <button type='button' className="btn btn-primary" onClick={() => navigate('/consumptions')}>Xác nhận</button>
                      </form>
                </div>}
                
            </div>
    
        </div>
        <div  className={"overlay active"}></div>
        



        </>
    )
}



