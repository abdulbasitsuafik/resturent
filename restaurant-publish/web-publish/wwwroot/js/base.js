

$(function () {

    $(".ddlselect2").select2({
        width: '100%'
    });

    $(".ddlselect2-tags").select2({
        tags: true,
        tokenSeparators: [',', ' ']
    })
    $(".ddlselect2-additional-tags").select2({
        tags: true,
        tokenSeparators: [',', ' ']
    })

    $(document).ajaxSend(function (event, request, settings) {
        $('.preloader').css("display", "block");
    });

    $(document).ajaxComplete(function (event, request, settings) {
        $('.preloader').css("display", "none");
    });

    $('#promoprice_chk').change(function () {
        if ($(this).is(':checked')) {
            $('.is-promoprice').removeClass('d-none');
            $('#PromoPrice').val(null);
        } else {
            $('.is-promoprice').addClass('d-none');
            $('#PromoPrice').val(0);
        }
    });

    $('#subscriptionfor_chk').change(function () {
        if ($(this).find("option:selected").text() == 'Broker') {
            $('.is-broker').removeClass('billing-cycle-validation');
            $('#subscrfor_ddl').val(null);
        } else {
            $('.is-broker').addClass('billing-cycle-validation');
            //    $('#subscrfor_ddl').val(1);
        }
    });

    $('#OpeningTime').mdtimepicker({
        timeFormat: 'hh:mm',
        format: 'h:mm:tt',
        theme: 'blue',
        readOnly: true,
        hourPadding: false,
        clearBtn: false
    });

    $('#ClosingTime').mdtimepicker({
        timeFormat: 'hh:mm',
        format: 'h:mm:tt',
        theme: 'blue',
        readOnly: true,
        hourPadding: false,
        clearBtn: false
    });
    $('#ClosingTime').mdtimepicker().on('timechanged', function (e) {
        var TimeTo = e.time;
        $('#TimeTo').val(TimeTo);
    });

    $('#OpeningTime').mdtimepicker().on('timechanged', function (e) {
        var TimeFrom = e.time;
        $('#TimeFrom').val(TimeFrom);
    });


});

var showoff_base = function () {
    return {
        ajaxGetCall(url, param, callback) {
            $.get(url, { Id: param }, function (response) {
                callback(response);
            });
        },
        GetWithUrl(url, callback) {
            $.get(url, function (response) {
                callback(response);
            });
        },
        ajaxPostMethod(url, modal, callback) {
            $.ajax({
                url: url,
                type: 'POST',
                data: modal,
                success: function (res) {
                    callback(res);
                },
                error: function (res) {
                    callback(res);
                }
            });
        },
        GetMyView: function (url) {
            let viewPromise = new Promise(function (resolver, rejector) {
                showoff_base.GetWithUrl(url, (response) => {
                    resolver(response);
                });
            })
            return viewPromise;
        },
        DeleteConfirmer: function () {
            let deleteNotice = new Promise(function (resolver, rejecter) {
                swal({
                    title: 'Are you sure to delete?',
                    text: "",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonClass: 'btn btn-success btn-fill',
                    cancelButtonClass: 'btn btn-danger btn-fill',
                    confirmButtonText: 'Yes, delete it!',
                    buttonsStyling: false
                }).then(function (res) {
                    resolver(res.value || false);

                });
            });
            return deleteNotice;
        },
        Confirmer: function (_title) {
            let Notice = new Promise(function (resolver, rejecter) {
                swal({
                    title: _title,
                    text: "",
                    type: 'info',
                    showCancelButton: true,
                    confirmButtonClass: 'btn btn-success btn-fill',
                    cancelButtonClass: 'btn btn-danger btn-fill',
                    confirmButtonText: 'Yes',
                    buttonsStyling: false
                }).then(function (res) {
                    resolver(res.value || false);

                });
            });
            return Notice;
        },
        SessionConfirm: function (_title, callbackFn) {
            let Notice = new Promise(function (resolver, rejecter) {
                swal({
                    title: _title,
                    text: "",
                    type: 'info',
                    showCancelButton: false,
                    confirmButtonClass: 'btn btn-success btn-fill',
                    confirmButtonText: 'Ok',
                    buttonsStyling: false
                }).then(function (res) {
                    //  resolver(res.value || false);
                    callbackFn(res);

                });
            });
            return Notice;
        },
        GenericAlert: function (_title, callbackFn) {
            let Notice = new Promise(function (resolver, rejecter) {
                swal({
                    title: _title,
                    text: "",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: '#dc3545',
                    cancelButtonClass: 'btn-secondary waves-effect',
                    confirmButtonClass: 'btn-danger waves-effect waves-light',
                    confirmButtonText: "I understand",
                    cancelButtonText: "Go back",
                    closeOnConfirm: false
                }).then(function (res) {
                    //  resolver(res.value || false);
                    callbackFn(res);

                });
            });
            return Notice;
        },
        ajaxGetViewComponent(url, elementid) {
            $.get(url, function (response) {
                $('#' + elementid).html('');
                $('#' + elementid).html(response);
            });
        },
        ajaxGetViewComponentparams(url, param, elementid) {
            $.get(url, { param: param }, function (response) {
                $('#' + elementid).html('');
                $('#' + elementid).html(response);
            });
        },
        ajaxReloadPartial(url, elementid) {
            $.get(url, function (response) {
                $('#' + elementid).html('');
                $('#' + elementid).html(response);
            });
        },
        ajaxReloadPartialGrid(url, elementid) {
            $.get(url, function (response) {
                $('#' + elementid).html('');
                $('#' + elementid).html(response);
                dataTableInitialization();
            });
        },
        ajaxGetCounterCall(url, param, qty, callback) {
            $.get(url, { Id: param, quantity: qty }, function (response) {
                callback(response);
            });
        },
    };
}();

