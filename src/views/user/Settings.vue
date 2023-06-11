<template>
    <div class="container mx-auto px-4 py-10">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <!-- Reprises -->
            <div class="bg-indigo-50 shadow-lg border-gray-700 rounded px-8 pt-6 pb-8 mb-4 w-full max-w-3xl mx-auto">
                <Reprise />
            </div>
            <!-- Users Admin -->
            <div
                class="col-span-2 bg-indigo-50 shadow-lg border-gray-700 rounded px-8 pt-6 pb-8 mb-4 w-full max-w-3xl mx-auto">
                <CreateUser />
                <UsersAdminList />
            </div>
        </div>

    </div>
</template>
  
  
<script>
import UsersAdminList from "../../components/user/admin/Users.vue"
import Reprise from "../../components/user/admin/Reprise.vue"
import CreateUser from "../../components/user/admin/CreateUser.vue";

export default {
    components: {
        UsersAdminList,
        Reprise,
        CreateUser
    },
};
</script>