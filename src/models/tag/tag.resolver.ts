import 'reflect-metadata';
import {
  Resolver, Query, Arg, Mutation, Args,
} from 'type-graphql';
import ITag from './types/tag.type';
import TagService from './tag.service';
import ITagPayload from './types/TagPayload.args';

@Resolver(() => ITag)
export default class TagResolver {
  // * Create a tag
  @Mutation(() => ITag)
  async createTag(@Args() payload: ITagPayload): Promise<ITag> {
    return TagService().createTag(payload);
  }

  //* Update
  @Mutation(() => ITag)
  async updateTag(@Args() payload: ITagPayload, @Arg('id') id: string): Promise<ITag> {
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