function getOrderDetails(orderid) {
    $.get('/RestaurantOrder/GetOrderDetails', { Id: orderid }, function (data) {

        $('.generic-modal-add').html('');
        $('.generic-modal-add').html(data);
        $('#generic_modal_add').modal({
            backdrop: 'static',
            keyboard: false
        })
        // ---- refresh order list ----- 
        getOrderList();
        // ---- print details
        printBill('invoice-print', '../css/print.css')
    });
}

function openModalPopUp() {
    $('#generic_modal_add').modal({
        backdrop: 'static',
        keyboard: false
    })
}

function openModalPopUpGrid() {
    $('#generic_modal_add_grid').modal({
        backdrop: 'static',
        keyboard: false
    });

    $('#grid_div_menu').find('.dropzone:last').dropzone({
        uploadMultiple: false,
        maxFilesize: 10,
        maxFiles: 1,
        acceptedFiles: ".jpeg,.jpg,.png,.gif",
        paramName: "file",
        addRemoveLinks: true,
        init: function () {
            this.on("maxfilesexceeded", function (file) {
                this.removeAllFiles();
                this.addFile(file);
            });
        }
    });
}

function openModalPopUpCart() {
    $('#product-modal').modal({
        backdrop: 'static',
        keyboard: false
    })
}

function shoppingCartResponse(res) {
    if (res.responseJSON.status) {
        refreshCartViewComponent();
        var modal = $("#product-modal");
        if (modal && modal.length > 0) {
            modal.modal('hide');
        }
    }
    else {
        sweetAlert("Oops!", res.responseJSON.msg, "error");
    }

}

function refreshCartViewComponent() {
    showoff_base.ajaxGetViewComponent('/Home/ReloadShoppingCart', 'panel-cart');
    showoff_base.ajaxGetViewComponent('/Home/ReloadShoppingCartNotification', 'notification-panel-cart');
}

function dataTableSubGridInitialization() {
    var dt = $(".client-side-grid");
    if (dt && dt.length > 0) {
        dt.DataTable();
    }
}

function dataTableInitialization() {
    var dt = $(".client-side");
    if (dt && dt.length > 0) {
        dt.DataTable();
    }
}

function responseOrderFunction(res) {

    if (res.responseJSON.status) {
        sweetAlert("Congratulation", "Your order has been placed you will receive email shortly.", "success");
        refreshCartViewComponent();
        setTimeout(function () {
            window.location.href = '/Home/Index';
        }, 1000);
    }
    else if (res.responseJSON.data === -1) {
        sweetAlert("Oops!", res.responseJSON.msg, "error");
        window.location.href = '/Home/Index';
    }
    else {
        sweetAlert("Oops!", "Something went wrong placing your order. Please try later or contact us.", "error");
    }
}

function responseFunction(res) {
    if (res.responseJSON.status) {
        toastr.success(res.responseJSON.msg);
        reloadGrid(res.responseJSON.data);
        var modal = $("#generic_modal_add");
        if (modal && modal.length > 0) {
            modal.modal('hide');;
        }
    } else {
        toastr.error(res.responseJSON.msg);
    }
}

function getOrderList() {
    reloadGrid('/RestaurantOrder/RestaurantGrid');
}

function resFunction(res) {
    if (res.responseJSON.status) {
        toastr.success(res.responseJSON.msg);
    } else {
        toastr.error(res.responseJSON.msg);
    }
}

function reloadGrid(url) {
    $.get(url, {}, function (data) {
        $('#grid_div').html('');
        $('#grid_div').html(data);
        dataTableInitialization();
    });
}

