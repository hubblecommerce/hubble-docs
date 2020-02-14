module.exports = {
    title: 'hubble Documentation',
    //base:
    description: 'hubble Documentation',
    head: [
        ['link', { rel: 'icon', href: '/assets/images/apple-icon-57x57.png' }]
    ],
    themeConfig: {
        logo: '/assets/images/hubble-logo.png',
        nav: [
            { text: 'PWA', link: '/PWA/' },
            { text: 'API', link: '/API/' },
            { text: 'Component Library', link: '/Components/' },
            { text: 'Demo', link: 'https://demo.hubblecommerce.io/' },
            { text: 'Website', link: 'https://www.hubblecommerce.io/' },
            { text: 'Github', link: 'https://github.com/hubblecommerce/hubble-frontend-pwa' },
        ],
        sidebar: {
            '/API/': [
                {
                    title: 'API',   // required
                    collapsable: false, // optional, defaults to true
                    children: [
                        ['', 'Overview'],
                        'endpoints',
                        'requestflow',
                        'crudupdate'
                    ]
                },
                {
                    title: 'JSON Request - Responses',   // required
                    path: '/API/API_Request_Response/',
                    collapsable: true, // optional, defaults to true
                    children: [
                        'API_Request_Response/ApplyCoupon',
                        'API_Request_Response/CustomerAddressesDelete',
                        'API_Request_Response/CustomerAddressesGet',
                        'API_Request_Response/CustomerAddressesPost',
                        'API_Request_Response/CustomerAddressesPut',
                        'API_Request_Response/CustomerLogin',
                        'API_Request_Response/CustomerLogout',
                        'API_Request_Response/CustomerRegister',
                        'API_Request_Response/OrdersGet',
                        'API_Request_Response/GetPayments',
                        'API_Request_Response/GetShipping',
                        'API_Request_Response/PostForm',
                        'API_Request_Response/PostFormRecaptcha',
                        'API_Request_Response/RecalculateCart',
                        'API_Request_Response/OrderStore',
                    ]
                },
            ],
            '/PWA/': [
                {
                    title: 'hubble Module',   // required
                    collapsable: false, // optional, defaults to true
                    children: [
                        'sw6Qickstart',
                        '',
                        'stores',
                        'middlewares',
                        'plugins',
                        'assets'
                    ]
                },
                {
                    title: 'Layouts',   // required
                    collapsable: false, // optional, defaults to true
                    children: [
                        'hubbleLayout',
                        'hubbleLightLayout',
                        'hubbleExpressLayout',
                    ]
                },
                {
                    title: 'Middleware',   // required
                    collapsable: false, // optional, defaults to true
                    children: [
                        'middlewareInGeneral'
                    ]
                },
                {
                    title: 'Vuex',   // required
                    collapsable: false, // optional, defaults to true
                    children: [
                        'vuexInGeneral'
                    ]
                },
                {
                    title: 'Pages',   // required
                    collapsable: false, // optional, defaults to true
                    children: [
                        'checkout'
                    ]
                },
                {
                    title: 'Payment Modules',   // required
                    collapsable: false, // optional, defaults to true
                    children: [
                        'payone',
                        'amazonPay'
                    ]
                },
            ],
            '/Components/': [
                {
                    title: 'Basic Components',   // required
                    collapsable: false, // optional, defaults to true
                    children: [
                    ]
                },
                {
                    title: 'Customer Components',   // required
                    collapsable: false, // optional, defaults to true
                    children: [
                        'RegisterForm',
                        'LoginForm',
                        'CustomerAddresses',
                    ]
                },
                {
                    title: 'Checkout Components',   // required
                    collapsable: false, // optional, defaults to true
                    children: [
                        'CartItemsList',
                        'CartItemsListNonInteractive',
                        'Coupons',
                        'OrderComment',
                        'OrderDetail',
                        'PaymentMethods',
                        'ShippingMethods',
                        'Totals',
                    ]
                },
                {
                    title: 'Payment Components',   // required
                    collapsable: false, // optional, defaults to true
                    children: [
                        'AmazonPayButton',
                    ]
                }
            ],
        },
    },
    markdown: {
        lineNumbers: true
    }
};

