import { UserRole } from "@prisma/client";
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    // get all users with role USER
    return ctx.prisma.user.findMany({
      where: {
        role: UserRole.USER,
      },
    });
    // return ctx.prisma.user.findMany();
  }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.user.findUnique({
        where: {
          id: input.id,
        },
      });
    }),

  updateRole: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        role: z.nativeEnum(UserRole),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.user.update({
        where: {
          id: input.id,
        },
        data: {
          role: input.role,
        },
      });
    }),
});
