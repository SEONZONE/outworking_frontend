import React from 'react';
import axios from "axios";


const UpdateStatus = ({users, refreshList}) => {
    const updateStatusRouter = async ({data, flag}) => {
        try {
            data.flag = flag;
            console.log(JSON.stringify(data));
            if (!confirm(`[${flag === 'C' ? '승인' : '반려'}]  ${data.요청자이름}님의 요청을 처리 하시겠습니까?`)) return false;
            const response = await axios.post('http://localhost:3000/outwork/status/update', data);
            alert(response.data.message);
            await refreshList();
        } catch (error) {
            alert('승인/반려가 실패 하였습니다 ', error);
            console.log(error);
        }
    }
    return (
        <div>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>요청자</th>
                    <th>승인자</th>
                    <th>요청상태</th>
                    <th>외근장소</th>
                    <th>요청날짜</th>
                    <th>승인처리</th>
                </tr>
                </thead>
                <tbody>
                {users.map(user => (
                    <tr>
                        <td>{user.요청자이름}</td>
                        <td>{user.승인자이름}</td>
                        <td>{user.요청상태화면명}</td>
                        <td>{user.외근장소}</td>
                        <td>{user.요청날짜}</td>
                        <td>
                            {user.요청상태 == 'I' && (
                                <div className="btn-group" role="group">
                                    <button type="button" onClick={() => {
                                        updateStatusRouter({data: user, flag: 'C'})
                                    }} className="btn btn-success btn-sm">승인
                                    </button>
                                    <button type="button" onClick={() => {
                                        updateStatusRouter({data: user, flag: 'R'})
                                    }} className="btn btn-danger btn-sm">반려
                                    </button>
                                </div>
                            )}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}
export default UpdateStatus;