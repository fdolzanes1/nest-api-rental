import { Test, TestingModule } from '@nestjs/testing'
import { CategoriesService } from '../categories.service'
import { CategoriesRepository } from '../categories.repository'
import { categoriesRepositoryMock } from './mocks/categories-repository.mock'
import { CreateCategoryDto } from '../dto/create-category.dto'
import { categoriesData } from './mocks/categories.data.mock'
import { ConflictException } from '@nestjs/common'
import { CategoryEntity } from '../entities/category.entity'

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

  describe('create', () => {
    it('should validate a definition', () => {
      expect(categoriesService).toBeDefined()
      expect(categoriesRepository).toBeDefined()
    })

    it('should return a category after create', async () => {
      const data: CreateCategoryDto = {
        name: 'Lorem Ipsum',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      }
      const result = await categoriesService.create(data)
      expect(result).toEqual(categoriesData[0])
    })
  })

  describe('create', () => {
    it('should throw a conflict exception when category already exists', async () => {
      const data: CreateCategoryDto = {
        name: 'Lorem Ipsum',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      }

      const newCategory: CategoryEntity = {
        id: 1,
        name: 'Lorem Ipsum',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      }

      const findNameMock = jest.spyOn(categoriesRepository, 'findByName').mockResolvedValue(newCategory)

      await expect(categoriesService.create(data)).rejects.toThrow(ConflictException)
      expect(findNameMock).toHaveBeenCalledWith('Lorem Ipsum')
    })
  })
})
