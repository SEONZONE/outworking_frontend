import React, {useState, useEffect} from 'react';
import UserSelect from "./UserSelect";
import UpdateStatus from "./UpdateStatus.jsx";
import UserSelectCondition from "./UserSelectCondition.jsx";
import ExcelComponent from "./ExcelComponent.jsx";
import api from "./api/axios.js";
import LocationSelect from "./LocationSelect.jsx";
import moment from "moment";


function OutWork() {
    const [requestUser, setRequestUser] = useState([]);
    const [approverUser, setApproverUser] = useState([]);
    const [requestList, setRequestList] = useState([]);
    const [statusList, setStatusList] = useState([]);
    const [initialDate, setInitialDate] = useState(new Date());
    const [formData, setFormData] = useState({
        requestUserId: '',
        approverUserId: '',
        location: '',
    });

    useEffect(() => {
        const initialData = {
            '요청월': moment(initialDate).format('YYYYMM'),
        }
        const fetchUsers = async () => {
            try {
                const [reqUserResponse, approverUserRequest, requestUserList, statusList] = await Promise.all([
                    api.post('/outwork/list/reqUser'),
                    api.post('/outwork/list/approverUser'),
                    api.post('/outwork/list/requestList', initialData),
                    api.post('/outwork/list/statusList'),
                ]);
                setRequestUser(reqUserResponse.data);
                setApproverUser(approverUserRequest.data);
                setRequestList(requestUserList.data);
                setStatusList(statusList.data);
            } catch (error) {
                console.log("직원 목록을 불러오는중 에러 발생!: ", error)
            }
        };
        fetchUsers();
    }, [initialDate]);

    //직원 선택 핸들러
    const userSelectHandler = (target) => (e) => {
        setFormData({
            ...formData,
            [target]: e.target.value
        });
    }

    // 장소 선택 핸들러
    const locationSelectHandler = (target) => (e) => {
        setFormData({
            ...formData,
            [target]: e.target.value
        })
    }

    const requestOutWork = async () => {
        try {
            if (!confirm('외근을 신청 하시겠습니까?')) return false;
            const response = await api.post('/outwork/request', formData);
            if (response.data.code !== 200) {
                alert(response.data.message);
                return false;
            }
            console.log('외근 신청 성공', response);
            alert('외근이 신청되었습니다.');
            refreshList();
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

    //승인 목록 리프레시
    const refreshList = async (data) => {
        try {
            const requestListReload = await api.post('/outwork/list/requestList', data);
            setRequestList(requestListReload.data);
        } catch (error) {
            console.log("승인요청 목록을 불러오는중 에러 발생!: ", error)
        }
    }


    return (
        <div className="outwork-container">
            <div className="outwork-card">
                <h3 className="outwork-title">어다인 외근 신청</h3>
                <fieldset className='reuquest-outwork-fieldset'>
                    <legend className="reuquest-outwork-legend">외근 신청</legend>
                    <div className="form-row">
                        <UserSelect
                            label="요청자"
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
                    <div className="form-row">
                        <LocationSelect
                            onChange={locationSelectHandler('location')}
                        />
                    </div>
                    <div className="location-input-group">
                        <button className="btn btn-primary" style={{width: '100%'}} onClick={requestOutWork}>
                            신청
                        </button>
                    </div>
                </fieldset>
                <div className="location-input-group">
                    <UserSelectCondition
                        requestUsers={requestUser}
                        approverUsers={approverUser}
                        statusList={statusList}
                        onSearchConditionChange={refreshList}
                        initialDate={initialDate}
                        ExcelComponent={<ExcelComponent data={requestList}/>}
                    />
                </div>
                <div className="table-container">
                    <UpdateStatus
                        users={requestList}
                        refreshList={refreshList}
                    />
                </div>
            </div>
        </div>
    )
        ;
}

export default OutWork
