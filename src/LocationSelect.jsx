import React from 'react';

const LocationSelect = ({onChange}) => {
    return (
        <div className="select-container">
            <label className="form-label">장소: </label>
            <select
                className="form-select"
                onChange={onChange}
            >
                <option value="">장소를 선택하세요</option>
                <option value="신한은행">신한은행</option>
                <option value="새마을금고">새마을금고</option>
                <option value="국민은행">국민은행</option>
            </select>
        </div>
    );
};

export default LocationSelect;