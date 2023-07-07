import { CategoriesRepository } from '../../categories.repository'
import { categoriesData } from './categories.data.mock'

export const categoriesRepositoryMock = {
  provide: CategoriesRepository,
  useValue: {
    findAll: jest.fn().mockResolvedValue(categoriesData),
    findOne: jest.fn().mockResolvedValue(categoriesData[0]),
    create: jest.fn().mockResolvedValue(categoriesData[0]),
    update: jest.fn().mockResolvedValue(categoriesData[0]),
    remove: jest.fn(),
    count: jest.fn(),
    findByName: jest.fn(),
  },
}
