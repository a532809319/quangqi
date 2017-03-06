/**
 * Created by allcheer on 2017/1/4.
 */
import {RouterName} from './../../models/router.name';
import {SlidemainComponent} from "../../components/slidemain/slidemain.component";


var slidemainPage = angular.module(RouterName.slidemainPage, ['ionic','rzModule']);

// slidemainPage.component("slidemainComponent", new SlidemainComponent());
slidemainPage.component("slidemainComponent",new SlidemainComponent());

export {slidemainPage};     //models里面的helloPage模块


