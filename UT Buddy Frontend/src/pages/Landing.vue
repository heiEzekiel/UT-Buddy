<template>
  <div>
    <div
      id="bg_changer"
      class="background-image-part"
      style="background-image:  linear-gradient(rgba(0, 0, 0, 0.527), rgba(0, 0, 0, 0.2)), url('/img/bg1.jpg');"
    >
      <div id="landing">
        <div class="container">
          <div class="card card-plain card-login">
            <!----><!----><!----><!---->
            <div class="card-header">
              <div class="logo-container">
                <img
                  style="height: 10%; width: 10%"
                  alt=""
                  data-src="img/now-logo.png"
                  src="/img/applogo.png"
                  lazy="loaded"
                />
              </div>
            </div>
            <div class="card-body">
              <h1>Welcome to UT Buddy!</h1>
            </div>
            <div class="card-footer text-center">
              <a href="/#/login" class="btn btn-success btn-round btn-md">Login/Signup</a>
            </div>
            <!----><!---->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
#landing {
  margin-top: 12%;
  text-align: center;
  margin-bottom: 50px;
}
.background-image-part {
  position: absolute;
  background-size: cover;
  background-position: 50%;
  width: 100%;
  height: 100%;
  z-index: -1;
}
.btn{
  display: inline-block;
}
</style>