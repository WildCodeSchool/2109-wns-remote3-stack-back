import TagPrismaDto from './dto/tagDto.prisma';
import ITag from './types/tag.type';

export default function TagService() {
  // all tags
  async function allTags(): Promise<ITag[]> {
    const tags = await TagPrismaDto().all();
    if (!tags) {
      throw new Error('No tags found');
    }
    return tags;
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
  };
}
