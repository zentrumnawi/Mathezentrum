<template>
  <div id="FormData">
    <!-- <h1>Ich bin Admin</h1> -->
    <v-data-table
          :headers="headers"
          :items="values"
          class="elevation-1"
        >
          <template v-slot:items="props">
            <td>{{ props.item.ID }}</td>
            <td class="text-xs-right">{{ props.item.date }}</td>
            <td class="text-xs-right">{{ props.item.start }}</td>
            <td class="text-xs-right">{{ props.item.end }}</td>
            <td class="text-xs-right">{{ props.item.course }}</td>
            <td class="text-xs-right">{{ props.item.semester }}</td>
            <td class="text-xs-right">{{ props.item.faculty }}</td>
          </template>
        </v-data-table>
    </div>
    <!-- <div v-for="attendee in $store.state.attendees" :key="attendee.id">{{ attendee }}</div> -->
</template>

<script>
export default {
  // el: 'FormData',
  data: function() {
    return {
      headers: [
        {
          text: 'ID',
          align: 'left',
          sortable: true,
          value: 'ID'
        },
        { text: 'Datum', value: 'date' },
        { text: 'Startzeit', value: 'start' },
        { text: 'Endzeit', value: 'end' },
        { text: 'Kurse', value: 'course' },
        { text: 'Semester', value: 'semester' },
        { text: 'Studiengang', value: 'faculty'}
      ],
      values: [
        {
          ID: 'Frozen Yogurt',
          date: 159,
          start: 6.0,
          end: 24,
          course: 4.0,
          semester: '1%',
          faculty: '1%'
        },
        {
          ID: 'Ice cream sandwich',
          date: 237,
          start: 9.0,
          end: 37,
          course: 4.3,
          semester: '1%',
          faculty: '1%'
        },
      ]
    }
  }    
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.v-text-field{
  color:"#005ea8"
}
</style>