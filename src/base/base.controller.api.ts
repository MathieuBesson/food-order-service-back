import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { ValidationError } from "class-validator";
import { ControllerInterfaceApi } from "../../interfaces/interface.controller.api";
import { BaseRepository } from "./base.model";
import { BaseType } from "./base.type";
import { BaseValidator } from "./base.validator";

export class BaseControllerApi<Type extends BaseType>
    implements ControllerInterfaceApi<Type>
{
    public model!: BaseRepository<Type>;

    public async getAll(req: Request, res: Response) {
        res.status(StatusCodes.CREATED).send(await this.model.getAll());
    }

    public async getOne(req: Request, res: Response) {
        res.status(StatusCodes.CREATED).send(
            await this.model.getOne(req.params.id)
        );
    }

    public async getAllOrderByField(
        req: Request,
        res: Response,
        field: string
    ) {
        res.status(StatusCodes.CREATED).send(
            await this.model.getAllOrderByField(field, [])
        );
    }

    public async insertOne(req: Request, res: Response) {
        if ((await this.areValidParameters(req, res)) === false) {
            return;
        }
        res.status(StatusCodes.CREATED).send(
            await this.model.insertOne(req.body)
        );
    }

    public async updateOne(req: Request, res: Response) {
        if ((await this.areValidParameters(req, res)) === false) {
            return;
        }
        console.log(await this.model.updateOne(req.body));

        res.status(StatusCodes.CREATED).send(
            await this.model.updateOne(req.body)
        );
    }

    public async deleteOne(req: Request, res: Response) {
        const result = await this.model.deleteOne(req.params.id);
        res.status(StatusCodes.ACCEPTED).send({
            deleteCount: result.deletedCount,
        });
    }

    protected async areValidParameters(
        req: Request,
        res: Response
    ): Promise<Boolean> {
        const errors = await BaseValidator.getErrorsDataTypeIncorrect(
            req.body,
            this.model.typeValidator
        );
        if (errors.length > 0) {
            this.sendBadRequestError(errors, "ValidationData", res);
            return false;
        }

        return true;
    }

    protected sendBadRequestError(
        errors: ValidationError[] | string[],
        type: string,
        res: Response
    ) {
        res.status(StatusCodes.BAD_REQUEST).send({
            status: StatusCodes.BAD_REQUEST,
            type,
            errors,
        });
    }
}
