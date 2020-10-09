$(function () {
    //1.定义校验规则
    var form = layui.form;
    form.verify({
        nickneme: function (value) {
            if (value.length > 6) {
                return "昵称长度为1-6位字符之间"
            }
        }
    });
    //初始化用户信息
    initUserInfo();
    //初始化用户信息封装，后面还要用
    var layer=layui.layer
    function initUserInfo() {
        $.ajax({
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                // console.log(res);
                form.val('foemUserInfo',res.data)
            }
            
        })
    };
    $("#btnReset").on("click", function (e) {
        //阻止默认重置
        e.preventDefault();
        //重新渲染用户
        initUserInfo()
    })
    // 4.修改用户信息
    $(".layui-form").on("submit", function (e) {
        //阻止默认提交
        e.preventDefault();
        //发送ajax请求
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('更新用户信息成功')
                // 调用父页面中的方法，重新渲染用户的头像和用户的信息
                window.parent.getUserInfo()
            }
        })
    })
})