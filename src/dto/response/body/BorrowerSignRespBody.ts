import {AclBaseBody} from './../../AclBaseBody';
export class BorrowerSignRespBody extends AclBaseBody {
  loginId: string;
  salesId: string;
  userPasswd: string;
  verifyCode: string;
  userId: string;
}
