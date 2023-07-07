import { Test, TestingModule } from '@nestjs/testing'
import { CategoriesService } from '../categories.service'
import { categoriesRepositoryMock } from './mocks/categories-repository.mock'

describe('CategoriesService', () => {
  let categoriesService: CategoriesService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoriesService, categoriesRepositoryMock],
    }).compile()

    categoriesService = module.get<CategoriesService>(CategoriesService)
  })

  describe('delete', () => {
    it('should delete a categories', async () => {
      const result = await categoriesService.remove(1)
      expect(result).toEqual(true)
    })
  })
})
