import {AclStorage} from "../models/AclStorage";
/**
 * Created by 79078_000 on 2017/1/4.
 */
const sender: string = "NativeSender";
export class CmdNativeSender {

  /*
   * 发送指令
   * cmdId 命令ID
   * param 命令参数
   * */
  static sendCmd(cmdId: string, param: any) {
    var info = angular.toJson(param);
    AclStorage.setItem(cmdId, param);
    if (window[sender]) {
      window[sender].sendCmd(cmdId, info);
    }
  }

  /*
   * 获取指令值
   * cmdId 命令的ID
   * */
  static retrieveCmd(cmdId: string): any {
    var info = AclStorage.getItem(cmdId);
    if (info == null) {
      return null;
    }
    return angular.fromJson(info);
  }

}
