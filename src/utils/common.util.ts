import { AclConstants } from "../models/AclConstants";
export class CommonUtil {
  public static makePropertyNames(obj: any): Array<string> {
    var properties = new Array<string>();
    for (var p in obj) {
      if (obj.hasOwnProperty(p) && typeof (obj[p]) != 'function') {
        properties.push(p)
      }
    }
    return properties;
  }


  public static sort(arr: Array<string>, asc: boolean) {
    if (arr == null) {
      return null;
    }
    console.log("sort before is " + angular.toJson(arr));

    if (asc) {
      for (var i = 0; i < arr.length; i++) {
        for (var j = i + 1; j < arr.length; j++) {
          var tmp = arr[i];
          if (arr[i] > arr[j]) {
            arr[i] = arr[j];
            arr[j] = tmp;
          }
        }
      }
    } else {
      for (var i = 0; i < arr.length; i++) {
        for (var j = i + 1; j < arr.length; j++) {
          var tmp = arr[i];
          if (arr[i] < arr[j]) {
            arr[i] = arr[j];
            arr[j] = tmp;
          }
        }
      }
    }
    console.log("sort after is " + angular.toJson(arr));
  }

  public static testSort(): void {
    var arr1 = ["2", "1", "3", "5", "0"];
    var arr2 = ["2", "1", "3", "5", "0"];

    CommonUtil.sort(arr1, true);
    CommonUtil.sort(arr2, true);
  }

  public static log(msg: string) {
    if (!AclConstants.IS_DEBUG_MODE) {
      return;
    }
    console.log(msg);
  }


  /* 
    *   功能:实现VBScript的DateAdd功能. 
    *   参数:interval,字符串表达式，表示要添加的时间间隔. 
    *   参数:number,数值表达式，表示要添加的时间间隔的个数. 
    *   参数:date,时间对象. 
    *   返回:新的时间对象. 
    *   var   now   =   new   Date(); 
    *   var   newDate   =   DateAdd( "d ",5,now); 
    *---------------   DateAdd(interval,number,date)   ----------------- 
    */
 static  DateAdd(interval: string, number, date):Date {

    switch (interval) {
      case "y ": {
        date.setFullYear(date.getFullYear() + number);
        return date;
      }
      case "q ": {
        date.setMonth(date.getMonth() + number * 3);
        return date;
      }
      case "m ": {
        date.setMonth(date.getMonth() + number);
        return date;
      }
      case "w ": {
        date.setDate(date.getDate() + number * 7);
        return date;
      }
      case "d ": {
        date.setDate(date.getDate() + number);
        return date;
      }
      case "h ": {
        date.setHours(date.getHours() + number);
        return date;
      }
      case "m ": {
        date.setMinutes(date.getMinutes() + number);
        return date;
      }
      case "s ": {
        date.setSeconds(date.getSeconds() + number);
        return date;
      }
      default: {
        date.setDate(date.getDate() + number);
        return date;
      }
    }
  }

}
