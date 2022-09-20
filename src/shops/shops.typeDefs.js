import { gql } from "apollo-server";

export const typeDefs = gql`
  type CoffeeShopPhoto {
    id: Int!
    url: String!
    shop: CoffeeShop!
  }

  type CoffeeShop {
    id: Int!
    name: String!
    latitude: String
    longitude: String
    user: User!
    photos: [CoffeeShopPhoto]
    categories: [Category]
  }

  type Category {
    id: Int!
    name: String!
    slug: String!
    shops: [CoffeeShop]
    totalShops: Int!
  }

  type SeeCoffeeShopsOutput {
    ok: Boolean!
    error: String
    result: [CoffeeShop]
  }

  type SeeCoffeeShopOutput {
    ok: Boolean!
    error: String
    result: CoffeeShop
  }

  type SeeCategoryOutput {
    ok: Boolean!
    error: String
    result: [CoffeeShop]
  }

  type SeeCategoriesOutput {
    ok: Boolean!
    error: String
    result: [Category]
  }

  type Query {
    seeCoffeeShops(page: Int): SeeCoffeeShopsOutput!
    seeCoffeeShop(shopId: Int!): SeeCoffeeShopOutput!
    seeCategory(slug: String!, page: Int): SeeCategoryOutput!
    seeCategories(page: Int): SeeCategoriesOutput!
  }

  type Mutation {
    createCoffeeShop(
      name: String!
      latitude: String
      longitude: String
      photos: [Upload]
      categories: [String]
    ): SharedOutput!

    editCoffeeShop(
      name: String
      latitude: String
      longitude: String
      photos: [Upload]
      categories: [String]
    ): SharedOutput!
  }
`;
