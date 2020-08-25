<template>
    <a href="../../pwa/howtos">
        <div class="howtobox-wrp">
            <div class="box--title">How To Guides</div>
            <div class="box--content">
                <img src="" />
            </div>
        </div>
    </a>
</template>

<script>
    export default {
        name: 'GettingStartedBox',

        props: {
            src: {
                type: String,
                default: ''
            },
        }
    }
</script>
<style>
    .howtobox-wrp .box--content {
        display: flex;
        height: inherit;
        padding-top: 50px;
    }

    .box--content img {
        height: 450px;
    }
</style>

<style scoped>
    a {
        border: 1px solid black;
        transition: all 0.45s ease-in-out;
        margin: 0 auto;
        margin-bottom: 20px;
    }

    a:hover {
        box-shadow: 10px 10px 40px rgba(0, 0, 0, 0.06);
    }

    @media (min-width: 784px) {
        a {
            margin-bottom: initial;
            text-decoration: none !important;
        }
    }
</style>