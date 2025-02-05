import {useNavigate} from 'react-router-dom'
import api from "../../api/axios.js";
import React from "react";
import '../../assets/css/login.css'
import odinueLogo from '../../assets/img/odinue_ci.svg'

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = React.useState({
        userid: '',
        password: ''
    })

    const handleChange = (e) => {
        if (e.target.name) {
            setFormData({...formData, [e.target.name]: e.target.value})
        }
    }
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post("/outwork/login", {formData})
            if (response.data.success) {
                navigate("/outwork");
            }
        } catch (error) {
            console.log('로그인 실패: ', error);
        }
    }
    return (
        <div className="outwork-login-container">
            <form className="login-form" onSubmit={handleLogin}>
                <img src={odinueLogo}/>
                <h1 className="h3 mb-3 fw-normal">어다인 외근관리</h1>

                <div className="form-floating">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="아이디를 입력하세요."
                        onChange={handleChange}
                        value={formData.userid}
                        id="userid"
                        name="userid"
                    />
                    <label htmlFor="floatingInput">아이디</label>
                </div>
                <div className="form-floating">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="패스워드를 입력하세요"
                        onChange={handleChange}
                        value={formData.password}
                        id="password"
                        name="password"
                    />
                    <label htmlFor="floatingInput">패스워드</label>
                </div>
                <label style={{color: 'red'}}>로그인 정보는 휴가웹과 동일합니다.</label>

                {/*<div className="checkbox mb-3">*/}
                {/*    <label>*/}
                {/*        <input type="checkbox" value="remember-me"/> Remember me*/}
                {/*    </label>*/}
                {/*</div>*/}
                <button className="w-100 btn btn-lg btn-primary" type="submit">로그인</button>
            </form>
        </div>
    );
}

export default Login;
