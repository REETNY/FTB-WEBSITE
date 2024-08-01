"use client"
import React, {useState, useRef, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Input } from 'rsuite';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import styles from "./signin.module.css"
import { loginUser } from '@/store/Slices/UserSlice';
import { RootState } from '@/store/store';
import Link from 'next/link';


export default function SIGNIN({back}:{back: string}) {
    const user = useSelector((state: RootState) => state.userSlice);
    const isLoggedIn = user.userDetails.isLoggedIn;
    const userMsg = user.userMsg
    const [userDetails, setDetails] = useState<{[key:string]: string}>({
        username: "",
        password: "",
    });
    const [errors, setErrors] = useState<{[key:string]:string}>({
        password: "",
        username: "",
    });
    const [show, setShow] = useState({
        pass: false,
        confirm: false
    });
    const router = useRouter();
    const dispatch = useDispatch();

    console.log(userMsg);
    

    const handleChanges = (value:string, key:string) => {
        setDetails((obj) => ({...obj, [key]: value}));
    }
    const toggleShow = (key:string) => {
        setShow((obj) => ({...obj, [key]: key == "pass" ? !show.pass : !show.confirm }))
    }

    const checkInput = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        const key = e.currentTarget.name;
        const value = e.currentTarget.value;

        if((key == "password" || key == "password") && value.length == 0){
            setErrors((obj) => ({...obj, [key]: "user needs to input their password"}));
        }else if((key == "password" || key == "password") && value.length > 0){
            setErrors((obj) => ({...obj, [key]: ""}));
        }

        if(key == "username" && value.length == 0){
            setErrors((obj) => ({...obj, [key]: "Kindly enter your account username"}));
        }else if((key == "username" || key == "username") && value.length > 0){
            setErrors((obj) => ({...obj, [key]: ""}));
        }
    }

    const checkError1 = () => {
        let errs: string[] = Object.keys(errors);
        let filters = errs.filter((item:string) => errors[item].length > 0 ? true : false);
        if(filters.length == 0){
            return false
        }else{
            return true
        }
    }

    const checkError2 = () => {
        let dets: string[] = Object.keys(userDetails);
        let filters = dets.filter((item:string) => userDetails[item].length == 0 ? item : false);
        if(filters.length == 0){
            return false
        }else{
            return true
        }
    }

    useEffect(() => {
        if(isLoggedIn){
            router.replace((back.length > 0) ? `${back}` : "/");
        }
    }, [isLoggedIn]);

    function login(){
        const objects = {...userDetails};
        delete objects.confirm_password;
        dispatch(loginUser({
            username: objects.username,
            password: objects.password,
        }))
    }

  return (
    <div className={styles.signin_form}>

        <div className={styles.modal_avatar}>
            Login to your account
        </div>

        <div className={styles.modal_login_form}>
            <div className={styles.createInputs}>
                <div className={styles.input_box}>
                    <Input 
                        onMouseLeave={
                            (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => checkInput(e)
                        }
                        onChange={(value:string, e:React.ChangeEvent<HTMLInputElement>) => {
                        handleChanges(value, e.target.name)
                        }} 
                        type='text' 
                        name='username' 
                        value={userDetails.username} 
                        placeholder='Enter Your Username' 
                    />
                </div>
                <div className={styles.error_report}>
                    {errors.username}
                </div>
            </div>

            <div className={styles.createInputs}>
                <div className={styles.input_box}>
                    <Input 
                        onMouseLeave={
                            (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => checkInput(e)
                        } 
                        onChange={(value:string, e:React.ChangeEvent<HTMLInputElement>) => {
                        handleChanges(value, e.target.name)
                        }} 
                        type={show.pass ? "text" : 'password'} 
                        name='password' 
                        value={userDetails.password} 
                        placeholder='Enter Your Password'
                        style={{width: "100%", paddingRight: "35px"}}
                    />
                    <span onClick={() => toggleShow("pass")} className={styles.see_pass}>
                        {
                            show.pass ? <FaEye /> : <FaEyeSlash /> 
                        }
                    </span>
                </div>
                <div className={styles.error_report}>
                    {errors.password}
                    {
                        errors.matching
                        ?   <>
                            <br />
                            {errors.matching}
                            </> 
                        : 
                        ""
                    }
                </div>
            </div>

            <div className={styles.btn_save_user}>
                <button 
                    onClick={() => {
                        login()
                    }} 
                    disabled={(checkError1() || checkError2()) ? true : false}
                    className={styles.saveUser}
                    style={(checkError1() || checkError2()) ? {background: "gray", cursor: "not-allowed"} : {}}
                >
                    Signin
                </button>
            </div>

            {userMsg.length > 0 && <div className={styles.user_not_found}>
                {userMsg}
            </div>}

        </div>

        <div className={styles.other_msgs}>
            Don't have an account yet? <Link href={(back.length != 0) ? `/signup?back_to=${back}` : `/signup`}>create your account</Link>
        </div>

    </div>
  )
}
