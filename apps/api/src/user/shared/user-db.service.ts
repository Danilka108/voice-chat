import { Injectable, Inject, BadRequestException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from '../user.entity'
import { UserConfig, USER_CONFIG } from '../../configs'

@Injectable()
export class UserDBService {
  constructor(
    @Inject(USER_CONFIG) private readonly userConfig: UserConfig,
    @InjectRepository(User) private readonly userRepo: Repository<User>
  ) {}

  async findByID(id: number): Promise<User | null> {
    const user = await this.userRepo.findOne({
      where: {
        id,
      },
    })

    return user ? user : null
  }

  async findByTel(tel: string): Promise<User | null> {
    const user = await this.userRepo.findOne({
      where: {
        tel: tel,
      },
    })

    return user ? user : null
  }

  async create(name: string, tel: string): Promise<User> {
    if (name.length > this.userConfig.name.maxLen) {
      throw new BadRequestException(
        `User name can't be longer ${this.userConfig.name.maxLen} chars.`
      )
    }

    const newUser = new User()
    newUser.name = name
    newUser.tel = tel

    const createdUser = await this.userRepo.save(newUser)

    return createdUser
  }
}
