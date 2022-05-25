$(document).ready(function () {

    $('.scroll').on('click', 'a[href^="#"]', function (e) {
        e.preventDefault();

        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 500);
    });



    $("#signup").click(function () {

        $("#first").fadeOut("fast", function () {
            $("#second").fadeIn("fast");
        });
    });

    $("#signin").click(function () {

        $("#second").fadeOut("fast", function () {
            $("#first").fadeIn("fast");
        });
    });


  /*  $('#qty_input').prop('disabled', true);*/

    $('#plus-btn').click(function () {
        $('#qty_input').val(parseInt($('#qty_input').val()) + 1);
        $('#Quantity').val(parseInt($('#Quantity').val()) + 1);
    });
    $('#minus-btn').click(function () {
        $('#qty_input').val(parseInt($('#qty_input').val()) - 1);
        $('#Quantity').val(parseInt($('#Quantity').val()) - 1);
        if ($('#qty_input').val() === 0) {
            $('#qty_input').val(1);
            $('#Quantity').val(1);
        }

    });



    //var select_card = document.querySelectorAll(".select");

    //var title = document.getElementById("title");
    //var price = document.getElementById("price");

    //var selected = 2;



    //var reset = () => {

    //    select_card.forEach((k) => {

    //        k.setAttribute("data-selected", "false");
    //    })
    //}

    //select_card.forEach((a, i) => {

    //    a.addEventListener("click", (e) => {
    //        reset();
    //        a.setAttribute("data-selected", "true")
    //        selected = i + 1;
    //    })
    //})



    //var select_btn = document.querySelector(".select-btn");
    //var container = document.querySelector(".container");
    //var exit_btn = document.querySelector(".exit-btn");

    //select_btn.addEventListener("click", () => {
    //    container.style.display = "flex"
    //    if (selected == 1) {
    //        title.innerHTML = "Feed a child for 1 day";
    //        price.innerHTML = "5.50 USD";

    //    }

    //    if (selected == 2) {
    //        title.innerHTML = "Feed a child for 3 days"
    //        price.innerHTML = "16.50 USD";

    //    }


    //})

})