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
      <v-btn class="success" @click="downloadURL">
        <!-- <json2csv
          :data="this.$store.state.attendees"
          :fields="headers.text"
        > -->
        <a 
          :download="downloadName"
          :href="downloadURL"
          :disabled="this.$store.state.attendees.length === 0">
          Download
          <!-- <slot>
            <i class="fa fa-file-excel-o" aria-hidden="true"></i>
          </slot> -->
        </a>
      <!-- </json2csv> -->
    </v-btn>
    </div>
</template>

<script>
import json2csv from 'json2csv';
export default {
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
      ],
        delimiter: ";",
        downloadName: {
            default: 'export.csv'
        }
    }
  },
  // components: {
  //   json2csv: Json2Csv,
  // },
  computed: {
    values () {
      return this.$store.state.attendees
    },
    downloadURL() {
      return this.$store.state.attendees.length > 0 ? "data:text/csv," + encodeURIComponent(json2csv({data: this.$store.state.attendees, fields: this.headers.text})) : 'javascript:void(0);';
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.v-text-field{
}
</style>