import { AclBaseBody } from './../../AclBaseBody';
export class VerifyCodeReqBody extends AclBaseBody {
  checkCodeType: string;
  mobileNo: string;
  type: string;
  userRole: string
}
