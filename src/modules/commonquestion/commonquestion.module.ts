/**
 * Created by allcheer on 2016/12/12.
 */
import {RouterName} from './../../models/router.name';
import {CommonQuestionComponent} from "./../../components/commonquestion/commonquestion.compoent";
var commonQuestionPage = angular.module(RouterName.commonQuestionPage, ['ionic']);

//    套路  调用的是models
commonQuestionPage.component("commonQuestionComponent", new CommonQuestionComponent());

export {commonQuestionPage};     //models里面的helloPage模块




