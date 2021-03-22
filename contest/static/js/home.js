$(function () {
    $("div.leader td a").click(function () {
       $("div.leader td a").css({"font-weight": "normal", "font-size": "16px", "color": "whitesmoke"});
       $(this).css({"font-weight": "bold", "font-size": "17px", "color": "#444444"});
    });
    $("div.home_link a").click(function () {
       $("div.home_link a").css("background-color", "cadetblue");
       $(this).css("background-color", "#ce8483");
    });

    $("div.leader table tr td a.add").click(function () {
        $("div.single_page").css("display", "none");
        $("div.add_page").css("display", "block");
        $("a.title").html("出题");
    });
    $("div.leader table tr td a:not(a.add)").click(function () {
        $("div.add_page").css("display", "none");
    });

    var mark = $("div.page_mark").attr("mark");
    $("tr.page_leader td a").css({"font-weight": "normal", "font-size": "16px", "color": "whitesmoke"});
    $("a." + mark).css({"font-weight" : "bold", "font-size": "17px", "color": "#444444"});
    if(mark == "public") {
        $("title").html("公共题库");
        $("a.title").html("公共题库");
    }
    else if (mark == "single") {
        $("title").html("单选题库");
        $("a.title").html("单选题库");
    }
    else if (mark == "multiple") {
        $("title").html("多选题库");
        $("a.title").html("多选题库");
    }
    else if (mark == "judge") {
        $("title").html("判断题库");
        $("a.title").html("判断题库");
    }
    else if (mark == "programming") {
        $("title").html("编程题库");
        $("a.title").html("编程题库");
    }

});