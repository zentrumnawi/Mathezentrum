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
            <td class="text-xs-left">{{ props.item.semester }}</td>
            <td class="text-xs-left">{{ props.item.courses }}</td>
          </template>
        </v-data-table>
        <v-btn class="success" :download="downloadName" :href="downloadURL" :disabled="this.$store.state.attendees.length === 0">
          Download
        </v-btn>
      </v-tab-item>

      <v-tab-item>
        <v-card>
          <v-card-text>
            {{ $options.config2.courses_math }}
            <v-text-field
                  label="Kurs hinzufügen"
                ></v-text-field>
            <v-btn>
              hinzufügen
            </v-btn>
          </v-card-text>
        </v-card>

        <v-card>
           blubb

        </v-card>
      </v-tab-item>
    </v-tabs>


  </div>
</template>

<script>
import { parse } from "json2csv";
import { format, addMinutes, differenceInMinutes } from "date-fns";
import configuration from '../assets/test.json'
import configuration2 from '../assets/courses.json'

export default {
  config: configuration,
  config2: configuration2,
  data: function() {
    return {
      authenticated: false,
      password: null,
      requiredPassword: null,
      flds: [],
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
      ],
      courses_physics: [
        { key: "Th1", name: "Theoretische Physik 1" },
        { key: "Th2", name: "Theoretische Physik 2" },
        { key: "Th3", name: "Theoretische Physik 3" },
        { key: "Th4", name: "Theoretische Physik 4" },
        { key: "Ex1a", name: "Experimentalphysik 1a" },
        { key: "Ex1b", name: "Experimentalphysik 1b" },
        { key: "Ex2", name: "Experimentalphysik 2" },
        { key: "Ex4a", name: "Experimentalphysik 4a" },
        { key: "Ex4b", name: "Experimentalphysik 4b" },
        { key: "AP1", name: "Anfängerpraktikum 1" },
        { key: "AP2", name: "Anfängerpraktikum 2" },
        { key: "NumPhy", name: "Numerische Methoden der Physik" },
        { key: "EPR1", name: "Einführung in Programmierung 1" },
        { key: "EPR2", name: "Einführung in Programmierung 2" },
        { key: "Astro1", name: "Astrophysik 1" },
        { key: "Astro2", name: "Astrophysik 2" },
        { key: "PCI", name: "Physikalische Chemie I" },
        { key: "PCAA", name: "Physik und Chemie der Atmosphäre" },
        { key: "GPhy1", name: "Einführung in die Geophysik" },
        { key: "PhyBio", name: "Physik für Biologen" },
        { key: "PhyPharma", name: "Physik für Pharmazeuten" },
        { key: "PhyZahn", name: "Physik für Zahnmediziner" },
        { key: "PhyChemNawi 1", name: "Physik für Chemiker & andere NatWiss 2" },
        { key: "PhyChemNawi 1", name: "Physik für Chemiker & andere NatWiss 2" }
      ],
      courses_math: [
        { key: "MathPhy1", name: "Mathe 1 (Physik)" },
        { key: "MathPhy2", name: "Mathe 2 (Physik)" },
        { key: "MathPhy3", name: "Mathe 3 (Physik)" },
        { key: "MathMet1", name: "Mathe 1 (Meteorologie)" },
        { key: "MathMet2", name: "Mathe 2 (Meteorologie)" },
        { key: "MathInf1", name: "Mathe 1 (Informatik)" },
        { key: "MathInf2", name: "Mathe 2 (Informatik)" },
        { key: "MathNaWi1", name: "Mathe 1 (Naturwissenschaften)" },
        { key: "MathNaWi2", name: "Mathe 2 (Naturwissenschaften)" },
        { key: "MathPharma", name: "Mathe (Pharmazie)" },
        { key: "MathChem1", name: "Mathematische Verfahren 1 (Chemie)" },
        { key: "MathChem2", name: "Mathematische Verfahren 2 (Chemie)" }
      ],
      faculties: [
        "Mathematik",
        "Physik",
        "Meteorologie",
        "Informatik",
        "Chemie",
        "Geowissenschaften",
        "Biophysik",
        "Bioinformatik",
        "Biochemie",
        "Pharmazie",
        "Medizin",
        "Zahnmedizin",
        "Wirtschaftspädagogik",
        "Sonstige"
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
  methods: {
    authenticate() {
        if (this.password != this.requiredPassword) return;

        this.authenticated = true;
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