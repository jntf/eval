import { defineStore } from "pinia";
import { Auth, API } from "aws-amplify";
import { useRouter } from "vue-router";
import { getUser as getUserQuery } from "../graphql/queries";

export const useUserStore = defineStore({
  id: "user",

  state: () => ({
    id: null,
    companyId: null,
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
    isActiveUser: (state) => state.isActiveCognito,
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

          let companyId = null;

          if (roles.includes("Admin") && !roles.includes("SuperAdmin")) {
            const userData = await API.graphql({
              query: getUserQuery,
              variables: { id: attributes.sub },
              authMode: "AMAZON_COGNITO_USER_POOLS",
            });
            companyId = userData.data.getUser.companyId;
          }

          this.setUserData({
            id: attributes.sub,
            companyId: companyId ?? null,
            name: attributes.name,
            family_name: attributes.family_name,
            email: attributes.email,
            phone_number: attributes.phone_number,
            roles: roles,
            isActiveCognito: attributes["custom:isActive"],
            fixedFees: attributes["custom:fixedFees"],
            frevo: attributes["custom:frevo"],
            margin: attributes["custom:margin"],
            marginType: attributes["custom:marginType"],
          });
          this.router = router;
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        console.log(error.errors);
      }
    },

    setUserData(data) {
      Object.assign(this, data);
    },

    clearUserData() {
      this.id = null;
      this.companyId = null;
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
