"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllerFood = void 0;
const food_1 = require("../models/food");
const baseControllerApi_1 = require("./baseControllerApi");
class ControllerFood extends baseControllerApi_1.BaseControllerApi {
    constructor() {
        super(...arguments);
        this.model = new food_1.Food();
    }
}
exports.ControllerFood = ControllerFood;