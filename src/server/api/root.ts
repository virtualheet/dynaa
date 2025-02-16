import { createTRPCRouter, createCallerFactory } from "@/server/api/trpc";
import { projectRouter } from "./routers/project";
import { githubRouter } from "./routers/githubRouter";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  project: projectRouter,
  github : githubRouter
});


// export type definition of API
export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
