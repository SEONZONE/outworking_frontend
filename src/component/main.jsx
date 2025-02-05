import {createRoot} from 'react-dom/client'
import {BrowserRouter} from "react-router-dom";
import {Routes, Route} from 'react-router-dom';
import '../assets/css/index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import OutWork from './OutWork.jsx'
import Login from './login/Login.jsx'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/outwork" element={<OutWork/>}/>
        </Routes>
    </BrowserRouter>
)