function reloadMenuGrid(url, elementid) {

    $.get(url, {}, function (data) {
        $('#' + elementid).html('');
        $('#' + elementid).html(data);
        if (elementid === 'grid_div_menu') {
            dataTableSubGridInitialization();
        } else {
            dataTableInitialization();
        }

    });
}

function confirmModal(url, id, title) {

    swal({
        title: title,
        text: "",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: '#dc3545',
        cancelButtonClass: 'btn-secondary waves-effect',
        confirmButtonClass: 'btn-danger waves-effect waves-light',
        confirmButtonText: "Yes",
        closeOnConfirm: false
    })
        .then(val => {
            if (!val) throw null;
            if (val.value) {
                $.get(url, { Id: id }, function (res) {
                    if (res.status) {
                        toastr.success(res.msg);
                        reloadGrid(res.data);
                    } else {
                        toastr.error(res.msg);
                    }
                });
            }
        });
}

function confirmRemoveFromCart(url, id, title) {

    swal({
        title: title,
        text: "",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: '#dc3545',
        cancelButtonClass: 'btn-secondary waves-effect',
        confirmButtonClass: 'btn-danger waves-effect waves-light',
        confirmButtonText: "Yes",
        closeOnConfirm: false
    })
        .then(val => {
            if (!val) throw null;
            if (val.value) {
                $.get(url, { Id: id }, function (res) {
                    if (res.status) {
                        sweetAlert("Congratulation!", "Item has been removed successfully.", "success");
                        refreshCartViewComponent();
                    } else {
                        sweetAlert("Oops!", "Something went wrong placing your order. Please try later or contact us.", "error");
                    }
                });
            }
        });
}

function addRemoveCategories(url, model, title, e, elementid) {
    model.IsActive = $(e).prop('checked');
    swal({
        title: title,
        text: "",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: '#dc3545',
        cancelButtonClass: 'btn-secondary waves-effect',
        confirmButtonClass: 'btn-danger waves-effect waves-light',
        confirmButtonText: "Yes",
        closeOnConfirm: false
    })
        .then(val => {
            if (!val) throw null;
            if (val.value) {
                $.post(url, { model: model }, function (res) {
                    if (res.status) {
                        toastr.success(res.msg);
                        reloadMenuGrid(res.data, elementid);
                    } else {
                        if (model.IsActive) {
                            $(e).prop('checked', false);
                        } else {
                            $(e).prop('checked', true);
                        }
                        toastr.error(res.msg);
                    }
                });
            } else {
                if (model.IsActive) {
                    $(e).prop('checked', false);
                } else {
                    $(e).prop('checked', true);
                }
            }
        });
}

function printBill(id, css) {
    var contents = $("#" + id).html();
    var frame1 = $('<iframe />');
    frame1[0].name = "frame1";
    frame1.css({ "position": "absolute", "top": "-1000000px" });
    $("body").append(frame1);
    var frameDoc = frame1[0].contentWindow ? frame1[0].contentWindow : frame1[0].contentDocument.document ? frame1[0].contentDocument.document : frame1[0].contentDocument;
    frameDoc.document.open();
    //Create a new HTML document.
    frameDoc.document.write('<html>');
    frameDoc.document.write('<body>');
    //Append the external CSS file.
    frameDoc.document.write('<link href="' + css + '" rel="stylesheet" type="text/css" />');
    //Append the DIV contents.
    frameDoc.document.write(contents);
    frameDoc.document.write('</body></html>');
    frameDoc.document.close();
    setTimeout(function () {
        window.frames["frame1"].focus();
        window.frames["frame1"].print();
        frame1.remove();
    }, 500);
}

function minusCounter(orderguid, counterid) {
    $('#qty_' + counterid).val(parseInt($('#qty_' + counterid).val()) - 1);
    if (parseInt($('#qty_' + counterid).val()) === 0) {
        $('#qty_' + counterid).val(1);
    } else {
        showoff_base.ajaxGetCounterCall('/ShoppingCart/UpdateQuantity', orderguid, $('#qty_' + counterid).val(), callbackCounter);
    }
}

function plusCounter(orderguid, counterid) {
    $('#qty_' + counterid).val(parseInt($('#qty_' + counterid).val()) + 1);
    showoff_base.ajaxGetCounterCall('/ShoppingCart/UpdateQuantity', orderguid, $('#qty_' + counterid).val(), callbackCounter);
}

function callbackCounter(res) {
    if (res.status) {
        //refreshCartViewComponent();
        showoff_base.ajaxGetViewComponent('/Home/ReloadShoppingCart', 'panel-cart');
    } else {
        sweetAlert("Oops!", "Something went wrong placing your order. Please try later or contact us.", "error");
    }

}