// ========================================
// jQueryドキュメント準備完了後に実行
// ========================================
$(document).ready(function() {

    // ========================================
    // スライダー機能(PC・スマホ両対応)
    // ========================================
    let currentSlide = 0;
    const slides = $('.slider-image');

    const slideInterval = 3000; // 3秒ごとに切り替え

    // ========================================
    // 今表示中のスライダー内の画像数カウント関数
    // ========================================
    function getSlideCount() {
    const windowWidth = $(window).width();
    const $activeSlider = $('.day-content-block:not(.hidden), .night-content-block:not(.hidden)');

    if (windowWidth <= 768) {
        return $activeSlider.find('.slider-image.sp-only').length;
    } else {
        return $activeSlider.find('.slider-image:not(.sp-only)').length;
    }
}

    // ========================================
    // モバイルの昼夜で画像表示順番が揃う
    // ========================================

    function showSlide(index) {
    const windowWidth = $(window).width();

    const $activeSlider = $('.day-content-block:not(.hidden), .night-content-block:not(.hidden)');
    
    let $images;

    if (windowWidth <= 768) {
        $images = $activeSlider.find('.slider-image.sp-only');
    } else {
        $images = $activeSlider.find('.slider-image:not(.sp-only)');
    }

    $images.removeClass('active');
    $images.eq(index).addClass('active');
}


    // 次のスライドへ
    function nextSlide() {
    const slideCount = getSlideCount();
    currentSlide = (currentSlide + 1) % slideCount;
    showSlide(currentSlide);
}

    // 初期表示
    showSlide(0);

    // 自動スライド開始
    let slideTimer = setInterval(nextSlide, slideInterval);

    // ウィンドウリサイズ時に再表示
    $(window).resize(function() {
        showSlide(currentSlide);
    });

    
    // ========================================
    // モード切り替え(Day/Night)
    // ========================================
    $('#switch-to-day').on('click', function() {
        // Day mode に切り替え
        $('body').removeClass('night-mode').addClass('day-mode');
        $('.day-content-block').removeClass('hidden');
        $('.night-content-block').addClass('hidden');
        
        // ボタンのアクティブ状態を切り替え
        $(this).addClass('active').addClass('sparkle');
        $('#switch-to-night').removeClass('active');
        
        // キラキラエフェクトを0.6秒後に削除
        setTimeout(() => {
            $(this).removeClass('sparkle');
        }, 600);

        // スライダーをリセット
        currentSlide = 0;
        showSlide(currentSlide);
    });

    $('#switch-to-night').on('click', function() {
        // Night mode に切り替え
        $('body').removeClass('day-mode').addClass('night-mode');
        $('.night-content-block').removeClass('hidden');
        $('.day-content-block').addClass('hidden');
        
        // ボタンのアクティブ状態を切り替え
        $(this).addClass('active').addClass('sparkle');
        $('#switch-to-day').removeClass('active');
        
        // キラキラエフェクトを0.6秒後に削除
        setTimeout(() => {
            $(this).removeClass('sparkle');
        }, 600);

        // スライダーをリセット
        currentSlide = 0;
        showSlide(currentSlide);
    });

    // ========================================
    // ハンバーガーメニューの開閉
    // ========================================
    $('#hamburger-btn').on('click', function() {
        $('#mobile-menu').fadeIn(300);
        $('body').css('overflow', 'hidden'); // スクロール防止
    });

    $('#close-menu-btn').on('click', function() {
        $('#mobile-menu').fadeOut(300);
        $('body').css('overflow', 'auto'); // スクロール再開
    });

    // メニュー内のリンクをクリックしたらメニューを閉じる
    $('#mobile-menu a').on('click', function() {
        $('#mobile-menu').fadeOut(300);
        $('body').css('overflow', 'auto');
    });

    // ========================================
    //  TOPへ戻るボタンの表示制御
    // ========================================
    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            // 300px以上スクロールしたら表示
            $('#back-to-top').fadeIn(400);
        } else {
            // それ以下なら非表示
            $('#back-to-top').fadeOut(400);
        }
    });

    // TOPへ戻るボタンのスムーススクロール
    $('#back-to-top a').on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, 600);
        return false;
    });

    // ========================================
    //  550px以下でボタン名を短縮
    // ========================================
    function updateButtonText() {
        const windowWidth = $(window).width();
        
        if (windowWidth <= 550) {
            // 550px以下の場合、ボタン名を短縮
            $('.day-content-block .btn-text').text('無料体験');
            $('.night-content-block .btn-text').text('予約する');
        } else {
            // 550pxより大きい場合、元のテキストに戻す
            $('.day-content-block .btn-text').text('無料体験申込む');
            $('.night-content-block .btn-text').text('MagicBar Jin予約');
        }
    }

    

    // 初期実行
    updateButtonText();

    // ウィンドウリサイズ時に実行
    $(window).resize(function() {
        updateButtonText();
    });

    // ========================================
    // いいねボタン機能
    // ========================================
    $('.heart').on('click', function() {
        $(this).toggleClass('liked');
        
        // ローカルストレージに保存(オプション)
        const cardId = $(this).data('id');
        if ($(this).hasClass('liked')) {
            localStorage.setItem('liked-' + cardId, 'true');
        } else {
            localStorage.removeItem('liked-' + cardId);
        }
    });

    // ページ読み込み時にいいね状態を復元
    $('.heart').each(function() {
        const cardId = $(this).data('id');
        if (localStorage.getItem('liked-' + cardId) === 'true') {
            $(this).addClass('liked');
        }
    });

    // ========================================
    // スムーススクロール(アンカーリンク)
    // ========================================
    $('a[href^="#"]').on('click', function(e) {
      e.preventDefault();
      const target = $(this.getAttribute('href'));
    if (target.length) {
        $('html, body').stop().animate({
            scrollTop: target.offset().top - 150  // ★ 80 → 150 に変更
        }, 800);
    }
});

    

    // ========================================
    // フォーム送信前のバリデーション(基本的な例)
    // ========================================
    $('form').on('submit', function(e) {
        let isValid = true;
        
        // 必須項目のチェック
        $(this).find('input[required], textarea[required], select[required]').each(function() {
            if ($(this).val().trim() === '') {
                isValid = false;
                $(this).css('border-color', '#b30b12');
            } else {
                $(this).css('border-color', '#cca34b');
            }
        });
        
        if (!isValid) {
            e.preventDefault();
            alert('必須項目を入力してください。');
        }
    });

    // ========================================
    // ページ読み込み時のアニメーション(オプション)
    // ========================================
    $('.cast-card, .menu-item, .lunch-item').each(function(index) {
        $(this).css({
            'opacity': '0',
            'transform': 'translateY(30px)'
        });
        
        $(this).delay(index * 100).animate({
            'opacity': '1'
        }, 600, function() {
            $(this).css('transform', 'translateY(0)');
        });
    });

});

// ========================================
// 参考にしたサイト(修正2: スライダー関連)
// ========================================
// jQuery公式ドキュメント: https://api.jquery.com/
// スライダーの基本実装: https://www.w3schools.com/howto/howto_js_slideshow.asp
// jQueryアニメーション: https://learn.jquery.com/effects/



// ========================================
// カートに追加された商品を確認できるUI
// ========================================
//　参照なんちゃってECサイト：https://qiita.com/SuenagaRyoko/items/3f9f0deb5233225ea3c1
let cart = [];

$('.cart-btn').on('click', function () {
  const name = $(this).closest('.goods-info').find('h4').text();
  cart.push(name);
});

$('#open-cart').on('click', function () {
  $('#cart-list').empty();
  cart.forEach(item => {
    $('#cart-list').append(`<li>${item}</li>`);
  });
  $('#cart-modal').removeClass('hidden');
});
