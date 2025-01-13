import {useState, useEffect} from 'react';
import UserSelect from "./UserSelect";
import RequestList from "./RequestList.jsx";
import axios from 'axios';

function OutWork() {
    const [requestUser, setRequestUser] = useState([]);
    const [approverUser, setApproverUser] = useState([]);
    const [requestList, setRequestList] = useState([]);
    const [formData, setFormData] = useState({
        requestUserId: '',
        approverUserId: '',
        location: ''
    });

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const [reqUserResponse, approverUserRequest, requestUserList] = await Promise.all([
                    axios.post('http://localhost:3000/outwork/list/reqUser'),
                    axios.post('http://localhost:3000/outwork/list/approverUser'),
                    axios.post('http://localhost:3000/outwork/list/requestList'),
                ]);
                setRequestUser(reqUserResponse.data);
                setApproverUser(approverUserRequest.data);
                setRequestList(requestUserList.data);
            } catch (error) {
                console.log("직원 목록을 불러오는중 에러 발생!: ", error)
            }
        };
        fetchUsers();
    }, []);

    //직원 선택 핸들러
    const userSelectHandler = (target) => (e) => {
        setFormData({
            ...formData,
            [target]: e.target.value
        });
    }
    // 장소 선택 핸들러
    const locationHandler = (e) => {
        setFormData({
            ...formData,
            location: e.target.value
        })
    }

    const requestOutWork = async () => {
        try {
            if (!confirm('외근을 신청 하시겠습니까?')) return false;
            const response = await axios.post('http://localhost:3000/outwork/request', formData);
            if (response.data.code !== 200) {
                alert(response.data.message);
                return false;
            }
            console.log('외근 신청 성공', response);
            alert('외근이 신청되었습니다.');
            const requestListReload = await axios.post('http://localhost:3000/outwork/list/requestList');
            setRequestList(requestListReload.data);
            setFormData({
                requestUserId: '',
                approverUserId: '',
                location: ''
            });
        } catch (error) {
            alert('외근 신청이 실패 하였습니다 ', error);
            console.log('외근 신청 실패', error);
        }
    }

    return (
        <div className="outwork-container">
            <div className="outwork-card">
                <h3 className="outwork-title">어다인 외근 신청</h3>
                <div className="form-row">
                    <UserSelect
                        label="기안자"
                        users={requestUser}
                        onChange={userSelectHandler('requestUserId')}
                        value={formData.requestUserId}
                    />
                </div>
                <div className="form-row">
                    <UserSelect
                        label="승인자"
                        users={approverUser}
                        onChange={userSelectHandler('approverUserId')}
                        value={formData.approverUserId}
                    />
                </div>
                <div className="location-input-group">
                    <input
                        className="form-control"
                        type="text"
                        onChange={locationHandler}
                        placeholder="장소"
                        value={formData.location}
                    />
                    <button className="btn btn-primary" onClick={requestOutWork}>
                        신청
                    </button>
                </div>
                <div className="table-container">
                    <RequestList users={requestList}/>
                </div>
            </div>
        </div>
    );
}

export default OutWork
