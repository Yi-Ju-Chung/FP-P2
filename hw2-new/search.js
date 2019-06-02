$(document).ready(function() {

    // 清空 product-list
    $('#product-list').empty();
    $('#page').hide()

    var items = null
    var pageCount = 20
    var showItems = (page) => {
        if (items == null) return
        var start = (page - 1) * pageCount
        var end = start + pageCount - 1
        $('#product-list').empty();
        for (var i = start; i <= end; i++) {
            newItem(items[i])
        }
    }

    var newItem = (item) => {
        $img = $('<img>').attr('class', 'image').attr('src', item.image)
        $h3 = $('<h3>').attr('class', 'name').text(item.name)
        $p = $('<p>').attr('class', 'price').text('NT$ ' + item.price)

        $item = $('<div>').attr('class', 'item').append($img).append($h3).append($p)
        $col = $('<div>').attr('class', 'col-*').append($item)

        $('#product-list').append($col)
    }

    var newPage = (n) => {
        var pageNum = n / 20
        pageNum = (n % 20 != 0) ? pageNum + 1 : pageNum

        $('#page-number').empty()

        $la = $('<a>').attr('class', 'page-link').attr('href', '#').attr('tabindex', '-1').attr('aria-disabled', 'true').text('«')
            //修改
        $la.on('click', function() {
            var i = $('#page-number').find("li[class='page-item active']").index()
            if (Number(i) > 1) {
                $('#page-number').find("li[class='page-item active']").attr('class', 'page-item')
                $('#page-number').find('li').eq(Number(i) - 1).attr('class', 'page-item active')
                showItems(Number(i) - 1)
            }
        })
        $lli = $('<li>').attr('class', 'page-item').append($la).addClass('disabled').append($la)
        $('#page-number').append($lli)
            // 插入分頁數字
        for (var i = 1; i <= pageNum; i++) {
            $a = $('<a>').attr('class', 'page-link').attr('href', '#').text(i)

            $a.on('click', function() {
                var i = $(this).text()
                showItems(Number(i))
                $('#page-number').find("li[class='page-item active']").attr('class', 'page-item')
                $('#page-number').find('li').eq(Number(i)).attr('class', 'page-item active')
                showItems(Number(i))
            })

            var strActive = ((i == 1) ? ' active' : '')
            $li = $('<li>').attr('class', 'page-item' + strActive).append($a)
            $('#page-number').append($li)
        }

        $ra = $('<a>').attr('class', 'page-link').attr('href', '#').text('»')
        $ra.on('click', function() {
            var i = $('#page-number').find("li[class='page-item active']").index()
            if (Number(i) < pageNum - 1) {
                $('#page-number').find("li[class='page-item active']").attr('class', 'page-item')
                $('#page-number').find('li').eq(Number(i) + 1).attr('class', 'page-item active')
                showItems(Number(i) + 1)
            }
        })
        $rli = $('<li>').attr('class', 'page-item').append($ra)
        $('#page-number').append($rli)
    }



    $('#query').on('click', function() {
        $.get('https://js.kchen.club/B04704086/query', function(response) {
            if (response) {
                // 伺服器有回傳資料
                if (response.result) {
                    $('#product-list').empty();
                    // 資料庫有回傳資料
                    items = response.items

                    // for (var i = 0; i < items.length; i++) {
                    //     newItem(items[i])
                    // }

                    // 加了分頁效果，預設顯示第一頁
                    showItems(1)

                    // 顯示分頁和設定分頁的函式
                    $('#page').show()
                    newPage(items.length)

                } else {
                    $('#message').text('查無相關資料')
                    $('#dialog').modal('show')
                }
            } else {
                $('#message').text('伺服器出錯')
                $('#dialog').modal('show')
            }

            console.log(response)
        }, "json")
    })

})