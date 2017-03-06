/**
 * Created by allcheer on 2016/12/13.
 */
import {RouterName} from './../../models/router.name';
import {OperatorPwdComponent} from "../../components/operatorpwd/operatorpwd.component";


var operatorPwdPage = angular.module(RouterName.operatorPwdPage, ['ionic']);

operatorPwdPage.component("operatorPwdComponent", new OperatorPwdComponent());

export {operatorPwdPage};
