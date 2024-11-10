import { AppDataSource } from "../data-source";
import { Product } from "../entity/Product";

//usuario repository
export const ProductRepository = AppDataSource.getRepository(Product);