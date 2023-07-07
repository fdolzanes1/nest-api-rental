import { Test, TestingModule } from '@nestjs/testing'
import { CategoriesService } from '../categories.service'
import { CategoriesRepository } from '../categories.repository'
import { categoriesRepositoryMock } from './mocks/categories-repository.mock'
import { categoriesData } from './mocks/categories.data.mock'
import { UpdateCategoryDto } from '../dto/update-category.dto'

describe('CategoriesService', () => {
  let categoriesService: CategoriesService
  let categoriesRepository: CategoriesRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoriesService, categoriesRepositoryMock],
    }).compile()

    categoriesService = module.get<CategoriesService>(CategoriesService)
    categoriesRepository = module.get<CategoriesRepository>(CategoriesRepository)
  })

  describe('update', () => {
    it('should validate a definition', () => {
      expect(categoriesService).toBeDefined()
      expect(categoriesRepository).toBeDefined()
    })

    it('should return a category after updated', async () => {
      const data: UpdateCategoryDto = {
        name: 'Lorem Ipsum',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        status: true,
      }
      const result = await categoriesService.update(1, data)
      expect(result).toEqual(categoriesData[0])
    })
  })
})
