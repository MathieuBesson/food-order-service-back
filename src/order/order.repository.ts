import { model, Model } from "mongoose";
import { OrderType } from "./order.type";
import { BaseRepository } from "../base/base.model";
import { BaseValidator } from "../base/base.validator";
import { OrderSchema } from "./order.schema";
import { OrderValidator } from "./order.validator";
import "reflect-metadata";
import { RepositoryInterface } from "../../interfaces/interface.repository";
import { DishRepository } from "../dish/dish.repository";
import { DishOrderType, DishType } from "../dish/dish.type";

export class OrderRepository
    extends BaseRepository<OrderType>
    implements RepositoryInterface<OrderType>
{
    schema: Model<OrderType> = model("Order", OrderSchema);
    typeValidator: BaseValidator = new OrderValidator();

    public async decreaseFoodAmount(dishDataList: DishOrderType[]) {
        const dishRepository: DishRepository = new DishRepository();
        dishDataList.forEach(
            async (dishData: { _id: string; quantity: number }) => {
                const dishObject: DishType | null = await dishRepository.getOne(
                    dishData._id
                );
                if (dishObject !== null) {
                    dishRepository.decreaseFoodAmount(
                        dishObject,
                        dishData.quantity
                    );
                }
            }
        );
    }
}
