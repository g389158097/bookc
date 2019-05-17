var consume = (function () {
    var me = {};
    var apiUrl = "/ajax/ashx/Common.ashx?op=";
    var mutex = true;
    me.orderChapter = function (chapterID, success, error) {
        if (mutex) {
            mutex = false;
            $.ajax({
                type: 'post',
                url: apiUrl + 'orderChapter',
                data: { nid: 0, cid: chapterID },
                dataType: 'json',
                cache: false,
                success: function (json) {
                    if (json.status == 200) {
                        alert("订阅成功,点击确定开始阅读正文!")
                        success();
                    }
                    else if (json.status == 555) {
                        me.redirectPay("账号余额不足,是否前去充值?");
                    }
                    else error(json.msg);
                    mutex = true;
                },
                error: function (result, status) {
                    error("与服务器通信出错,请刷新后再试");
                    mutex = true;
                }
            });
        }
    }
    me.orderAllChapter = function (novelID, autoOrder, success, error) {
        if (mutex) {
            mutex = false;
            $.ajax({
                type: 'post',
                url: apiUrl + 'orderChapter',
                data: { nid: novelID, cid: 0, auto: autoOrder },
                dataType: 'json',
                cache: false,
                success: function (json) {
                    if (json.status == 200) {
                        alert("订阅成功,点击确定开始阅读正文!")
                        success();
                    }
                    else if (json.status == 555) {
                        me.redirectPay("账号余额不足,是否前去充值?");
                    }
                    else error(json.msg);
                    mutex = true;
                },
                error: function (result, status) {
                    error("与服务器通信出错,请刷新后再试");
                    mutex = true;
                }
            });
        }
    }

    me.rewardNovel = function (novelID, point, bonusCmt, success, error) {
        if (mutex) {
            mutex = false;
            $.ajax({
                type: 'post',
                url: apiUrl + 'rewardbook',
                data: { nid: novelID, bonus: point, cmt: bonusCmt },
                dataType: 'json',
                cache: false,
                success: function (json) {
                    if (json.status == 200) {
                        alert("打赏成功,感谢您对作者的支持!")
                        success();
                    }
                    else if (json.status == 555) {
                        me.redirectPay("账号余额不足,是否前去充值?");
                    }
                    else error(json.msg);
                    mutex = true;
                },
                error: function (result, status) {
                    error("与服务器通信出错,请刷新后再试");
                    mutex = true;
                }
            });
        }
    }
    me.autoOrder = function (novelID, success, error) {
        if (mutex) {
            mutex = false;
            $.ajax({
                type: 'post',
                url: apiUrl + 'autoOrder',
                data: { nid: novelID },
                dataType: 'json',
                cache: false,
                success: function (json) {
                    if (json.status == 200) {
                        success(json.msg);
                    }
                    else if (json.status == 555) {
                        me.redirectPay("账号余额不足,是否前去充值?");
                    }
                    else error(json.msg);
                    mutex = true;
                },
                error: function (result, status) {
                    error("与服务器通信出错,请刷新后再试");
                    mutex = true;
                }
            });
        }
    }
    me.getFireMoney = function (success, error) {
        $.ajax({
            type: 'post',
            url: apiUrl + 'getuserpoint',
            dataType: 'json',
            cache: false,
            success: function (json) {
                success(json.fireMoney);
            },
            error: function (result, status) {
                error();
            }
        });
    }
    me.getBonusInfo = function (novelID, success, error) {
        $.ajax({
            type: 'post',
            url: apiUrl + 'bonusinfo',
            data: { nid: novelID },
            dataType: 'json',
            cache: false,
            success: function (json) {
                success(json);
            },
            error: function (result, status) {
                error();
            }
        });
    }
    me.getTicketInfo = function (novelID, success, error) {
        $.ajax({
            type: 'post',
            url: apiUrl + 'ticketinfo',
            data: { nid: novelID },
            dataType: 'json',
            cache: false,
            success: function (json) {
                success(json);
            },
            error: function (result, status) {
                error();
            }
        });
    }
    me.addTicket = function (novelID, cmtBody, num, success, error) {
        if (mutex) {
            mutex = false;
            $.ajax({
                type: 'post',
                url: apiUrl + 'addTicket',
                data: { nid: novelID, cmtBody: cmtBody, num: num },
                dataType: 'json',
                cache: false,
                success: function (json) {
                    if (json.status == 200) {
                        success(json);
                    }
                    else error(json.msg);
                    mutex = true;
                },
                error: function (result, status) {
                    error("与服务器通信出错,请刷新后再试");
                    mutex = true;
                }
            });
        }
    }
    me.getUnlockHour = function (novelID, success, error) {
        $.ajax({
            type: 'post',
            url: apiUrl + 'getunlockhour',
            data: { nid: novelID },
            dataType: 'json',
            cache: false,
            success: function (json) {
                success(json);
            },
            error: function (result, status) {
                error();
            }
        });
    }
    me.getFansList = function (novelID, success, error) {
        $.ajax({
            type: 'get',
            url: apiUrl + 'getFansList',
            data: { nid: novelID },
            dataType: 'json',
            cache: false,
            success: function (json) {
                success(json);
            },
            error: function (result, status) {
                error();
            }
        });
    }
    me.addTag = function (novelID, tags, success, error) {
        if (mutex) {
            mutex = false;
            $.ajax({
                type: 'post',
                url: apiUrl + 'addTag',
                data: { nid: novelID, tags: tags },
                dataType: 'json',
                cache: false,
                success: function (json) {
                    if (json.status == 200) {
                        success(json);
                    }
                    else error(json.msg);
                    mutex = true;
                },
                error: function (result, status) {
                    error("与服务器通信出错,请刷新后再试");
                    mutex = true;
                }
            });
        }
    }
    me.redirectPay = function (msg) {
        if (confirm(msg))
            location.href = "https://pay.sfacg.com/";
    }
    return me;
})();
var message = (function () {
    var me = {};
    var apiUrl = "/ajax/ashx/Common.ashx?op=";
    var mutex = true;
    me.send = function (touid, msg, success, error, then) {
        if (mutex) {
            mutex = false;
            $.ajax({
                type: 'post',
                url: apiUrl + 'sendmsg',
                data: { msg: msg, touid: touid },
                dataType: 'json',
                cache: false,
                success: function (json) {
                    if (json.status == 200) {
                        success();
                    }
                    else error(json.msg);
                    mutex = true;
                    if (then)
                        then();
                },
                error: function (result, status) {
                    error("与服务器通信出错,请刷新后再试");
                    mutex = true;
                }
            });
        }
    }
    me.markread = function (touid, success, error, then) {
        if (mutex) {
            mutex = false;
            $.ajax({
                type: 'post',
                url: apiUrl + 'markmsgread',
                data: { touid: touid },
                dataType: 'json',
                cache: false,
                success: function (json) {
                    if (json.status == 200) {
                        success();
                    }
                    else error(json.msg);
                    mutex = true;
                    if (then)
                        then();
                },
                error: function (result, status) {
                    error("与服务器通信出错,请刷新后再试");
                    mutex = true;
                }
            });
        }
    }
    me.dialog = function (relateuid, pi, success, error, then) {
        if (mutex) {
            mutex = false;
            $.ajax({
                type: 'get',
                url: apiUrl + 'getmsgdialog',
                data: { relateUid: relateuid, pi: pi },
                dataType: 'json',
                cache: false,
                success: function (json) {
                    if (json.status == 200) {
                        success(json);
                    }
                    else error(json.msg);
                    mutex = true;
                    if (then)
                        then();
                },
                error: function (result, status) {
                    error("与服务器通信出错,请刷新后再试");
                    mutex = true;
                }
            });
        }
    }
    return me;
})();
var common = (function () {
    var me = {};
    var apiUrl = "/ajax/ashx/Common.ashx?op=";
    var mutex = true;
    me.addTag = function (novelID,tags, success, error) {
        if (mutex) {
            mutex = false;
            $.ajax({
                type: 'post',
                url: apiUrl + 'addTag',
                data: { nid: novelID, tags: tags },
                dataType: 'json',
                cache: false,
                success: function (json) {
                    if (json.status == 200) {
                        success(json);
                    }
                    else error(json.msg);
                    mutex = true;
                },
                error: function (result, status) {
                    error("与服务器通信出错,请刷新后再试");
                    mutex = true;
                }
            });
        }
    }
    me.getAudioInfo = function (novelID, success, error) {
        $.ajax({
            type: 'get',
            url: apiUrl + 'getAudioInfo',
            data: { nid: novelID },
            dataType: 'json',
            cache: false,
            success: function (json) {
                success(json);
            },
            error: function (result, status) {
                error();
            }
        });
    }
    me.logListen = function (novelID, audioId, success, error) {
        $.ajax({
            type: 'post',
            url: apiUrl + 'logListen',
            data: { nid: novelID, audioId: audioId },
            dataType: 'json',
            cache: false,
            global: false,
            success: function (json) {
                if (json.status == 200) {
                    success(json);
                }
                else error(json.msg);
            },
            error: function (result, status) {
                error("与服务器通信出错,请刷新后再试");
            }
        });
    }
    me.getAuthorInfo = function (success, error) {
        $.ajax({
            type: 'get',
            url: apiUrl + 'getAuthorInfo',
            dataType: 'json',
            cache: false,
            success: function (json) {
                if (json.status == 200) {
                    success(json);
                }
                else error(json.msg);
            },
            error: function (result, status) {
                error();
            }
        });
    }
    me.editAuthorInfo = function (qq, email, phone, success, error) {
        if (mutex) {
            mutex = false;
            $.ajax({
                type: 'post',
                url: apiUrl + 'editAuthorInfo',
                data: { authorQQ: qq, authorEmail: email, authorPhone: phone },
                dataType: 'json',
                cache: false,
                success: function (json) {
                    mutex = true;
                    if (json.status == 200) {
                        success(json);
                    }
                    else error(json.msg);
                },
                error: function (result, status) {
                    error("与服务器通信出错,请刷新后再试");
                    mutex = true;
                }
            });
        }
    }
    me.applySign = function (novelID, success, error) {
        if (mutex) {
            mutex = false;
            $.ajax({
                type: 'post',
                url: apiUrl + 'applySign',
                data: { nid: novelID },
                dataType: 'json',
                cache: false,
                success: function (json) {
                    if (json.status == 200) {
                        success(json);
                    }
                    else error(json.msg);
                    mutex = true;
                },
                error: function (result, status) {
                    error("与服务器通信出错,请刷新后再试");
                    mutex = true;
                }
            });
        }
    }
    me.getSignApply = function (novelID,success, error) {
        $.ajax({
            type: 'get',
            url: apiUrl + 'getSignApply',
            data: { nid: novelID },
            dataType: 'json',
            cache: false,
            success: function (json) {
                if (json.status == 200) {
                    success(json);
                }
                else error(json.msg);
            },
            error: function (result, status) {
                error();
            }
        });
    }
    me.getPlanNovel = function (novelID, success, error) {
        $.ajax({
            type: 'get',
            url: apiUrl + 'getPlanNovelInfo',
            data: { nid: novelID },
            dataType: 'json',
            cache: false,
            success: function (json) {
                if (json.status == 200) {
                    success(json);
                }
                else error(json.msg);
            },
            error: function (result, status) {
                error();
            }
        });
    }
    me.addPlanChapter = function (novelID, volumeID, title, body, isVip, planDate, success, error) {
        if (mutex) {
            mutex = false;
            $.ajax({
                type: 'post',
                url: apiUrl + 'addPlanChapter',
                data: { nid: novelID,vid:volumeID,title:title,body:body,isVip:isVip,planDate:planDate },
                dataType: 'json',
                cache: false,
                success: function (json) {
                    if (json.status == 200) {
                        success(json);
                    }
                    else error(json.msg);
                    mutex = true;
                },
                error: function (result, status) {
                    error("与服务器通信出错,请刷新后再试");
                    mutex = true;
                }
            });
        }
    }
    me.delPlanChapter = function (planId, success, error) {
        if (mutex) {
            mutex = false;
            $.ajax({
                type: 'post',
                url: apiUrl + 'delPlanChapter',
                data: { pid: planId},
                dataType: 'json',
                cache: false,
                success: function (json) {
                    if (json.status == 200) {
                        success(json);
                    }
                    else error(json.msg);
                    mutex = true;
                },
                error: function (result, status) {
                    error("与服务器通信出错,请刷新后再试");
                    mutex = true;
                }
            });
        }
    }
    me.getVoteInfo = function (novelID,voteID, success, error) {
        $.ajax({
            type: 'get',
            url: apiUrl + 'getNovelVoteInfo',
            data: { nid: novelID,voteId:voteID },
            dataType: 'json',
            cache: false,
            success: function (json) {
                success(json);
            },
            error: function (result, status) {
                error();
            }
        });
    }
    me.getHistoryVoteInfo = function (novelID, success, error) {
        $.ajax({
            type: 'get',
            url: apiUrl + 'getHistoryVoteInfo',
            data: { nid: novelID },
            dataType: 'json',
            cache: false,
            success: function (json) {
                success(json);
            },
            error: function (result, status) {
                error();
            }
        });
    }
    return me;
})();
//签到
var signin = (function () {
    var me = {};
    var apiUrl = "/ajax/ashx/Common.ashx?op=";
    var mutex = true;
    me.getSigninInfo = function (nid, year,month, success, error, then) {
        $.ajax({
            type: 'get',
            url: apiUrl + 'getSigninInfo',
            data: { nid: nid, year: year,month:month },
            dataType: 'json',
            cache: false,
            success: function (json) {
                if (json.status == 200) {
                    success(json);
                }
                else error(json.msg);
                mutex = true;
                if (then)
                    then();
            },
            error: function (result, status) {
                error("与服务器通信出错,请刷新后再试");
                mutex = true;
            }
        });
    }
    me.signinNovel = function (nid, success, error, then) {
        if (mutex) {
            mutex = false;
            $.ajax({
                type: 'get',
                url: apiUrl + 'signin',
                data: { nid: nid },
                dataType: 'json',
                cache: false,
                success: function (json) {
                    if (json.status == 200) {
                        success(json);
                    }
                    else error(json.msg);
                    mutex = true;
                    if (then)
                        then();
                },
                error: function (result, status) {
                    error("与服务器通信出错,请刷新后再试");
                    mutex = true;
                }
            });
        }
    }
    me.getUnlockChaps = function (nid, success, error, then) {
        $.ajax({
            type: 'get',
            url: apiUrl + 'getUnlockChaps',
            data: { nid: nid},
            dataType: 'json',
            cache: false,
            success: function (json) {
                if (json.status == 200) {
                    success(json);
                }
                else error(json.msg);
                mutex = true;
                if (then)
                    then();
            },
            error: function (result, status) {
                error("与服务器通信出错,请刷新后再试");
                mutex = true;
            }
        });
    }
    return me;
})();
//评论
var comment = (function () {
    var me = {};
    var apiUrl = "/ajax/ashx/Common.ashx?op=";
    var mutex = true;
    me.getCommentInfo = function (nid, success, error, then) {
        $.ajax({
            type: 'get',
            url: apiUrl + 'getcomment',
            data: { nid: nid },
            dataType: 'json',
            cache: false,
            success: function (json) {
                if (json.status == 200) {
                    success(json);
                }
                else error(json.msg);
                mutex = true;
                if (then)
                    then();
            },
            error: function (result, status) {
                error("与服务器通信出错,请刷新后再试");
                mutex = true;
            }
        });
    }
    me.getCommentList = function (nid, pi, ps, ctype, len,so, success, error, then) {
        $.ajax({
            type: 'get',
            url: apiUrl + 'getcmtlist',
            data: { nid: nid, pi: pi, ps: ps, ctype: ctype, len: len,so:so },
            dataType: 'json',
            cache: false,
            success: function (json) {
                if (json.status == 200) {
                    success(json);
                }
                else error(json.msg);
                mutex = true;
                if (then)
                    then();
            },
            error: function (result, status) {
                error("与服务器通信出错,请刷新后再试");
                mutex = true;
            }
        });
    }
    me.addComment = function (nid, cid, content, success, error, then) {
        $.ajax({
            type: 'post',
            url: apiUrl + 'addCmt',
            data: { nid: nid, commentid: cid, content: content },
            dataType: 'json',
            cache: false,
            success: function (json) {
                if (json.status == 200) {
                    success(json);
                }
                else error(json.msg);
                mutex = true;
                if (then)
                    then();
            },
            error: function (result, status) {
                error("与服务器通信出错,请刷新后再试");
                mutex = true;
            }
        });
    }
    me.getReplyList = function (cid, pi, ps, order, success, error, then) {
        $.ajax({
            type: 'get',
            url: apiUrl + 'getCmtReply',
            data: { cid: cid, pi: pi, ps: ps, order: order },
            dataType: 'json',
            cache: false,
            success: function (json) {
                if (json.status == 200) {
                    success(json);
                }
                else error(json.msg);
                mutex = true;
                if (then)
                    then();
            },
            error: function (result, status) {
                error("与服务器通信出错,请刷新后再试");
                mutex = true;
            }
        });
    }
    return me;
})();