export class CarEntity {
  public id: number
  public name: string
  public description: string
  public dailyRate: number
  public available?: boolean
  public licensePlate: string
  public fineAmount: number
  public brand?: string
  public categoryId: number
  public createdAt?: Date
  public updatedAt?: Date
}
