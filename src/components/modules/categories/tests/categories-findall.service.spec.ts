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

  describe('findAll', () => {
    it('should return an array of categories', async () => {
      const result = await categoriesService.findAll()
      expect(result).toEqual(categoriesData)
    })
  })
})
