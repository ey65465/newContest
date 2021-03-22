$(function () {
    var shadows = 3;
    var idc = 1;
    var pwc = 1;

    function showTip(text){
        var opacity = 0;
        $("div.tip span.word").text(text);
        var timer = setInterval(function () {
            opacity += 0.1;
            $(".tip").css("opacity", opacity.toString());
            if(opacity >= 1) clearInterval(timer);
        }, 10);
    }

    function hideTip(op){
        var opacity = op;
        var timer = setInterval(function () {
            opacity -= 0.1;
            $(".tip").css("opacity", opacity.toString());
            if(opacity <= 0) clearInterval(timer);
        }, 10);
    }

    $(".login").click(function () {
       var name = $(".id").val();
       var pw = $(".pw").val();
       if(name == "" || pw == "") showTip("请输入账号密码");
       else{
           var opacity = $(".tip").css("opacity");
           hideTip(opacity);
           $.post(
                "/to_login/",
                {"name": name, "password": pw},
                function(re){
                    if(re == "notExist"){
                        showTip("账号不存在");
                    }
                    else if(re == "no"){
                        showTip("密码错误");
                    }
                    else{
                        $(".myform").submit();
                    }
                }
           );
       }
    });

    $(".id").focus(function () {
        idc = 0;
        $(this).css("border-color", "cadetblue");
        var time = 0;
        var shadow = setInterval(function () {
            time = time + 1;
            $(".id").css("box-shadow", "0px 0px " + time.toString() +"px lightblue");
            if (time >= shadows) clearInterval(shadow);
      }, 20);
    });
    $(".id").blur(function () {
        idc = 1;
        $(this).css("border-color", "lightgray");
        var time = shadows;
        var shadow = setInterval(function () {
            time = time - 1;
            $(".id").css("box-shadow", "0px 0px " + time.toString() +"px lightblue");
            if (time <= 0) clearInterval(shadow);
        }, 20);
    });

    $(".pw").focus(function () {
        pwc = 0;
        $(this).css("border-color", "cadetblue");
        var time = 0;
        var shadow = setInterval(function () {
            time = time + 1;
            $(".pw").css("box-shadow", "0px 0px " + time.toString() +"px lightblue");
            if (time >= shadows) clearInterval(shadow);
      }, 20);
    });
    $(".pw").blur(function () {
        pwc = 1;
        $(this).css("border-color", "lightgray");
        var time = shadows;
        var shadow = setInterval(function () {
            time = time - 1;
            $(".pw").css("box-shadow", "0px 0px " + time.toString() +"px lightblue");
            if (time <= 0) clearInterval(shadow);
      }, 20);
    });

    $(".id").mouseenter(function () {
        $(this).css("border-color", "cadetblue");
    });
    $(".pw").mouseenter(function () {
        $(this).css("border-color", "cadetblue");
    });
    $(".id").mouseleave(function () {
        if(idc == 1) $(this).css("border-color", "lightgray");
    });
    $(".pw").mouseleave(function () {
        if(pwc == 1) $(this).css("border-color", "lightgray");
    });
});