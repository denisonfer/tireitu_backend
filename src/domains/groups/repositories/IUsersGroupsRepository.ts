import { UsersGroup } from '../infra/typeorm/entities/UsersGroups';

export interface IUsersGroupsRepository {
  findGroupsByUser(id_user: string): Promise<UsersGroup[]>;
  findUsersByGroup(id_group: string): Promise<UsersGroup[]>;
  findGroupToDoRaffle(
    id_group: string,
    id_user: string,
  ): Promise<UsersGroup | undefined>;
  putUserInGroup(
    id_user: string,
    id_group: string,
    isAdmin: boolean,
  ): Promise<UsersGroup>;
  remove(usersGroup: UsersGroup): Promise<void>;
  save(usersGroup: UsersGroup): Promise<UsersGroup>;
}
