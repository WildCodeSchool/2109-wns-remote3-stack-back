import UserPrismaDto from '@user/dto/userDto.prisma';
import { IContext } from '@utils/context/interface/context.interface';
import fs from 'fs';
import { finished } from 'stream/promises';
import IFilePayload from './types/file.payload';
import IFile from './types/file.type';

export default function FileService() {
  // ** READ

  // ** UPLOAD
  async function uploadOneFile(
    { file }: IFilePayload,
    context: IContext,
  ): Promise<IFile> {
    const { createReadStream, filename, mimetype, encoding } = file;

    const stream = createReadStream();
    const output = fs.createWriteStream(`/img/${context.userId}.${mimetype}`);
    stream.pipe(output);
    await finished(output).then(async () => {
      await UserPrismaDto().updateUser(
        {
          id: context.userId!,
          avatar: `/img/${context.userId}.${mimetype}`,
        },
        { id: context.userId! },
      );
    });

    return { filename, mimetype, encoding };
  }

  return {
    uploadOneFile,
  };
}
