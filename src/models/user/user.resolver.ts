import {
  Resolver, Query, Arg, Mutation, UseMiddleware, Ctx, Args,
} from 'type-graphql';
import authGuard from '@auth/guards/auth.guard';
import IUser from '@user/types/user.type';
import UserService from '@user/user.service';
import { IContext } from '@utils/context/interface/context.interface';
import IUserWithProjects from './types/userWithProjects.type';
import IUserPayload from './types/payload.args';

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
  @UseMiddleware(authGuard)
  async getSelf(
    @Ctx() context: IContext,
  ): Promise<IUser> {
    return UserService().findById(context.userId || '');
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

  @Query(() => IUserWithProjects)
  async getUserWithProjects(
    @Arg('id') id: string,
  ): Promise<IUserWithProjects> {
    return UserService().findByIdWithProjects(id);
  }

  // * UPDATE
  @Mutation(() => IUser)
  @UseMiddleware(authGuard)
  async updateUser(
    @Args()payload: IUserPayload,
    @Arg('id') id: string,
  ):Promise<IUser |null> {
    return UserService().updateUserById(payload, id);
  }

  // * DELETE
  @Mutation(() => IUser)
  async deleteUserById(
    @Arg('id') id: string,
  ): Promise<IUser> {
    return UserService().deleteById(id);
  }
}
