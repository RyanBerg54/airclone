"use client";
import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback,useState } from "react";
import {
    FieldValues,
    SubmitHandler,
    useForm
} from "react-hook-form";
import useRegisterModal from "@/hooks/useRegisterModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import toast from "react-hot-toast";
import Button from "../Button";
import { signIn } from "next-auth/react";
import useLoginModal from "@/hooks/useLoginModal";



const RegisterModal = () => {

  const loginmodal=useLoginModal()
  const registermodal=useRegisterModal();
  const [isLoading,setisLoading]=useState(false);
  const {register,handleSubmit,formState:{errors,}}=useForm<FieldValues>(
    {defaultValues:{
      name:"",
      email:"",
      password:""
    }}
  );

  const onSubmit:SubmitHandler<FieldValues>=(data)=>
   { setisLoading(true);
    axios.post("/api/register",data).then(()=>{registermodal.onClose();})
    .catch((error)=>{toast.error("Something went wrong!")}).
    finally(()=>setisLoading(false))}

    const toggle=useCallback(()=>{
      registermodal.onClose()
      loginmodal.onOpen()
     },[loginmodal,registermodal])
  
  const bodyContent=( 
  <div className="flex flex-col gap-4">
    <Heading title="Welcome to Airbnb" subtitle="Create an account!"/>
  <Input id="email" label="Email" disabled={isLoading} register={register} errors={errors} required/>
  <Input id="name" label="Name" disabled={isLoading} register={register} errors={errors} required/>
  <Input id="password" label="password" type="password" disabled={isLoading} register={register} errors={errors} required/>
  
  </div> )

  const footerContent=( <div className="flex flex-col gap-3 mt-3">
    <hr />
    <Button outline label="Continue with Google" icon={FcGoogle} onClick={()=>signIn("google")}/>
    <Button outline label="Continue with Github" icon={AiFillGithub} onClick={()=>signIn("github")}/>

      <div className="text-neutral-500 text-center mt-4 font-light "> 
        <div className="flex flex-row items-center gap-3 justify-center">
          <div>Already have an account?</div>
          <div onClick={toggle} className="text-neutral-800 cursor-pointer hover:underline ">Login</div>
          </div>
        </div>
  </div> )
  
  return (
    <Modal
    disabled={isLoading}
    isOpen={registermodal.isOpen}
    title="Register"
    actionLabel="Continue"
    onClose={registermodal.onClose}
    onSubmit={handleSubmit(onSubmit)}
    body={bodyContent}
    footer={footerContent}
    />
  )
}

export default RegisterModal
