import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import Login from "./Login"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

const Body = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
          if (user) {
            const uid = user.uid;
            const {email,displayName} = user;
            dispatch(addUser({uid:uid,email: email, displayName:displayName}));
          } else {
            navigate('/')
          }
        });
    },[]);
    return (
        <Login />
    )
}
export default Body;