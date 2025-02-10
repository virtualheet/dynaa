'use client';

import { api } from '@/trpc/react'
import useProject from '@/hooks/use-projects'
import { formatDistanceToNow } from 'date-fns'
import { GitCommit } from 'lucide-react'
import Loader from '@/components/ui/loading'

const CommitLog = () => {
  const { project } = useProject()
  const { data: commits, isLoading } = api.project.getCommits.useQuery({
    projectId: project?.id || ''
  }, {
    enabled: !!project?.id
  })

  if (!project) {
    return null
  }

  return (
    <div className="mt-6 bg-black border border-white/5 rounded-3xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-white/5 rounded-xl">
          <GitCommit className="w-5 h-5" />
        </div>
        <h2 className="text-xl font-semibold">Recent Commits</h2>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Loader />
        </div>
      ) : commits?.length === 0 ? (
        <div className="text-center py-12 text-white/50">
          No commits found
        </div>
      ) : (
        <div className="space-y-4">
          {commits?.map((commit) => (
            <div 
              key={commit.id} 
              className="flex flex-col  gap-2 p-4 bg-zinc-900/50 border border-white/15 cursor-pointer rounded-2xl hover:bg-zinc-900/70 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">

                  <p className="text-sm font-medium truncate">
                    {commit.commitMessage}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-2">
                      {commit.commitAuthorAvatar && (
                        <img 
                          src={commit.commitAuthorAvatar} 
                          alt={commit.commitAuthorName}
                          className="w-5 h-5 rounded-full"
                        />
                      )}
                      <span className="text-sm text-white/70">
                        {commit.commitAuthorName}
                      </span>
                    </div>
                    <span className="text-xs text-white/50">
                      {formatDistanceToNow(new Date(commit.commitDate), { addSuffix: true })}
                    </span>
                  </div>
                </div>
                <div className="text-xs text-white/50 font-mono">
                  {commit.commitHash.slice(0, 7)}
                </div>
              </div>
              {commit.summary && (
                <pre className="mt-2 text-sm whitespace-pre-wrap text-white/70 border-t border-white/5 pt-2">
                  {commit.summary}
                </pre>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CommitLog
