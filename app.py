# -*- coding: utf-8 -*-
# Author  : Mr.Lee Ji
# Email   : 470390366@qq.com
# Time    : 2019/5/9 19:34
from db import *
import json
from flask import request,render_template,redirect,url_for,flash,session
from form import LoginForm,RegisterForm,AddBookForm,AddCommentForm,AddChapterForm,ChangeUserForm
from flask_login import login_required, current_user, login_user, logout_user
import datetime
from flask_bootstrap import Bootstrap
from flask_admin import Admin
from modelview import BaseModelview


#登录方法
@app.route('/login',methods=['POST','GET'])
def login():
    loginForm = LoginForm()
    if loginForm.validate_on_submit():
        username = loginForm.username.data
        password = loginForm.password.data
        user = User.query.filter_by(username = username).first()
        if password == user.password:
            #添加一个session
            session['username'] = username
            return render_template('index1.html')
    return render_template('login.html', form=loginForm, action='/login/')

#退出当前用户 清空session
@app.route('/login_out')
def login_out():
    session.pop('username')
    flash('You have been logged out.')
    return redirect(url_for('index'))

#注册方法
@app.route('/register',methods=['POST','GET'])
def register():
    registerForm = RegisterForm()
    if registerForm.validate_on_submit(): 
        username = registerForm.username.data 
        user = User.query.filter_by(username=username).first() 
        if user: 
            flash('用户名已存在') 
        email = registerForm.email.data 
        passwd1 = registerForm.password.data 
        passwd2 = registerForm.password2.data
        realname = registerForm.realname.data
        gender = registerForm.gender.data
        age = registerForm.age.data
        if passwd1 != passwd2: 
            flash('两次密码不一致，请重新输入！') 
        user = User(username=username, email=email, password=passwd1, realname=realname, sex=gender, age=age) 
        print('user=', user) 
        db.session.add(user) 
        db.session.commit() 
        print('注册成功') 
        return redirect(url_for('login')) 
    return render_template('register.html', form=registerForm, action='/register/') 

#设置登录首页
@app.route('/',methods=['POST','GET'])
def index():
    book = Book.query.all()
    return render_template('index.html', book=book)
#查看个人信息(区分读者作者)
@app.route('/userinfo',methods=['POST','GET'])	
def userinfo():
    if 'username' in session:
        username = session['username']
        user = User.query.filter_by(username=username).first()
        if user.write == True:
            return render_template('writerinfo.html')
        else:
            return render_template('readerinfo.html')
    else:
        return redirect(url_for('login'))

#修改个人信息
@app.route('/changeuserinfo',methods=['POST','GET'])
def change_userinfo():
    changeuserForm = ChangeUserForm()
    if 'username' in session:
        username = session['username']
        user = User.query.filter_by(username=username).first()
        if changeuserForm.validate_on_submit():
            user.username = changeuserForm.username.data
            user.password = changeuserForm.password.data
            user.email = changeuserForm.email.data
            user.realname = changeuserForm.realname.data
            user.sex = changeuserForm.gender.data
            user.age = changeuserForm.age.data
            db.session.commit()
            print('修改成功')
            return redirect(url_for('userinfo'))
        changeuserForm.username.data = username
        changeuserForm.password.data = user.password
        changeuserForm.email.data = user.email
        changeuserForm.realname.data = user.realname
        changeuserForm.gender.data = user.sex
        changeuserForm.age.data = user.age
        return render_template('change_userinfo.html', form=changeuserForm, action='/change_userinfo/')
    else:
        return redirect(url_for('login'))
			

