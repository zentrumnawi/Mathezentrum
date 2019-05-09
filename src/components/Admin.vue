<template>
  <div id="FormData">
    <v-card-title color="black">
      <div>
        <h3 class="headline mb-0">Teilnehmerliste</h3>
      </div>
    </v-card-title>
    <v-data-table :headers="headers" :items="values" class="elevation-1">
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
    <v-btn class="success" :href="downloadURL" :disabled="this.$store.state.attendees.length === 0">
      Download
    </v-btn>
  </div>
</template>

<script>
import { parse } from "json2csv";

export default {
  data: function() {
    return {
      headers: [
        {
          text: "ID",
          align: "left",
          sortable: true,
          value: "id"
        },
        { text: "Datum", value: "date" },
        { text: "Startzeit", value: "start" },
        { text: "Endzeit", value: "end" },
        { text: "Kurse", value: "courses" },
        { text: "Semester", value: "semester" },
        { text: "Studiengang", value: "faculty" }
      ]
      // delimiter: ";",
      // downloadName: {
      //     default: 'export.csv'
      // }
      // data: this.$store.state.attendees,
      // fields: this.headers.text
    };
  },
  props: {
    downloadName: {
      default: "export.csv"
    },
    delimiter: {
      default: ";"
    }
  },
  computed: {
    values() {
      return this.$store.state.attendees;
    },
    data() {
      return this.$store.state.attendees;
    },
    fields() {
      return this.headers.map(item => item.value);
    },
    csv() {
      const opts = { ...this.fields };

      const csv = parse(this.data, opts);
      return csv;
    },
    downloadURL() {
      return this.$store.state.attendees.length > 0
        ? "data:text/csv," + encodeURIComponent(this.csv)
        : "javascript:void(0);";
    }
  }
};
</script>