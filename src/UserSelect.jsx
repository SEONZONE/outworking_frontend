import React from 'react';

const UserSelect = ({label, users, onChange,value}) => {
    return (
        <div className="select-container">
            <label className="form-label">{label}: </label>
            <select
                class="form-select"
                onChange={onChange}
                value={value}
            >
                <option selected value=''>직원을 선택하세요</option>
                {users.map(user => (
                    <option value={user.아이디} key={user.아이디}>{user.이름}</option>
                ))}
            </select>
        </div>
    );
};

export default UserSelect;