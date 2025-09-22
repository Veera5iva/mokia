'use client';
import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const PasswordInput = ({
   password,
   onPasswordChange
}: {
   password: string,
   onPasswordChange: (password: string) => void
}) => {
   const [isVisible, setIsVisible] = useState(false);

   return (
      <div className='w-full'>
         <div className='relative'>
            <input
               id='password'
               type={isVisible ? 'text' : 'password'}
               value={password}
               onChange={(e) => onPasswordChange(e.target.value)}
               placeholder='Password'
               className='w-full p-2 border-2 rounded-md bg-background outline-none focus-within:border-blue-700 transition'
            />
            <button
               type='button'
               onClick={() => setIsVisible((prev) => !prev)}
               aria-label={isVisible ? 'Hide password' : 'Show password'}
               className='absolute inset-y-0 right-0 outline-none flex items-center justify-center w-9 text-muted-foreground/80 hover:text-foreground'
            >
               {isVisible ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
         </div>
      </div>
   );
};

export default PasswordInput;