/**
 * Created by allcheer on 2017/1/13.
 */
import {RouterName} from './../../models/router.name';
import {LoanagreementComponent} from "../../components/loanagreement/loanagreement.compoent";
import {NetworkSerivceName} from "../../models/AclConstants";
import {NetworkService} from "../../services/NetworkService";

var loanagreementPage = angular.module(RouterName.loanagreementPage, ['ionic']);

loanagreementPage.component("loanagreementComponent", new LoanagreementComponent(null));
loanagreementPage.service(NetworkSerivceName,  NetworkService );

export {loanagreementPage};     //models里面的helloPage模块


