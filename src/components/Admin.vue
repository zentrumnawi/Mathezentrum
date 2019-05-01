<template>
  <div id="FormData">
    <v-card-title color="black">
      <div>
        <h3 class="headline mb-0">Teilnehmerliste</h3>
      </div>
    </v-card-title>
    <v-data-table
          :headers="headers"
          :items="values"
          class="elevation-1"
        >
          <template v-slot:items="props">
            <td>{{ props.item.id }}</td>
            <td class="text-xs-center">{{ props.item.date }}</td>
            <td class="text-xs-center">{{ props.item.start }}</td>
            <td class="text-xs-center">{{ props.item.end }}</td>
            <td class="text-xs-center">{{ props.item.courses.join(', ') }}</td>
            <td class="text-xs-center">{{ props.item.semester }}</td>
            <td class="text-xs-center">{{ props.item.faculty }}</td>
          </template>
        </v-data-table>
      <v-btn class="success">
        <vue-csv-downloader
          v-model: commatosemicolon
          :data="this.$store.state.attendees"
          :fields="headers.text"
        >
        Download csv
      </vue-csv-downloader>
    </v-btn>
    </div>
</template>

<script>
import VueCsvDownloader from 'vue-csv-downloader';

export default {
  components: {
    VueCsvDownloader
  },
  data: function() {
    return {
      headers: [
        {
          text: 'ID',
          align: 'left',
          sortable: true,
          value: 'id'
        },
        { text: 'Datum', value: 'date' },
        { text: 'Startzeit', value: 'start' },
        { text: 'Endzeit', value: 'end' },
        { text: 'Kurse', value: 'courses' },
        { text: 'Semester', value: 'semester' },
        { text: 'Studiengang', value: 'faculty'}
      ]
    }
  },
  computed: {
    values () {
      return this.$store.state.attendees
    },
    commatosemicolon () {
      // this.$store.state.attendees == this.$store.state.attendees.split(',').join(';')
      this.$store.state.attendees == this.$store.state.attendees.replace(',').join(';')
      return this.$store.state.attendees
    }
    // },
    // downloadObjectAsJson(values, exportName) {
    //     var dataStr = values;
    //     var downloadAnchorNode = document.createElement('a');
    //     downloadAnchorNode.setAttribute("href",     dataStr);
    //     downloadAnchorNode.setAttribute("download", exportName + ".json");
    //     document.body.appendChild(downloadAnchorNode); // required for firefox
    //     downloadAnchorNode.click();
    //     downloadAnchorNode.remove();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.v-text-field{
}
</style>