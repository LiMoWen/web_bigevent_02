$(function () {
    //获取用户信息
    getUserInfo();

    //退出登录功能
    $('#btnLogout').on('click', function () {
        layer.confirm('确认退出登录?', { icon: 3, title: '提示' }, function (index) {
            //do something
            //1.删除本地存储中的touken
            localStorage.removeItem("token");
            //2.页面跳转
            location.href = "/login.html";
            //关闭询问框
            layer.close(index);
        });
    })
})
//获取用户信息封装函数
//注意：位置写道入口函数外面，后面代码要使用这个方法，但是要求这个方法是一个全局函数
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败!');
            }
            //渲染用户头像
            renderAvatar(res.data);
        },
        // 无论成功或者失败都会触发complete方法
        
        // complete: function (res) {
        //     console.log(res);
        //     //判断，如果身份认真失败，跳转回登录页面
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
        //         //1.删除本地token
        //         localStorage.removeItem("token");
        //         //2.跳转页面
        //         location.href = '/login.html';
        //     }
        // }
    });
}
//渲染用户
function renderAvatar(user) {
    //用户名（昵称优先，没有用username)
    var name = user.nickname || user.username;
    $("#welcome").html("欢迎&nbsp;&nbsp;" + name);
    //用户头像
    if (user.user_pic !== null) {
        //有头像
        $(".layui-nav-img").show().attr("src", user.user_pic);
        $(".user-avatar").hide();
    } else {
        $(".layui-nav-img").hide()
        var text = name[0].toUpperCase();
        $(".user-avatar").show().html(text);
    }
}