import {AclBaseBody} from './../../AclBaseBody';
export class VerifyCodeRespBody extends AclBaseBody {
  mobileNo: string;
  orderDate: string;
  orderId: string;
  type: string;
  verifyCode: string;
  userRole:string;
  checkCodeType:string;
}
