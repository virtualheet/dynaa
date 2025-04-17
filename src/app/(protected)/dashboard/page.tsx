'use client'

import useProject from '@/hooks/use-projects'
import { Github } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect } from 'react'
import CommitLog from './commit-log'
import AskQuestionCard from './ask-question-card'
const Page = () => {
  const { project } = useProject()
  useEffect(() => {
    console.log(project?.id);
}, [project?.id]); 
  
  
  return (
    <div className='w-full flex flex-col bg-black/80 text-white min-h-screen rounded-3xl'
      style={{
        padding: 'clamp(1rem, 0.5vw, 200rem)',
      }}
    >
      {/* Header and GitHub URL */}
      <div className='flex flex-col bg-black rounded-3xl border border-white/5'
        style={{
          gap: 'clamp(0.75rem, 1vw, 1.5rem)',
        }}
      >
        <div className='flex flex-col items-start'
          style={{
            gap: 'clamp(0.75rem, 1vw, 1.5rem)',
          }}
        >
         
          
            <Link 
              href={project?.githubUrl || ''} 
              target="_blank"

              style={{
                padding: 'clamp(0.5rem, 1vw, 1rem) clamp(0.75rem, 1.5vw, 1.5rem)',
                gap: 'clamp(0.375rem, 0.75vw, 0.75rem)',
                fontSize: 'clamp(0.875rem, 1.25vw, 1rem)'
              }}
              className='inline-flex items-center bg-zinc-900 text-white rounded-2xl hover:bg-zinc-800 transition-colors border border-white/5'
            >
              <Github className='text-white mr-2' />
              This project is linked to {project?.githubUrl || ''}
            </Link>
          
        </div>

        {/* Action Buttons */}
        <div className='flex  bg-zinc-900/50 rounded-3xl border border-white/5'
          style={{
            gap: 'clamp(0.75rem, 1vw, 1.5rem)'
          }}
        >
          <button 
            style={{
              padding: 'clamp(0.5rem, 1vw, 0.75rem) clamp(1rem, 2vw, 1.5rem)',
              fontSize: 'clamp(0.875rem, 1.25vw, 1rem)'
            }}
            className='bg-zinc-800 text-white rounded-2xl hover:bg-zinc-700 transition-colors font-medium border border-white/5'
          >
            Analyze Repository
          </button>
          
        </div>
      </div>


      <div className="flex w-full">
        <AskQuestionCard />
      </div>

      <CommitLog />


          

            {/* git commit logs */}
            <div className='flex flex-col bg-black rounded-3xl border border-white/5'>
            </div>
    </div>
  )
}


export default Page