#添加书籍（在前端筛选是否是读者）		
@app.route('/addbook',methods=['POST','GET'])
def add_book():
    addbookForm = AddBookForm()
    if 'username' in session:
        if addbookForm.validate_on_submit():
            username = session['username']
            user = User.query.filter_by(username=username).first()
            bookname = addbookForm.bname.data
            book = Book.query.filter_by(bname=bookname).first()
            if book:
                flash('图书已存在')
            booktype = addbookForm.btype.data
            print(booktype)
            bookdescribe = addbookForm.bdescribe.data
            book = Book(bname=bookname, btype=booktype, bdescribe=bookdescribe,bauthor=user.username)
            print('book=', book)
            db.session.add(book)
            db.session.commit()
            print('新建成功')
            return redirect(url_for('look_book'))
        return render_template('addbook.html', form=addbookForm, action='/add_book/')
    else:
        return redirect(url_for('login'))

#作者查看自己写的小说
@app.route('/lookbook',methods=['POST','GET'])
def look_book():
    if 'username' in session:
        username = session['username']
        book = Book.query.filter_by(bauthor=username).all()
        return render_template('lookbook.html', book=book)
    else:
        return redirect(url_for('login'))

#给小说增添章节		
@app.route('/addchapter/<int:book_id>',methods=['POST','GET'])
def add_chapter(book_id):
    addchapterForm = AddChapterForm()
    if 'username' in session:
        if addchapterForm.validate_on_submit():
            book = Book.query.filter_by(id=book_id).first()
            chname = addchapterForm.chname.data
            chorder = addchapterForm.chorder.data
            chcontent = addchapterForm.chcontent.data
            chapter = Chapter(chname=chname, chid=chorder,chtext=chcontent,chbook=book.bname)
            db.session.add(chapter)
            db.session.commit()
            print('添加成功')
            return redirect(url_for('bookdetail',book_id=book_id))
        return render_template('addchapter.html', form=addchapterForm, action='/add_chapter/')
    else:
        return redirect(url_for('login'))

#阅读小说
@app.route('/bookdetail/<int:book_id>',methods=['POST','GET'])
def bookdetail(book_id):
    if 'username' in session:
        book = Book.query.filter_by(id=book_id).first()
        chapter = Chapter.query.filter_by(chbook=book.bname).all()
        #需要对章节进行排序
        return render_template('bookdetail1.html', chapter=chapter, book=book)
    else:
        return redirect(url_for('login'))



#添加评论
@app.route('/addcomment/<int:book_id>',methods=['POST','GET'])
def add_comment(book_id):
    addcommentForm = AddCommentForm()
    if 'username' in session:
        if addcommentForm.validate_on_submit():
            username = session['username']
            user = User.query.filter_by(username=username).first()
            book = Book.query.filter_by(id=book_id).first()
            content = addcommentForm.content.data
            comment = Comment(content=content, cauthor=user.username, cbook=book.bname)
            db.session.add(comment)
            db.session.commit()
            print('新建成功')
            return redirect(url_for('look_comment'))
        return render_template('addcomment.html', form=addcommentForm, action='/add_comment/')
    else:
        return redirect(url_for('login'))
#查看自己的评论
@app.route('/lookcomment',methods=['POST','GET'])
def look_comment():
    if 'username' in session:
        username = session['username']
        comment = Comment.query.filter_by(cauthor=username).all()
        return render_template('lookcomment.html', comment=comment)
    else:
        return redirect(url_for('login'))

#对小说进行点赞
@app.route('/likebook/<int:book_id>',methods=['POST','GET'])
def like_book(book_id):
    if 'username' in session:
        username = session['username']
        user = User.query.filter_by(username=username).first()
        book = Book.query.filter_by(id=book_id).first()
        book.blike+=1
        db.session.commit()
        print('点赞成功')
        book = Book.query.filter_by(id=book_id).first()
        return redirect(url_for('bookdetail', book_id=book_id))
    else:
        return redirect(url_for('login'))



if __name__=='__main__':
    admin = Admin(app, name='cleanblog', template_mode='bootstrap3')
    admin.add_view(BaseModelview(User, db.session, name=u'用户管理'))
    app.config["SECRET_KEY"] = "12345678"
    bootstrap = Bootstrap(app)
    app.run(debug=True)
