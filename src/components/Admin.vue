<template>
  <div id="FormData">
    <v-card-title color="black">
      <div>
        <h3 class="headline mb-0">Teilnehmerliste</h3>
      </div>
    </v-card-title>
    <v-data-table :headers="headers" :items="values" class="elevation-1">
      <template v-slot:items="props">
        <td class="text-xs-left">{{ props.item.date }}</td>
        <td class="text-xs-left">{{ props.item.id }}</td>
        <td class="text-xs-left">{{ props.item.start }}</td>
        <td class="text-xs-left">{{ props.item.end }}</td>
        <td class="text-xs-left">{{ props.item.presence }}</td>
        <td class="text-xs-left">{{ props.item.faculty }}</td>
        <td class="text-xs-left">{{ props.item.semester }}</td>
        <td class="text-xs-left">{{ props.item.courses }}</td>
      </template>
    </v-data-table>
    <v-btn class="success" :download="downloadName" :href="downloadURL" :disabled="this.$store.state.attendees.length === 0">
      Download
    </v-btn>
    <hr>
    {{values}}
  </div>

</template>

<script>
import { parse } from "json2csv";
import { format, addMinutes, differenceInMinutes } from "date-fns";

export default {
  data: function() {
    return {
      headers: [
        {
          text: "Datum",
          align: "left",
          sortable: true,
          value: "date"
        },
        {
          text: "ID",
          align: "left",
          sortable: true,
          value: "id"
        },
        { text: "Startzeit", value: "start" },
        { text: "Endzeit", value: "end" },
        { text: "Anwesend", value: "presence" },
        { text: "Studiengang", value: "faculty" },
        { text: "Semester", value: "semester" },
        { text: "Kurse", value: "courses" },
      ]
    };
  },
  props: {
    downloadName: {
      default: "export.csv"
    },
    delimiter: {
      default: ";"
    },
    quote: {
      default: ''
    }
  },
  methods: {

    format(element) {
      const differenceMinutes = differenceInMinutes(element.end, element.start);
      const differenceDate = addMinutes(new Date(0), differenceMinutes);

      return {
        presence: format(differenceDate,'HH:mm'),
        date: format(element.start, 'MM.DD.YYYY'),
        start: format(element.start,'HH:mm'),
        end: format(element.end,'HH:mm'),
        courses: element.courses.join(', ')
      };
    },
  },
  computed: {
    
    values() {

      const newvalues = this.$store.state.attendees;

      return newvalues.map(element => ({ ...element, ...this.format(element) }));
    },
    fields() {
      return this.headers.map(item => ({
        label: item.text,
        value: item.value
      }));
    },
    csv() {
      const opts = {fields: this.fields, delimiter: this.delimiter, quote: this.quote };    
      const csv = parse(this.values, opts);
      
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