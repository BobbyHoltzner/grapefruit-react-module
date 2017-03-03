var swal = require('sweetalert');

export function gfSwalResult(result: string, reload: any, callback: any){
    if(result === ''){
        swal({title: "Success",
            type: "success",
            closeOnConfirm: true,
            showLoaderOnConfirm: true},
            function(){if(reload){location.reload();}else{callback(); swal.close();}});
    }
    else{
        swal({title: "Error",
            text: result,
            type: "warning",
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Ok",
            closeOnConfirm: true,
            showLoaderOnConfirm: true,
            html: true},
            function(){if(reload){location.reload();}else{swal.close();}});
    }
};

export function gfErrorSwal(text: string){
    swal({title: "Error",
        text: text,
        type: "warning",
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Ok",
        closeOnConfirm: true,
        html: true});
};

export function gfConfirmLoadingSwal(title: string, text: string, confirmText: string, confirmFn: () => void){
    swal({title: title,
        text: text,
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: confirmText,
        closeOnConfirm: false,
        showLoaderOnConfirm: true},
        confirmFn);
};

export function gfLoadingSwal(title: string){
    swal({title: title,
    imageUrl: '/js/wineanddesign/grapefruit/ajax-loader.gif',
    showConfirmButton: false});
};

export function close(){
  swal.close();
};