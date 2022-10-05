import { AppDataSource } from '../data-source'
import { Group } from '../entities/group'

export const groupRepository = AppDataSource.getRepository(Group)