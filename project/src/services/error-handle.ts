import request from 'axios';
import { ErrorType } from '../types/error';
import { AppRoute, HTTP_CODE } from '../components/const/const';
import { toast } from 'react-toastify';
import { store } from '../store';
import { redirectToRoute } from '../store/action';

export const errorHandle = (error: ErrorType): void => {
  if (!request.isAxiosError(error)) {
    throw error;
  }

  const {response} = error;

  if (response) {
    switch (response.status) {
      case HTTP_CODE.BAD_REQUEST:
        toast.error(response.data.error);
        break;
      case HTTP_CODE.UNAUTHORIZED:
        toast.error(response.data.error);
        break;
      case HTTP_CODE.NOT_FOUND:
        toast.error(response.data.error);
        store.dispatch(redirectToRoute(AppRoute.NotFound)); // Перенаправляем на страницу "Not Found" при ошибке 404.
        break;
    }
  }
};
