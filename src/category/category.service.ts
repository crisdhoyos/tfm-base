import { Injectable } from '@nestjs/common';
import { Category } from '../entities';
import { CategoryRepository } from './category.repository';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async getAllCategories(): Promise<Category[]> {
    return this.categoryRepository.getAllCategories();
  }

  async createCategories(rawCategories: string[]): Promise<Category[]> {
    const categories = rawCategories.map((name) => ({
      name: name.toLowerCase(),
    }));
    const created = await this.categoryRepository.createCategories(categories);

    if (!created) {
      return [];
    }

    return await this.categoryRepository.getCategoriesByName(
      categories.map((category) => category.name),
    );
  }
}
