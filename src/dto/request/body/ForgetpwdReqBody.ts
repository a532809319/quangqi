/**
 * Created by allcheer on 2017/1/6.
 */
import {AclBaseBody} from './../../AclBaseBody';
export class ForgetpwdReqBody extends AclBaseBody {
  userRole: string;
  userMobile: string;
  checkCode: string;
  newPwd: string;
}
