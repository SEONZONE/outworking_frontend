import {useState, useEffect} from 'react';
import UserSelect from "./UserSelect";
import axios from 'axios';

function OutWork() {
    const [requestUser, setRequestUser] = useState([]);
    const [approverUser, setApproverUser] = useState([]);
    const [formData, setFormData] = useState({
        requestUserId: '',
        approverUserId: '',
        location: ''
    });

    useEffect(() => {
        const fetchReqUser = async () => {
            try {
                const response = await axios.post('http://localhost:3000/outwork/list/reqUser');
                setRequestUser(response.data);
            } catch (error) {
                console.log("직원 목록을 불러오는중 에러 발생!: ", error)
            }
        };
        fetchReqUser();

        const fetchApproverUser = async () => {
            try {
                const response = await axios.post('http://localhost:3000/outwork/list/approverUser');
                setApproverUser(response.data);
            } catch (error) {
                console.log("직원 목록을 불러오는중 에러 발생!: ", error)
            }
        };
        fetchApproverUser();
    }, []);

    //직원 선택 핸들러
    const userSelectHandler = (target) => (e) => {
        setFormData({
            ...formData,
            [target]: e.target.value
        });
    }
    // 장소 선택 핸들러
    const locationHandler = (e) =>{
        setFormData({
            ...formData,
            location: e.target.value
        })
    }

    const requestOutWork = async () => {
        try {
            const response = await axios.post('http://localhost:3000/outwork/request', formData);
            console.log('외근 신청 성공', response);
        } catch (error) {
            console.log('외근 신청 실패', error);
        }
    }


    return (
        <div>
            <UserSelect
                label="기안자"
                users={requestUser}
                onChange={userSelectHandler('requestUserId')}
                value={formData.requestUserId}
            />
            <UserSelect
                label="승인자"
                users={approverUser}
                onChange={userSelectHandler('approverUserId')}
                value={formData.approverUserId}
            />
            <input
                type="text"
                onChange={locationHandler}
                placeholder="장소"
                value={formData.location}
            />
            <button onClick={requestOutWork}>외근요청</button>
        </div>
    )
}

export default OutWork
