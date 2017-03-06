/// <reference path="./../../../typings/index.d.ts" />

import { RouterName } from './../../models/router.name';
import {HelloController} from "./../../components/hello/hello.component";
import {HelloComponent} from "./../../components/hello/hello.component";

var helloPage=angular.module(RouterName.helloPage,[ 'ionic']);

helloPage.component("hello",  {
    template:"<div>tmp</div>",
    controller:HelloController,
    
    controllerAs:'vm'
} );

helloPage.component("helloComponent",new HelloComponent());

export {   helloPage };