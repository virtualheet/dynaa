'use client'

import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { api } from '@/utils/api';

interface ImportRepoProps {
  onSelectRepo: (url: string) => void;
  onProjectName: (name: string) => void;
}

const ImportRepo: React.FC<ImportRepoProps> = ({ onSelectRepo, onProjectName }) => {
  const { user } = useUser();
  const [repos, setRepos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const githubAccount = user?.externalAccounts.find((account) => account.provider === 'github');
  const githubUsername = githubAccount?.username;

  const { data, isLoading, isError } = api.github.getUserRepos.useQuery(
    { username: githubUsername || '' },
    { enabled: !!githubUsername } // Only fetch if githubUsername is available
  );

  useEffect(() => {
    if (isLoading) {
      setLoading(true);
    } else if (isError) {
      setError('Failed to fetch repositories');
      setLoading(false);
    } else if (data) {
      setRepos(data);
      setLoading(false);
    }
  }, [data, isLoading, isError]);

  if (!githubUsername) {
    return <p className="text-white/70">Please link your GitHub account first.</p>;
  }

  return (
    <div className="space-y-2">
      {loading && <p className="text-white">Loading repositories...</p>}
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {!loading && !error && (
        <select
          onChange={(e) => {
            const url = e.target.value;
            if (url) {
              const selectedRepo = repos.find((repo) => repo.html_url === url);
              if (selectedRepo) {
                onSelectRepo(url);
                onProjectName(selectedRepo.name);
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
  );
};

export default ImportRepo;