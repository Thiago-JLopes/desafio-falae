import { AppDataSource } from "../data-source";
import { User } from "../entity/User";

//usuario repository
export const UserRepository = AppDataSource.getRepository(User);