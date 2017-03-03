/// <reference path="../../typings/index.d.ts" />
import * as $ from "jquery";
const swal = require("sweetalert");

export function gfAjaxAction(postAction: string, data: any, successFn: any){
    var url, postUrl;
    url = document.URL;
    if (url.slice(-1) == '#') {
        url = url.substring(0, url.length - 1);
    }
    if (url.slice(-1) == '/') {
        postUrl = "index/" + postAction;
    }
    else {
        postUrl = url.concat("/index/" + postAction);
    }
    $.ajax({
        type: "POST",
        url: postUrl,
        data: data,
        cache: false,
        success: function (result: any) {
            successFn(result);
        },
        error: function (jqXHR: any, exception: string) {
            if (jqXHR.status === 0) {
                swal('Not connected.\n Verify Network.');
            } else if (jqXHR.status == 404) {
                swal('Requested page not found. [404]');
            } else if (jqXHR.status == 500) {
                swal('Internal Server Error [500].');
            } else if (exception === 'parsererror') {
                swal('Requested JSON parse failed.');
            } else if (exception === 'timeout') {
                swal('Time out error.');
            } else if (exception === 'abort') {
                swal('Ajax request aborted.');
            } else {
                swal('Uncaught Error.\n' + jqXHR.responseText);
            }
        }
    });
}