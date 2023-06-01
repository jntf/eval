import { defineStore } from "pinia";
import { Auth } from "aws-amplify";
import { useRouter } from "vue-router";

export const useUserStore = defineStore({
  id: "user",

  state: () => ({
    id: null,
    name: null,
    family_name: null,
    roles: null,
    email: null,
    phone_number: null,
    isActive: null,
    fixedFees: null,
    frevo: null,
    margin: null,
    marginType: null,
  }),

  getters: {
    isLoggedIn: (state) => !!state.id,
    isSuperAdmin: (state) => state.roles?.includes("SuperAdmin"),
    isAdmin: (state) => state.roles?.includes("Admin"),
    isActiveUser: (state) => state.isActive
  },

  actions: {
    async fetchUserData(router) {
      try {
        const currentUser = await Auth.currentAuthenticatedUser();

        if (currentUser) {
          const { attributes } = currentUser;
          const roles =
            currentUser.signInUserSession?.accessToken?.payload?.[
              "cognito:groups"
            ] ?? "";

          this.setUserData({
            id: attributes.sub,
            name: attributes.name,
            family_name: attributes.family_name,
            email: attributes.email,
            phone_number: attributes.phone_number,
            roles: roles,
            isActive: attributes["custom:isActive"],
            fixedFees: attributes["custom:fixedFees"],
            frevo: attributes["custom:frevo"],
            margin: attributes["custom:margin"],
            marginType: attributes["custom:marginType"],
          });
          this.router = router;
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    },

    setUserData(data) {
      Object.assign(this, data);
    },

    clearUserData() {
      this.id = null;
      this.name = null;
      this.family_name = null;
      this.roles = null;
      this.email = null;
      this.phone_number = null;
      this.isActive = null;
      this.fixedFees = null;
      this.frevo = null;
      this.margin = null;
      this.marginType = null;
    },

    async signOut() {
      try {
        await Auth.signOut();
        this.clearUserData();
        this.router.push({ path: "/" });
      } catch (error) {
        console.error("Error signing out:", error);
      }
    },
  },
});
