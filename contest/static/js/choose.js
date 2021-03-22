$(
    function () {
        $("table.question_page tr").each(
            function(i){
                var finish_times = $(this).closest("tr.single_content").children("td.single_finish_times").html();
                var correct_times = $(this).closest("tr.single_content").children("td.single_correct_times").html();
                var a = $(this).closest("tr.single_content").children("td.single_rate").children().children("div.single_correct_rate").html();
                if (finish_times == 0) {
                    $(this).closest("tr.single_content").children("td.single_rate").children().children("div.single_correct_rate").html(0.0 + "%");
                    $(this).closest("tr.single_content").children("td.single_rate").children().children("div.single_correct_rate").css("width", "0px");
                }
                else {
                    var correct_rate = Math.round(correct_times / finish_times * 10000);

                    $(this).closest("tr.single_content").children("td.single_rate").children().children("div.single_correct_rate").html(correct_rate / 100 + "%");
                    $(this).closest("tr.single_content").children("td.single_rate").children().children("div.single_correct_rate").css("width", correct_rate / 100 + "%");
                }
            }
        )

        // $("table.question_page tr.single_content td a.question_about").click(function () {
        //     alert($(this).parent().parent().html());
        //     // $(this).parent().parent().children("div.question_alert_page").fadeIn();
        // })
        // $("span.question_close").click(function () {
        //     $(this).parent().parent().fadeOut();
        // })

    }
);