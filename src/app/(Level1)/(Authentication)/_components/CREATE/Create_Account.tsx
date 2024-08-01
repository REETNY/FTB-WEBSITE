"use client";
import React, {useState, useRef, useEffect} from 'react';
import styles from "./create.module.css";
import { Input } from 'rsuite';
import { Uploader, Message, Loader, useToaster } from "rsuite"
import AvatarIcon from '@rsuite/icons/legacy/Avatar';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { createUser } from '@/store/Slices/UserSlice';
import { useRouter } from 'next/navigation';
import { addingNewUser } from '@/store/Slices/DataSlice';

interface FileType {
    /** File Name */
    name?: string;
  
    /** File unique identifier */
    fileKey?: number | string;
  
    /** File upload status */
    status?: 'inited' | 'uploading' | 'error' | 'finished';
  
    /** File upload status */
    progress?: number;
  
    /** The url of the file can be previewed. */
    url?: string;
}

export default function Create_Account({back}:{back:string | null}) {
    const dispatch = useDispatch()
    const toaster = useToaster();
    const [uploading, setUploading] = React.useState(false);
    const [fileInfo, setFileInfo] = React.useState(null);
    const [userDetails, setDetails] = useState<{[key:string]: string}>({
        name: "",
        username: "",
        password: "",
        confirm_password: "",
        email: ""
    });
    const [errors, setErrors] = useState<{[key:string]:string}>({
        name: "",
        password: "",
        confirm_password: "",
        email: "",
        username: "",
        matching: ""
    })
    const [show, setShow] = useState({
        pass: false,
        confirm: false
    });
    const router = useRouter()

    const handleChanges = (value:string, key:string) => {
        setDetails((obj) => ({...obj, [key]: value}));

        if(key == "name" && value.length != 0){
            let tester = name_regex.test(value);
            if(!tester){
                setErrors((obj) => ({...obj, [key]: "this field cannot be left empty intentionally"}));
            }else{
                setErrors((obj) => ({...obj, [key]: ""}));
            }
        }else if(key == "name" && value.length == 0){
            setErrors((obj) => ({...obj, [key]: "length of text must be greater than 1"}));
        }

        if(key == "password" || key == "confirm_password"){
            let tester = password_regex.test(value);
            if(!tester){
                setErrors((obj) => ({...obj, [key]: "password length must be greater than 7 and less than 13, allowed special characters (&*@#!%+_-)"}));

                if(key == "password" && value == userDetails.confirm_password){
                    setErrors((obj) => ({...obj, matching: ""}));
                }else if(key == "password" && value != userDetails.confirm_password){
                    setErrors((obj) => ({...obj, matching: "both password input field does not match"}));
                }

                if(key == "confirm_password" && value == userDetails.password){
                    setErrors((obj) => ({...obj, matching: ""}));
                }else if(key == "confirm_password" && value != userDetails.password){
                    setErrors((obj) => ({...obj, matching: "both password input field does not match"}));
                }
                

            }else{
                setErrors((obj) => ({...obj, [key]: ""}));
                
                if(key == "password" && value == userDetails.confirm_password){
                    setErrors((obj) => ({...obj, matching: ""}));
                }else if(key == "password" && value != userDetails.confirm_password){
                    setErrors((obj) => ({...obj, matching: "both password input field does not match"}));
                }

                if(key == "confirm_password" && value == userDetails.password){
                    setErrors((obj) => ({...obj, matching: ""}));
                }else if(key == "confirm_password" && value != userDetails.password){
                    setErrors((obj) => ({...obj, matching: "both password input field does not match"}));
                }
            }
        }else if((key == "password" || key == "confirm_password") && value.length == 0){
            setErrors((obj) => ({...obj, [key]: "user needs to input his or her preferred password"}));
        }

        if(key == "email"){
            let tester = email_regex.test(value);
            if(!tester){
                setErrors((obj) => ({...obj, [key]: "email is not a valid email, kindly re-enter your mail account"}));
            }else{
                setErrors((obj) => ({...obj, [key]: ""}));
            }
        }else if(key == "email" && value.length == 0){
            setErrors((obj) => ({...obj, [key]: "user has to enter their email"}));
        }

        if(key == "username"){
            let tester = username_regex.test(value);
            if(!tester){
                setErrors((obj) => ({...obj, [key]: "Kindly choose another username allowed characters are as followed (&#@!_) and length must equal to or greater than 6"}));
            }else{
                setErrors((obj) => ({...obj, [key]: ""}));
            }
        }else if(key == "username" && value.length == 0){
            setErrors((obj) => ({...obj, [key]: "user needs to choice a suitable username"}));
        }
    }

    const toggleShow = (key:string) => {
        setShow((obj) => ({...obj, [key]: key == "pass" ? !show.pass : !show.confirm }))
    }

    const username_regex = /^[a-zA-z0-9&#@!_]{6,12}$/gi;
    const password_regex = /^[a-zA-Z0-9&*@#!%+_-]{8,20}$/gi;
    const name_regex = /[a-zA-Z]+/gi;
    const email_regex = /^[a-zA-Z0-9]+[a-zA-Z0-9]*@{1}[a-z]{1,}\.{1}[a-zA-Z]{2,}$/gi;
    
    const checkInput = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        const key = e.currentTarget.name;
        const value = e.currentTarget.value;
        if(key == "name" && value.length != 0){
            let tester = name_regex.test(value);
            if(!tester){
                setErrors((obj) => ({...obj, [key]: "this field cannot be left empty intentionally"}));
            }else{
                setErrors((obj) => ({...obj, [key]: ""}));
            }
        }else if(key == "name" && value.length == 0){
            setErrors((obj) => ({...obj, [key]: "length of text must be greater than 1"}));
        }

        if(key == "password" || key == "confirm_password"){
            let tester = password_regex.test(value);
            if(!tester){
                setErrors((obj) => ({...obj, [key]: "password length must be greater than 7 and less than 13, allowed special characters (&*@#!%+_-)"}));
            }else{
                setErrors((obj) => ({...obj, [key]: ""}));
            }
        }else if((key == "password" || key == "confirm_password") && value.length == 0){
            setErrors((obj) => ({...obj, [key]: "user needs to input his or her preferred password"}));
        }

        if(key == "email"){
            let tester = email_regex.test(value);
            if(!tester){
                setErrors((obj) => ({...obj, [key]: "email is not a valid email, kindly re-enter your mail account"}));
            }else{
                setErrors((obj) => ({...obj, [key]: ""}));
            }
        }else if(key == "email" && value.length == 0){
            setErrors((obj) => ({...obj, [key]: "user has to enter their email"}));
        }

        if(key == "username"){
            let tester = username_regex.test(value);
            if(!tester){
                setErrors((obj) => ({...obj, [key]: "Kindly choose another username allowed characters are as followed (&#@!_)"}));
            }else{
                setErrors((obj) => ({...obj, [key]: ""}));
            }
        }else if(key == "username" && value.length == 0){
            setErrors((obj) => ({...obj, [key]: "user needs to choice a suitable username"}));
        }
    }

    const previewFile = (file:any, callback:any) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            callback(reader.result);
        };
        reader.readAsDataURL(file);
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


  return (
    <div className={styles.createModule}>

        <div className={styles.createInputs_avatar}>
            <Uploader
                fileListVisible={false}
                listType="picture"
                action=""
                onUpload={file => {
                    setUploading(true);
                    previewFile(file.blobFile, (value: React.SetStateAction<null>) => {
                    setFileInfo(value);
                    });
                }}
                onSuccess={(response, file) => {
                    setUploading(false);
                    toaster.push(<Message type="success">Uploaded successfully</Message>);
                }}
                onError={() => {
                    setFileInfo(null);
                    setUploading(false);
                    toaster.push(<Message type="error">Upload failed</Message>);
                }}
            >
                <button style={{ width: 150, height: 150 }}>
                    {uploading && <Loader backdrop center />}
                    {fileInfo ? (
                    <img src={fileInfo} width="100%" height="100%" />
                    ) : (
                    <AvatarIcon style={{ fontSize: 80 }} />
                    )}
                </button>
            </Uploader>
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
                    type='text' 
                    name='name' 
                    value={userDetails.name} 
                    placeholder='Enter Your Name'
                 />
            </div>
            <div className={styles.error_report}>
                {errors.name}
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
                    type='text' 
                    name='username' 
                    value={userDetails.username} 
                    placeholder='Enter Your Custom Username' 
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

        <div className={styles.createInputs}>
            <div className={styles.input_box}>
                <Input 
                    onMouseLeave={
                        (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => checkInput(e)
                    } 
                    onChange={(value:string, e:React.ChangeEvent<HTMLInputElement>) => {
                        handleChanges(value, e.target.name)
                    }} 
                    type={show.confirm ? "text" : 'password'} 
                    name='confirm_password' 
                    value={userDetails.confirm_password} 
                    placeholder='Confirm Your Password' 
                />
                <span onClick={() => toggleShow("confirm")} className={styles.see_pass}>
                    {
                        show.confirm ? <FaEye /> : <FaEyeSlash /> 
                    }
                </span>
            </div>
            <div className={styles.error_report}>
                {errors.confirm_password}
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

        <div className={styles.createInputs}>
            <div className={styles.input_box}>
                <Input 
                    onMouseLeave={
                        (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => checkInput(e)
                    } 
                    type='email' 
                    onChange={(value:string, e:React.ChangeEvent<HTMLInputElement>) => {
                        handleChanges(value, e.target.name)
                    }} 
                    name='email' 
                    value={userDetails.email} 
                    placeholder='Enter Your Email'
                />
            </div>
            <div className={styles.error_report}>
                {errors.email}
            </div>
        </div>

        <div className={styles.btn_save_user}>
            <button 
                onClick={() => {
                    const objects = {...userDetails};
                    delete objects.confirm_password;
                    dispatch(createUser({
                        blob: fileInfo || null,
                        name: objects.name,
                        username: objects.username,
                        password: objects.password,
                        email: objects.email
                    }))
                    dispatch(addingNewUser())
                    router.replace((back != null && back.length > 0) ? `${back}` : "/")
                }} 
                disabled={(checkError1() || checkError2()) ? true : false}
                className={styles.saveUser}
                style={(checkError1() || checkError2()) ? {background: "gray", cursor: "not-allowed"} : {}}
            >
                Create User
            </button>
        </div>

    </div>
  )
}
