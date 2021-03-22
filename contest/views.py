from django.shortcuts import render
from contest.models import *
from django.http.response import HttpResponse, JsonResponse
from django.core.files.storage import default_storage
from newContest.settings import MEDIA_ROOT
import time

# Create your views here.
# 进入登陆界面
def login(request):
    return render(request, "login.html")
# 检查账号密码
def tologin(request):
    name = request.POST.get("name")
    pw = request.POST.get("password")
    userList = User.objects.filter(name = name)
    if len(userList) == 0:
        return HttpResponse("notExist")
    else:
        user = userList[0]
        if pw == user.pw:
            request.session["name"] = name
            return HttpResponse("yes")
        else:
            return HttpResponse("no")
# 进入主页
def home(request):
    questionList = Question.objects.all()
    return render(request,"home.html", {"name": request.session["name"], "mark": "public", "questionList": questionList})
# 上传图片
def upload_img(request):
    img = request.FILES.get("img")
    print(img)
    if img != None:
        if img.name.split(".")[-1] in ("jpg", "jpeg", "png","gif"):
            pic_name = str(int(time.time())) + "." + img.name.split(".")[-1]
            save_path = MEDIA_ROOT + pic_name
            file_path = default_storage.save(save_path, img)
            url = "../contest/static/upload_img/" + pic_name
            return JsonResponse({"message": "上传成功", "url": url})
        else:
            return JsonResponse({"message": "上传失败：只能上传格式为jpg、jpeg、png、gif的图片"})
    else:
        return JsonResponse({"message": "无图片", "url": ""})
# 添加选择题
def add_question(request):
    about = request.POST.get("about")
    question_content = request.POST.get("question_content")
    url = request.POST.get("url")
    auth = request.POST.get("auth")
    answer = request.POST.get("answer")
    type = request.POST.get("type")
    if type == "radio":
        type = "single"
    elif type == "checkbox":
        type = "multiple"
    print(about, question_content, url, auth, answer)
    name = request.session["name"]
    user = User.objects.get(name = name)
    if url == None:
        url = ""
    try:
        Question.objects.create(about = about, content = question_content, answer = answer, authority = auth, user = user, pic_url = url, type=type)
        choose = Question.objects.get(content = question_content,pic_url= url)
    except:
        return JsonResponse({"message": "no"})
    else:
        if type == "single" or type == "multiple":
            return JsonResponse({"message": str(choose.id)})
        else:
            return JsonResponse({"message": "noOption"})
# 添加选项
def add_option(request):
    content = request.POST.get("content")
    question_id = request.POST.get("question_id")
    question = Question.objects.get(id = question_id)
    url = request.POST.get("url")
    if url == None:
        url=""
    try:
        Option.objects.create(content = content, question = question, pic_url = url)
    except:
        return JsonResponse({"tip": "failed"})
    else:
        return JsonResponse({"tip": "success"})
# 进入四种题题库
def question(request):
    type = request.GET.get("type")
    try:
        request.session["pages"]
    except:
        questionNum = len(Question.objects.filter(type=type))
        request.session["pages"] = int(questionNum / 10)
        request.session["current_page"] = 1
        if questionNum%10 != 0:
            request.session["pages"] = int(questionNum/10+1)
    questionList = Question.objects.filter(authority="public", type=type)[(request.session["current_page"]-1)*10:request.session["current_page"]*10]
    return render(request, "home.html", {"questionList": questionList, "pages": request.session["pages"], "current_page": request.session["current_page"], "mark": type})

def getQuestion(request):
    qid = request.GET.get("qid")
    question = Question.objects.get(id=qid)
    return HttpResponse(question)
