$(function () {
  // 焼き芋を落とすアニメーション
  function dropPotato() {
    $('.potato').each(function (index) {
      const $potato = $(this);
      const delay = index * 300; // 順番に落ちるように遅延
      const duration = 2000 + Math.random() * 1000; // ランダムな速度

      setTimeout(function () {
        $potato.css('opacity', '1').animate({
          top: '+=500',
        }, {
          duration: duration,
          easing: 'linear',
          step: function (now, fx) {
            // ふわふわ揺れる効果
            const wobble = Math.sin(now / 20) * 10;
          },
          complete: function () {
            // アニメーション終了後、位置をリセット
            $potato.css({
              top: '-100px',
              opacity: '0',
              transform: 'none'
            });
          }
        });
      }, delay);
    });
  }

  // ボタンクリックで焼き芋を落とす
  $('#btn').on('click', function () {
    dropPotato();
  });

  // 子どもたちのホバー効果（画像切り替え）
  $('.friend img').each(function () {
    const $img = $(this);
    const normalSrc = $img.attr('src');
    const hoverSrc = $img.attr('data-hover');

    $img.on('mouseenter', function () {
      if (hoverSrc) {
        $(this).attr('src', hoverSrc);
      }
    });

    $img.on('mouseleave', function () {
      $(this).attr('src', normalSrc);
    });
  });

  // ページ読み込み時に自動で1回焼き芋を落とす
  setTimeout(function () {
    dropPotato();
  }, 500);
});