

import React from 'react' 
import { useForm } from 'react-hook-form';

type FormInput = {
  repoUrl: string;
  projectName: string;
  githubToken?: string;
}


const page = () => {
const {register, handleSubmit,reset} = useForm<FormInput>()
  return (
    <div className='flex items-center gap-12 justify-center h-full'>
      {/* <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="text" {...register("repoUrl")} placeholder='Repo URL' />
        <input type="text" {...register("projectName")} placeholder='Project Name' />
        <input type="text" {...register("githubToken")} placeholder='Github Token' />
        <button type='submit'>Create</button>
      </form> */}
    </div>
  )

}

export default page
