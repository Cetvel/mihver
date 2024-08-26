import { v } from "convex/values";
import { mutation, query } from "../_generated/server";
import { Id } from "../_generated/dataModel";

export const generateUploadUrl = mutation(async (ctx) => {
    const url = await ctx.storage.generateUploadUrl();
    console.log("Generated upload URL:", url);
    return url
});

export const sendCoverImage = mutation({
    args: {
        storageId: v.id("_storage"),
        clerkId: v.string(),
    },
    handler: async (ctx, args) => {
        try {
            console.log("args", args);
            const userArray = await ctx.db
                .query("user")
                .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
                .collect();
            const user = userArray[0];

            console.log("user", user);
            if (!user) {
                throw new Error("User not found");
            }
            if (
                !(user.coverPhotoId == "kg20a9gfvnh7zfy2qjja3hxsvh6zhesn" ||
                    user.coverPhotoId == "kg2fvr6vzr9j12377w24d4an0n6zgce1")
            ) {
                await deleteById(ctx, { storageId: user.coverPhotoId! });
            }
            await ctx.db.patch(user._id, { coverPhotoId: args.storageId });
        } catch (error: any) {
            console.log("error", error);
            throw new Error(error);
        }

    },
});

export const sendTimerImage = mutation({
    args: {
        storageId: v.id("_storage"),
        clerkId: v.string(),
    },
    handler: async (ctx, args) => {
        try {
            console.log("args", args);
            const userArray = await ctx.db
                .query("user")
                .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
                .collect();
            const user = userArray[0];

            console.log("user", user);
            if (!user) {
                throw new Error("User not found");
            }
            console.log("user.timerPhotoId", user.timerPhotoId);
            if (
                !((user.timerPhotoId == "kg23sjfbz7d3qfh1t4kcssv62d6zhser") ||
                    (user.timerPhotoId == "kg2efvd54t4rcscty321frvzbx6zg7md"))
            ) {
                await deleteById(ctx, { storageId: user.timerPhotoId! });
            }
            await ctx.db.patch(user._id, { timerPhotoId: args.storageId });
        } catch (error: any) {
            console.log("error", error);
            throw new Error(error);
        }

    },
});

export const deleteById = mutation({
    args: {
        storageId: v.id("_storage"),
    },
    handler: async (ctx, args) => {
        return await ctx.storage.delete(args.storageId);
    },
});

export const getUser = query({
    args: { clerkId: v.string() },
    handler: async (ctx, args) => {
        const user = await ctx.db
            .query("user")
            .filter((q) => q.eq("clerkId", args.clerkId))
            .unique();

        return user;
    },
});

export const deleteCoverImage = mutation({
    args: {
        clerkId: v.string(),
    },
    handler: async (ctx:any, args:any) => {
        try {
            const userArray = await ctx.db
                .query("user")
                .filter((q:any) => q.eq(q.field("clerkId"), args.clerkId))
                .collect();
            const user = userArray[0];

            if (!user) {
                throw new Error("User not found");
            }

            if (
                ((user.coverPhotoId == "kg20a9gfvnh7zfy2qjja3hxsvh6zhesn") ||
                    (user.coverPhotoId == "kg2fvr6vzr9j12377w24d4an0n6zgce1"))
            ) {
                throw Error ("Varsayılan resimler silinemez.")
            }
            await deleteById(ctx, { storageId: user.coverPhotoId! });
            const defaultCoverImage = "kg20a9gfvnh7zfy2qjja3hxsvh6zhesn";
            await ctx.db.patch(user._id, { coverPhotoId: defaultCoverImage as Id<"_storage">});
        
        } catch (error: any) {
            console.log("error", error);
            throw new Error(error);
        }

    },
})

export const deleteTimerImage = mutation({
    args: {
        clerkId: v.string(),
    },
    handler: async (ctx:any, args:any) => {
        try {
            const userArray = await ctx.db
                .query("user")
                .filter((q:any) => q.eq(q.field("clerkId"), args.clerkId))
                .collect();
            const user = userArray[0];

            if (!user) {
                throw new Error("User not found");
            }

            if (
                ((user.timerPhotoId == "kg23sjfbz7d3qfh1t4kcssv62d6zhser") ||
                    (user.timerPhotoId == "kg2efvd54t4rcscty321frvzbx6zg7md"))
            ) {
                throw Error ("Varsayılan resimler silinemez.")
            }
            await deleteById(ctx, { storageId: user.timerPhotoId! });
            const defaultTimerImage = "kg23sjfbz7d3qfh1t4kcssv62d6zhser";
            await ctx.db.patch(user._id, { timerPhotoId: defaultTimerImage as Id<"_storage">});
        
        } catch (error: any) {
            console.log("error", error);
            throw new Error(error);
        }

    },
})