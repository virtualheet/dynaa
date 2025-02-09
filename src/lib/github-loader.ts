import { GithubRepoLoader } from "@langchain/community/document_loaders/web/github";

export const loadGithubRepo = async (githubUrl: string, githubToken?: string) => {
    const loader = new GithubRepoLoader(githubUrl,{
        accessToken: githubToken || '',
        branch: 'main',
        ignoreFiles: [
            "node_modules",
            "dist",
            "build",
            "test",
            "tests",
            "package-lock.json",
            "yarn.lock",
            "pnpm-lock.yaml",
            "bun.lockb",
            "Gemfile.lock",
            "Gemfile",

        ],
        recursive: true,
        unknown: "warn", 
        maxConcurrency: 5,
    });


    const docs = await loader.load();
    return docs;

}

console.log(await loadGithubRepo("https://github.com/virtualheet/dynaa"));



