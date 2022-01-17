import {
  Resolver, Query, Arg, Mutation, UseMiddleware,
} from 'type-graphql';
import authGuard from '@auth/guards/auth.guard';
import IUser from '@user/types/user.type';
import UserService from '@user/user.service';

@Resolver(() => IUser)
export default class UserResolver {
  // CREATE method is handled in the Auth Models

  // * READ
  @Query(() => [IUser])
  @UseMiddleware(authGuard)
  async getAllUsers(): Promise<IUser[]> {
    return UserService().allUsers();
  }

  @Query(() => IUser)
  async getUserByID(
    @Arg('id') id: string,
  ): Promise<IUser> {
    return UserService().findById(id);
  }

  @Query(() => IUser)
  async getUserByEmail(
    @Arg('email') email: string,
  ): Promise<IUser> {
    return UserService().findByEmail(email);
  }

  // * UPDATE

  // * DELETE
  @Mutation(() => IUser)
  async deleteUserById(
    @Arg('id') id: string,
  ): Promise<IUser> {
    return UserService().deleteById(id);
  }
}
