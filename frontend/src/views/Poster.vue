<template>
    <div>
        <form method="POST" id="form" name="form" target="_self">
        
            <label for="titre">Titre : </label>
            <input type="text" name="titre" id="titre" class="only-letters" data-valid = "false" required="required">
            <span id="titre_m"></span><br>

            <label for="photo-profil">  </label>
            <input type="file" name="photo-profil" accept="image/*" id="photo-profil" data-valid = "false" required="required">
            <img [src]="imagePreview" style="max-height: 100px;display:block;margin-top:10px">
            <span id="photo-profil_m"></span><br>

            <button id="bouton-valid" value ="validation" data-valid = "true">
            Envoyer </button>

        </form>  
    </div>
</template>
<script>
export default {
    
}
</script>