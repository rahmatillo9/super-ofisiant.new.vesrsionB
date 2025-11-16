import { Controller, Get, Post, Patch, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { WarehouseService } from './warehouse.service';
import { CreateWarehouseDto, UpdateWarehouseDto } from 'src/validators/warehouse.validator';
import { Warehouse } from './warehouse.entity';

@Controller('warehouse')
export class WarehouseController {
  constructor(private readonly warehouseService: WarehouseService) {}

  // ✅ Create
  @Post()
  create(@Body() dto: CreateWarehouseDto): Promise<Warehouse> {
    return this.warehouseService.create(dto);
  }

  // ✅ Get all
  @Get()
  findAll(): Promise<Warehouse[]> {
    return this.warehouseService.findAll();
  }

  

  // ✅ Get one
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Warehouse> {
    return this.warehouseService.findOne(id);
  }

    @Post('add-stock')
  async addStock(
    @Body('productId', ParseIntPipe) productId: number,
    @Body('addedQty') addedQty: number,
    @Body('totalPrice') totalPrice: number,
  ) {
    return this.warehouseService.addStock(productId, addedQty, totalPrice);
  }

  // ✅ Update
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateWarehouseDto,
  ): Promise<Warehouse> {
    return this.warehouseService.update(id, dto);
  }

  // ✅ Delete
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.warehouseService.remove(id);
  }
}
