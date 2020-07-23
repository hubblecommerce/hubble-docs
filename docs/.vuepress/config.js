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
            { text: 'PWA', link: '/pwa/' },
            { text: 'API', link: '/api/' },
            { text: 'Component Library', link: '/components/' },
            { text: 'Demo', link: 'https://demo.hubblecommerce.io/' },
            { text: 'Website', link: 'https://www.hubblecommerce.io/' },
            { text: 'Github', link: 'https://github.com/hubblecommerce/hubble-frontend-pwa' },
        ],
        sidebar: {
            '/api/': [
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
            '/pwa/': [
                {
                    title: 'Einführung',   // required
                    collapsable: false, // optional, defaults to true
                    children: [
                        'einfuehrung/routing',
                        'einfuehrung/statemanagement',
                        'einfuehrung/layouts',
                        'einfuehrung/dynamicimports',
                        'einfuehrung/usersession',
                        'einfuehrung/configuration',
                        'einfuehrung/pagetypes',
                    ]
                },
                {
                    title: 'hubble Module',   // required
                    collapsable: false, // optional, defaults to true
                    children: [
                        'sw6Quickstart',
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
                        'layouts/hubbleLayout',
                        'layouts/hubbleLightLayout',
                        'layouts/hubbleExpressLayout',
                    ]
                },
                {
                    title: 'Middleware',   // required
                    collapsable: false, // optional, defaults to true
                    children: [
                        'middleware/middlewareInGeneral'
                    ]
                },
                {
                    title: 'Vuex',   // required
                    collapsable: false, // optional, defaults to true
                    children: [
                        'vuex/vuexInGeneral'
                    ]
                },
                {
                    title: 'Pages',   // required
                    collapsable: false, // optional, defaults to true
                    children: [
                        'pages/checkout',
                        'pages/customer',
                    ]
                },
                {
                    title: 'Payment Modules',   // required
                    collapsable: false, // optional, defaults to true
                    children: [
                        'paymentModules/payone',
                        'paymentModules/amazonPay'
                    ]
                },
                {
                    title: 'Testing',   // required
                    collapsable: false, // optional, defaults to true
                    children: [
                        'testing/',
                    ]
                },
            ],
            '/components/': [
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
                        'customerComponents/RegisterForm',
                        'customerComponents/LoginForm',
                        'customerComponents/CustomerAccountNavigation',
                        'customerComponents/CustomerAddresses',
                        'customerComponents/CustomerOrderList',
                        'customerComponents/CustomerPasswordChange'
                    ]
                },
                {
                    title: 'Checkout Components',   // required
                    collapsable: false, // optional, defaults to true
                    children: [
                        'checkoutComponents/CartItemsList',
                        'checkoutComponents/CartItemsListNonInteractive',
                        'checkoutComponents/Coupons',
                        'checkoutComponents/OrderComment',
                        'checkoutComponents/OrderDetail',
                        'checkoutComponents/PaymentMethods',
                        'checkoutComponents/ShippingMethods',
                        'checkoutComponents/Totals',
                    ]
                },
                {
                    title: 'Payment Components',   // required
                    collapsable: false, // optional, defaults to true
                    children: [
                        'paymentComponents/AmazonPayButton',
                    ]
                }
            ],
        },
    },
    markdown: {
        lineNumbers: true
    }
};

