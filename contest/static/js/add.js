var type = "radio";
var page_url = "";
// 记录图片地址
var url = "";
// 判断题目类型
function question_type(){
    var a1 = $("a.add_single").attr("mark");
    var a2 = $("a.add_multiple").attr("mark");
    var a3 = $("a.add_judge").attr("mark");
    var a4 = $("a.add_programming").attr("mark");
    if(a1 == "yes") {
        type="radio";
        page_url="/addsingle/";
    }
    else if(a2 == "yes") {
        type="checkbox";
        page_url="/addmultiple/";
    }
    else if(a3 == "yes") {
        type="judge";
        page_url="/addjudge/";
    }
    else if(a4 == "yes") {
        type="programming";
        page_url="/addprogramming/";
    }
}
// 题目添加按钮的点击效果控制
$(function () {
    $("table.add_leader_table tr td a").click(function () {
        $("table.add_leader_table tr td a").attr("mark", "no");
        $(this).attr("mark", "yes");
        question_type();
        $("tr.added_option").remove();
        num = 0;
        if (type == "judge" || type == "programming") {
            num = 2;
            $("table.add_option tr.answer td span.answer").remove();
            $("button.add_option").attr("disabled", "disabled");
            $("button.add_option").html("已禁用");
            if (type == "judge"){
                var $op1 = $("<span class='answer' style='display: inline-block; margin-left: 20px;font-size: 16px;'>" +
                "<input class='answer' type='radio' name='single' value='对'/>.对</span>");
                var $op2 = $("<span class='answer' style='display: inline-block; margin-left: 20px;font-size: 16px;'>" +
                "<input class='answer' type='radio' name='single' value='错'/>.错</span>");
                $("table.add_option tr.answer td").append($op1);
                $("table.add_option tr.answer td").append($op2);
            }
        }
        else{
            $("button.add_option").removeAttr("disabled");
            $("button.add_option").html("添加选项");
            $("table.add_option tr.answer td span.answer").remove();
        }
    });
});
// 记录答案选项数量
var num = 0;
// 添加选项控件
function add(){
    num++;
    var str = String.fromCharCode((64+num));
    var $option = $("<tr class='added_option'><td><span>" +str+
           "</span><input type='text' style='width: 90%;margin-left: 10px;' class='choice_content' mark='"+str+"'/></td>" +
        "<td><form class='option_pic' method='post' enctype='multipart/form-data'>" +
        "<input type='hidden' name='csrfmiddlewaretoken' value='6c4gBIipIBBGC5XuPcsfeLvuq3qc3qyHEZjMuqxMLZ3eWy2KEBTGPkwNsVzi4fV6w'>" +
        "<input type='file' style='width: 70%;display: inline-block' class='choice_img'/></form>" +
        "（可选）</td><td><a href='#' class='del' id='"+str+"'>删除</a></td></tr>");
    $("table.add_option tr.answer").before($option);
    add_answer(num);
    init();
}
// 删除选项控件
function init() {
    $("table tr td a.del").unbind("click").click(function () {
        $("tr.answer td span.answer").remove();
        $(this).parent().parent().remove();
        for(var i = 0; i < num-1; i++){
            var str = String.fromCharCode((65+i));
            $("table tr.added_option:eq("+i+") span").html(str);
            add_answer(i+1);
        }
        num--;
    });
}
// 添加答案控件
function add_answer(n) {
    question_type();
    var answer = String.fromCharCode(64+n);
    var $op = $("<span class='answer' style='display: inline-block; margin-left: 20px;font-size: 15px;'><input class='answer' type='"+
        type+"' name='single' value='"+ answer + "'/>." + answer + "</span>");
    $("table.add_option tr.answer td").append($op);
}
// 显示提示信息
function showtip(message) {
    $("span.tip").css("visibility", "visible");
    $("span.tip").html(message);
}
// 隐藏提示信息
 function hidetip() {
    $("span.tip").css("visibility", "hidden");
}
//上传图片
function upload(data) {
    $.ajax({
        url: "/upload_img/",
        type: "POST",
        data: data,
        async: false,
        cache: false,        // 不缓存数据
        processData: false,  // 不处理数据
        contentType: false,   // 不设置内容类型
        success:function (data) {
            if(data.message=="上传失败：只能上传格式为jpg、jpeg、png、gif的图片"){
                url = data.message;
            }
            else{
                url = data.url;
            }
        }
    });
}
// 保存题目信息
function save(){
    url = ""; // 初始化图片地址
    var answer = ""; // 存储答案
    var auth = ""; // 存储题目权限
    var status = 1; // 标志题目完整性，1表示完整，0表示不完整
    var option_contents = new Array(); // 用于保存选项信息
    var option_imgs = new Array(); // 用于保存选项图片信息

    var about = $("input.knowledge").val(); // 获取知识内容
    var question_content = $("textarea.question_content").val(); // 获取题目信息
    /*判断题目权限*/
    if($("tr.authority td input:checked").val() == "私人题目") auth="private";
    else auth = "public";
    /*遍历单选框，找出选中的单选框*/
    for(var i = 0; i < num; i++){
        var check = $("input.answer:eq("+i+")").prop("checked");
        if(type=="judge") {
            if(i == 0 && check){
                answer = "true";
            }
            else if(i == 1 && check){
                answer = "false";
            }
        }
        else if(type == "radio" || type == "checkbox"){
            if(check) {
                var ans = $("tr.added_option td input[mark=" + String.fromCharCode(65+i) + "]").val();
                answer += ans;
                if(i != num-1) answer += "18950818";
            }
        }
        else if(type == "programming"){
            answer = "无";
        }
    }
    /*获取form内的图片信息*/
    let form = $("form.upload_img")[0];
    let formdata = new FormData(form);
    question_type(); // 获取题目类型
    /*判断题目完整性*/
    if(about == "" || question_content == "" || answer == "") {
        status = 0;
        showtip("题目信息不完整");
        setTimeout(hidetip,2000);
    }
    else{
        if(type == "radio" || type == "checkbox"){
            /*遍历选项内容，取出input控件内容信息*/
            for(var i  = 0; i < num; i++){
                var option_content = $("tr.added_option:eq("+i+") input.choice_content").val();
                let option_img = $("tr.added_option:eq("+i+") form.option_pic")[0];
                let option_img_data = new FormData(option_img);
                if(option_content == ""){
                    status = 0;
                    showtip("选项信息不完整");
                    setTimeout(hidetip,2000);
                    break;
                }
                option_contents.push(option_content); // 保存选项信息
                option_imgs.push(option_img_data); // 保存图片信息
            }
        }
        if(status == 1){
            upload(formdata);
            if(url == "上传失败：只能上传格式为jpg、jpeg、png、gif的图片"){
                showtip(url);
                setTimeout(hidetip, 2000);
            }
            else{
                $.post(
                    "/add_question/",
                    {"about": about, "question_content": question_content, "url": url, "auth": auth, "answer": answer, "type": type},
                    function (data) {
                        if(data.message == "no") {
                            showtip("题目保存失败");
                            setTimeout(hidetip, 2000);
                        }
                        else if(data.message == "noOption"){
                            window.location.href="/question/?type=" + page_url.substring(4, page_url.length-1);
                        }
                        else{
                            var a = 0;
                            for(var i = 0; i < num; i++){
                                upload(option_imgs[i]);
                                $.post(
                                    "/add_option/",
                                    {"content": option_contents[i], "question_id": data.message, "url": url},
                                    function (re) {
                                        if(re.tip == "failed") {
                                            showtip("选项保存失败");
                                            setTimeout(hidetip, 2000);
                                            a = 1;
                                        }
                                    });
                                if(a == 1) break;
                            }
                            if(a == 0) window.location.href="/question/?type=" + page_url.substring(4, page_url.length - 1);
                        }
                    });
            }
        }
    }
}


