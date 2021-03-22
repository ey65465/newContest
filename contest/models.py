from django.db import models

# Create your models here.
# 用户
class User(models.Model):
    id = models.AutoField("主键", primary_key = True)
    name = models.CharField("用户名", max_length= 200, unique=True)
    pw = models.CharField("密码", max_length=200)
    create_date = models.DateTimeField("创建日期", auto_now_add=True)

    def __unicode__(self):
        return self.name

    class Meta():
        ordering = ["-create_date"]

# 选择题题目
class Question(models.Model):

    auth_choice = (
        ("private", "私人"),
        ("public", "公共"),
    )

    type_choice = (
        ("single", "单选题"),
        ("multiple", "多选题"),
        ("judge", "判断题"),
        ("programming", "编程题"),
    )

    id = models.AutoField("主键", primary_key = True)
    about = models.CharField("知识点", max_length=300)
    content = models.CharField("题目描述", max_length=500)
    answer = models.CharField("正确答案", max_length=500)
    authority = models.CharField("题目权限", choices=auth_choice, default="私人", max_length=10)
    user = models.ForeignKey("User", on_delete=models.CASCADE)
    finish_times = models.IntegerField("做题次数", default=0)
    currect_times = models.IntegerField("正确次数", default=0)
    create_date = models.DateTimeField("创建日期", auto_now_add=True)
    pic_url = models.CharField("图片地址", max_length=500)
    type = models.CharField("题目类型", choices=type_choice, default="单选题", max_length=30)

# 题目选项
class Option(models.Model):
    id = models.AutoField("主键", primary_key=True)
    content = models.CharField("选项内容", max_length=500)
    question = models.ForeignKey("Question", on_delete=models.CASCADE)
    create_date = models.DateTimeField("创建日期", auto_now_add=True)
    pic_url = models.CharField("图片地址", max_length=500)
