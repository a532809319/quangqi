import { AclToast } from './../../services/AclToast';
import { CommonUtil } from './../../utils/common.util'; 
import   './loanagreement.compoent.scss';
import {PersonainforReqBody} from "../../dto/request/body/PersonainforReqBody";
import {UserInfoQueryDTOSIGN} from "../../dto/sign/UserInfoQueryDTOSIGN";
import {UserInfoQueryParamSIGN} from "../../dto/sign/UserInfoQueryParamSIGN";
import {PersonainforRequest} from "../../dto/request/PersonainforRequest";
import {AclBaseHeader} from "../../dto/AclBaseHeader";
import {Md5Singer} from "../../utils/Md5Singer";
import {ObjectSorter} from "../../utils/ObjectSorter";
import {PersonainforResponse} from "../../dto/response/PersonainforResponse";
import {RespCode} from "../../models/RespCode"; 
import {NetworkService} from "../../services/NetworkService";
import {NetworkSerivceName, AclConstants} from "../../models/AclConstants";
import {PersonainforResBody} from "../../dto/response/body/PersonainforResBody";
import {UrlParser} from "../../utils/UrlParser";

class LoanagreementComponent implements angular.IComponentOptions {

  htbianhao: string;//合同编号
  qddate: string;//签订日期 

  jiekuanren: string;//借款人
  jieid: string;//借款人身份证
  mobile: string;//手机号 
 
  //借款基本信息
 
  borrowmoney: string;//借款本金
 
  renzhengfei: string;//认证费（丙方）
  actualaccount: string;//实际到账
  lixi: string;//利息 计算方式：本金*0.1%*借款天数
  servicesmoney: string;//服务费计算方式：本金*0.4%*借款天数，提前还款按照借款期限全额计算）
  refunddate: string;//还款日期
  refundmoney: string; //还款金额




  id: string;    //用户id 
  token: string;  //token
  loanSeqNO:string;//借款单单号
  diffDays:string;//借款总天数
 

  constructor(  private netReq: NetworkService) {
    var myDate = new Date(); 

    var ok=this.parseLocation();
    if(!ok){
      return ;
    }
   
    this.htbianhao ="JC"+this.loanSeqNO;//合同编号
    this.qddate = myDate.toLocaleDateString();//签订日期
  
    // this.jiekuanren = 'zhangsan';//借款人
    // this.jieid = '45464564';//借款人身份证
    // this.mobile = '454545454';//手机号

  
    this.borrowmoney = '1000';//借款本金 
    this.renzhengfei = '30';//认证费（丙方）
    this.actualaccount = '970';//实际到账

    this.lixi=(parseInt(this.borrowmoney)*0.1*0.01*parseInt(this.diffDays))+'';//利息 计算方式：本金*0.1%*借款天数
    this.servicesmoney =(parseInt(this.borrowmoney)*0.4*0.01*parseInt(this.diffDays))+'';// '424';//服务费计算方式：本金*0.4%*借款天数，提前还款按照借款期限全额计算）
    var paybackDate:Date=CommonUtil.DateAdd('d',parseInt(this.diffDays),myDate);;
    this.refunddate =paybackDate.toLocaleDateString();//还款日期
    this.refundmoney = (parseInt(this.borrowmoney)+parseInt(this.lixi)+parseInt(this.servicesmoney))+''; //还款金额

    this.requestUserBaseInfo();
  }

  controllerAs = 'vm';
  controller = LoanagreementComponent;
  templateUrl = function () {
    return "./../components/loanagreement/loanagreement.compoent.html";
  } 

  requestUserBaseInfo(): void {
     if(this.netReq==null){ 
      return ;
    }
    var ctrl = this;
    var result = new PersonainforReqBody();
    result.borrowerUserId = this.id;

    var signParam = new UserInfoQueryParamSIGN();
    signParam.borrowerUserId = result.borrowerUserId;

    var req = new PersonainforRequest();
    var header = new AclBaseHeader();
    header.sign = Md5Singer.sign(ObjectSorter.getSortedString(signParam), Md5Singer.SignKey);
    header.token = this.token;
    req.header = header;
    req.result = result;
    var respHeader = new AclBaseHeader();

    
    this.netReq.postPersonalInfor(req, respHeader, {
      onSuccess(json: any) {
 
        var resp: PersonainforResponse = json;
        if (resp != null && RespCode.SUCCESS === resp.respCode) {
          this.htbianhao = resp.result.mobileNo; 

          var signDto = new UserInfoQueryDTOSIGN();
          signDto.idNo=resp.result.idNo;
          signDto.mobileNo=resp.result.mobileNo;
          signDto.nameCn=resp.result.nameCn;  

          var signStr = Md5Singer.sign(ObjectSorter.getSortedString(signDto), Md5Singer.SignKey);
          if (AclConstants.HAS_SIGN_FEATURE&&( signStr == null || signStr != respHeader.sign)) {
            return;
          }

          ctrl.jieid = resp.result.idNo;   //身份证号
          ctrl.mobile = resp.result.mobileNo;  //手机号
          ctrl.jiekuanren = resp.result.nameCn;  //借款人 

        } else {

        }

      },
      onFailure(e: any) {
        console.log("----failure#" + angular.toJson(e));
      }
    });
  }

 parseLocation():boolean { 
      this.id=UrlParser.GetQueryString("userId");
      this.diffDays=UrlParser.GetQueryString("diffDays");
      this.loanSeqNO=UrlParser.GetQueryString("loanSeqNO");
      this.token=UrlParser.GetQueryString("token"); 

      if(this.id==null||this.diffDays==null||this.loanSeqNO==null||this.token==null){
        //AclToast.toast("获取协议参数失败",AclToast.TOAST_SHORT,this.$ionicLoading);
        return false;
      }
      return true;
  }

} 


LoanagreementComponent.$inject = [NetworkSerivceName ];
export {LoanagreementComponent};


