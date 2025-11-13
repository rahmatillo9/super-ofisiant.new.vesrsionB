import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Warehouse } from './warehouse.entity';
import { CreateWarehouseDto, UpdateWarehouseDto } from 'src/validators/warehouse.validator';

@Injectable()
export class WarehouseService {
  constructor(
    @InjectRepository(Warehouse)
    private readonly warehouseRepository: Repository<Warehouse>,
  ) {}

  // ✅ Create
  async create(dto: CreateWarehouseDto): Promise<Warehouse> {
    const warehouse = this.warehouseRepository.create(dto);
    return this.warehouseRepository.save(warehouse);
  }

  // ✅ Get all
  async findAll(): Promise<Warehouse[]> {
    return this.warehouseRepository.find({ relations: ['product'] });
  }

  // ✅ Get one
  async findOne(id: number): Promise<Warehouse> {
    const warehouse = await this.warehouseRepository.findOne({
      where: { id },
      relations: ['product'],
    });
    if (!warehouse) throw new NotFoundException('Warehouse record not found');
    return warehouse;
  }

  // ✅ Update
  async update(id: number, dto: UpdateWarehouseDto): Promise<Warehouse> {
    const warehouse = await this.findOne(id);
    Object.assign(warehouse, dto);
    return this.warehouseRepository.save(warehouse);
  }

  // ✅ Delete
  async remove(id: number): Promise<void> {
    const result = await this.warehouseRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException('Warehouse record not found');
  }
}
