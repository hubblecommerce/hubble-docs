<template>
    <div>
        <div class="wrapper">
            <div class="box--title">Getting Started</div>
            <div class="box--content">
                <div class="box--code">
                    <span class="bashTerminalSymbol">$</span>  <span>git</span> clone git@github.com:hubblecommerce/hubble-frontend-pwa.git
                </div>
            </div>
            <div class="box--link"><a href="../../gettingstarted/setupinstallationSW6.html">Quickstart</a></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'GettingStartedBox',

        props: {
            src: {
                type: String,
                default: ''
            }
        }
    }
</script>
<style>
    .wrapper {
        border: 1px solid black;
        transition: all 0.45s ease-in-out;
    }

    .wrapper:hover {
        box-shadow: 10px 10px 40px rgba(0, 0, 0, 0.06);
    }

    .wrapper .bashTerminalSymbol {
        color: deeppink;
        font-weight: bold;
    }

    .box--title {
        font-size: 25px;
        color: #010814;
        font-weight: bold;
        text-align: right;
        padding-right: 40px;
        padding-top: 40px;
        right: 0;
    }

    .box--content {
        display: flex;
        justify-content: center;
    }

    .box--code {
        text-align: center;
        padding: 20px;
        color: black;
        background: #dffffc;
        border: 1px solid #010814;
    }

    .box--code span {
        color: #01cd99;
    }

    .box--link {
        display: flex;
        justify-content: center;
        margin-bottom: 20px;
    }

    .box--link a {
        background: black;
        padding: 10px 30px;
        color: white;
        border: 1px solid black;
        transition: all 0.45s ease-in-out;
        text-decoration: none !important;
    }

    .box--link a:hover {
        background: white;
        color: black;
    }
</style>

<style scoped>
    .box--content {
        margin: 20px;
    }
</style>