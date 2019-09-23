<template>
  <v-layout v-if="!authenticated">
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-card-title primary-title class="justify-center">
          <h2>Authentifizierung</h2>
        </v-card-title>
          <v-card-text>
            <p>Bitte geben Sie das Passwort ein.</p>
          <v-text-field v-model="password" label="Password"></v-text-field>
          </v-card-text>

          <v-card-actions class="justify-center">
            <v-spacer></v-spacer>
            <v-btn class="error" @click="authenticate">Absenden</v-btn>
          </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>

  <div v-else id="FormData">
    <v-card-title color="black">
      <div>
        <h3 class="headline mb-0">Teilnehmerliste</h3>
      </div>
    </v-card-title>
    <v-data-table :headers="headers" :items="values" item-key="idnumber" class="elevation-1">
      <template v-slot:items="props">
        <td class="text-xs-left">{{ props.item.date }}</td>
        <td class="text-xs-left">{{ props.item.id }}</td>
        <td class="text-xs-left">{{ props.item.start }}</td>
        <td class="text-xs-left">{{ props.item.end }}</td>
        <td class="text-xs-left">{{ props.item.presence }}</td>
        <td class="text-xs-left">{{ props.item.faculty }}</td>
        <td class="text-xs-left">{{ props.item.semester }}</td>
        <td class="text-xs-left">{{ props.item.courses.join(', ') }}</td>
        <td class="text-xs-left">{{ props.item.comments }}</td>
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
      authenticated: false,
      password: null,
      requiredPassword: "HelloWorld",
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
        { text: "Kommentar", value: "comments" },
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
      authenticate() {
        if (this.password != this.requiredPassword) return;

        this.authenticated = true;
      }
    },
  computed: {    
    values() {

        this.$store.state.attendees.forEach(element => {
        element.presence = format(addMinutes(new Date(0),differenceInMinutes(element.end, element.start)),'HH:mm');
        element.date = format(element.start, 'DD.MM.YYYY');
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
     
        Object.keys(this.fields).forEach(element => {
      // this.fields.forEach(element => {
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
        output += element.comments + this.delimiter;
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