// components/ImportRepo.tsx

import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'

interface ImportRepoProps {
  onSelectRepo: (url: string) => void
  onProjectName: (name: string) => void
  githubToken?: string
}

const ImportRepo: React.FC<ImportRepoProps> = ({ onSelectRepo, onProjectName, githubToken }) => {
  const { user } = useUser()
  const [repos, setRepos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const githubAccount = user?.externalAccounts.find(
    (account) => account.provider === 'github'
  )
  const githubUsername = githubAccount?.username

  useEffect(() => {
    if (!githubUsername) return

    const fetchRepos = async () => {
      setLoading(true)
      setError(null)
      try {
        const headers: HeadersInit = {}
        if (githubToken) {
          headers.Authorization = `Bearer ${githubToken}`
        }

        const response = await fetch(
          `https://api.github.com/users/${githubUsername}/repos`,
          { headers }
        )

        if (!response.ok) {
          throw new Error('Failed to fetch repositories')
        }

        const data = await response.json()
        setRepos(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }

    }

    fetchRepos()
  }, [githubUsername, githubToken])

  if (!githubUsername) {
    return <p className="text-white/70">Please link your GitHub account first.</p>
  }

  return (
    <div className="space-y-2">
      {loading && <p className="text-white">Loading repositories...</p>}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {!loading && !error && (
       <select
       onChange={(e) => {
         const url = e.target.value
         if (url) {
           const selectedRepo = repos.find((repo) => repo.html_url === url)
           if (selectedRepo) {
             onSelectRepo(url)
             onProjectName(selectedRepo.name) 
             console.log(selectedRepo.name);
             console.log(url);
             
           }
         }
       }}
       className="w-full bg-black border border-white/10 text-white rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all placeholder:text-white/30"
     >
       <option value="">Select a repository</option>
       {repos.map((repo) => (
         <option key={repo.id} value={repo.html_url}>
           {repo.name}
         </option>
       ))}
     </select>
      )}
    </div>
  )
}

export default ImportRepo