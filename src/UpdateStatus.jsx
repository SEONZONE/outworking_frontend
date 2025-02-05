import React from 'react';
import api from "./api/axios.js";


const UpdateStatus = ({users, refreshList}) => {
    const updateStatusRouter = async ({data, flag}) => {
        try {
            data.flag = flag;
            console.log(JSON.stringify(data));
            if (!confirm(`[${flag === 'C' ? '승인' : '반려'}]  ${data.요청자이름}님의 요청을 처리 하시겠습니까?`)) return false;
            const response = await api.post('/outwork/status/update', data);
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
                    <th>처리상태</th>
                    <th>외근장소</th>
                    <th>처리일시</th>
                    <th>승인처리</th>
                </tr>
                </thead>
                <tbody>
                {users.map(user => (
                    <tr key={user.IDX}>
                        <td>{user.요청자이름}</td>
                        <td>{user.승인자이름}</td>
                        <td>{user.처리상태화면명}</td>
                        <td>{user.외근장소}</td>
                        <td>{user.처리일시}</td>
                        <td>
                            {user.처리상태 == 'I' ? (
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
                            ) : (
                                <button type="button" className="btn btn-secondary" disabled> 결재완료 </button>
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