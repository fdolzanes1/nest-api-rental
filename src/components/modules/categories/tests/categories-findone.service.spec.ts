import { Test, TestingModule } from '@nestjs/testing'
import { CategoriesService } from '../categories.service'
import { categoriesData } from './mocks/categories.data.mock'

describe('CategoriesService', () => {
  let categoriesService: CategoriesService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoriesService],
    }).compile()

    categoriesService = module.get<CategoriesService>(CategoriesService)
  })

  describe('findOne', () => {
    it('should return a category', async () => {
      const result = await categoriesService.findOne(1)
      expect(result).toEqual(categoriesData[0])
    })
  })
})
