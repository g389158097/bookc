from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, PasswordField, TextField, DateField, FloatField, SubmitField,RadioField,SelectField,TextAreaField,IntegerField
from wtforms.validators import DataRequired, Length, email,NumberRange


""" 
 字段类型      说　　明 
 StringField 文本字段 
 TextAreaField 多行文本字段 
 PasswordField 密码文本字段 
 HiddenField 隐藏文本字段 
 DateField 文本字段，值为 datetime.date 格式 
 DateTimeField 文本字段，值为 datetime.datetime 格式 
 IntegerField 文本字段，值为整数 
 DecimalField 文本字段，值为 decimal.Decimal 
 FloatField 文本字段，值为浮点数 
 BooleanField 复选框，值为 True 和 False 
 RadioField 一组单选框 
 SelectField 下拉列表 
 SelectMultipleField 下拉列表，可选择多个值 
 FileField 文件上传字段 
 SubmitField 表单提交按钮 
 FormField 把表单作为字段嵌入另一个表单 
 FieldList 一组指定类型的字段 
  
 验证函数 说　　明 
 Email 验证电子邮件地址 
 EqualTo 比较两个字段的值；常用于要求输入两次密码进行确认的情况 
 IPAddress 验证 IPv4 网络地址 
 Length 验证输入字符串的长度 
 NumberRange 验证输入的值在数字范围内 
 Optional 无输入值时跳过其他验证函数 
 Required 确保字段中有数据 
 Regexp 使用正则表达式验证输入值 
 URL 验证 URL 
 AnyOf 确保输入值在可选值列表中 
 NoneOf 确保输入值不在可选值列表中 
""" 




class LoginForm(FlaskForm):
    username = StringField(
        label='用户昵称',
        validators=[
            DataRequired("昵称必填"),
            Length(min=6, max=20, message="用户名必须介于6-20个字符")
        ],
        render_kw={"placeholder": "用户名必须介于6-20个字符"})
    password = PasswordField(
        label="用户密码",
        validators=[DataRequired("密码必填！")],
        render_kw={
            "placeholder": '密码必须大于6个字符',
        })

    remember_me = BooleanField(label='remember_me', default=False)
    submit = SubmitField(label='登录')
class RegisterForm(FlaskForm): 
    username = StringField( 
        label='用户昵称', 
        validators=[ 
            DataRequired("昵称必填"), 
            Length(min=6, max=20, message="用户名必须介于6-20个字符") 
        ], 
        render_kw={"placeholder": "用户名必须介于6-20个字符"}) 
    password = PasswordField( 
        label="用户密码", 
        validators=[DataRequired("密码必填！")], 
        render_kw={ 
            "placeholder": '密码必须大于6个字符', 
        }) 
    password2 = PasswordField( 
        label="用户密码", 
        validators=[DataRequired("密码必填！")], 
        render_kw={ 
            "placeholder": '再次输入', 
        }) 
    email = StringField( 
        '邮箱', 
        validators=[email(message="邮箱格式不正确！")], 
        render_kw={"placeholder": "E-mail: yourname@example.com"}) 

    realname = StringField(
        label='用户姓名',
        validators=[
            DataRequired("姓名必填"),
            Length(min=2, max=5, message="请输入真实姓名")
        ],
        render_kw={"placeholder": "请输入真实姓名"})
    gender = RadioField(
        label='性别',
        choices=[('m', '男'), ('f', '女')],
        validators=[DataRequired()])
    age = IntegerField(
        label='年龄',
        validators=[
        DataRequired("年龄必填"),
        NumberRange(min=16, max=100)],
        render_kw={"placeholder": "请输入真实年龄"})
    submit = SubmitField(label='注册')

class ChangeUserForm(FlaskForm): 
    username = StringField( 
        label='用户昵称', 
        validators=[ 
            DataRequired("昵称必填"), 
            Length(min=6, max=20, message="用户名必须介于6-20个字符") 
        ], 
        render_kw={"placeholder": "用户名必须介于6-20个字符"}) 
    password = StringField(
        label="用户密码", 
        validators=[DataRequired("密码必填！")], 
        render_kw={ 
            "placeholder": '密码必须大于6个字符', 
        }) 
    email = StringField( 
        '邮箱', 
        validators=[email(message="邮箱格式不正确！")], 
        render_kw={"placeholder": "E-mail: yourname@example.com"}) 

    realname = StringField(
        label='用户姓名',
        validators=[
            DataRequired("姓名必填"),
            Length(min=2, max=5, message="请输入真实姓名")
        ],
        render_kw={"placeholder": "请输入真实姓名"})
    gender = RadioField(
        label='性别',
        choices=[('m', '男'), ('f', '女')],
        validators=[DataRequired()])
    age = IntegerField(
        label='年龄',
        validators=[
        DataRequired("年龄必填"),
        NumberRange(min=16, max=100)],
        render_kw={"placeholder": "请输入真实年龄"})
    submit = SubmitField(label='确认修改')


class AddBookForm(FlaskForm):

    bname = StringField(
        label='图书名称',
        validators=[
            DataRequired("名称必填"),
            Length(min=2, max=20, message="图书名称必须介于2-20个字符")
        ],
        render_kw={"placeholder": "图书名称必须介于2-20个字符"})
    btype = SelectField(
        label='类别',
        choices=[
        ('历史', '历史'),
        ('魔幻', '魔幻'),
        ('玄幻', '玄幻'),
        ('军事', '军事'),
        ('科幻', '科幻'),
        ('都市', '都市'),
        ('穿越', '穿越'),
        ],
        validators=[DataRequired()])
    bdescribe = TextAreaField(
        label='图书简介',
        validators=[
            DataRequired("简介必填"),
            Length(min=1, max=80, message="请输入图书简介")
        ],
        render_kw={"placeholder": "请输入图书简介"})
    #bpic = FileField()
    submit = SubmitField(label='提交')

class AddCommentForm(FlaskForm):
    content = TextAreaField(
        label='评论内容',
        validators=[
            DataRequired("内容必填"),
            Length(min=1, max=80, message="请输入评论内容")
        ],
        render_kw={"placeholder": "请输入评论内容"})
    submit = SubmitField(label='提交')

class AddChapterForm(FlaskForm):
    chname = StringField(
        label='章节名称',
        validators=[
            DataRequired("名称必填"),
            Length(min=2, max=20, message="章节名称必须介于2-20个字符")
        ],
        render_kw={"placeholder": "章节名称必须介于2-20个字符"})
    chorder = IntegerField(
        label='章节序号',
        validators=[
        DataRequired("序号必填"),
        NumberRange(min=1, max=100)],
        render_kw={"placeholder": "请输入真实序号"})
    chcontent = TextAreaField(
        label='章节内容',
        validators=[
            DataRequired("内容必填"),
        ],
        render_kw={"placeholder": "请输入章节内容"})
    submit = SubmitField(label='提交')
