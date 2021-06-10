import $ from "jquery";

export function modalToggle() {
    $('#modal-open-btn').on('click',function() {
        $('#modal-wrapper').fadeIn();
        $('#modal-wrapper').css({
            "z-index":"10"
        });
        return false;
    });
    $('.modal-close').on('click',function() {
        $('#modal-wrapper').fadeOut();
        $('#modal-wrapper').css({
            "z-index":"-1"
        });
        return false;
    });
}
