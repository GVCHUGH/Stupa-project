export interface BaseResponseModel {
  response_data?: ResponseData;
  status_code?: number;
  messages?: Messages;
  response_meta?: ResponseMeta;
}

export interface Messages {
  success_message?: string;
}

export interface ResponseData {
  data?: any;
  dto_type?: string;
}

export interface ResponseMeta {
  inflight_time?: number;
}
