import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './user.entity'

@Injectable()
export class UserDBService {
  constructor(
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

  async findByPhoneNumber(phoneNumber: string): Promise<User | null> {
    const user = await this.userRepo.findOne({
      where: {
        phone_number: phoneNumber,
      },
    })

    return user ? user : null
  }

  async create(name: string, phoneNumber: string): Promise<User> {
    const newUser = new User()
    newUser.name = name
    newUser.phone_number = phoneNumber
    const createdUser = this.userRepo.create(newUser)

    return createdUser
  }
}
