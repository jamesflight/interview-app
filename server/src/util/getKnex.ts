import * as knex from "knex";
import { config } from "../config/config";

export const getKnex = () => {
    return knex(config.knex);
};