import { Octokit } from "octokit";

const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
});

const githubUrl = "https://github.com/docker/genai-stack";

type Response = {
    commitHash: string;
    commitMessage: string;
    commitAuthorName: string;
    commitAuthorAvatar: string;
    commitDate: string;
}  

export const getCommits = async (githubUrl: string): Promise<Response[]> => {
    const { data } = await octokit.rest.repos.listCommits({
        owner: "docker",
        repo: "genai-stack",
    });
    const sortedCommits = data.sort((a, b) => {
        const dateA = a.commit.author?.date || '';
        const dateB = b.commit.author?.date || '';
        return new Date(dateB).getTime() - new Date(dateA).getTime();
    });

    return sortedCommits.map((commit) => ({
        commitHash: commit.sha,
        commitMessage: commit.commit.message,
        commitAuthorName: commit.commit.author?.name || '',
        commitAuthorAvatar: commit.author?.avatar_url || '',
        commitDate: commit.commit.author?.date || '',
    }));
};


console.log(await getCommits(githubUrl));
