export class User {
  constructor(
    public name: string,
    public email: string,
    public cep: string,
    public id?: number,
    public createdAt?: Date,
    public updatedAt?: Date
  ) {}
}
