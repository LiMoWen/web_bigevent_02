$(function () {



    // 从layui中获取form
    var form = layui.form;
    initArtCateList()

    // 获取文章分类的列表
    function initArtCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        })
    }
    //显示添加文章显示分类列表
    var layer = layui.layer;
    $("#btnAdd").on("click", function () {
        //利用框架代码，显示提示添加文章类别区域
        indexAdd = layer.open({
            type: 1,
            title: '添加文章类别',
            area: ['500px', '250px']
            , content: $("#didlog-add").html()
        });
    })
    //提交文章分类
    var indexAdd = null;
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('新增分类失败！')
                }
                initArtCateList()
                layer.msg('新增分类成功！')
                // 根据索引，关闭对应的弹出层
                layer.close(indexAdd)
            }
        })
    })


    //修改 展示表单
    var indexEdit = null
    $('tbody').on('click', '#btn-edit', function () {
        // 弹出一个修改文章分类信息的层
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html()
        });
        // 修改表单的弹出层
        var id = $(this).attr('data-id')
        //发送请求获取对应分类的 数据
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function (res) {
                // console.log(res);
                form.val('form-edit', res.data)
            }
        })
    })
    // 通过代理的方式，为修改分类的表单绑定submit事件
    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault();
        // 发送ajax请求
        $.ajax({
            method: "POST",
            url: "/my/article/updatecate",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('恭喜您，修改成功');
                // 关闭弹出层
                layer.close(indexEdit)
                // 重新渲染页面
                initArtCateList()
            }
        })

    })
    // 删除
    $('tbody').on('click', ".btn-delete", function () {
        var id = $(this).attr('data-id');       
        // 提示用户是否要删除
        layer.confirm('确认删除?', {icon: 3, title:'提示'}, function(index){
            $.ajax({
                method: "GET",
                url: "/my/article/deletecate/" + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    layer.msg("删除成功")
                }
            })
            // 关闭弹出层
            layer.close(index);
            // 重新渲染页面
            initArtCateList()
          });
    })

})