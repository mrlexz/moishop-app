import { StorageKeys } from "@/constants/StorageKeys";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createRouteHandler,
  createUploadthing,
  UploadThingError,
} from "uploadthing/server";
import type { FileRouter } from "uploadthing/server";
import { z } from "zod";

import { makeClient } from "@/app/HOCs/apollo-wrapper";
import {
  CREATE_CONFIGURATION,
  UPDATE_CONFIGURATION,
} from "../graphql/configuration";

const f = createUploadthing();

const auth = (req: Request) => ({ id: "fakeId" }); // Fake auth function

const uploadRouter = {
  videoAndImage: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 4,
    },
    video: {
      maxFileSize: "64MB",
      maxFileCount: 1,
    },
  })
    .input(z.object({ configId: z.string().optional() }))
    .middleware(async ({ input }) => {
      return {
        input,
      };
    })
    // .middleware(async ({ req }) => {
    //   // This code runs on your server before upload
    //   const token = await AsyncStorage.getItem(StorageKeys.TOKEN)

    //   // If you throw, the user will not be able to upload
    //   if (!token) throw new UploadThingError("Unauthorized");

    //   // Whatever is returned here is accessible in onUploadComplete as `metadata`
    //   return { token };
    // })
    .onUploadComplete(async ({ file, metadata }) => {
      try {
        const { configId } = metadata.input;
        if (!configId) {
          const result = await makeClient().mutate({
            mutation: CREATE_CONFIGURATION,
            variables: {
              input: {
                width: 300,
                height: 300,
                imgUrl: file.url,
              },
            },
          });
          console.log("🚀 ~ result ~ result:", result);
          return {
            configId: result.data.createConfiguration.id,
          };
        } else {
          const result = await makeClient().mutate({
            mutation: UPDATE_CONFIGURATION,
            variables: {
              input: {
                id: configId,
                croppedImgUrl: file.url,
              },
            },
          });
          console.log("🚀 ~ result ~ result:", result);

          return {
            configId: result.data.createConfiguration.id,
          };
        }
      } catch (error) {}
    }),
} satisfies FileRouter;
export type UploadRouter = typeof uploadRouter;

export const { GET, POST } = createRouteHandler({
  router: uploadRouter,
});
