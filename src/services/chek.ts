export class Validator {


  checkPone(str: any): boolean {
    var
      re = /^1\d{10}$/;
    if (re.test(str)) {
      return true

    } else {


      return false;


    }
  }


  checkPass(str: any): boolean {
    var exp1 = /^[A-Za-z0-9]{6,40}$/;
    var exp2 = /^[0-9]{6,40}$/
    var exp3 = /^[a-zA-Z]{6,40}$/;

    if (exp2.test(str)) {

      return false;
    }
    if (exp3.test(str)) {

      return false;
    }
    if (!exp1.test(str)) {

      return false;
    }

    return true;
  }

  checkYzm(str: any): boolean {
    var
      re = /^\d{1,30}$/;
    if (re.test(str)) {

      return true;


    } else {


      return false
    }
  }


}
