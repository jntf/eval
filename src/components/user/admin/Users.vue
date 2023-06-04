<template>
    <table class="table-auto w-full">
        <thead>
            <tr>
                <td>Nom</td>
                <td>Prenom</td>
                <td>Email</td>
                <td>Admin</td>
                <td>Action</td>
            </tr>
        </thead>
        <tbody>
            <tr v-for="user in users" :key="user.id">
                <td>{{ user.name }}</td>
                <td>{{ user.family_name }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.isAdminCompany ? "Oui": "Non" }}</td>
                <td>
                    <!-- Ici, vous pouvez ajouter des boutons pour effectuer des actions sur l'utilisateur (modifier, supprimer, etc.) -->
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import { ref, onMounted } from 'vue';
import { API, graphqlOperation } from 'aws-amplify';
import { useUserStore } from "../../../stores/userStore";
import { listUsers } from '../../../graphql/queries';

export default {
    setup() {
        const userStore = useUserStore();
        const users = ref([]);
        const company = ref(null);
        const companyId = userStore.companyId;

        const fetchUsers = async (companyId) => {
            try {
                const usersData = await API.graphql({
                    query: listUsers,
                    variables: {
                        filter: {
                            companyId: {
                                eq: companyId,
                            },
                        },
                    },
                    authMode: 'AMAZON_COGNITO_USER_POOLS'
                });

                users.value = usersData.data.listUsers.items;
            } catch (error) {
                console.error('Error fetching users', error);
                console.log(error.errors)
            }
        };


        onMounted(() => {
            fetchUsers();
        });

        return { users, company };
    },
};
</script>

