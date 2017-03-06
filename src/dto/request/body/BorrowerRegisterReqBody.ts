import { AclBaseBody } from './../../AclBaseBody';
export class BorrowerRegisterReqBody extends AclBaseBody {
    loginId: string;
    salesId: string;
    userPasswd: string;
    verifyCode: string;
}