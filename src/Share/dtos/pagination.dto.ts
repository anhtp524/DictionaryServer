import { IsNumber, IsObject, IsOptional } from 'class-validator';

export class PaginationDto {
    @IsNumber()
    @IsOptional()
    limit: number;

    @IsNumber()
    @IsOptional()
    page: number;

    @IsObject()
    @IsOptional()
    search: object;
}
