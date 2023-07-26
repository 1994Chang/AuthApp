import Head from 'next/head'
import React, { useState } from 'react'
import Layout from '../../layout/layout'
import Link from 'next/link'
import styles from '../styles/form.module.css'
import Image from 'next/image'
import {HiAtSymbol, HiFingerPrint } from "react-icons/hi";
import { signIn, signOut } from "next-auth/react"
import { useFormik } from 'formik';
import { useRouter } from 'next/router'


const validate = values => {
    const errors = {};
    if (!values.email) {
      errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }

    if (!values.password) {
        errors.password = 'Required';
      } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*?])[A-Za-z\d!@#$%^&*?]{8,}$/.test(values.password)) {
        errors.password = 'Invalid Password address';
      }      
  
    return errors;
  };

const login = () => {
    const [show, setShow] = useState(false);
    const router = useRouter();
    const formik = useFormik({
        initialValues: {
          email: '',
          password:''
        },
        validate,
        onSubmit
      });

      async function onSubmit(values){
        const status = await signIn('credentials',{
          redirect:false,
          email:values.email,
          password : values.password,
          callbackUrl:'/'
        })
        if(status.ok) router.push(status.url)
      }
    //googlehandler
    async function handleGoogleSignIn(){
        signIn('google',{callbackUrl:"http://loaclhost:3000"})
    }

    //github login
    async function handleGithubSignIn(){
        signIn('github',{callbackUrl:"http://loaclhost:3000"})
    }

  return (
    <Layout>
        <Head>
            <title>Login</title>
        </Head>
        <section className='w-3/4 mx-auto flex flex-col gap-5'>
            <div className='title'>
                <h1 className='text-gray-800 text-4xl font-bold py-2'>Welcome!</h1>
                <p className='w-11/12 mx-auto text-gray-400 py-2'>This is for demo pupose </p>
               
                <form className='flex flex-col gap-3' onSubmit={formik.handleSubmit}>
                    <div className={`${styles.input_group} ${formik.touched.email && formik.errors.email ? 'border-rose-600' : ''}`}>
                        <input 
                            type='email'
                            name='email'
                            placeholder='email'
                            className={styles.input_text}
                            {...formik.getFieldProps('email')}
                        />
                        <span className='icon flex items-center px-4'><HiAtSymbol size={15}/></span>
                    </div>
                   {formik.errors.email ?  <span className='flex items-center italic text-xs text-red-400 h-px align-top'>{formik.errors.email}</span> : null}
                    <div className={`${styles.input_group} ${formik.touched.password && formik.errors.password ? 'border-rose-600' : ''}`}>
                        <input 
                            type={`${show? "text":"password"}`}
                            name='password'
                            placeholder='password'
                            className={styles.input_text}
                            {...formik.getFieldProps('password')}
                        />
                        <span className='icon flex items-center px-4' onClick={()=> setShow(!show)}><HiFingerPrint size={15}/></span>
                    </div>
                    {formik.errors.password ? <span className='flex items-center italic text-xs text-red-400 h-px	align-top'>{formik.errors.password}</span> : null}
                    <div className="inpu-button">
                        <button  type='submit' className={styles.button}>
                            Login
                        </button>
                        
                    </div>
                    <div className="input-button">
                    <button  type='button' className={styles.button_custom} onClick={handleGoogleSignIn}>
                            Sign in with Google <Image src={'/asset/google.svg'} width="20" height={20}></Image>
                        </button>
                    </div>
                    <div className="input-button">
                        <button  type='button' className={styles.button_custom} onClick={handleGithubSignIn}>
                            Sign in with Github <Image src={'/asset/github.svg'} width="25" height={25}></Image>
                        </button>
                    </div>
                    <p className='text-center text-gray-400'> 
                        don`t have an account yet? 
                            <Link href={'/register'} className='text-blue-700'>
                                Sign Up
                            </Link>
                    </p>
                </form>
            </div>
        </section>
    </Layout>
  )
}

export default login