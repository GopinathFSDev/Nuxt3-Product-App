<template>
    <v-container>
        <v-card>
            <v-card-title>Product List</v-card-title>
                <v-data-table
                    :headers="headers"
                    :items="products"
                    item-value="id"
                    class="elevation-1"
                >
                    <template #item.actions="{ item }">
                        <v-btn icon @click="editProduct(item)">
                            <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                        <v-btn icon @click="deleteProduct(item.id)">
                            <v-icon color="red">mdi-delete</v-icon>
                        </v-btn>
                    </template>
                </v-data-table>
            </v-card>
            <EditDialog :product="selectedProduct" @save="updateProduct" />
    </v-container>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useHead } from '@vueuse/head'
import EditDialog from '~/components/editDialogue.vue'

export default {
components: { EditDialog },
setup() {
    useHead({
      title: 'Product List'
    })
    const headers = [
        { title: 'Name', value: 'name' },
        { title: 'Price', value: 'price' },
        { title: 'Quantity', value: 'quantity' },
        { title: 'Total Amount', value: 'total_amount' },
        { title: 'Created At', value: 'created_at' },
        { title: 'Updated At', value: 'updated_at' },
        { title: 'Actions', value: 'actions', sortable: false },
    ]
    const products = ref([])
    const selectedProduct = ref(null)

    const fetchProducts = async () => {
        const { data } = await useNuxtApp().$axios.get('/id');
        products.value = data;
    }

    const editProduct = (product) => {
        selectedProduct.value = { ...product }
    }

    const updateProduct = async (updatedProduct) => {
        try {
            await useNuxtApp().$axios.put(`/id/${updatedProduct.id}`, updatedProduct)
            fetchProducts();
        } catch (error) {
            console.error('Error updating product:', error)
        }
    }

    const deleteProduct = async (id) => {
        try {
            await useNuxtApp().$axios.delete(`/id/${id}`)
            fetchProducts();
        } catch (error) {
            console.error('Error deleting product:', error)
        }
    }

    onMounted(fetchProducts)

    return {
        headers,
        products,
        selectedProduct,
        editProduct,
        deleteProduct,
        updateProduct,
    }
},
}
</script>
