<template>
  <v-container>
    <!-- <v-form ref="form" v-model="valid" lazy-validation> -->
    <!-- <v-container grid-list-md text-xs-center>
    <v-layout row wrap justify-space-around>-->
    <!-- <v-flex xs6> -->
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
        <!-- <v-form ref="form" v-model="valid" lazy-validation> -->
        <v-stepper-content step="1">
          <v-form ref="form_studinfo" v-model="valid" lazy-validation>
            <v-card-text>
              <v-text-field
                v-model="form.id"
                :rules="IDRules"
                maxlength="9"
                label="ID"
                placeholder="XX999999"
                required
              ></v-text-field>
            </v-card-text>
            <v-card-text>
              <v-text-field
                v-model="form.semester"
                :rules="semesterRules"
                label="Fachsemester"
                maxlength="2"
                required
              ></v-text-field>
            </v-card-text>
            <v-card-text>
              <v-select
                attach
                v-model="form.faculty"
                :items="faculties"
                :rules="facultyRules"
                label="Studiengang"
                required
              ></v-select>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <!-- <v-btn flat @click.native="this.stepper = 1">Zurück</v-btn> -->
              <!-- @click.native="valid ? stepper = 2 : stepper = 1" -->
              <v-btn color="primary" @click="validate" :disabled="!valid">Weiter</v-btn>
            </v-card-actions>
          </v-form>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-form ref="form_coursemath" v-model="valid" lazy-validation>
            <v-card-text>
              <v-card-title class="justify-center">
                <h2>Mathematik</h2>
              </v-card-title>
              <v-autocomplete
                v-model="form.courses"
                :items="courses_math"
                :rules="courseRules"
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
              <v-card-title class="justify-center">
                <h2>Physik</h2>
              </v-card-title>
              <v-autocomplete
                v-model="form.courses"
                :items="courses_physics"
                :rules="courseRules"
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
              <v-spacer></v-spacer>
              <v-btn flat @click.native="stepper = 1">Zurück</v-btn>
              <v-btn color="primary" @click="validate">Weiter</v-btn>
            </v-card-actions>
          </v-form>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-card-text>
            <time-input
              v-model="form.start"
              :max="maxStartTime"
              :rules="timeRules"
              label="Startzeit"
              required
            ></time-input>
            <time-input v-model="form.end" label="Endzeit" disabled></time-input>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat @click.native="stepper = 2">Zurück</v-btn>
            <v-btn color="primary" @click="validate">Absenden</v-btn>
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
          </v-card-actions>
        </v-stepper-content>
        <!-- </v-form> -->
      </v-stepper-items>
    </v-stepper>
    Valid: {{ this.valid == null ? 'null' : this.valid }}
    Stepper: {{ this.stepper}}
    <!-- </v-form> -->
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
      stepper: 0,
      steps: [
        {
          label: "Personal Infos",
          completed: false
        },
        {
          label: "Course detail mathmatics",
          completed: false
        },
        {
          label: "Timestamp",
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
  // watch: {
  //     isUpdating (val) {
  //       if (val) {
  //         setTimeout(() => (this.isUpdating = false), 3000)
  //       }
  //     }
  //   },
  methods: {
    remove(item) {
      const index = this.form.courses.indexOf(item.name);
      if (index >= 0) this.form.courses.splice(index, 1);
    },
    setEndTime() {
      this.form.end = new Date();
    },
    progress() {
      this.stepper += 1;
      // this.valid = false
     
    },
    validate() {
      // if (this.$refs.form.validate()) {
        if (this.stepper == 3) {
          this.dialog = true
        }
        if (this.stepper == 2) {
         this.$refs.form_coursemath.validate();

        if (this.valid && this.form.courses.length > 0) {
          this.$refs.form_coursemath.resetValidation();
          this.progress();
        }
      }
      if (this.stepper == 1) {
        this.$refs.form_studinfo.validate();

        if (this.valid) {
          this.$refs.form_studinfo.resetValidation();
          this.progress();
        }
      }
      
      // if (this.valid == true && this.stepper == 3) {
      //   this.dialog = true;
      //   this.stepper -= 1
      // }
      // if (this.$refs.form_studinfo.validate()) {
      //   if (this.valid == true) {
      //     this.stepper += 1
      //     this.valid = false
      //   }
      // }
      // if (this.$refs.form_coursemath.validate()) {
      //   if (this.valid == true) {
      //     this.valid = false
      //     this.stepper += 1
      //   }
      // }
      // }
    },
    // validate() {
    //   if (this.$refs.form.validate()) {
    //     if (this.valid == true && this.stepper == 3) {
    //       this.dialog = true;
    //       this.stepper -= 1
    //     }
    //     if (this.$refs.form_studinfo.validate()) {
    //       if (this.valid == true) {
    //         this.stepper += 1
    //         this.valid = false
    //       }
    //     }
    //     if (this.$refs.form_coursemath.validate()) {
    //       if (this.valid == true) {

    //         this.stepper += 1
    //         this.valid = true
    //       }
    //     }
    //   }
    // },
    submit() {
      this.$store.dispatch("submitForm", this.localizedForm);
      this.form = initializeForm();
      this.$refs.form_studinfo.reset();
      this.$refs.form_coursemath.reset();
      this.dialog = false;
      this.valid = false;
      this.stepper = 1;
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