<template>
  <q-layout class="bg-grey-1">
    <q-header elevated class="text-white q-header" style="background: #24292e" height-hint="61.59">
      <q-toolbar class="q-py-sm q-px-md">
        <q-btn round dense flat :ripple="false" :icon="fabGithub" size="19px" color="white" class="q-mr-sm" no-caps />

        <div v-if="$q.screen.gt.sm" class="GL__toolbar-link q-ml-xs q-gutter-md text-body2 text-weight-bold row items-center no-wrap">
            <router-link to="/" class="text-white">
                Trang chủ
            </router-link>
            <router-link to="/about" class="text-white">
                About
            </router-link>
            <router-link to="/problems" class="text-white">
                Problems
            </router-link>
            <router-link to="/testapi" class="text-white">
                Test API
            </router-link>
            <router-link to="/test" class="text-white">
                Contest
            </router-link>
            <router-link to="/submission" class="text-white">
                Submission
            </router-link>
        </div>

        <q-space />

        <div class="q-pl-sm q-gutter-sm row items-center no-wrap">
          <q-btn v-if="$q.screen.gt.xs" dense flat round size="sm" icon="notifications" />

          <q-btn dense flat no-wrap>
            <q-avatar rounded size="20px">
              <img :src="!currentUser ? avatar : ''">
            </q-avatar>
            <q-icon name="arrow_drop_down" size="16px" />

            <template v-if="!currentUser">
              <q-menu auto-close>
                <q-list dense>
                  <q-item class="GL__menu-link-signed-in">
                    <q-item-section>
                      <div>Bạn <strong>chưa đăng nhập!</strong></div>
                    </q-item-section>
                  </q-item>
                  <q-separator />
                  <q-item clickable class="GL__menu-link-status">
                    <q-item-section>
                      <router-link to="/login" class="route_link">
                        <div>
                          <q-icon name="login" />
                          Đăng nhập
                        </div>
                      </router-link>
                    </q-item-section>
                  </q-item>
                  <q-item clickable class="GL__menu-link-status">
                    <q-item-section>
                      <router-link to="/register" class="route_link">
                        <div>
                          <q-icon name="person_add" />
                          Tạo tài khoản!
                        </div>
                      </router-link>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </template>
            <template v-else>
              <q-menu auto-close>
                <q-list dense>
                  <q-item class="GL__menu-link-signed-in">
                    <q-item-section>
                      <div>Xin chào, <strong>Le Van Dat</strong></div>
                    </q-item-section>
                  </q-item>
                  <q-separator />
                  <q-item clickable class="GL__menu-link-status">
                    <q-item-section>
                      <div @click="login">
                        <q-icon name="tag_faces" color="blue-9" size="18px" />
                        Đăng nhập
                      </div>
                    </q-item-section>
                  </q-item>
                  <q-separator />
                  <q-item clickable class="GL__menu-link">
                    <q-item-section>Your profile</q-item-section>
                  </q-item>
                  <q-item clickable class="GL__menu-link">
                    <q-item-section>Your repositories</q-item-section>
                  </q-item>
                  <q-item clickable class="GL__menu-link">
                    <q-item-section>Your projects</q-item-section>
                  </q-item>
                  <q-item clickable class="GL__menu-link">
                    <q-item-section>Your stars</q-item-section>
                  </q-item>
                  <q-item clickable class="GL__menu-link">
                    <q-item-section>Your gists</q-item-section>
                  </q-item>
                  <q-separator />
                  <q-item clickable class="GL__menu-link">
                    <q-item-section>Help</q-item-section>
                  </q-item>
                  <q-item clickable class="GL__menu-link">
                    <q-item-section>Settings</q-item-section>
                  </q-item>
                  <q-item clickable class="GL__menu-link">
                    <q-item-section @click.prevent="logOut">Sign out</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </template>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container class="clashoj_body">
      <router-view />
    </q-page-container>
  </q-layout>
  <notifications />
</template>

<script>
import { ref } from 'vue'
import { fabGithub } from '@quasar/extras/fontawesome-v6'
import { useQuasar } from 'quasar'
import { notify } from "@kyvg/vue3-notification";

const stringOptions = [
  'quasarframework/quasar',
  'quasarframework/quasar-awesome'
]

export default {
  name: 'clashOJ',
  data() {
    return {
      avatar: "https://cdn.quasar.dev/img/avatar3.jpg",
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser['roles']) {
        return this.currentUser['roles'].includes('ROLE_ADMIN');
      }
      return false;
    },
    showModeratorBoard() {
      if (this.currentUser && this.currentUser['roles']) {
        return this.currentUser['roles'].includes('ROLE_MODERATOR');
      }
      return false;
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$notify({
        title: "Success!",
        text: "Đã đăng xuất thành công!",
        type: "success",
        position: "bottom right"
      });
      this.$router.push('/');
    }
  },
  setup () {
    const $q = useQuasar()
    const text = ref('')
    const options = ref(null)
    const filteredOptions = ref([])
    const search = ref(null) // $refs.search
    $q.loadingBar.setDefaults({
      color: 'green',
      size: '3px',
      position: 'top'
    })
    $q.loading.show({
        delay: 400
    })
    function filter (val, update) {
      if (options.value === null) {
        // load data
        setTimeout(() => {
          options.value = stringOptions
          search.value.filter('')
        }, 2000)
        update()
        return
      }

      if (val === '') {
        update(() => {
          filteredOptions.value = options.value.map(op => ({ label: op }))
        })
        return
      }

      update(() => {
        filteredOptions.value = [
          {
            label: val,
            type: 'In this repository'
          },
          {
            label: val,
            type: 'All GitHub'
          },
          ...options.value
            .filter(op => op.toLowerCase().includes(val.toLowerCase()))
            .map(op => ({ label: op }))
        ]
      })
    }
    
     $q.loading.hide()
    
    return {
      fabGithub,
      text,
      options,
      filteredOptions,
      search,

      filter
    }
  },
    watch: {
        $route: {
            immediate: true,
            handler(to, from) {
                document.title = to.meta.title || 'ClashOJ';
            }
        },
    }
}
</script>

<style>
    .q-header{
        position: fixed;
        top: 0;
    }
    .clashoj_body{
      padding: 1em;
    }
    .route_link {
      text-decoration: none;
      color: var(--q-dark);
    }
    .route_link:hover {
      color: var(--q-primary);
    }
</style>

<style lang="sass">
.GL
  &__select-GL__menu-link
    .default-type
      visibility: hidden

    &:hover
      background: #0366d6
      color: white
      .q-item__section--side
        color: white
      .default-type
        visibility: visible

  &__toolbar-link
    a
      color: white
      text-decoration: none
      &:hover
        opacity: 0.7

  &__menu-link:hover
    background: #0366d6
    color: white

  &__menu-link-signed-in,
  &__menu-link-status
    &:hover
      & > div
        background: white !important

  &__menu-link-status
    color: $blue-grey-6
    &:hover
      color: $light-blue-9

  &__toolbar-select.q-field--focused
    width: 450px !important
    .q-field__append
      display: none
</style>