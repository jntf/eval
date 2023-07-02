<template>
    <div class="flex h-screen bg-gray-200">
        <!-- Sidebar / Navigation -->
        <div class="bg-gray-600 w-64 fixed pin-l h-full shadow">
            <div class="px-8">
                <a href="/adminpanel">
                    <h1 class="py-4 text-white text-2xl font-semibold">Admin Panel</h1>
                </a>
                <ul class="mt-6">
                    <router-link to="/users-list" class="text-white font-semibold py-2">Users</router-link>
                    <li class="text-white font-semibold py-2">Settings</li>
                    <router-link to="/home" class="text-white font-semibold py-2">Back to EvaluIA</router-link>
                </ul>
            </div>
        </div>
        <!-- Main content -->
        <div class="ml-64 bg-white p-4 h-full w-full overflow-scroll">
            <h2 class="text-gray-700 text-3xl font-semibold">Dashboard</h2>
            <div class='tableauPlaceholder max-h-screen' id='viz1687608872498' style='position: relative'><noscript><a href='#'><img
                            alt='Feuille 1 '
                            src='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;Mo&#47;MoyenneModleMarque&#47;Feuille1&#47;1_rss.png'
                            style='border: none' /></a></noscript><object class='tableauViz' style='display:none;'>
                    <param name='host_url' value='https%3A%2F%2Fpublic.tableau.com%2F' />
                    <param name='embed_code_version' value='3' />
                    <param name='site_root' value='' />
                    <param name='name' value='MoyenneModleMarque&#47;Feuille1' />
                    <param name='tabs' value='no' />
                    <param name='toolbar' value='yes' />
                    <param name='static_image'
                        value='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;Mo&#47;MoyenneModleMarque&#47;Feuille1&#47;1.png' />
                    <param name='animate_transition' value='yes' />
                    <param name='display_static_image' value='yes' />
                    <param name='display_spinner' value='yes' />
                    <param name='display_overlay' value='yes' />
                    <param name='display_count' value='yes' />
                    <param name='language' value='fr-FR' />
                    <param name='filter' value='publish=yes' />
                </object></div>
            <router-view></router-view>
        </div>
    </div>
</template>
  
<script>
import { ref, onBeforeMount, onMounted } from 'vue';
import { API } from 'aws-amplify';
import awsconfig from '../../aws-exports';

export default {
    setup() {
        API.configure(awsconfig);

        const users = ref([]);

        const fetchUsers = async () => {
            try {
                const response = await API.get('evaladminusers', import.meta.env.VITE_EVAL_ADMIN_RESOURCE, {
                    headers: {
                        "x-api-key": import.meta.env.VITE_EVAL_KEY,
                    },
                });
                users.value = JSON.parse(response.body);
            } catch (error) {
                console.error('An error occurred when trying to fetch users', error);
            }
        };

        onMounted(fetchUsers);

        onBeforeMount(() => {
            window.onload = function () {
                var divElement = document.getElementById('viz1687608872498');
                var vizElement = divElement.getElementsByTagName('object')[0];
                vizElement.style.width = '100%';
                vizElement.style.height = (divElement.offsetWidth * 0.75) + 'px';
                var scriptElement = document.createElement('script');
                scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';
                vizElement.parentNode.insertBefore(scriptElement, vizElement);
            };
        });

        return { users }
    }
}
</script>
