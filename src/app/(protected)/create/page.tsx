'use client'
import useRefetch from '@/hooks/use-refetch'
import { api } from '@/trpc/react'
import { Github } from 'lucide-react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

type FormInput = {
  repoUrl: string
  projectName: string
  githubToken: string
}

const CreateProject = () => {
  const { register, handleSubmit, reset } = useForm<FormInput>()
  const createProject = api.project.createProject.useMutation()
  const refetch = useRefetch()

  function onSubmit(data: FormInput) {
    createProject.mutate({
      name: data.projectName,
      githubUrl: data.repoUrl,
      githubToken: data.githubToken
    }, {
      onSuccess: () => {
        toast.success('Project created successfully')
        refetch()
        reset()
      },
      onError: (error) => {
        toast.error('Failed to create project')
      }
    })
    return true
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-black/80 text-white p-6'>
      <div className='w-full max-w-md bg-black border border-white/5 rounded-3xl p-8'>
        <div className='flex items-center gap-3 mb-8'>
          <div className='p-3 bg-white/5 rounded-2xl'>
            <Github className='w-6 h-6' />
          </div>
          <h1 className='text-2xl font-bold'>Link Repository</h1>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
          <div className='space-y-2'>
            <label htmlFor='projectName' className='text-sm font-medium text-white/70'>
              Project Name
            </label>
            <input
              {...register('projectName', { required: true })}
              id='projectName'
              type='text'
              className='w-full bg-white/5 border border-white/10 text-white rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all placeholder:text-white/30'
              placeholder='Enter project name'
            />
          </div>

          <div className='space-y-2'>
            <label htmlFor='repoUrl' className='text-sm font-medium text-white/70'>
              GitHub Repository URL
            </label>
            <input
              {...register('repoUrl', { required: true })}
              id='repoUrl'
              type='url'
              className='w-full bg-white/5 border border-white/10 text-white rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all placeholder:text-white/30'
              placeholder='https://github.com/username/repo'
            />
          </div>

          <div className='space-y-2'>
            <label htmlFor='githubToken' className='text-sm font-medium text-white/70'>
              GitHub Token <span className='text-white/50'>(optional)</span>
            </label>
            <input
              {...register('githubToken')}
              id='githubToken'
              type='password'
              className='w-full bg-white/5 border border-white/10 text-white rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all placeholder:text-white/30'
              placeholder='Enter your GitHub token'
            />
          </div>

          <button 
            type='submit'
            disabled={createProject.isPending}
            className='w-full bg-white/10 text-white border border-white/10 rounded-2xl py-3 font-medium hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-8'
          >
            {createProject.isPending ? (
              <span className='flex items-center justify-center gap-2'>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Creating...
              </span>
            ) : 'Create Project'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateProject
