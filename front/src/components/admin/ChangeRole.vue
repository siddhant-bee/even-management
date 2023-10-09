<template>
  <div>
    <MyNavbarVue />
    <div class="container d-flex justify-content-center">
      <label for="dropdown">Select an option to filter:</label>
      <select id="dropdown" v-model="selectedOption" style="height: 22px">
        <option value="role">Role</option>
        <option value="name">Name</option>
        <!-- <option value="Printer">Printer</option>
        <option value="Organiser">Organiser</option> -->
      </select>
      <p>Shoing results of : {{ selectedOption }}</p>
    </div>
    <form class="d-flex" role="search">
      <input
        v-model="search"
        class="form-control mx-auto"
        type="search"
        placeholder="Search"
        aria-label="Search"
        style="width: 70%;"
      />
  
    </form>

    <table class="table">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Role</th>
         
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user._id"> 
          <td v-if="user.role ==='Admin'" >{{ user.name }}</td>
          <td v-if="user.role ==='Admin'" >{{ user.role }}</td>

          <!-- <td v-if="user.role !=='Admin'"> -->
            <!-- <div class="dropdown"> -->
              <!-- <button
                class="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"  
              >
                Change Role
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1" >
                <li><a class="dropdown-item" @click="makePrinter(user)">Printer</a></li>
                <li><a class="dropdown-item" @click="makeAdmin(user)">Organiser</a></li>
                <li><a class="dropdown-item" @click="makeuser(user)">User</a></li>
              </ul> -->
            <!-- </div> -->
         
        </tr>
      </tbody>
    </table>



    <table class="table">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Role</th>
          <th>Change role</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user._id"> 
          <td v-if="user.role !=='Admin'" >{{ user.name }}</td>
          <td v-if="user.role !=='Admin'" >{{ user.role }}</td>

          <td v-if="user.role !=='Admin'">
            <div class="dropdown">
              <button
                class="btn btn-secondary dropdown-toggle btn-sm rounded-3"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"  
                

              >
                Change Role
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1" >
                <li><a class="dropdown-item" @click="makePrinter(user)">Printer</a></li>
                <li><a class="dropdown-item" @click="makeAdmin(user)">Organiser</a></li>
                <li><a class="dropdown-item" @click="makeuser(user)">User</a></li>
              </ul>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import MyNavbarVue from "./MyNavbar.vue";
import axios from "axios";
import { ref, onMounted, watch } from "vue";

onMounted(() => {
  //   console.log(`the component is now mounted.`)
  getUser();
});
const users = ref([]);
const search = ref();
const selectedOption = ref("name");
const usersMain = ref([]);
// const changeRole = ref();
// const searchres = ref();

watch(search, () => {
  console.log(search);
  users.value = usersMain.value.filter((user) =>
    user[selectedOption.value].toLowerCase().includes(search.value.toLowerCase())
  );
});

const makeAdmin = async (user) => {
  console.log(user);
  // const _id = user._id

  try {
    const res = await axios.put(
      `http://localhost:5001/updateadmin/${user._id}`
    );
    console.log(res.data);
    if (res.status === 200) {
      user.role = "Organiser";
    }
  } catch (error) {
    console.log(error);
  }
};

const makeuser = async (user) => {
  console.log(user);
  // const _id = user._id

  try {
    const res = await axios.put(
      `http://localhost:5001/updateuser/${user._id}`
    );
    console.log(res.data);
    if (res.status === 200) {
      user.role = "User";
    }
  } catch (error) {
    console.log(error);
  }
};



const makePrinter = async (user) => {
  console.log("Function called");
  console.log(user);
  // const _id = user._id

  try {
    const res = await axios.put(
      `http://localhost:5001/updateprinter/${user._id}`
    );
    console.log(res.data);
    if (res.status === 200) {
      user.role = "Printer";
    }
  } catch (error) {
    console.log(error);
  }
};

const getUser = async () => {
  try {
    const res = await axios.get("http://localhost:5001/users");
    console.log(res.data);
    usersMain.value = res.data;
    users.value = res.data;
  } catch (error) {
    console.log(error);
  }
};
</script>

<style scoped>

.table {
  width: 70%;
  margin: 0 auto;
  margin-top: 50px;
}
th,
td {
  text-align: center;
}
</style>
