<template>
  <v-layout v-if="!authenticated">
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-card-title primary-title class="justify-center">
          <h2>Authentifizierung</h2>
        </v-card-title>
          <v-card-text>
            <p>Bitte geben Sie das Passwort ein.</p>
          <v-text-field autofocus v-model="password" label="Password" @keyup.enter="authenticate"></v-text-field>
          </v-card-text>

          <v-card-actions class="justify-center">
            <v-spacer></v-spacer>
            <v-btn class="error" @click="authenticate">Absenden</v-btn>
          </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>

  

  <div v-else id="FormData">
    
    <v-dialog v-model="clearconfirm"  max-width="600">
      <v-card>
        <v-card-title class="headline">Liste löschen?</v-card-title>
        <v-card-text>
          Alle geloggten Zeiten und Studierenden werden gelöscht!
        </v-card-text>
        <v-btn class="warning" @click="clearlist">
          Clear
        </v-btn>
        <v-btn class="primary" @click="clearconfirm = false">
          Abbrechen
        </v-btn>
      </v-card>
    </v-dialog>
    
    <v-tabs>
      <v-tab ripple>Teilnehmerliste</v-tab>
      <!--v-tab ripple>Kurse</v-tab>
      <v-tab ripple>Studienfächer</v-tab>
      <v-tab ripple>Einstellungen</v-tab-->

      <v-spacer></v-spacer>
      <v-btn class="secondary" to="/">
        Logout
      </v-btn>

      <v-tab-item>
        <v-card>
          <v-data-table :headers="headers" :items="attendeeTable" class="elevation-1">
            <template v-slot:items="props">
              <td class="text-xs-left">{{ props.item.date }}</td>
              <td class="text-xs-left">{{ props.item.pid }}</td>
              <td class="text-xs-left">{{ props.item.start }}</td>
              <td class="text-xs-left">{{ props.item.end }}</td>
              <td class="text-xs-left">{{ props.item.presence }}</td>
              <td class="text-xs-left">{{ props.item.faculty }}</td>
              <td class="text-xs-left">{{ props.item.semester }}</td>
              <td class="text-xs-left">{{ props.item.comments }}</td>
              <td class="text-xs-left">{{ props.item.courses }}</td>
            </template>

            <template v-slot:no-data>
              <v-alert
              :value="true"
              color="info"
              outline
            >
              Keine Daten vorhanden.
              </v-alert>
            </template>
          </v-data-table>
          
          <v-card-actions>
            <v-btn class="success" :download="downloadName" :href="downloadURL" :disabled="attendees.length === 0">
              Download
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn class="warning" @click="clearconfirm = true" :disabled="attendees.length === 0">
              Clear
            </v-btn>
            <v-btn class="primary" @click="dummydata">
              Populate DB
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-tab-item>

      <v-tab-item>
        <v-card>
           <v-card-title>Work in Progress...</v-card-title>

          <v-card-text>
            {{ $options.config.courses_math }}
          </v-card-text>
        </v-card>
      </v-tab-item>

      <v-tab-item>
        <v-card>
          <v-card-title>Work in Progress...</v-card-title>
          <v-card-text>{{this.$store.state.faculties_act}}</v-card-text>
          <v-list dense>
          <template v-for="(course) in $options.config.faculties">
            <v-list-tile
              :key="course"
              ripple
              @click="select(course)"
            >
              <v-list-tile-content>
                <v-list-tile-title>{{ course }}</v-list-tile-title>
              </v-list-tile-content>

            </v-list-tile>
          </template>
         </v-list>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import { parse } from "json2csv";
import { format, addMinutes, differenceInMinutes } from "date-fns";
import configuration from '../assets/courses_ws.json'

import { mapGetters } from "vuex";

export default {
  config: configuration,
  data: function() {
    return {
      authenticated: true,
      password: null,
      requiredPassword: "HelloWorld",
      flds: [],
      course: "",
      course_act: "",
      clearconfirm: false,
      attendeeTable: [],
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
          value: "pid"
        },
        { text: "Startzeit", value: "start" },
        { text: "Endzeit", value: "end" },
        { text: "Anwesend", value: "presence" },
        { text: "Studiengang", value: "faculty" },
        { text: "Semester", value: "semester" },
        { text: "Kommentar", value: "comments" },
        { text: "Kurse", value: "courses" }
      ],
    };
  },
  props: {
    downloadName: {
      default: format(Date.now(), 'YYMMDD_HHmm') + '_mz.csv'
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
    },
    select(course) {
       this.$store.state.faculties_act.push(course)
    },
    clearlist() {     
      this.$store.dispatch("clearlist")
      this.clearconfirm = false
    },
    dummydata() {
      this.$store.dispatch("dummydata")
    },
    format(element) {
      const differenceMinutes = differenceInMinutes(element.end, element.start);
      const differenceDate = addMinutes(new Date(0), differenceMinutes);

      return {
        presence: format(differenceDate,'HH:mm'),
        date: format(element.start, 'DD.MM.YYYY'),
        start: format(element.start,'HH:mm'),
        end: format(element.end,'HH:mm'),
        courses: element.courses.join(', ')
      };
    }
  },
  watch: {
    "attendees": function(newValue) {
      if (newValue === undefined) {
        this.attendeeTable = [];
      }
      this.attendeeTable = newValue.map(element => ({ ...element, ...this.format(element) }));
    }
  },
  created() {
    this.attendeeTable = this.attendees.map(element => ({ ...element, ...this.format(element) }));
    this.flds = this.headers.map(item => ({
      label: item.text,
      value: item.value
    }));
    this.requiredPassword = process.env.VUE_APP_ADMIN_PASSWORD !== undefined ? process.env.VUE_APP_ADMIN_PASSWORD : "HelloWorld";
  },
  computed: {
    ...mapGetters({ attendees: "attendees" }),
    csv() {
      const opts = {fields: this.flds, delimiter: this.delimiter, quote: this.quote, withBOM: true};
      const csv = parse(this.attendeeTable, opts);

      return csv;
    },  
    downloadURL() {
      return this.attendees.length > 0
        ? "data:text/csv," + encodeURIComponent(this.csv)
        : "javascript:void(0);";
    }
  },
  
};

</script>