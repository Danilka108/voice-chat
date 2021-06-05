import { Test } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserDBService } from './user-db.service'
import { User } from './user.entity'

describe('UserDBService', () => {
  let userRepo: Repository<User>
  let userDBService: UserDBService

  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      providers: [
        UserDBService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile()

    userRepo = testingModule.get(getRepositoryToken(User))
    userDBService = testingModule.get(UserDBService)
  })

  describe('findByID', () => {
    it('should return null if user not found', async () => {
      jest.spyOn(userRepo, 'findOne').mockReturnValue(Promise.resolve(undefined))

      await expect(userDBService.findByID(0)).resolves.toBeNull()
    })
  })

  describe('findByTel', () => {
    it('should return null if user not found', async () => {
      jest.spyOn(userRepo, 'findOne').mockReturnValue(Promise.resolve(undefined))

      await expect(userDBService.findByTel('')).resolves.toBeNull()
    })
  })
})
