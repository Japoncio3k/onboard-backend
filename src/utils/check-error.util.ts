import { AppError } from "../model/error.model";

export const isError = (object: any): object is AppError => {
  return "message" in object;
};
