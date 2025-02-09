import { pollCommits } from "@/lib/github";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";

export const projectRouter = createTRPCRouter({
    createProject: protectedProcedure
        .input(z.object({
            name: z.string().min(1, "Project name is required"),
            githubUrl: z.string()
                .url("Must be a valid URL")
                .regex(/^https?:\/\/(?:www\.)?github\.com\/.+\/.+/i, "Must be a valid GitHub repository URL"),
            githubToken: z.string().optional(),
        }))
        .mutation(async ({ ctx, input }) => {
            const project = await ctx.db.project.create({
                data: {
                    name: input.name,
                    githubUrl: input.githubUrl,
                    userToProjects: {
                        create: {
                            userId: ctx.user.userId!
                        }
                    }
                }
            });
            await pollCommits(project.id);
            return project;
        }),
    getProjects: protectedProcedure.query(async ({ ctx }) => {

        return await ctx.db.project.findMany({
            where: {
                userToProjects: {
                    some: {
                        userId: ctx.user.userId!
                    }
                },
                deletedAt: null
            }
        });

        
    }),
    getCommits: protectedProcedure.input(z.object({
        projectId: z.string()
    })).query(async ({ ctx, input }) => {
        pollCommits(input.projectId).then().catch(console.error);
        return await ctx.db.commit.findMany({
            where: { projectId: input.projectId }
        });
    }),

});


