import React, {useState} from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import {ko} from 'date-fns/locale';

const UserSelectCondition = ({
                                 requestUsers,
                                 approverUsers,
                                 statusList,
                                 onSearchConditionChange,
                                 initialDate,
                                 ExcelComponent
                             }) => {
    const [selectedDate, setSelectedDate] = useState(initialDate);
    const [selectedStatus, setSelectedStatus] = useState('');
    const [selectedApprover, setSelectedApprover] = useState('');
    const [selectedRequester, setSelectedRequester] = useState('');


    const handleSearch = () => {
        const conditions = {
            요청월: selectedDate ? moment(selectedDate).format('YYYYMM') : null,
            처리상태: selectedStatus,
            승인아이디: selectedApprover,
            요청아이디: selectedRequester
        }
        onSearchConditionChange(conditions);
    }

    const handleReset = () => {
        setSelectedDate('');
        setSelectedStatus('');
        setSelectedApprover('');
        setSelectedRequester('');
        onSearchConditionChange();
    }
    return (
        <fieldset className="search-condition-fieldset">
            <legend className="search-condition-legend">요청조회 목록</legend>
            <div className="select-condition-container">
                <div className="select-container">
                    <label className="form-label">처리일시: </label>
                    <DatePicker
                        locale={ko}
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        dateFormat="yyyy년 MM월"
                        showMonthYearPicker
                        placeholderText="월을 선택하세요"
                        className="form-select select-condition-item"
                        defaultValue={selectedDate}
                    />
                </div>
                <div className="select-container">
                    <label className="form-label">처리상태: </label>
                    <select
                        className="form-select select-condition-half"
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                    >
                        <option value="">상태</option>
                        {statusList.map(status => (
                            <option value={status.코드명} key={status.코드명}>
                                {status.표시내용}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="select-container">
                    <label className="form-label">승인자: </label>
                    <select
                        className="form-select select-condition-half"
                        value={selectedApprover}
                        onChange={(e) => setSelectedApprover(e.target.value)}
                    >
                        <option value="">승인자</option>
                        {approverUsers.map(user => (
                            <option value={user.아이디} key={user.아이디}>
                                {user.이름}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="select-container">
                    <label className="form-label">요청자: </label>
                    <select
                        className="form-select select-condition-half"
                        value={selectedRequester}
                        onChange={(e) => setSelectedRequester(e.target.value)}
                    >
                        <option value="">요청자</option>
                        {requestUsers.map(user => (
                            <option value={user.아이디} key={user.아이디}>
                                {user.이름}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="btn-group" role="group">
                    <button
                        className="btn btn-outline-primary"
                        onClick={handleSearch}
                    >
                        조회
                    </button>
                    <button
                        className="btn btn-outline-primary"
                        onClick={handleReset}
                    >
                        초기화
                    </button>
                    {ExcelComponent}
                </div>
            </div>
        </fieldset>
    )
}
export default UserSelectCondition;