import './popupWin.css'
import {useState, useRef} from 'react'
import {Container ,Form} from 'semantic-ui-react'
import { TextField } from './textField';

const mockSave = val =>
  new Promise(resolve => setTimeout(() => resolve(val), 1000));

export default function PopUpWinodw(){
    const [isModalOpen, setIsModelOpen] = useState(true)
    const [isOverlay, setIsOverlay] = useState(true)
    const [otherMonth, setOtherMonth] = useState(false)
    const currentMonth = new Date().getMonth() + 1
    const currentYear = new Date().getFullYear()


    function unOverlay(){
        setIsModelOpen(false)
        setIsOverlay(false)
    }

    return (
        <>
        <div className={`my-modal ${isModalOpen ? "active" : ""}`} id="modal">
            <div className="modal-body">
            <Container style={{ paddingTop: 16 }}>
                <Form>
                <TextField
                    width={8}
                    icon="chess icon"
                    label="Username"
                    placeholder="John Doe"
                    onSave={mockSave}
                />
                </Form>
            </Container>

                {!otherMonth && <div className="this-month">
                    <span>Bạn sẽ nhập điện nước cho tháng {currentMonth},{currentYear} ?</span>
                    <button type="button" className="btn btn-fail" onClick={() => {setOtherMonth(true)}}>Nope</button>
                    <button type="button" className="btn btn-success" onClick={unOverlay}>Đúng rồi</button>
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
                        <button type='button' className="btn btn-primary" onClick={unOverlay}>Xác nhận</button>
                      </form>
                </div>}
                
            </div>
    
        </div>
        <div  className={`overlay ${isOverlay ? "active" : ""}`}></div>
        </>
    )
}



