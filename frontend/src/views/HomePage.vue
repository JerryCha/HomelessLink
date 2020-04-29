<template>
  <b-container>
    <!-- Top Row -->
    <b-row >
      <b-col class="row-top" fluid="xl" style="min-height:350px; width:100%;">
        <b-container>
          <div style="padding-top: 125px;">
            <SearchForm  :jump="true"/>
          </div>
        </b-container>
      </b-col>
    </b-row>
    <!-- Blank Row -->
    <b-row style="padding:5px;">
    </b-row>
    <!-- Last Row -->
    <b-row>
      <!-- 1st col -->
      <b-col class="row-bottom-one" fluid="sm" style="min-height:350px; height: 100%; bottom:0px; width: 50%; margin:5px;">
        <b-container fluid="sm"><div class="mx-auto" style="font-size: 14px; color: white; width: 200px; padding: 30px;">
          Our website records hundreds of relief centers and locations around Victoria. Anyoning needing help or relief can find them and help themselves !
        </div></b-container>
      </b-col>
      <!-- 2nd col -->
      <b-col class="row-bottom-two" fluid="sm" style="min-height:350px; color: white; height: 100%; bottom:0px; width: 50%; margin:5px;">
        <b-container fluid="sm"><div style="padding: 30%; width: 50%"><b-button style="background-color: black; width:150px;">About Us</b-button></div></b-container>
      </b-col>
    </b-row>


  </b-container>
</template>

<script>
import SearchForm from '@/components/SearchForm.vue'
export default {
	name: 'homepage',
	components: {
		SearchForm
	}
}
</script>

<style>
.row-top{
  background-image: url(/img/2361587974774_.pic.jpg);
}
.row-bottom-one{
  background-image: url(/img/2301587974211_.pic.jpg);
}
.row-bottom-two{
  background-image: url(/img/2321587974432_.pic.jpg);
}
</style>
