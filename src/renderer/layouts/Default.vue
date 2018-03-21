<template>
    <div class="layout-content">
        <div class="columns is-gapless">
            <div class="column is-multiline featured-column">
                <header class="column">
                    <featured :message="lastMessage" v-if="lastMessage" @blink="playAudio"></featured>
                </header>
                <footer class="column columns">
                    <div class="column is-2" id="brasao">
                        <img src="static/images/logo.png">
                    </div>
                    <div class="column is-10" id="noticia">
                      <h2 id="nomeNoticia">CARREGANDO NOTÍCIAS...</h2>
                      <h1 id="tituloNoticia"></h1>
                    </div>
                </footer>
            </div>
            <div class="column is-one-quarter history-column">
                <div>
                    <h2 class="title">
                        {{ 'history.title'|translate }}
                    </h2>
                    <history :messages="messages" v-if="lastMessage"></history>

                    <clock locale="en"></clock>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Clock from '../components/Clock.vue'
    import Featured from '../components/Featured.vue'
    import History from '../components/History.vue'
    import audio from '../services/audio'

    export default {
        name: 'Default',
        components: {
            Clock,
            Featured,
            History
        },
        computed: {
            messages() {
                return this.$store.getters.history
            },
            lastMessage() {
                return this.$store.getters.message
            }
        },
        methods: {
            playAudio() {
                audio.playAlert(this.$store.state.config.alert)
            }
        }
    }
</script>

<style lang="sass">
    .layout-content
        position: fixed
        width: 100%
        height: 100%

        .columns
            height: 100%

    .clock
        position: fixed
        bottom: 4vh
        right: 3vw

        .time
            span
                font-size: 4vw

            span.hours
                font-weight: bold

            span.seconds
                font-style: italic

        .date
            text-align: right

            span
                font-size: 2vw
                font-weight: bold


    .featured-column
        header
            height: 80vh

        footer
            height: 20vh
            background-color: #aaf5d0
            padding: 2vh

            img
                width: 100%;

        .featured-message
            text-align: center

            .title
                font-size: 30vh
                font-weight: bold

            .subtitle
                font-size: 10vh

            .description
                font-size: 10vh

    .history-column
        background-color: #26704c
        height: 100vh

        >div
            padding: 4vh

        *
            color: #fff;

        .title
            text-align: center;
            font-weight: bold;

        .message
            background-color: transparent;

        .empty
            p
                font-style: italic
                text-align: center

        .history
            .message
                span
                    text-align: center
                    display: block

                .title
                    font-size: 8vh
                    font-weight: bold

                .subtitle
                    font-size: 4vh
                    font-style: italic
    #noticia
        color: #000;

        h1
          font-size: 180%;
          font-weight: bolder;
          text-transform: uppercase;
          background: #fff;
          color: #000;
          padding: 0 10px;
        h2
            font-size: 140%;
            font-weight: bold;
            background: #26704c;
            color: #fff;
            padding: 0 10px;
</style>
