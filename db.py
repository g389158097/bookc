from flask import Flask
from flask_sqlalchemy import SQLAlchemy
app=Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root:951026zxy@127.0.0.1:3306/testdb'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
db = SQLAlchemy(app)


#建立用户模型
class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)
    realname = db.Column(db.String(20), unique=True, nullable=False)
    sex = db.Column(db.String(4))
    #头像
    age = db.Column(db.Integer)
    describe = db.Column(db.String(128))
    local = db.Column(db.String(128))
    qnumber = db.Column(db.Integer)
    phonenumber = db.Column(db.Integer)
    email = db.Column(db.String(120), unique=True, nullable=False)
    write = db.Column(db.Boolean,default= 0)
    limit = db.Column(db.Boolean,default= False)

#建立图书模型
class Book(db.Model):
    __tablename__ = 'book'
    id = db.Column(db.Integer, primary_key=True)
    bname = db.Column(db.String(80), unique=True,nullable=False)
    btype = db.Column(db.String(10),nullable=False)
    bdescribe = db.Column(db.String(80),nullable=False)
    #bpic = db.Column(db.String(100),nullable=False)
    blike = db.Column(db.Integer,default=0)
    bauthor = db.Column(db.String(20),db.ForeignKey('user.username'))
    bstatus = db.Column(db.Boolean,default= False)
    blimit = db.Column(db.Boolean,default= False)

#建立评论模型
class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(80),nullable=False)
    cauthor = db.Column(db.String(20),db.ForeignKey('user.username'))
    cbook = db.Column(db.String(20),db.ForeignKey('book.bname'))

 #建立篇章模型
class Chapter(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    chname = db.Column(db.String(20),nullable=False)
    chtext = db.Column(db.String(1000),nullable=False)
    chid = db.Column(db.Integer)
    chbook = db.Column(db.String(20),db.ForeignKey('book.bname'))



# class Student(db.Model):
#     __tablename__ = 'student'
#     id = db.Column(db.Integer, primary_key=True)
#     # openid = db.Column(db.String(100))
#     studen_id = db.Column(db.Integer, nullable=False)
#     name = db.Column(db.String(255), nullable=False)
#     password = db.Column(db.String(255), nullable=False)
#     classid = db.Column(db.Integer,db.ForeignKey('class_info.id'))
#
# class Class_info(db.Model):
#     __tablename__ = 'class_info'
#     id = db.Column(db.Integer, primary_key=True)
#     class_name=db.Column(db.String(255), nullable=False)
#
# class Teacher(db.Model):
#     __tablename__ = 'teacher'
#     id = db.Column(db.Integer, primary_key=True)
#     teacher_id=db.Column(db.Integer, nullable=False)
#     username = db.Column(db.String(255), nullable=False)
#     password = db.Column(db.String(255), nullable=False)
#     course = db.Column(db.String(255), nullable=False)
#
# class Course(db.Model):
#     __tablename__ = 'course'
#     id = db.Column(db.Integer, primary_key=True)
#     classid = db.Column(db.Integer, db.ForeignKey('class_info.id'))
#     teacherid = db.Column(db.Integer, db.ForeignKey('teacher.id'))
#     starttime = db.Column(db.String(255))
#     endtime = db.Column(db.String(255))
#     issign=db.Column(db.Boolean,default=0)
#
#
# class Sign(db.Model):
#     __tablename__ = 'sign'
#     id = db.Column(db.Integer, primary_key=True)
#     courseid = db.Column(db.Integer, db.ForeignKey('course.id'))
#     studentid = db.Column(db.Integer, db.ForeignKey('student.id'))
#     # teacherid = db.Column(db.Integer, db.ForeignKey('teacher.id'))
#     sign_time = db.Column(db.DateTime)
#     sign_stu=db.Column(db.Boolean,default=0)
#
# class Application(db.Model):
#     __tablename__ = 'application'
#     id = db.Column(db.Integer, primary_key=True)
#     courseid = db.Column(db.Integer, db.ForeignKey('course.id'))
#     studentid = db.Column(db.Integer, db.ForeignKey('student.id'))
#     reason=db.Column(db.String(255))



if __name__ == "__main__":

    db.create_all()
