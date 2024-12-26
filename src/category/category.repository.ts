import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../entities';
import { CreateCategoriesDto } from './dto';

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectRepository(Category)
    private readonly repository: Repository<Category>,
  ) {}

  async getAllCategories(): Promise<Category[]> {
    return await this.repository.find();
  }

  async getCategoriesByName(categories: string[]): Promise<Category[]> {
    return await this.repository.find({
      where: categories.map((name) => ({ name })),
    });
  }

  async createCategories(categories: CreateCategoriesDto[]): Promise<any> {
    return await this.repository
      .createQueryBuilder()
      .insert()
      .into(Category)
      .values(categories)
      .orIgnore()
      .execute();
  }
}
