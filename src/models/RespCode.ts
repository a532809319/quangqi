/**
 * Created by 79078_000 on 2017/1/4.
 */

export class RespCode {
  static SUCCESS = "000";//, "请求成功"),
  static ERROR_SYS = "002";//,"系统错误"),
  static USER_EXISTS="100";
  static FAILURE_DATA = "10000000";//, "服务数据不正确,请退出重试"),
  static FAILURE_REQUEST = "20000000";// "网络访问异常");
}
