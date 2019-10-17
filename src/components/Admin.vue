<template>
  <v-layout v-if="authenticated">
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
    <v-tabs>
      <v-tab ripple>Teilnehmerliste</v-tab>
      <v-tab ripple>Kurse</v-tab>
      <v-tab ripple>Studienfächer</v-tab>
      <!--v-tab ripple>Einstellungen</v-tab-->

      <v-spacer></v-spacer>
      <v-btn class="secondary" to="/">
        Logout
      </v-btn>

      <v-tab-item>
        <v-data-table :headers="headers" :items="values" class="elevation-1">
          <template v-slot:items="props">
            <td class="text-xs-left">{{ props.item.date }}</td>
            <td class="text-xs-left">{{ props.item.id }}</td>
            <td class="text-xs-left">{{ props.item.start }}</td>
            <td class="text-xs-left">{{ props.item.end }}</td>
            <td class="text-xs-left">{{ props.item.presence }}</td>
            <td class="text-xs-left">{{ props.item.faculty }}</td>
            <td class="text-xs-center">{{ props.item.semester }}</td>
            <td class="text-xs-left">{{ props.item.courses | formatCourseList }}</td>
          </template>
        </v-data-table>
        <v-btn class="warning" :href="downloadURL">
          Clear
        </v-btn>
        <v-btn class="success" :download="downloadName" :href="downloadURL" :disabled="this.$store.state.attendees.length === 0">
          Download
        </v-btn>
      </v-tab-item>

      <v-tab-item>
        <v-card>
          <v-card-text>
            {{ $options.config.courses_math }}
          </v-card-text>
        </v-card>
      </v-tab-item>

      <v-tab-item>
        <v-card>
          <v-card-text>{{this.$store.state.faculties_act}}</v-card-text>
          <v-list dense>
          <template v-for="(course) in $options.config.faculties">
            <v-list-tile
              :key="course"
              ripple
              @click="select(course_act)"
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
import configuration from '../assets/courses.json'

export default {
  config: configuration,
  data: function() {
    return {
      authenticated: false,
      password: null,
      requiredPassword: "HelloWorld",
      course: "",
      course_act: "",
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
      default: format(Date.now(), 'YYMMDD_HHmm') + '_mz.csv'
    },
    delimiter: {
      default: ";"
    },
    quote: {
      default: ''
    }
  },
  filters: {
    formatTime(time) {
      return format(time, "HH:mm")
    },
    formatCourseList(courselist) {
      return courselist.join(", ")
    }
  },
  methods: {
    authenticate() {
        if (this.password != this.requiredPassword) return;
        this.authenticated = true;
    },
    select(course) {
       this.$store.state.faculties_act.push(course)
    }
  },
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
  created() {
        this.flds = this.headers.map(item => ({
      label: item.text,
      value: item.value
    }));
    this.requiredPassword = process.env.VUE_APP_ADMIN_PASSWORD !== undefined ? process.env.VUE_APP_ADMIN_PASSWORD : "HelloWorld";
  },
  computed: {
    values() {
      const newvalues = this.$store.state.attendees;
      return newvalues.map(element => ({ ...element, ...this.format(element) }));
    },
    csv() {
      const opts = {fields: this.flds, delimiter: this.delimiter, quote: this.quote, withBOM: true};
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