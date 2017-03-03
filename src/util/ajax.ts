/// <reference path="../../typings/index.d.ts" />
const swal = require("sweetalert");

export const gfAjaxAction = async (postAction: string, data: any, successFn: any) => {
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
    try {
          let response = await fetch(postUrl, {
              method: "POST",
              body: data
          });
          if(response.status === 200) {
            let responseJson = await response.json();
            return responseJson;
          }
          else {
              handleError(response);
              return {};
          }
      }
      catch(error) {
          handleError(error);
          return {};
      }
}

const handleError = (response: Response) => {
    if (response.status === 0) {
        swal('Not connect.\n Verify Network.');
    } else if (response.status == 404) {
        swal('Requested page not found. [404]');
    } else if (response.status == 500) {
        swal('Internal Server Error [500].');
    } else if (response.statusText === 'parsererror') {
        swal('Requested JSON parse failed.');
    } else if (response.statusText === 'timeout') {
        swal('Time out error.');
    } else if (response.statusText === 'abort') {
        swal('Ajax request aborted.');
    } else {
        if(typeof(response) === "string") {
            swal('Uncaught Error.\n' + response);
        }
        else {
            swal('Uncaught Error.\n' + response.statusText);
        }
    }
}