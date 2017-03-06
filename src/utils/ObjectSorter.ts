import { CommonUtil } from './common.util';

interface NestObj {
    key: string;
    oldKey: string;
};
export class ObjectSorter {
    private static findNestObj(arr: Array<NestObj>, k: string): NestObj {
        for (var n = 0; n < arr.length; n++) {
            if (arr[n].key === k) {
                return arr[n];
            }
        }
        return null;
    }
    public static getSortedString(content: Object): string {
        var sortedStr = "";
        var oldProperties: Array<string> = CommonUtil.makePropertyNames(content);

        var NestObjList = new Array<NestObj>();
        var keys = new Array<string>();
        for (var x = 0; x < oldProperties.length; x++) {
            var p = oldProperties[x];
            NestObjList.push({ "key": p.toLowerCase(), "oldKey": p });
            keys.push(p.toLowerCase());
        }

        CommonUtil.sort(keys, true);

        for (var m = 0; m < keys.length; m++) {
            var obj = ObjectSorter.findNestObj(NestObjList, keys[m]);
            if (m != keys.length - 1) {
                sortedStr = sortedStr + (obj.key + "=" + content[obj.oldKey] + "&");
            } else {
                sortedStr = sortedStr + (obj.key + "=" + content[obj.oldKey]);
            }
        }

        return sortedStr;
    }

    static test() {
        var obj = {
            "ab": "1",
            "Ac": "2",
            "User": "user",
            "obj": "obj",
            "addr": "x"
        };
        var sortedStr = ObjectSorter.getSortedString(obj);
        console.log("排序之后的对象为:" + sortedStr);
    }
}