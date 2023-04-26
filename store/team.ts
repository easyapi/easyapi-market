import { defineStore } from 'pinia'
import { account } from '@/api/account'
import { userStore } from '@/store/user'

export const teamStore = defineStore('team', {
  state() {
    return {
      teamList: '',
    }
  },

  actions: {
    /**
     * 获取团队信息
     */
    getTeamList() {
      account.getUserTeamList()
        .then((res) => {
          this.teamList = res.content
        })
        .catch((error) => {
          console.error(error)
        })
    },
    /**
     * 切换团队
     */
    changeTeam(id: any) {
      account.changeTeam(id)
        .then((res) => {
          if (res.code === 1)
            userStore().getUser()
        })
        .catch((error) => {
          console.error(error)
        })
    },
  },
})
