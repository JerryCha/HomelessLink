<template>
  <b-container>
    <!-- Top Row -->
    <b-row >
      <b-col class="row-top" fluid="xl" style="min-height:350px; width:100%;">
        <b-container>
          <div style="padding-top: 125px; font-size: 18px; color: black;">
            MatesHelp: Search for support services across Victoria. Search for your suburb or find your location and find support services near you.
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
        <b-container fluid="sm"><div class="mx-auto" style="font-size: 18px; color: black; width: 200px; padding: 30px;">
          <b>Our website records hundreds of relief centers and locations around Victoria. Anyoning needing help or relief can find them and help themselves !</b>
        </div></b-container>
      </b-col>
      <!-- 2nd col -->
      <b-col class="row-bottom-two" fluid="sm" style="min-height:350px; color: white; height: 100%; bottom:0px; width: 50%; margin:5px;">
        <b-container fluid="sm"><div style="padding: 30%; width: 50%"><b-button style="background-color: black; width:150px;" v-b-modal.modal-1>About Us</b-button></div></b-container>
      </b-col>
    </b-row>
    <b-modal id="modal-1" title="About Us" hide-footer>
    <p class="my-4">
      <b>Team: </b>B9 Prophetics<br />
      <b>Topic: </b>Homelessness and housing uncertainty.<br />
      <b>Problem Statement:</b> Existing homeless statistics highly rely on the
      census which is held per 5 years, the lag of accurate data impacts decision making.<br />
      <b>Solution:</b> The project is a location-based service web that presents
      users with a map of services near their current location, including relief
      centers and other organizations. Many target audiences who are experiencing
      homelessness can get help by searching for information about a nearby relief
      center. Some volunteers, public organizations and other users can use the
      web page to check out the organizations to help the homeless, where we would
      show them places experiencing high demands which need more hands or resources to help.</p>
  </b-modal>

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
