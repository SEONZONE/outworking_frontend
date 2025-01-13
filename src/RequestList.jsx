import React from 'react';

const RequestList = ({users}) => {
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
                                    <button type="button" className="btn btn-success btn-sm">승인</button>
                                    <button type="button" className="btn btn-danger btn-sm">반려</button>
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
export default RequestList;