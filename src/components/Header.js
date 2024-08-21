import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

function Header() {
  const user = useSelector((store)=>store.user);
  const dispatch = useDispatch();
  const [openSignOut,setOpenSignOut] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        const { email, displayName } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
        navigate('/browse')
      } else {
        navigate("/");
      }
      return ()=>{
        unsubscribe();
      }
    });
  }, []);
  const handleSignOut = () =>{
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        dispatch(removeUser());
      })
      .catch((error) => {
        // An error happened.
      });
  }
  return (
    <div className="absolute w-screen flex justify-between">
      <div className=" bg-gradient-to-b from-black w-full p-10 ">
        <img className="w-36" src="/Netflix_Logo_PMS.png" alt="logo"></img>
      </div>
      {user && (
        <div className=" absolute right-8 top-10 font-bold text-slate-200">
          Welcome back{" "}
          <span className="text-red-300">
            {user?.displayName}{" "}
            <span
              className="cursor-pointer"
              onClick={() => setOpenSignOut((prev) => !prev)}
            >
              {openSignOut ? "˄" : "˅"}
            </span>
          </span>
          {openSignOut && (
            <div
              className="text-white border-2 flex justify-center cursor-pointer"
              onClick={handleSignOut}
            >
              <p className="flex justify-end ">Sign Out</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
export default Header;
