jQuery(($) => {

    // let total = 0;



    // // Уменьшаем на 1
    // $(document).on("click", ".input-number__minus", function () {
    //     let total = $(this).next();
    //     if (total.val() > 0) {
    //         total.val(+total.val() - 1);
    //     }
    // });

    // // Увеличиваем на 1
    // $(document).on("click", ".input-number__plus", function () {
    //     let total = $(this).prev();
    //     total.val(+total.val() + 1);
    // });

    // Запрещаем ввод текста 
    document.querySelectorAll('.input-number__input').forEach(function (el) {
        el.addEventListener('keydown', function (event) {
            // Разрешаем: backspace, delete, tab
            if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 ||
                // Ctrl+A
                (event.keyCode == 65 && event.ctrlKey === true) ||
                // ← →
                (event.keyCode >= 35 && event.keyCode <= 39)) {
                return;
            } else {
                // Только цифры
                if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
                    event.preventDefault();
                }
            }

        });
    });


    // //Добавление в корзину
    // $(document).on("click", "tbody .is-actions-cell button[data-action='add']", function () {
    //     let line = $(this).closest('tr')
    //     let isCheck = line.attr('data-check') === 'true';
    //     if (!isCheck) {
    //         line.attr("data-check", true);
    //         let el = line.find('.input-number__input:first')
    //         let num = Number(el.val());
    //         if (num !== NaN && num !== 0) {
    //             $("#cart .badge").text(++total);
    //             BlockLine(line);
    //         }
    //     }
    // });

    // //Удаление из корзины
    // $(document).on("click", "tbody .is-actions-cell button[data-action='del']", function () {
    //     let line = $(this).closest('tr')
    //     let isCheck = line.attr('data-check') === 'true';
    //     if (isCheck) {
    //         line.attr("data-check", false);
    //         let el = line.find('.input-number__input:first')
    //         let num = Number(el.val());
    //         if (num !== NaN && num > 0) {
    //             $("#cart .badge").text(--total);
    //             UnlockLine(line);
    //         }
    //     }
    // });

    // //Редактирование в корзине
    // $(document).on("click", "tbody .is-actions-cell button[data-action='edit']", function () {
    //     UnlockLine(line);
    // });



    // $(document).on("click", "#cart", function () {
    //     let isCheck = $(this).attr('data-check') === 'true';
    //     if (isCheck){
    //         HideOrder();
    //     } else {
    //         ShowOrder();
    //     }
    // });

    // $(document).on("click", "#return", function () {
    //     let isCheck = $(this).attr('data-check') === 'true';
    //     if (isCheck){       
    //         HideOrder();
    //     } else {
    //         ShowOrder();
    //     }
    // });

    // function ShowOrder() {
    //     $('#cart').attr("data-check", true);
    //     $('#return').attr("data-check", true).find('span').eq(1).text("Вернуться к списку товаров");
    //     $('#return').find(".fa-solid").addClass("fa-person-walking-arrow-loop-left").removeClass("fa-cart-shopping");
    //     $('#send').removeClass("is-hidden");

    //     //$("tbody tr:not(.check)").addClass("is-hidden");
    //     //$('tr[data-check="true"] .is-actions-cell i.fa-solid').removeClass().addClass('fa-solid').addClass('fa-pen-to-square');
    //     //$('tr[data-check="false"]').addClass("is-hidden");
    //     //$("tbody tr.check .is-sr-only").removeClass("is-sr-only");

    //     //$("tbody .fa-cart-plus").removeClass("fa-cart-plus").addClass("fa-pen-to-square");
    //     //$("tbody .cart").removeClass("is-sr-only");
    //     //$("tbody tr:not(.check)").addClass("is-hidden");

    // }
    // function HideOrder() {
    //     $('#cart').attr("data-check", false);
    //     $('#return').attr("data-check", false);
    //     $('#return').find('span').eq(1).text("Перейти к оформлению");
    //     $('#send').addClass("is-hidden");
    //     $('tr.is-hidden').removeClass("is-hidden"); 

    //     $('#return').find(".fa-solid").addClass("fa-cart-shopping").removeClass("fa-person-walking-arrow-loop-left");
    //     //$("tbody .fa-pen-to-square").removeClass("fa-pen-to-square").addClass("fa-cart-plus");
    //     //line.find('.is-actions-cell button').removeClass('is-danger')


    //     $('tr[data-check="true"]').each(function (index, element) {
    //         BlockLine($(element));
    //     })
    // }

    // function UnlockLine(line) {
    //     line.find('.input-number__minus, .input-number__plus').removeClass("is-hidden");
    //     line.find('.input-number__input:first').css("width", "32px");
    //     //line.find('.is-actions-cell button').removeClass('is-danger');
    // }

    // function BlockLine(line) {
    //     line.find('.input-number__minus, .input-number__plus').addClass("is-hidden");
    //     line.find('.input-number__input:first').css("width", "100%");
    //     //line.find('.is-actions-cell i.fa-solid').removeClass().addClass('fa-solid').addClass('fa-trash');
    //     //line.find('.is-actions-cell button').addClass('is-danger');
    // }
});