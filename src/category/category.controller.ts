import { Body, Controller, Get, Post } from '@nestjs/common';
import { Category } from '../entities';
import { CategoryService } from './category.service';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('')
  getAllCategories(): Promise<Category[]> {
    return this.categoryService.getAllCategories();
  }

  @Post('')
  createCategories(@Body() { data }: { data: string[] }): Promise<Category[]> {
    return this.categoryService.createCategories(data);
  }
}
