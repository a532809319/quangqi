import { AclBaseHeader } from './../AclBaseHeader';
export class BaseResponse<T>{
    header: AclBaseHeader;
    result: T;

    respMsg: string;
    respCode: string;
}