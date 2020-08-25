<template>
    <div class="topicGrid--top">
        <GettingStartedBox></GettingStartedBox>
        <br>

    <div class="topicGrid--bottom">
        <HowTosBox></HowTosBox>
        <div class="topicGrid--bottom__right">
            <DevelopWithHubble
                    title="Entwickeln mit hubble"
                    src-link="../pwa/configuration.html#konfiguration-von-umgebungsvariablen"
            >
            </DevelopWithHubble>

            <DevelopWithHubble
                    title="hubble Data API"
                    src-link="../api"
            >
            </DevelopWithHubble>

            <DevelopWithHubble
                    title="Component Library"
                    src-link="../components"
            >
            </DevelopWithHubble>
        </div>
    </div>

    </div>
</template>

<script>
    import HowTosBox from "./HowTosBox";
    import GettingStartedBox from "./GettingStartedBox";
    import DevelopWithHubble from "./DevelopWithHubble";

    export default {
        name: "TopicGrid",
        components: {DevelopWithHubble, GettingStartedBox, HowTosBox}
    }
</script>

<style scoped>
    .topicGrid--bottom {
        display: flex;
        flex-wrap: wrap;
    }
    .topicGrid--bottom__right {
        display: flex;
        flex-direction: column;
        width: 100%;
    }

@media (min-width: 784px) {
    .topicGrid--bottom {
        flex-wrap: nowrap;
    }
    .topicGrid--bottom__right {
        width: 45%;
    }
}
</style>