import UserPrismaDto from './dto/userDto.prisma';
import IUser from './types/user.type';

export default function UserService() {
  // ** READ
  async function allUsers(): Promise<IUser[]> {
    const users = await UserPrismaDto().getAll();
    if (!users) {
      throw new Error('No users found');
    }
    return users;
  }

  return {
    allUsers,
  };
}
