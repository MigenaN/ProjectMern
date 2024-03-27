import axios from "axios";
import { useNavigate } from "react-router-dom";
import './style.css'

const LogOut = () => {
const navigate = useNavigate();
    const logOut = () => {
        axios.post('http://localhost:8000/api/logout', {}, { withCredentials: true })
        .then(res => {
            localStorage.removeItem('userId');
            window.location.reload();
            
            navigate('/auth');
        })
        .catch(err => console.log(err));
       
        
    }

    return (
        <button className="btn" onClick={logOut}>Log Out</button>
    )
}
export default LogOut;