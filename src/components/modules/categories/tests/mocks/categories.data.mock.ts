import { CategoryEntity } from '../../entities/category.entity'

export const categoriesData: CategoryEntity[] = [
  {
    id: 1,
    name: 'Lorem Ipsum',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    status: true,
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-01'),
  },
  {
    id: 2,
    name: 'Lorem Ipsum 2',
    description: 'Lorem Ipsum 2 is simply dummy text of the printing and typesetting industry.',
    status: true,
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-01'),
  },
]
