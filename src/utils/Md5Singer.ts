import { MD5Encrypt } from './md5.encrypt';

/**
 * Created by APPLE on 2016/12/16.
 */
export class Md5Singer {
  public static SignKey="key";
    /**
     * 签名字符串
     * @param text 需要签名的字符串
     * @param key 密钥
     * @param input_charset 编码格式
     * @return 签名结果
     */
    public static  sign( text:string,  key:string ):string {
        text = text + key;
        return new MD5Encrypt().hex_md5(Md5Singer.getContentBytes(text, "utf-8"));
    }

    /**
     * 签名字符串
     * @param text 需要签名的字符串
     * @param sign 签名结果
     * @param key 密钥
     * @param input_charset 编码格式
     * @return 签名结果
     */
    public static  verify( text:string,  sign:string,  key:string,   ):boolean {
        text = text + key;

        var mysign:string=new MD5Encrypt().hex_md5(Md5Singer.getContentBytes(text, "utf-8"));
        if(mysign===sign){
             return true;
        }
        else {
            return false;
        }
    }

    /**
     * @param content
     * @param charset
     * @return
     */
    private static  getContentBytes( content:string,  charset:string) :string{
        return content;
    }

}

