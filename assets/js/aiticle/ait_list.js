$(function () {
    var layer = layui.layer;
    var form = layui.form;
    var laypage = layui.laypage;
  // 定义美化时间的过滤器
template.defaults.imports.dataFormat = function(date) {
    const dt = new Date(date)
  
    var y = dt.getFullYear()
    var m = padZero(dt.getMonth() + 1)
    var d = padZero(dt.getDate())
  
    var hh = padZero(dt.getHours())
    var mm = padZero(dt.getMinutes())
    var ss = padZero(dt.getSeconds())
  
    return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
  }
  
  // 定义补零的函数
  function padZero(n) {
    return n > 9 ? n : '0' + n
  }
   
    var q = {
        pagenum: 1,//是	int	页码值
        pagesize: 2,	//是int	每页显示多少条数据
        cate_id: '',//否string	文章分类的 Id
        state: '',	//否string	文章的状态，可选值有：已发布、草稿
    };
    // 初始化文章列表
    initTable();
    initCate()
    function initTable() {
        $.ajax({
            method: "GET",
            url: "/my/article/list",
            data: q,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('res.message')
                }
                // layer.msg("res.message")
                var str = template("tpl-table", res)
                $("tbody").html(str)
                // 分页
                renderPage(res.total)
            }
        })
    }
    // 初始化分类
    function initCate() {
        $.ajax({
          method: 'GET',
          url: '/my/article/cates',
          success: function(res) {
            if (res.status !== 0) {
              return layer.msg('获取分类数据失败！')
            }
            // 调用模板引擎渲染分类的可选项
            var htmlStr = template('tpl-cate', res)
            $('[name=cate_id]').html(htmlStr)
            // 通过 layui 重新渲染表单区域的UI结构
            form.render()
          }
        })
    }
    // 筛选功能
    $("#form-search").on("submit", function (e) {
        e.preventDefault()
        // 获取
        var cate_id = $("[name=cate_id]").val();
        var state = $("[name=state]").val();
        // 赋值
        q.cate_id = cate_id;
        q.state = state;
        initTable();
    })
    // 分页函数
    function renderPage(total) {
        laypage.render({
            elem: "pageBox",
            count: total,
            limit: q.pagesize,
            curr: q.pagenum,
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            // limit:[2,3,5,10],
            jump: function (obj, first) {
                // console.log(obj.limit);
                // 把最新拿到的
                q.pagenum = obj.curr;
                q.pagesize = obj.limit;
                if (!first) {
                    initTable()
                }
            }
        })

    }
    // 删除
    $("tbody").on("click", ".btn-delete", function () {
        // 获取这个的id
        var Id = $(this).attr("data-id");
        // 提示是否删除
        layer.confirm('确认删除?', {icon: 3, title:'提示'}, function(index){
            $.ajax({
                method: "GET",
                url: "/my/article/delete/" + Id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    layer.msg("删除成功")
                    if ($(".btn-delete").length == 1 && q.pagenum > 1) q.pagenum--;
                    initTable();
                }                
            })            
            layer.close(index);
          });
    })
})