import prisma from "../prismaClient";
import { privateResolver, saveFile } from "../utils";

export const resolver = {
  Mutation: {
    createCoffeeShop: privateResolver(async (_, input, { loggedInUser }) => {
      try {
        const existingRestaurant = await prisma.coffeeShop.findUnique({
          where: { name: input.name },
        });
        if (existingRestaurant)
          return {
            ok: false,
            error: "Restaurant name already exists",
          };

        let categories;
        if (input.categories) {
          categories = input.categories.map(category => {
            const slug = category.trim().replaceAll(/\s/gi, "-").toLowerCase();
            return { where: { slug }, create: { name: category, slug } };
          });
        }
        let photos;
        if (input.photos) {
          photos = input.photos.map(photo => {
            const filename = `${loggedInUser.id}${Date.now()}.jpg`;
            saveFile(photo, filename);
            return { url: `http://localhost:4000/uploads/${filename}` };
          });
        }
        await prisma.coffeeShop.create({
          data: {
            ...input,
            ...(input.categories && {
              categories: { connectOrCreate: categories },
            }),
            ...(input.photos && { photos: { create: photos } }),
            userId: loggedInUser.id,
          },
        });
        return {
          ok: true,
        };
      } catch (e) {
        console.log(e);
        return { ok: false, error: "Cannot create coffee shop" };
      }
    }),

    editCoffeeShop: privateResolver(async (_, input, { loggedInUser }) => {
      try {
        if (input.name) {
          const existingRestaurant = await prisma.coffeeShop.findUnique({
            where: { name: input.name },
          });
          if (existingRestaurant)
            return {
              ok: false,
              error: "Restaurant name already exists",
            };
        }

        let categories;
        if (input.categories) {
          categories = input.categories.map(category => {
            const slug = category.trim().replaceAll(/\s/gi, "-").toLowerCase();
            return { where: { slug }, create: { name: category, slug } };
          });
        }
        let photos;
        if (input.photos) {
          photos = input.photos.map(photo => {
            const filename = `${loggedInUser.id}${Date.now()}.jpg`;
            saveFile(photo, filename);
            return { url: `http://localhost:4000/uploads/${filename}` };
          });
        }
        await prisma.coffeeShop.update({
          where: { userId: loggedInUser.id },
          data: {
            ...input,
            ...(input.categories && {
              categories: { connectOrCreate: categories },
            }),
            ...(input.photos && { photos: { create: photos } }),
          },
        });
        return {
          ok: true,
        };
      } catch (e) {
        console.log(e);
        return { ok: false, error: "Cannot edit coffee shop" };
      }
    }),

    deleteCoffeeShop: privateResolver(async (_, input, { loggedInUser }) => {
      try {
        const exists = await prisma.coffeeShop.findFirst({
          where: { id: input.shopId, userId: loggedInUser.id },
        });
        if (!exists)
          return {
            ok: false,
            error: "Not exists",
          };

        await prisma.coffeeShop.delete({
          where: { id: input.shopId },
        });
        return { ok: true };
      } catch (e) {
        console.log(e);
        return { ok: false, error: "Cannot delete coffee shop" };
      }
    }),
  },
};
