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
        <td class="text-xs-left">{{ props.item.courses.join(', ') }}</td>
      </template>
    </v-data-table>
    <!--v-btn class="success" :download="downloadName" :href="downloadURL" :disabled="this.$store.state.attendees.length === 0">
      Download
    </v-btn-->
    <v-btn class="success" :download="downloadName" :href="downloadURL" :disabled="this.$store.state.attendees.length === 0">
      Download
    </v-btn>
    
  </div>
</template>

<script>
//import { parse } from "json2csv";
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
        { text: "Präsenzzeit", value: "presence" },
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
  computed: {
    
    values() {

        this.$store.state.attendees.forEach(element => {
        element.presence = format(addMinutes(new Date(0),differenceInMinutes(element.end, element.start)),'HH:mm');
        element.date = format(element.start, 'MM.DD.YYYY');
        element.start = format(element.start,'HH:mm');
        element.end = format(element.end,'HH:mm');
      });

    return this.$store.state.attendees;
    },
//    data() {
//          return this.$store.state.attendees;
//    },
    fields() {
      return this.headers.map(item => item.text);
    },
//    csv() {
//      const opts = {...this.fields, delimiter: this.delimiter, quote: this.quote };
//
//      const csv = parse(this.values, opts);
//
//      return csv;
 //   },
    mancsv() {

      let output = "";
     
      this.fields.forEach(element => {
        output += element;
        output += this.delimiter; 
        
      } );

      output += '\n';

      this.$store.state.attendees.forEach(element => {
        output += element.date + this.delimiter;
        output += element.id + this.delimiter;
        output += element.start + this.delimiter;
        output += element.end + this.delimiter;
        output += element.presence + this.delimiter;
        output += element.faculty + this.delimiter;
        output += element.semester + this.delimiter;
        output += element.courses.join(', ') + this.delimiter;
        output += '\n';
      });

      return output;
    },

//    downloadURL() {
//     return this.$store.state.attendees.length > 0
//        ? "data:text/csv," + encodeURIComponent(this.csv)
//        : "javascript:void(0);";
//    },
    downloadURL() {
      return this.$store.state.attendees.length > 0
        ? "data:text/csv," + encodeURIComponent(this.mancsv)
        : "javascript:void(0);";
    }
  }
};
</script>