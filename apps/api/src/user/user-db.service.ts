import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './user.entity'

@Injectable()
export class UserDBService {
  constructor(@InjectRepository(User) private readonly userRepo: Repository<User>) {}

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
    const newUser = new User()
    newUser.name = name
    newUser.tel = tel
    const createdUser = this.userRepo.create(newUser)

    return createdUser
  }
}
