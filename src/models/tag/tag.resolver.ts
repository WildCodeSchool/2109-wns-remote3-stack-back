import {
  Resolver, Query, Arg, Mutation,
} from 'type-graphql';
import ITag from '@tag/types/tag.type';
import TagService from '@tag/tag.service';
import ITagPayload from '@tag/types/TagPayload.args';
import ICreateTagPayload from './types/createTagPayload.args';

@Resolver(() => ITag)
export default class TagResolver {
  // * Create a tag
  @Mutation(() => ITag)
  async createTag(@Arg('payload') payload: ICreateTagPayload): Promise<ITag> {
    return TagService().createTag(payload);
  }

  //* Update
  @Mutation(() => ITag)
  async updateTag(@Arg('payload') payload: ITagPayload, @Arg('id') id: string): Promise<ITag> {
    return TagService().updateTag(payload, id);
  }

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
