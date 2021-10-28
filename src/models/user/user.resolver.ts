import 'reflect-metadata';
import { Resolver, Query } from 'type-graphql';
import { dummies } from '../../constants/dummies';
import IUser from './types/user.type';

@Resolver(() => IUser)
export default class UserResolver {
  @Query(() => [IUser])
  async dummies(): Promise<IUser[]> {
    return dummies;
  }
}
