import Head from 'next/head'
import React, { useState } from 'react'
import Layout from '../../layout/layout'
import Link from 'next/link'
import styles from '../styles/form.module.css'
import Image from 'next/image'
import {HiAtSymbol, HiFingerPrint,HiOutlineUser } from "react-icons/hi";
import { useFormik } from 'formik';
import { useRouter } from 'next/router'


const validate = values => {
    const errors = {};
    if (!values.username) {
        errors.username = 'Required';
      } else if (values.username.length > 15) {
        errors.username = 'Must be 15 characters or less';
      }
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

    if (!values.cpassword) {
    errors.cpassword = 'Required';
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*?])[A-Za-z\d!@#$%^&*?]{8,}$/.test(values.cpassword)) {
    errors.cpassword = 'Invalid Password address';
    } 

    if(values.password !== values.cpassword){
    errors.cpassword = "Both password must be same"
    }
    return errors;
  };


const register = () => {
    const [show, setShow] = useState({password:false, cpassword:false});
    const router = useRouter();
    const formik = useFormik({
        initialValues: {
          username:'',
          email: '',
          password:'',
          cpassword:''
        },
        validate,
        onSubmit
      });

      async function onSubmit(values){
        console.log(values ,"values")
        const option = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values)
          };
          
          await fetch('http://localhost:3000/api/auth/signup', option)
          .then(res => res.json())
          .then(data => {
            if (data) {
              router.push('http://localhost:3000');
            }
          })
          .catch(error => {
            console.error('Error occurred:', error);
            // Handle the error, e.g., show an error message to the user
          });
        
      }
  return (
    <Layout>
        <Head>
            <title>Register</title>
        </Head>
        <section className='w-3/4 mx-auto flex flex-col gap-5'>
            <div className='title'>
                <h1 className='text-gray-800 text-4xl font-bold py-2'>Register!</h1>
                <p className='w-3/4 mx-auto text-gray-400 py-3'>This is for demo pupose </p>
               
                <form className='flex flex-col gap-2' onSubmit={formik.handleSubmit}>
                    <div className={`${styles.input_group} ${formik.touched.username && formik.errors.username ? 'border-rose-600' : ''}`}>
                        <input 
                            type='text'
                            name='username'
                            placeholder='username'
                            className={styles.input_text}
                            {...formik.getFieldProps('username')}
                        />
                        <span className='icon flex items-center px-4'><HiOutlineUser size={15}/></span>
                    </div>
                    {formik.touched.username && formik.errors.username ? <span className='flex items-center italic text-xs text-red-400 h-px align-top'>{formik.errors.username}</span> : null}
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
                    {formik.touched.email && formik.errors.email ? <span className='flex items-center italic text-xs text-red-400 h-px align-top'>{formik.errors.email}</span> : null}
                    <div className={`${styles.input_group} ${formik.touched.password && formik.errors.password ? 'border-rose-600' : ''}`}>
                        <input 
                            type={`${show.password? "text":"password"}`}
                            name='password'
                            placeholder='password'
                            className={styles.input_text}
                            {...formik.getFieldProps('password')}
                        />
                        <span className='icon flex items-center px-4' onClick={()=> setShow({...show,password:!show.password})}> <HiFingerPrint size={15}/></span>
                    </div>
                    {formik.touched.password && formik.errors.password ? <span className='flex items-center italic text-xs text-red-400 h-px align-top'>{formik.errors.password}</span> : null}
                    <div className={`${styles.input_group} ${formik.touched.cpassword && formik.errors.cpassword ? 'border-rose-600' : ''}`}>
                        <input 
                            type={`${show.cpassword? "text":"password"}`}
                            name='cpassword'
                            placeholder='Confirm Password'
                            className={styles.input_text}
                            {...formik.getFieldProps('cpassword')}
                        />
                        <span className='icon flex items-center px-4' onClick={()=> setShow({...show,cpassword:!show.cpassword})}><HiFingerPrint size={15}/></span>
                    </div>
                    {formik.touched.cpassword && formik.errors.cpassword ? <span className='flex items-center italic text-xs text-red-400 h-px align-top'>{formik.errors.cpassword}</span>: null}
                    <div className="inpu-button">
                        <button  type='submit' className={styles.button}>
                            Register
                        </button>
                        
                    </div>
                    
                    <p className='text-center text-gray-400'> 
                        Already have an account?  
                            <Link href={'/login'} className='text-blue-700'>
                                Sign In
                            </Link>
                    </p>
                </form>
            </div>
        </section>
        
    </Layout>
  )
}

export default register