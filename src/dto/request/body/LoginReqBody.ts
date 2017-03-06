/**
 * Created by allcheer on 2017/1/3.
 */
import {AclBaseBody} from './../../AclBaseBody';
export class LoginReqBody extends AclBaseBody {
  loginId: string;
  userPasswd: string;
}
