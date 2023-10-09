<template>
    <nav class="navbar bg-body-tertiary">
      <div     id="navv">
        <div
    
          class="container-fluid"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasExample"
          aria-controls="offcanvasExample"
        >
          <a  class="navbar-brand"
            >Printer page</a
          >
          
        </div>
  
        <div
          class="offcanvas offcanvas-start"
          tabindex="-1"
          id="offcanvasExample"
          aria-labelledby="offcanvasExampleLabel"
          style="width: 35ch"
        >
          <div class="d-flex flex-nowrap">
            <div
              class="d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary"
              style="width: 100%; height: 100vh"
            >
              <a
                href="/"
                class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
              >
                <svg class="bi pe-none me-2" width="40" height="32">
                  <use xlink:href="#bootstrap"></use>
                </svg>
                <span class="fs-4">EVENT </span>
              </a>
              <hr />
              <ul class="nav nav-pills flex-column mb-auto">
                <li class="nav-item">
                  <a @click="home" class="nav-link active" aria-current="page">
                    <svg class="bi pe-none me-2" width="16" height="16">
                      <use xlink:href="#home"></use>
                    </svg>
                    Home
                  </a>
                </li>
                <li>
                  <a  @click="addEvent" class="nav-link link-body-emphasis">
                    <svg class="bi pe-none me-2" width="16" height="16">
                      <use xlink:href="#speedometer2"></use>
                    </svg>
                    Add Event details
                  </a>
                </li>
                <li>
                  <a @click="liveEvent" class="nav-link link-body-emphasis">
                    <svg class="bi pe-none me-2" width="16" height="16">
                      <use xlink:href="#table"></use>
                    </svg>
                    Live Events
                  </a>
                </li>
                <li>
                  <a  @click="changeRole" class="nav-link link-body-emphasis">
                    <svg class="bi pe-none me-2" width="16" height="16">
                      <use xlink:href="#grid"></use>
                    </svg>
                Change Role
                  </a>
                </li>
                <li>
                  <a @click="payment" class="nav-link link-body-emphasis">
                    <svg class="bi pe-none me-2" width="16" height="16">
                      <use xlink:href="#people-circle"></use>
                    </svg>
                  Payment
                  </a>
                </li>
              </ul>
              <hr />
              <div class="dropup">
                <a
                  href="#"
                  class="d-flex align-items-center link-body-emphasis text-decoration-none dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <!-- <img
                    src="https://github.com/mdo.png"
                    alt=""
                    width="32"
                    height="32"
                    class="rounded-circle me-2"
                  /> -->
                  <strong>mdo</strong>
                </a>
                <ul class="dropdown-menu text-small shadow" >
                  <li><a class="dropdown-item" href="#">New project...</a></li>
                  <li><a class="dropdown-item" href="#">Settings</a></li>
                  <li><a class="dropdown-item" href="#">Profile</a></li>
                  <li><hr class="dropdown-divider" /></li>
                  <li><a class="dropdown-item" href="#">Sign out</a></li>
                </ul>
              </div>
            </div>
            
          </div>
          
        </div>
        
      </div>
      <form class="d-flex" role="search" >
            <input
              class="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button class="btn btn-outline-success" type="submit">Search</button>
            <button class="btn btn-outline-success ms-2">Profile</button>
          </form>
    </nav>
  </template>
  
  <script setup>
  import { useRouter } from "vue-router";
  const router = useRouter();
  
  
  const addEvent = () => {
    console.log("event add kro");
    router.push({ name: "addeventpage" });
  };
  
  const home = () => {
    router.push({ name: "home" });
  };
  
  const changeRole = () => {
    router.push({ name: "changerole" });
  };
  
  const liveEvent = () => {
    router.push({ name: "home" });
  }
  const payment = () => {
    console.log("payment");
    // router.push({ name: "payment" });
  };
  
  </script>
  
  <style scoped>
  .navbar-brand {
    cursor: pointer;
  }
  
  
  
  
  #navv {
    display: flex;
    
  }
  </style>
  