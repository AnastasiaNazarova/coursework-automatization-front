<template>
  <div class="group">

    <v-data-table
        :headers="headers"
        :items="groups"
    >

      <template v-slot:top>
        <v-toolbar
            flat
        >
          <v-divider
              class="mx-4"
              inset
              vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <v-dialog
              v-model="dialog"
              max-width="500px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
              >
                Добавить
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                        cols="12"
                        sm="6"
                        md="4"
                    >
                      <v-text-field
                          v-model="editedItem.nameGroup"
                          label="Название отряда"
                      ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                        md="4"
                    >
                      <v-text-field
                          v-model="editedItem.dataCreatedGroup"
                          label="Дата создания отряда"
                      ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                        md="4"
                    >
                      <v-overflow-btn
                          :items = "staffs"
                          item-text="nameStaff"
                          item-value ="id"
                          v-model="editedItem.staffId"
                          label="Название штаба"
                      ></v-overflow-btn>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="blue darken-1"
                    text
                    @click="close"
                >
                  Отмена
                </v-btn>
                <v-btn
                    color="blue darken-1"
                    text
                    @click="save"
                >
                  Сохранить
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="600px">
            <v-card>
              <v-card-title class="headline">Вы уверены что хотите удалить эту строку?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon
            small
            class="mr-2"
            @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
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
  name: 'Group',

  data() {
    return {
      dialog: false,
      dialogDelete: false,
      headers: [
        {text: 'Название отряда',value: 'nameGroup'},
        { text: 'Дата создания отряда', value: 'dataCreatedGroup'},
        { text: 'Название штаба', value: 'staff.nameStaff'},
        { text: 'Действия', value: 'actions', sortable: false },
      ],
      editedIndex: -1,
      editedItem: {
        id:-1,
        nameGroup: '',
        dataCreatedGroup: '',
        staff:[],
        staffId:-1,
      },
      defaultItem: {
        nameGroup: '',
        dataCreatedGroup: '',
        staff:[],
        staffId:-1,
      },

      footerProps: {
        'items-per-page-all-text': 'Все',
        'items-per-page-text': 'Кол-во строк на странице',
        'items-per-page-options': [5, 10, 20, -1],
        'page-text': ''
      }
    }
  },
  beforeMount() {
    this.$store.dispatch('setAllGroups');
    this.$store.dispatch('setAllStaffs');
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Новый элемент' : 'Изменить элемент'
    },
   groups() {

     return this.$store.getters.getGroups.map(group => {
       const newGroup = Object.assign({}, group);
       newGroup.dataCreatedGroup = new Date(newGroup.dataCreatedGroup).toLocaleDateString();
       return newGroup
     })

    },
    staffs()
    {
      return this.$store.getters.getStaffs;
    }

  },

  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
  },

  methods: {

    editItem (item) {
      this.editedIndex = this.groups.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
      this.editedItem.id=item.id
    },

    deleteItem (item) {
      this.editedIndex = this.groups.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
      this.editedItem.id = item.id
    },

    deleteItemConfirm () {
      this.groups.splice(this.editedIndex, 1)
      this.closeDelete()
      this.$store.dispatch('deleteGroup',this.editedItem.id)
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save () {

      if (this.editedIndex > -1) {
        Object.assign(this.groups[this.editedIndex], this.editedItem)

        this.$store.dispatch('addGroup', {
          id: this.editedItem.id,
          nameGroup: this.editedItem.nameGroup,
          dataCreatedGroup: new Date(this.editedItem.dataCreatedGroup),
          staffId: this.editedItem.staffId,
          staff:this.staffs.find(x => x.id === this.editedItem.staffId),
        })
      }
      else {
        this.groups.push(this.editedItem)
        this.$store.dispatch('addGroup', {
          nameGroup: this.editedItem.nameGroup,
          dataCreatedGroup: new Date(this.editedItem.dataCreatedGroup),
          staffId: this.editedItem.staffId,
          staff: this.staffs.find(x => x.id === this.editedItem.staffId),
        })
      }
      this.close()
    }
  }

}
</script>
