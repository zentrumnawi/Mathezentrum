<template>
  <v-stepper v-model="stepper">
    <v-stepper-header>
      <div class="step" v-for="(step, index) in steps" :key="index">
        <v-stepper-step
          color="success"
          :edit-icon="'check_circle'"
          :complete-icon="'edit'"
          :step="index + 1"
          :complete="(index + 1 ) <= stepper"
          :editable="(index + 1) < stepper"
        >{{ step.label }}</v-stepper-step>
        <v-divider></v-divider>
      </div>
    </v-stepper-header>
    <v-stepper-items>
      <v-stepper-content step="1">
        <v-form ref="form_studinfo" v-model="valid">
          <v-card>
            <v-card-text>
              <v-text-field
                v-model="form.id"
                :rules="rules.id"
                maxlength="9"
                label="ID"
                placeholder="XX999999"
                required
              ></v-text-field>

              <v-select
                v-model="form.semester"
                :rules="rules.time"
                :items="semester"
                label="Fachsemester"
                required
              ></v-select>

              <v-select
                v-model="form.faculty"
                :rules="rules.faculty"
                :items="faculties"
                label="Studiengang"
                required
              ></v-select>
            </v-card-text>

            <v-card-actions>
              <v-btn color="primary" @click="next" :disabled="!valid">Weiter</v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-form ref="form_coursemath" v-model="valid2">
          <v-card>
            <v-card-title class="justify-center">
              <h2>Mathematik</h2>
            </v-card-title>

            <v-card-text>
              <v-autocomplete
                v-model="form.courses"
                :rules="rules.course"
                :items="courses_math"
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
                  >{{ data.item.name }}</v-chip>
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
            </v-card-text>

            <v-card-title class="justify-center">
              <h2>Physik</h2>
            </v-card-title>

            <v-card-text>
              <v-autocomplete
                v-model="form.courses"
                :rules="rules.course"
                :items="courses_physics"
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
                  >{{ data.item.name }}</v-chip>
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
            </v-card-text>

            <v-card-actions>
              <v-btn color="primary" @click="next" :disabled="!valid2">Weiter</v-btn>
              <v-btn flat @click.native="previous">Zurück</v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-stepper-content>

      <v-stepper-content step="3">
        <v-card>
          <v-card-text>
            <time-input v-model="form.start" :max="maxStartTime" label="Startzeit" required></time-input>
            <time-input v-model="form.end" label="Endzeit" disabled></time-input>
          </v-card-text>

          <v-card-actions>
            <v-dialog v-model="dialog" persistent max-width="600">
              <template v-slot:activator="{ on }">
                <v-btn color="primary" v-on="on">Absenden</v-btn>
              </template>

              <v-card>
                <v-card-title class="headline" primary-title>Angaben bestätigen</v-card-title>

                <v-card-text>Du hast noch die Möglichkeit deine Angaben zu korrigieren. Sind deine Angaben korrekt?</v-card-text>

                <v-card-actions>
                  <v-btn class="primary" @click="submit">Ja</v-btn>
                  <v-btn @click="dialog = false" flat>Nein</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-btn flat @click.native="stepper -= 1">Zurück</v-btn>
          </v-card-actions>
        </v-card>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import { format, subHours, subMinutes } from "date-fns";
