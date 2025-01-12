<template>
    <v-dialog v-model="dialog" persistent max-width="600">
        <v-card>
            <v-card-title>Edit Product</v-card-title>
            <v-card-text>
                <v-text-field
                    v-model="product.name"
                    label="Name"
                    required
                ></v-text-field>
                <v-text-field
                    v-model="product.price"
                    label="Price"
                    type="number"
                    required
                ></v-text-field>
                <v-text-field
                    v-model="product.quantity"
                    label="Quantity"
                    type="number"
                    required
                ></v-text-field>
            </v-card-text>
            <v-card-actions>
                <v-btn color="blue darken-1" text @click="save()">Save</v-btn>
                <v-btn color="red darken-1" text @click="close()">Cancel</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import { ref, watch } from 'vue'

export default {
    props: {
        product: Object,
    },
    emits: ['save'],
    setup(props, { emit }) {
        const dialog = ref(false)

        watch(() => props.product,
            (newProduct) => {
                if (newProduct) {
                    dialog.value = true
                }
            }
        )

        const save = () => {
            emit('save', props.product)
            dialog.value = false
        }

        const close = () => {
            dialog.value = false
        }

        return { dialog, save, close }
    },
}
</script>
