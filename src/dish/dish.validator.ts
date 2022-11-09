import { Type } from "class-transformer";
import {
    IsArray,
    IsNotEmpty,
    IsNumber,
    IsString,
    MaxLength,
    Min,
    MinLength,
    ValidateNested,
} from "class-validator";
import { DishOrderType, DishType } from "./dish.type";
import "reflect-metadata";
import { BaseValidator } from "../base/base.validator";
import { FoodDishValidator } from "../food/food.validator";
import { FoodDishType } from "../food/food.type";

export class DishValidator
    extends BaseValidator
    implements Pick<DishType, "name" | "type">
{
    @IsString()
    @MinLength(3)
    @MaxLength(100)
    name: string = "";

    @IsArray()
    @ValidateNested()
    @Type(() => FoodDishValidator)
    foods: FoodDishType[] = [];

    @IsString()
    @MinLength(8)
    @MaxLength(200)
    type: string = "";
}

export class DishOrderValidator
    extends BaseValidator
    implements Pick<DishOrderType, "_id" | "quantity">
{
    @IsString()
    @IsNotEmpty()
    _id: string = "";

    @IsNumber()
    @Min(1)
    @IsNotEmpty()
    quantity: number = 0;
}