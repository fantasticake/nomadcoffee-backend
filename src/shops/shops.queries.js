import { paginationTake } from "../constants";
import prisma from "../prismaClient";

export const resolver = {
  Category: {
    totalShops: async ({ id }) => {
      try {
        const total = await prisma.coffeeShop.count({
          where: { categories: { some: { id } } },
        });
        return total;
      } catch (e) {
        console.log(e);
        return 0;
      }
    },
  },

  Query: {
    seeCoffeeShops: async (_, { page = 1 }) => {
      try {
        const shops = await prisma.coffeeShop.findMany({
          skip: (page - 1) * paginationTake,
          take: paginationTake,
          include: { photos: true },
        });
        return { ok: true, result: shops };
      } catch (e) {
        console.log(e);
        return { ok: false, error: "Cannot see coffee shops" };
      }
    },

    seeCoffeeShop: async (_, { shopId }) => {
      try {
        const shop = await prisma.coffeeShop.findUnique({
          where: { id: shopId },
        });
        return { ok: true, result: shop };
      } catch (e) {
        console.log(e);
        return { ok: false, error: "Cannot see coffee shop" };
      }
    },

    seeCategory: async (_, { slug, page = 1 }) => {
      try {
        const shops = await prisma.coffeeShop.findMany({
          where: { categories: { some: { slug } } },
          skip: (page - 1) * paginationTake,
          take: paginationTake,
        });
        return { ok: true, result: shops };
      } catch (e) {
        console.log(e);
        return { ok: false, error: "Cannot see category" };
      }
    },

    seeCategories: async (_, { page = 1 }) => {
      try {
        const categories = await prisma.category.findMany({
          skip: (page - 1) * paginationTake,
          take: paginationTake,
        });
        return { ok: true, result: categories };
      } catch (e) {
        console.log(e);
        return { ok: false, error: "Cannot see categories" };
      }
    },
  },
};
