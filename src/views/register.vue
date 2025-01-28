<template>
     <header>
    <nav class="navbar navigatiebalk neon-btn navbar-expand-lg bg-light">
      <div class="container-fluid navigatiebalk">
        <a class="navbar-brand" href="#"
          ><img
            class="homepage_icon"
            src="../src/assets/homepage_icon.png"
            alt=""
        /></a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse navigatiebalk_ul" id="navbarNav">
          <ul class="navbar-nav navigatiebalk_ul_li">
            <li class="nav-item">
              <RouterLink class="nav-link" to="/">Home</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/liked">liked movies</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/register">register</RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>