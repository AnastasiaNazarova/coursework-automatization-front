<template>
  <div class="lots-table">
    <v-data-table
        :headers="headers"
        :items="lots"
        item-key="id"
        :footer-props="footerProps"
    >
      <template v-slot:item.actions="{ item }">
        <v-icon
            class="actions-icon"
            small
            @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
            class="actions-icon"
            small
            @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  name: 'LotsTable',
  props: {
    isActiveLots: Boolean
  },
  data() {
    return {
      headers: [
        {
          text: 'Наименование',
          value: 'name'
        },
        {
          text: 'Ставка',
          value: 'price'
        },
        {
          text: 'Количество',
          value: 'count'
        },
        {
          text: '',
          value: 'actions',
          sortable: false
        }
      ],
      footerProps: {
        'items-per-page-all-text': 'Все',
        'items-per-page-text': 'Кол-во продуктов на странице',
        'items-per-page-options': [5, 10, 20, -1]
        //TODO до конца провести локализацию
      },
      editedIndex: -1
    }
  },
  computed: {
    lots() {
      return this.isActiveLots
          ? this.$store.getters.getActiveUserLots
          : this.$store.getters.getClosedUserLots;
    }
  },
  methods: {
    editItem(item) {

    },
    deleteItem(item) {
      this.$store.dispatch('deleteActiveUserLot', Object.assign(item, {count: 0}))
    }
  }
}
</script>

<style>
.actions-icon {
  margin: 0 5px;
}
</style>