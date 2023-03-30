import { isAfter, isBefore } from 'date-fns';
import { verify } from 'jsonwebtoken';
import { CommonResponse } from '../model/response.model';

export const verifyToken = <Response>(
  token: string,
  success: () => Promise<Response>,
): Promise<Response> | CommonResponse => {
  if (!token) {
    return {
      message: 'You have to be authenticated to perform this action',
      code: 'unauthenticated',
    };
  }
  const decoded = verify(token, 'astiydno2mquhzk');
  if (isAfter(new Date(), (<any>decoded).expiresAt)) {
    return {
      message: 'Authorization token expired',
      code: 'expired',
    };
  } else if ((<any>decoded).userRole === 1) {
    return success();
  } else {
    return {
      message: 'Unauthorized',
      code: 'unauthorized',
    };
  }
};
