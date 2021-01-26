<template>
<div>
    <h2 class="page-title">
        <span>Data Inputs</span>
    </h2>

    <b-row style="padding-top: 20px">
        <b-col cols="2"></b-col>
        
        <b-col cols="8">
            <table style="width: 100%; align: center;">
                <thead>
                    <tr>
                        <th style="width: 60%">Type</th>
                        <th style="width: 10%">Inputs</th>
                        <th style="width: 10%">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <a href="#">Forwarded inputs</a>
                            <p>Forwarded inputs</p>
                        </td>
                        <td>39</td>
                        <td>
                            <b-button size="sm" style="min-width: 90px" variant="default">+Add new</b-button>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <a href="/setting/data/inputs/tcp">TCP</a>
                            <p>Listen on a TCP port for incoming data, e.g syslog.</p>
                        </td>
                        <td>39</td>
                        <td>
                            <b-button size="sm" style="min-width: 90px" variant="default" href="/setting/data/inputs/new_tcp_udp">+Add new</b-button>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <a href="/setting/data/inputs/udp">UDP</a>
                            <p>Listen on a UDP port for incoming data, e.g syslog.</p>
                        </td>
                        <td>39</td>
                        <td>
                            <b-button size="sm" style="min-width: 90px" variant="default" href="/setting/data/inputs/new_tcp_udp">+Add new</b-button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </b-col>

        <b-col cols="2"></b-col>
    </b-row>
</div>
</template>

<script>
export default {
    name: "Tables",
    components: {},
    data() {
        return {};
    },
};
</script>
