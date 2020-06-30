<template>
    <nav class="navbar">
        <a class="logo" href="#"><img src="../assets/icon-left-font.png" height="250px"> </a>
        <p v-if="connecté"> {{ nom }} {{ prenom }} </p>
        <button > Deconnexion </button>
    </nav>
</template>

<script>
export default {
    name: 'Navbar',

}
</script>
<style scoped>

</style>