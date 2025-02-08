import { db } from "@/server/db";
import { Octokit } from "octokit";

const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
});


type Response = {
    commitHash: string;
    commitMessage: string;
    commitAuthorName: string;
    commitAuthorAvatar: string;
    commitDate: string;
}

export const getCommits = async (githubUrl: string): Promise<Response[]> => {
    const urlParts = githubUrl.split("/");
    const owner = urlParts[urlParts.length - 2];
    const repo = urlParts[urlParts.length - 1];
    
    if (!owner || !repo) {
        throw new Error("Invalid GitHub URL");
    }
    
    const { data } = await octokit.rest.repos.listCommits({
        owner,
        repo,
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

export const pollCommits = async (projectId: string) => {
    const { project, githubUrl } = await fetchProjectGithubUrl(projectId);
    if (!githubUrl) {
        throw new Error("GitHub URL not found");
    }
    const commitHashes = await getCommits(githubUrl);
    const useprocessedCommits = await filterUnProcessedCommits(projectId, commitHashes);
    return useprocessedCommits;
};

const summarizeCommits = async (githubUrl:string, commitHash: string) => {


}

async function fetchProjectGithubUrl(projectId: string) {
    const project = await db.project.findUnique({
        where: {
            id: projectId,
        },
        select: {
            githubUrl: true,
        },
    });
    return { project, githubUrl: project?.githubUrl };
}

async function filterUnProcessedCommits(projectId: string, commitHashes: Response[]) {
    const processedCommits = await db.commit.findMany({
        where: { projectId },
    });
    const unProcessedCommits = commitHashes.filter((commit) => !processedCommits.some((processedCommit) => processedCommit.commitHash === commit.commitHash));
    return unProcessedCommits;
}


await pollCommits("cm6txc83a000c2zv96ycp93wj").then(console.log);
console.log("done");