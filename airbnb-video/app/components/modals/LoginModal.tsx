'use client';

import { signIn } from 'next-auth/react';
import axios from 'axios';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useState, useCallback } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';

import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/input';
import { toast } from 'react-hot-toast';
import Button from '../Button';
import { useRouter } from 'next/navigation';


/*
*   registerModal과 똑같음
*   변경부분: name input 삭제, onSubmit, lines: 27, 29, 33, 63, 117, 118, 120
*/

const LoginModal = () => {
  const router = useRouter(); ///
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal(); ///////
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: {errors,} } = useForm<FieldValues>({
    defaultValues: { 
      email: '',
      password: '',
    }
  });

  const onSubmit: SubmitHandler<FieldValues>= (data) => { // data는 위의 names, email, password
    setIsLoading(true);
    
    // pages/api/auth/[...nextauth].ts -> CredentialsProvider.credentials
    signIn('credentials', {
      ...data,
      redirect: false,
    })
    .then((callback) => {
      setIsLoading(false);

      if (callback?.ok) {
        toast.success('Logged in');
        router.refresh();
        loginModal.onClose();
      }
      if (callback?.error) {
        toast.error(callback.error);
      }
    })
  }

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Heading title="Welcome to Airbnb" subtitle='Login to your account!' /> 
      <Input 
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input 
        id="password"
        type="password"
        label="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  )

  const footerContent = (
    <div className='flex flex-col gap-4 mt-3'>
      <hr />
      <Button 
        outline 
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => {}}
      />
      <Button 
        outline 
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => {}}
      />
      <div className='text-neutral-500 text-center mt-4 font-light'>
        <div className='flex flex-row justify-center gap-2'>
          <div>
            Already have an account?
          </div>
          <div
            onClick={registerModal.onClose} 
            className='text-neutral-800 cursor-pointer hover:underline'>
            Log in
          </div>
        </div>
      </div>
    </div>
  )

  return (  
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen} 
      title="Login" 
      actionLabel="Continue"
      onClose={loginModal.onClose} 
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
}
 
export default LoginModal;