<template>
  <v-container>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-container grid-list-md text-xs-center>
        <v-layout row wrap justify-space-around>
          <v-flex xs6>
            <v-text-field
              v-model="form.id"
              :rules="IDRules"
              maxlength="9"
              label="ID"
              placeholder="XX999999"
              required
            ></v-text-field>
          </v-flex>
          <v-flex xs3>
            <time-input v-model="form.start" :max="maxStartTime" :rules="timeRules" label="Startzeit" required></time-input>
          </v-flex>
          <v-flex xs3>
            <time-input v-model="form.end" label="Endzeit" disabled></time-input>
          </v-flex>
          <v-flex xs4>

              <v-autocomplete
                v-model="form.courses"
                :items="courses"
                chips
                label="Lehrveranstaltung"
                item-text="name"
                item-value="name"
                multiple
              >
                <template v-slot:selection="data">
                  <v-chip
                    :selected="data.selected"
                    close
                    class="chip--select-multi"
                    @input="remove(data.item)"
                  >
                    {{ data.item.name }}
                  </v-chip>
                </template>
                <template v-slot:item="data">
                  <template v-if="typeof data.item !== 'object'">
                    <v-list-tile-content v-text="data.item"></v-list-tile-content>
                  </template>
                  <template v-else>
                    <v-list-tile-content>
                      <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
                      <v-list-tile-sub-title v-html="data.item.group"></v-list-tile-sub-title>
                    </v-list-tile-content>
                  </template>
                </template>
              </v-autocomplete>
          </v-flex>
          <v-flex xs4>
            <v-text-field
              v-model="form.semester"
              :rules="semesterRules"
              label="Fachsemester"
              maxlength="2"
              required
            ></v-text-field>
          </v-flex>
          <v-flex xs4>
            <v-select
              attach
              v-model="form.faculty"
              :items="faculties"
              :rules="facultyRules"
              label="Studiengang"
              required
            ></v-select>
          </v-flex>
          <v-flex>
            <v-btn color="success" @click="validate">Abschicken</v-btn>
            <v-dialog v-model="dialog" persistent max-width="600">
              <v-card>
                <v-card-text class="display-1">Sind deine Angaben korrekt ?</v-card-text>
                <v-card-actions>
                  <v-layout justify-center>
                    <v-flex xs4 pr-5>
                      <v-btn class="success" @click="submit">Ja, alles richtig !</v-btn>
                    </v-flex>
                    <v-flex xs4>
                      <v-btn class="error" @click="dialog = false">Moment mal...</v-btn>
                    </v-flex>
                  </v-layout>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-flex>
        </v-layout>
      </v-container>
    </v-form>
  </v-container>
</template>

<script>
import { format, subHours, subMinutes } from "date-fns";
import TimeInput from "@/components/TimeInput";

function initializeForm() {
  return {
    id: "",
    start: subHours(new Date(), 2),
    end: new Date(),
    faculty: null,
    semester: "",
    courses: ""
  };
}

export default {
  components: { TimeInput },
  data: function() {
    return {
      interval: null,
      form: initializeForm(),
      courses_selected: [],
      courses: [
        {header: 'Physik'},
        {name: "Mathe für Physiker 1"},
        {name: "Mathe für Physiker 2"},
        {name: "Mathe für Physiker 3"},
        {divider: true},
        {header: 'Mathematik'},
        {name: "Algebra"}
      ],
      faculties: [
        "BSc Physik",
        "BSc Meteorologie",
        "BSc Biologie",
        "BSc Pharmazie",
        "Sonstige"
      ],
      dialog: false,
      valid: false,
      disabled: 0,
      IDRules: [
        v => !!v || "Bitte geben Sie Ihre persönlichen 9 stellige ID an",
        v => v.length == 9 || "Ihre ID muss 9 Zeichen lang sein"
      ],
      timeRules: [v => !!v || "Bitte geben Sie Ihre Anwesenheitszeit an"],
      courseRules: [
        v => !!v || "Bitte wählen Sie mindestens eine Lehrveranstaltung aus"
      ],
      semesterRules: [
        v => !!v || "Bitte geben Sie Ihr aktuelles Fachsemester an",
        v => v.length <= 2 || "Falsche Eingabe"
      ],
      facultyRules: [v => !!v || "Bitte geben Sie Ihren Studiengang an"]
    };
  },
  created() {
    // Create an interval to update current time every 1000ms
    this.interval = setInterval(() => this.setEndTime(), 1000);
  },
  destroyed() {
    // Cleanup interval when we leave the page.
    clearInterval(this.interval);
  },
  computed: {
    maxStartTime() {
      return format(subMinutes(this.form.end, 10), "HH:mm")
    },
    localizedForm() {
      return {
        ...this.form,
        start: this.form.start.toString(),
        end: this.form.end.toString()
      };
    }
  },

// watch: {
//     isUpdating (val) {
//       if (val) {
//         setTimeout(() => (this.isUpdating = false), 3000)
//       }
//     }
//   },

  methods: {
    remove (item) {
      const index = this.form.courses.indexOf(item.name)
      if (index >= 0) this.form.courses.splice(index, 1)
    },
    setEndTime() {
      this.form.end = new Date();
    },
    validate() {
      if (this.$refs.form.validate()) {
        if (this.valid == true) {
          this.dialog = true;
        }
      }
    },
    submit() {
      this.$store.dispatch("submitForm", this.localizedForm);
      this.form = initializeForm();
      this.$refs.form.resetValidation();
      this.dialog = false;
      this.valid = false;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.v-text-field {
  color: "#005ea8";
}
</style>