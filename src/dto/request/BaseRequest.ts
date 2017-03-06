import { AclBaseHeader } from './../AclBaseHeader';
export class BaseRequest<T>{
    header: AclBaseHeader;
    result: T;
}