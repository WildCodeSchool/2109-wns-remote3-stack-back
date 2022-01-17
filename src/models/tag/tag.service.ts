import TagPrismaDto from '@tag/dto/tagDto.prisma';
import ITag from '@tag/types/tag.type';
import ITagPayload from '@tag/types/tagPayload.args';

export default function TagService() {
  //* Create Tag
  async function createTag(payload: ITagPayload): Promise<ITag> {
    const tag = await TagPrismaDto().createTag(payload);
    if (!tag) {
      throw new Error('Tag not found');
    }
    return tag;
  }
  //* Update Tag
  async function updateTag(payload: ITagPayload, id: string): Promise<ITag> {
    const tag = await TagPrismaDto().updateTag(payload, { id });
    if (!tag) {
      throw new Error('Tag not found');
    }
    return tag;
  }
  // all tags
  async function allTags(): Promise<ITag[]> {
    const tag = await TagPrismaDto().all();
    if (!tag) {
      throw new Error('No tags found');
    }
    return tag;
  }

  async function findById(id: string): Promise<ITag> {
    const tag = await TagPrismaDto().oneById({ id });
    if (!tag) {
      throw new Error('Tag not found');
    }
    return tag;
  }

  // ** DELETE
  async function deleteById(id: string): Promise<ITag> {
    const tag = await TagPrismaDto().deleteOneById({ id });
    if (!tag) {
      throw new Error('tag not found');
    }
    return tag;
  }

  return {
    allTags,
    findById,
    deleteById,
    createTag,
    updateTag,
  };
}
