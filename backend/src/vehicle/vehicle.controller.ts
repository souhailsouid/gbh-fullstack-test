import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
} from '@nestjs/common';
import { VehicleService } from '@vehicle/vehicle.service';
import { GetVehiclesDto } from './get-vehicles.dto';
import { ApiQuery, ApiResponse, ApiTags, ApiParam } from '@nestjs/swagger';
import { SortBy, VehicleType } from '@vehicle/vehicle.interface';

@ApiTags('vehicles')
@Controller('vehicles')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Number of items per page',
  })
  @ApiQuery({
    name: 'order',
    required: false,
    type: String,
    enum: ['asc', 'desc'],
    description: 'Sorting order (asc or desc)',
  })
  @ApiQuery({ name: 'year', required: false, type: Number })
  @ApiQuery({ name: 'manufacturer', required: false, type: String })
  @ApiQuery({ name: 'type', required: false, enum: VehicleType })
  @ApiQuery({ name: 'sort', required: false, enum: SortBy })
  @ApiQuery({
    name: 'priceMin',
    required: false,
    type: Number,
    description: 'Minimum price filter',
  })
  @ApiQuery({
    name: 'priceMax',
    required: false,
    type: Number,
    description: 'Maximum price filter',
  })
  @ApiResponse({ status: 200, description: 'Returns a list of vehicles.' })
  @ApiResponse({ status: 404, description: 'No vehicles found.' })
  @Get()
  getVehicles(@Query() query: GetVehiclesDto) {
    // Retrieve filtered, sorted, and paginated vehicles
    const result = this.vehicleService.getFilteredVehicles(query);

    if (!result.data.length) {
      throw new NotFoundException('No vehicles found matching the criteria.');
    }
    // Return the response with metadata
    return {
      data: result.data,
      total: result.total,
      page: query.page,
      limit: query.limit,
      totalPages: result.totalPages,
      hasNextPage: result.hasNextPage,
      hasPreviousPage: result.hasPreviousPage,
    };
  }

  @ApiParam({
    name: 'id',
    required: true,
    type: String,
    description: 'Vehicle ID',
  })
  @ApiResponse({ status: 200, description: 'Returns the vehicle details.' })
  @ApiResponse({ status: 404, description: 'Vehicle not found.' })
  @Get(':id')
  getVehicleById(@Param('id') id: string) {
    const vehicle = this.vehicleService.getVehicleById(id);
    if (!vehicle) {
      throw new NotFoundException(`Vehicle with id ${id} not found`);
    }
    return vehicle;
  }
}
