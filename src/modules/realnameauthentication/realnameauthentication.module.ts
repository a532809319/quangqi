/**
 * Created by allcheer on 2016/12/22.
 */
import {RouterName} from './../../models/router.name';
import {RealnameauthenticationComponent} from "./../../components/realnameauthentication/realnameauthentication.component";


var realnameauthenticationPage = angular.module(RouterName.realnameauthenticationPage, ['ionic']);

realnameauthenticationPage.component("realnameauthenticationComponent", new RealnameauthenticationComponent());

export {realnameauthenticationPage};
