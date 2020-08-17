<template>
    <div :style="backgroundStyles" class="imageComponentBox">
        <img :src="src" :alt="alt">
    </div>

</template>

<script>
    export default {
        name: 'ImageComponent',

        props: {
            src: {
                type: String,
                default: ''
            },
            alt: {
                type: String,
                default: 'concept visualization'
            },
            backgroundColor: {
                type: String,
                default: ''
            },
            padding: {
                type: String,
                default: ''
            }
        },

        computed: {
            backgroundStyles() {
                return {
                    padding: this.padding,
                    background: this.backgroundColor,
                    display: 'flex',
                    justifyContent: 'center'
                };
            }
        }
    }
</script>
