import 'reflect-metadata';
import {
  Resolver, Query, Arg, Mutation,
} from 'type-graphql';
import ITag from './types/tag.type';
import TagService from './tag.service';

@Resolver(() => ITag)
export default class UserResolver {
  // * Get all tags
  @Query(() => [ITag])
  async getAllTags(): Promise<ITag[]> {
    return TagService().allTags();
  }

  // * Get a tag by id
  @Query(() => ITag)
  async getTagByID(
    @Arg('id') id: string,
  ): Promise<ITag> {
    return TagService().findById(id);
  }

  // * Delete a tag by id
  @Mutation(() => ITag)
  async deleteTagById(
    @Arg('id') id: string,
  ): Promise<ITag> {
    return TagService().deleteById(id);
  }
}