import TimeInput from "@/components/TimeInput";
import uuid from "uuid/v4";
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
      stepper: 0,
      steps: [
        {
          label: "Studenten-ID",
          completed: false
        },
        {
          label: "Lehrveranstaltungen",
          completed: false
        },
        {
          label: "Zeitangabe",
          completed: false
        }
      ],
      interval: null,
      form: initializeForm(),
      courses_selected: [],
      courses_physics: [
        { header: "Physik" },
        { name: "Theoretische Physik 1" },
        { name: "Theoretische Physik 2" },
        { name: "Theoretische Physik 3" },
        { name: "Theoretische Physik 4" },
        { name: "Experimentalphysik 1a" },
        { name: "Experimentalphysik 1b" },
        { name: "Experimentalphysik 2" },
        { name: "Experimentalphysik 4a" },
        { name: "Experimentalphysik 4b" },
        { name: "Anfängerpraktikum 1" },
        { name: "Anfängerpraktikum 2" },
        { name: "Numerische Methoden der Physik" },
        { name: "Einführung in Programmierung 2" },
        { name: "Einführung in Programmierung 1" },
        { name: "Astrophysik 1" },
        { name: "Astrophysik 2" },
        { name: "Physikalische Chemie I" },
        { name: "Physik und Chemie der Atmosphäre" },
        { name: "Einführung in die Geophysik" },
        { name: "Physik für Biologen" },
        { name: "Physik für Pharmazeuten" },
        { name: "Physik für Zahnmediziner" },
        { name: "Physik für Chemiker & andere NatWiss 2" },
        { name: "Physik für Chemiker & andere NatWiss 2" }
      ],
      courses_math: [
        { header: "Mathematik" },
        { name: "Mathe 1 (Physik)" },
        { name: "Mathe 2 (Physik)" },
        { name: "Mathe 3 (Physik)" },
        { name: "Mathe 1 (Meteorologie)" },
        { name: "Mathe 2 (Meteorologie)" },
        { name: "Mathe 1 (Informatik)" },
        { name: "Mathe 2 (Informatik)" },
        { name: "Mathe 1 (Naturwissenschaften)" },
        { name: "Mathe 2 (Naturwissenschaften)" },
        { name: "Mathe (Pharmazie)" },
        { name: "Mathematische Verfahren 1 (Chemie)" },
        { name: "Mathematische Verfahren 2 (Chemie)" }
      ],
      semester: ["1", "2", "3", "4", "5", "6", "6+"],
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
      ],
      dialog: false,
      valid: true,
      valid2: true,
      disabled: 0,
      rules: {
        id: [
          v => !!v || "Bitte geben Sie Ihre persönlichen 9 stellige ID an",
          v => v.length === 9 || "Ihre ID muss 9 Zeichen lang sein"
        ],
        time: [v => !!v || "Bitte geben Sie Ihre Anwesenheitszeit an"],
        course: [
          v => v.length > 0 || "Bitte wählen Sie mindestens eine Lehrveranstaltung aus"
        ],
        semester: [v => !!v || "Bitte geben Sie Ihr aktuelles Fachsemester an"],
        faculty: [v => !!v || "Bitte geben Sie Ihren Studiengang an"]
      }
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
      return format(subMinutes(this.form.end, 10), "HH:mm");
    },
    localizedForm() {
      return {
        ...this.form,
        start: this.form.start.toString(),
        end: this.form.end.toString()
      };
    }
  },
  methods: {
    remove(item) {
      const index = this.form.courses.indexOf(item.name);
      if (index >= 0) {
        this.form.courses.splice(index, 1);
      }
    },
    setEndTime() {
      this.form.end = new Date();
    },
    validate() {
      if (this.stepper == 2) {
        this.$refs.form_coursemath.validate();

        if (this.valid2 && this.form.courses.length > 0) {
          this.$refs.form_coursemath.resetValidation();
          return true;
        }
      }

      if (this.stepper == 1) {
        this.$refs.form_studinfo.validate();

        if (this.valid) {
          this.$refs.form_studinfo.resetValidation();
          return true;
        }
      }

      return false;
    },
    next() {
      this.validate()

      this.stepper += 1;
    },
    previous() {
      this.stepper -= 1;
      this.$refs.form_coursemath.resetValidation();
    },
    submit() {
      this.$store.dispatch("submitForm", {
        ...this.localizedForm,
        idnumber: uuid()
      });
      this.form = initializeForm();
      this.$refs.form_studinfo.resetValidation();
      this.$refs.form_coursemath.resetValidation();
      this.dialog = false;
      this.valid = false;
      this.stepper = 1;
    }
  }
};
</script>
