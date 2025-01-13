import React from 'react';

const RequestList = ({users}) => {
    return (
        <div>
            <table>
                <thead>
                <td>요청자</td>
                <td>승인자</td>
                <td>요청상태</td>
                <td>외근장소</td>
                <td>요청날짜</td>
                </thead>
                <tbody>
                {users.map(user => (
                    <tr key={user.요청아이디}>
                        <td>{user.요청자이름}</td>
                        <td>{user.승인자이름}</td>
                        <td>{user.요청상태화면명}</td>
                        <td>{user.외근장소}</td>
                        <td>{user.요청날짜}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}
export default RequestList;