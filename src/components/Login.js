import { useRef, useState } from "react";
import Header from "./Header";
import validationForm from "../utils/formValidation";
import { auth } from "../utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/userSlice";
function Login() {
  const [signIn, setSignIn] = useState(true);
  const emailRef = useRef();
  const passRef = useRef();
  const nameRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState(null);
  const handleSubmitForm = () => {
    const email = emailRef.current.value;
    const password = passRef.current.value;
    const message = validationForm(email, password);
    setErrorMessage(message);
    if (message) return;
    if (!signIn) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          emailRef.current.value = "";
          passRef.current.value = "";
          updateProfile(auth.currentUser, {
            displayName: nameRef.current.value,
          })
            .then(() => {
              const { email, uid } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: nameRef.current.value,
                })
              );
              navigate("/browse");
            })
            .catch((error) => {
              // An error occurred
              // ...
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage("Email already in use");
        });
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          emailRef.current.value = "";
          passRef.current.value = "";
          navigate("/browse");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage("Invalid credentials");
        });
    }
  };
  return (
    <div>
      <Header />
      <div>
        <img
          className="h-100vh"
          srcSet="https://assets.nflxext.com/ffe/siteui/vlv3/20bf1f4d-1c73-48fd-8689-310d6dd80efc/81bdc063-cb8f-4afe-8a02-a3131ca4ef5e/IN-en-20240812-POP_SIGNUP_TWO_WEEKS-perspective_WEB_7998f3b6-63e3-424a-8328-550cf777ddce_small.jpg 1000w, https://assets.nflxext.com/ffe/siteui/vlv3/20bf1f4d-1c73-48fd-8689-310d6dd80efc/81bdc063-cb8f-4afe-8a02-a3131ca4ef5e/IN-en-20240812-POP_SIGNUP_TWO_WEEKS-perspective_WEB_7998f3b6-63e3-424a-8328-550cf777ddce_medium.jpg 1500w, https://assets.nflxext.com/ffe/siteui/vlv3/20bf1f4d-1c73-48fd-8689-310d6dd80efc/81bdc063-cb8f-4afe-8a02-a3131ca4ef5e/IN-en-20240812-POP_SIGNUP_TWO_WEEKS-perspective_WEB_7998f3b6-63e3-424a-8328-550cf777ddce_large.jpg 1800w"
          alt="logo"
        ></img>
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="w-3/12 my-40 py-10 absolute top-0 bg-black bg-opacity-85 text-center text-white pb-20"
        >
          <h1 className="font-bold text-2xl -mx-4">Sign In</h1>
          <div className="mt-8 p-4">
            {!signIn && (
              <div className="p-4">
                <input
                  className="w-full h-12 p-4 bg-transparent border-slate-500 border-2 rounded-md"
                  placeholder="Enter your Full name"
                  ref={nameRef}
                ></input>
              </div>
            )}
            <div className="p-4">
              <input
                ref={emailRef}
                type="email"
                className="w-full h-12 p-4 bg-transparent border-slate-500 border-2 rounded-md"
                placeholder="Enter your Email address"
              ></input>
            </div>
            <div className="p-4">
              <input
                ref={passRef}
                type="password"
                className="w-full h-12 p-4 bg-transparent border-slate-500 border-2 rounded-md"
                placeholder="Password"
              ></input>
            </div>
            <div className="p-4">
              <button
                className=" bg-red-700 p-4 w-full rounded-md"
                onClick={handleSubmitForm}
              >
                {signIn ? "Sign in" : "Sign Up"}
              </button>
            </div>
          </div>
          <p className=" text-red-600">{errorMessage}</p>
          <p className="my-7 text-slate-400">
            {signIn ? "New to Netflix?" : "Already registered?"}{" "}
            <button
              className="text-white"
              onClick={() => {
                setSignIn(!signIn);
                passRef.current.value = "";
                emailRef.current.value = "";
              }}
            >
              {signIn ? "Sign up" : "Sign In"}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
export default Login;
