<template>
  <footer>
    <div class="main-content">
      <div class="footer-block block-a">
        <div class="footer-title">
          關於 Tripday
        </div>
        <div class="footer-item">
          <li>使用者條款</li>
          <li>隱私權保護政策</li>
          <li>常見問題</li>
        </div>
      </div>

      <div class="footer-block block-b">
        <div class="footer-title">
          關於 Tripday
        </div>
        <div class="footer-item">
          <li>使用者條款</li>
          <li>隱私權保護政策</li>
          <li>常見問題</li>
        </div>
      </div>

      <div class="footer-block block-c">
        <div class="footer-title">
          聯絡我們
        </div>
        <div class="footer-item social-media">
          <span>Fb</span>
          <span>Fb</span>
          <span>Fb</span>
        </div>
      </div>

      <div class="triple-coupon block-e">
        <img src="../assets/images/triple-coupon.svg" alt="" />
      </div>

      <div class="footer-block reference block-d">
        <div class="footer-title">
          專案資料參考來源
        </div>
        KKday https://www.kkday.com/zh-tw/
      </div>
    </div>

    <div class="contact-content">
      <div>
        <li>統一編號：12345678</li>
        <li>代表號：02-3456-7890</li>
        <li>台北市復興北路 201 號 6 樓之 4</li>
      </div>
      <p></p>
      <div>
        <li>電話：+886-2-2546-9766</li>
        <li>Email：taiwan@alphacamp.co</li>
      </div>
      <p></p>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
footer {
  height: auto;
  width: 100%;
  color: #eeeeee;
  font-size: 0.9rem;
}

.main-content {
  padding: 15px 0;
  background-color: #444;

  .footer-block {
    margin: 45px 15px;
  }

  .footer-title {
    color: rgb(145, 144, 144);
    font-size: 1.1rem;
    margin-bottom: 10px;
  }

  .footer-item {
    margin: 5px 0;
  }

  .social-media {
    display: flex;

    span {
      border-radius: 100%;
      height: 40px;
      width: 40px;
      margin-right: 15px;
      background-color: rgb(145, 144, 144);
    }
  }

  .triple-coupon {
    width: 150px;
    margin: 30px;
  }

  .reference {
    text-align: right;
    padding-top: 15px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }
}

.contact-content {
  padding: 20px 0 30px 15px;
  color: rgb(145, 144, 144);
  font-size: 0.8rem;
  background: #333;
}

@media screen and (min-width: 996px) {
  .main-content {
    padding: 50px 130px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-areas: 1fr 1fr;
    grid-template-areas: 'a b c d' '. . . e';

    .block-a {
      grid-area: a;
    }

    .block-b {
      grid-area: b;
    }

    .block-c {
      grid-area: c;
    }

    .block-d {
      grid-area: d;
      border: none;
    }

    .block-e {
      grid-area: e;
    }

    .reference {
      text-align: left;
      padding-top: 0;
      border-top: none;
    }
  }

  .contact-content {
    padding: 30px 130px;
    display: flex;

    div {
      margin-right: 50px;
    }
  }
}
</style>