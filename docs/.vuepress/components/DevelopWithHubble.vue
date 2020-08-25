<template>
    <a :href="srcLink">
        <div class="developWithHubble">
            <div class="box--title">{{ title }}</div>
            <div class="box--content">
                <img src="../public/bgsmaller.svg" />
            </div>
        </div>
    </a>
</template>

<script>
    export default {
        name: "DevelopWithHubble",
        props: {
            title: {
                type: String
            },
            srcLink: {
                type: String,
                default: '#'
            },
        }
    }
</script>

<style scoped>
    .developWithHubble {
        height: 200px;
        position: relative;
    }

    a {
        border: 1px solid black;
        margin-bottom: 20px;
        transition: all 0.45s ease-in-out;
        overflow: hidden;
    }

    a:last-of-type {
        margin-bottom: initial;
    }

    a:hover {
        box-shadow: 10px 10px 40px rgba(0, 0, 0, 0.06);
    }

    .box--content {
        position: absolute;
        top: -70px;
    }

    .box--title {
        position: absolute;
        z-index: 5;
        padding-left: 40px;
    }

    img {
        max-width: 25%;
    }

    @media (min-width: 784px) {
        a {
            margin-left: 20px;
        }
    }
</style>