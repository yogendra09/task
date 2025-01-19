import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
 import { useDispatch } from "react-redux";
import { asyncCurrentUser } from "../store/Actions/userAction";


const GoogleAuth = () => {
    const dispatch = useDispatch();
    const {token} = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        if(token){
            //save token to local storage or any other storage
            localStorage.setItem('token', token);
            dispatch(asyncCurrentUser());
            //redirect to home page
           navigate('/auth/home');
        }else{
            navigate('/login');
        }         
    }, [])

  return (
    <div>
        <h1>Google Auth</h1>
        <p>Please wait...</p>
    </div>
  )
}

export default GoogleAuth