import { AxiosError, AxiosResponse } from "axios";

const statusOk = [200, 201];

export async function catchAsync(
  fn: Promise<AxiosResponse>,
  errMsg: string = "Something went wrong, please try again later."
) {
  try {
    const res: AxiosResponse<any, any> = await fn;
    if (statusOk.includes(res.status)) {
      return res.data;
    }
  } catch (err: any) {
    return Promise.reject(new AxiosError(err));
  }
}
