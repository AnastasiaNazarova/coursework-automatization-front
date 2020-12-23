<template>
  <div class="memberRSO">

    <v-data-table
      :headers="headers"
      :items="membersRSO"
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
                            v-model="editedItem.fullName"
                            label="ФИО"
                          ></v-text-field>
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-text-field
                            v-model="editedItem.dataBirth"
                            label="Дата рождения"
                          ></v-text-field>
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-text-field
                            v-model="editedItem.post"
                            label="Должность"
                          ></v-text-field>
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-text-field
                            v-model="editedItem.yearSet"
                            label="Год набора"
                          ></v-text-field>
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-overflow-btn
                              :items = "groups"
                              item-text="nameGroup"
                              item-value="id"
                              v-model="editedItem.groupId"
                              label="Название отряда"
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
  name: 'MemberRSO',

  data() {
    return {
     dialog: false,
        dialogDelete: false,
      headers: [
        {text: 'ФИО',value: 'fullName'},
        { text: 'Дата рождения', value: 'dataBirth'},
        { text: 'Должность', value: 'post'},
        { text: 'Год набора', value: 'yearSet' },
        { text: 'Отряд', value: 'group.nameGroup'},
        { text: 'Actions', value: 'actions', sortable: false },
      ],
          editedIndex: -1,
          editedItem: {
            id:-1,
            fullName: '',
            dataBirth: '',
            post: '',
            yearSet: 0,
            group:[],
            groupId:-1,
          },
          defaultItem: {
            fullName: '',
            dataBirth: '',
            post: '',
            yearSet: 0,
            group:[],
            groupId:-1,
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
    this.$store.dispatch('setAllMemberRSO');
    this.$store.dispatch('setAllGroups');
  },
    computed: {
        formTitle () {
           return this.editedIndex === -1 ? 'Новый элемент' : 'Изменить элемент'
         },
      membersRSO() {
        return this.$store.getters.getMemberRSO.map(member => {
          const newMemberRSO = Object.assign({}, member);
          newMemberRSO.dataBirth = new Date(newMemberRSO.dataBirth).toLocaleDateString();
          return newMemberRSO
        })
      },
      groups()
      {
        return this.$store.getters.getGroups
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
          this.editedIndex = this.membersRSO.indexOf(item)
          this.editedItem = Object.assign({}, item)
          this.dialog = true
          this.editedItem.id=item.id
        },

        deleteItem (item) {
          this.editedIndex = this.membersRSO.indexOf(item)
          this.editedItem = Object.assign({}, item)
          this.dialogDelete = true
          this.editedItem.id=item.id
        },

        deleteItemConfirm () {
          this.membersRSO.splice(this.editedIndex, 1)
          this.closeDelete()
          this.$store.dispatch('deleteMemberRSO', this.editedItem.id )
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
            Object.assign(this.membersRSO[this.editedIndex], this.editedItem)
            this.$store.dispatch('addMemberRSO', {
              id: this.editedItem.id,
              fullName: this.editedItem.fullName,
              dataBirth: new Date(this.editedItem.dataBirth),
              group: this.groups.find(x => x.id === this.editedItem.groupId),
              groupId:this.editedItem.groupId,
              post: this.editedItem.post,
              yearSet: this.editedItem.yearSet
            })
          } else {
            this.membersRSO.push(this.editedItem)
            this.$store.dispatch('addMemberRSO', {
              fullName: this.editedItem.fullName,
              dataBirth: new Date(this.editedItem.dataBirth),
              group: this.groups.find(x => x.id === this.editedItem.groupId),
              groupId:this.editedItem.groupId,
              post: this.editedItem.post,
              yearSet: this.editedItem.yearSet
            })
          }
          this.close()
        }
      }


 }
</script>






