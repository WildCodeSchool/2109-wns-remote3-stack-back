import { IContext } from '@utils/context/interface/context.interface';
import { Args, Ctx, Mutation, Resolver } from 'type-graphql';
import FileService from './file.service';
import IFilePayload from './types/file.payload';
import IFile from './types/file.type';

@Resolver(() => IFile)
export default class FileResolver {
  // * READ

  // * UPLOAD
  @Mutation(() => IFile)
  async uploadFile(
    @Args() payload: IFilePayload,
    @Ctx() context: IContext,
  ): Promise<IFile> {
    return FileService().uploadOneFile(payload, context);
  }
}
