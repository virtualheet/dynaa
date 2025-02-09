import { GoogleGenerativeAI } from "@google/generative-ai"

const genai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genai.getGenerativeModel({
    model: "gemini-1.5-flash",
});

export const aiSummarize = async (diff: string) => {
    const prompt = `You are an expert programmer, and you are trying to summarize a git diff.
    Reminders about the git diff format:
    For every file, there are a few metadata lines, like (for example):
    \`\`\`
    diff --git a/lib/index.js b/lib/index.js
    index aadf691..bfef603 100644
    --- a/lib/index.js
    +++ b/lib/index.js
    \`\`\`
    This means that \`lib/index.js\` was modified in this commit. Note that this is only an example.
    Then there is a specifier of the lines that were modified.
    A line starting with \`+\` means it was added.

    A line that starting with \`-\` means that line was deleted.
    A line that starts with neither \`+\` nor \`-\` is code given for context and better understanding.

     EXAMPLE SUMMARY COMMENTS:
       \`\`\`
    * Raised the amount of returned recordings from \`10\` to \`100\` [packages/server/recordings_api.ts], [packages/server/constants.ts]
    * Fixed a typo in the github action name [.github/workflows/gpt-commit-summarizer.yml]
    * Moved the \`octokit\` initialization to a separate file [src/octokit.ts], [src/index.ts]

    * Added an GEMINI API for completions [packages/utils/apis/gemini.ts]
    * Lowered numeric tolerance for test files
        \`\`\`
    Most commits will have less comments than this examples list.
    The last comment does not include the file names,
    because there were more than two relevant files in the hypothetical commit.
    Do not include parts of the example in your summary.
    It is given only as an example of appropriate comments

    Please summarise the following diff file: \n\n${diff}
    `;

    const response = await model.generateContent(prompt);
    return response.response.text();
}

console.log(await aiSummarize(`
diff --git a/bun.lock b/bun.lock
index efcc02a..e5e3674 100644
--- a/bun.lock
+++ b/bun.lock
@@ -5,6 +5,7 @@
       "name": "dynaa",
       "dependencies": {
         "@clerk/nextjs": "^6.11.0",
+        "@google/generative-ai": "^0.21.0",
         "@hookform/resolvers": "^3.10.0",
         "@prisma/client": "^5.14.0",
         "@radix-ui/react-accordion": "^1.2.2",
@@ -116,6 +117,8 @@
 
     "@floating-ui/utils": ["@floating-ui/utils@0.2.9", "", {}, "sha512-MDWhGtE+eHw5JW7lq4qhc5yRLS11ERl1c7Z6Xd0a58DozHES6EnNNwUWbMiG4J9Cgj053Bhk8zvlhFYKVhULwg=="],
 
+    "@google/generative-ai": ["@google/generative-ai@0.21.0", "", {}, "sha512-7XhUbtnlkSEZK15kN3t+tzIMxsbKm/dSkKBFalj+20NvPKe1kBY7mR2P7vuijEn+f06z5+A8bVGKO0v39cr6Wg=="],
+
     "@hookform/resolvers": ["@hookform/resolvers@3.10.0", "", { "peerDependencies": { "react-hook-form": "^7.0.0" } }, "sha512-79Dv+3mDF7i+2ajj7SkypSKHhl1cbln1OGavqrsF7p6mbUv11xpqpacPsGDCTRvCSjEEIez2ef1NveSVL3b0Ag=="],
 
     "@humanwhocodes/config-array": ["@humanwhocodes/config-array@0.13.0", "", { "dependencies": { "@humanwhocodes/object-schema": "^2.0.3", "debug": "^4.3.1", "minimatch": "^3.0.5" } }, "sha512-DZLEEqFWQFiyK6h5YIeynKx7JlvCYWL0cImfSRXZ9l4Sg2efkFGTuFf6vzXjK1cq6IYkU+Eg/JizXw+TD2vRNw=="],
diff --git a/src/app/(protected)/dashboard/page.tsx b/src/app/(protected)/dashboard/page.tsx
index 6383ac6..9d5ce2b 100644
--- a/src/app/(protected)/dashboard/page.tsx
+++ b/src/app/(protected)/dashboard/page.tsx
@@ -27,10 +27,11 @@ const Page = () => {
         >
          
           
-  
+          {project?.id}
             <Link 
               href={project?.githubUrl || ''} 
               target="_blank"
+
               style={{
                 padding: 'clamp(0.5rem, 1vw, 1rem) clamp(0.75rem, 1.5vw, 1.5rem)',
                 gap: 'clamp(0.375rem, 0.75vw, 0.75rem)',
diff --git a/src/lib/gemini.ts b/src/lib/gemini.ts
new file mode 100644
index 0000000..991aa1a
--- /dev/null
+++ b/src/lib/gemini.ts
@@ -0,0 +1 @@
+    
\ No newline at end of file
diff --git a/src/lib/github.ts b/src/lib/github.ts
index 41dd365..f43f0c8 100644
--- a/src/lib/github.ts
+++ b/src/lib/github.ts
@@ -1,10 +1,10 @@
+import { db } from "@/server/db";
 import { Octokit } from "octokit";
 
 const octokit = new Octokit({
     auth: process.env.GITHUB_TOKEN,
 });
 
-const githubUrl = "https://github.com/docker/genai-stack";
 
 type Response = {
     commitHash: string;
@@ -12,13 +12,22 @@ type Response = {
     commitAuthorName: string;
     commitAuthorAvatar: string;
     commitDate: string;
-}  
+}
 
 export const getCommits = async (githubUrl: string): Promise<Response[]> => {
+    const urlParts = githubUrl.split("/");
+    const owner = urlParts[urlParts.length - 2];
+    const repo = urlParts[urlParts.length - 1];
+    
+    if (!owner || !repo) {
+        throw new Error("Invalid GitHub URL");
+    }
+    
     const { data } = await octokit.rest.repos.listCommits({
-        owner: "docker",
-        repo: "genai-stack",
+        owner,
+        repo,
     });
+
     const sortedCommits = data.sort((a, b) => {
         const dateA = a.commit.author?.date || '';
         const dateB = b.commit.author?.date || '';
@@ -34,5 +43,41 @@ export const getCommits = async (githubUrl: string): Promise<Response[]> => {
     }));
 };
 
+export const pollCommits = async (projectId: string) => {
+    const { project, githubUrl } = await fetchProjectGithubUrl(projectId);
+    if (!githubUrl) {
+        throw new Error("GitHub URL not found");
+    }
+    const commitHashes = await getCommits(githubUrl);
+    const useprocessedCommits = await filterUnProcessedCommits(projectId, commitHashes);
+    return useprocessedCommits;
+};
+
+const summarizeCommits = async (githubUrl:string, commitHash: string) => {
+
+
+}
+
+async function fetchProjectGithubUrl(projectId: string) {
+    const project = await db.project.findUnique({
+        where: {
+            id: projectId,
+        },
+        select: {
+            githubUrl: true,
+        },
+    });
+    return { project, githubUrl: project?.githubUrl };
+}
+
+async function filterUnProcessedCommits(projectId: string, commitHashes: Response[]) {
+    const processedCommits = await db.commit.findMany({
+        where: { projectId },
+    });
+    const unProcessedCommits = commitHashes.filter((commit) => !processedCommits.some((processedCommit) => processedCommit.commitHash === commit.commitHash));
+    return unProcessedCommits;
+}
+
 
-console.log(await getCommits(githubUrl));
+await pollCommits("cm6txc83a000c2zv96ycp93wj").then(console.log);
+console.log("done");
\ No newline at end of file
`));