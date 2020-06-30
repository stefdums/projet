<template>
   <form class="connexion-form">
        <div class="form-group">
            <label for="email">Email</label>
            <input type="email" class="form-control" id="email" formControlName="email">
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control" id="password" formControlName="password">
        </div>
        <button class="ConnexionForm.invalid">Connexion</button>     
    </form> 
</template>
<script>
export default {
    name: 'FormConnexion',

}
</script>
<style scoped>
    form {
            margin: 2em auto;
            max-width: 750px;
        }

</style>
