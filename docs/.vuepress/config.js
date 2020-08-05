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
            { text: 'Getting Started', link: '/gettingstarted/' },
            { text: 'PWA', link: '/pwa/' },
            { text: 'API', link: '/api/' },
            { text: 'Component Library', link: '/components/' },
            { text: 'Demo', link: 'https://demo.hubblecommerce.io/' },
            { text: 'Website', link: 'https://www.hubblecommerce.io/' },
            { text: 'Github', link: 'https://github.com/hubblecommerce/hubble-frontend-pwa' },
        ],
        sidebar: {
            '/gettingstarted/': [
                {
                    title: 'Einführung',   // required
                    path: '/gettingstarted/',
                    collapsable: false, // optional, defaults to true
                    children: [
                         // 'gettingstarted/introduction',
                        'architectureandbigpicture',
                        'setupinstallation',
                        'techstack',
                        'systemrequirements',
                    ]
                },
                {
                    title: 'Beispiel Projekte / Boilerplate',   // required
                    path: '/gettingstarted/exampleprojectsboilerplate/shopware6',
                    collapsable: false, // optional, defaults to true
                    children: [
                        'exampleprojectsboilerplate/shopware6',
                        'exampleprojectsboilerplate/magento2',
                        'exampleprojectsboilerplate/anybackend'
                    ]
                },
            ],
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
                    title: 'Design Prinzipien',   // required
                    path: '/pwa/designprinciples',
                    collapsable: false, // optional, defaults to true
                },
                {
                    title: 'Features',   // required
                    path: '/pwa/features',
                    collapsable: false, // optional, defaults to true
                },
                {
                    title: 'Konfiguration',   // required
                    path: '/pwa/configuration',
                    collapsable: false, // optional, defaults to true
                },
                {
                    title: 'Architektur und Data Flow',   // required
                    path: '/pwa/architectureanddataflow/routingurlhandling',
                    collapsable: false, // optional, defaults to true,
                    children: [
                        'architectureanddataflow/routingurlhandling',
                        'architectureanddataflow/sessions',
                        'architectureanddataflow/cookies',
                        'architectureanddataflow/state',
                        'architectureanddataflow/serviceworkerandmanifest',
                        'architectureanddataflow/personalizedcontent',
                        'architectureanddataflow/caching',
                        'architectureanddataflow/prefetching',
                        'architectureanddataflow/lazyloading',
                        'architectureanddataflow/backendintegration',
                        'architectureanddataflow/layouts',
                    ]
                },
                {
                    title: 'Templating',   // required
                    path: '/pwa/templating/introduction',
                    collapsable: false, // optional, defaults to true
                    children: [
                        'templating/introduction',
                        'templating/ui'
                    ]
                },
                {
                    title: 'Page Types',   // required
                    path: '/pwa/pagetypes/',
                    collapsable: false, // optional, defaults to true
                    children: [
                        'pagetypes/navigation',
                        'pagetypes/catalogcategory',
                        'pagetypes/search',
                        'pagetypes/productdetailpage',
                        'pagetypes/cmspage'
                    ]
                },
                {
                    title: 'Komponenten',   // required
                    path: '/pwa/components',
                    collapsable: false, // optional, defaults to true
                },
                {
                    title: 'Internationalisierung',   // required
                    path: '/pwa/internationalization',
                    collapsable: false, // optional, defaults to true
                },
                {
                    title: 'Performance',   // required
                    path: '/pwa/performance/introduction',
                    collapsable: false, // optional, defaults to true
                    children: [
                        'performance/introduction',
                        'performance/generalrequirements',
                        'performance/lighthouseauditing',
                        'performance/firebaseperformancemonitoring'
                    ]
                },
                {
                    title: 'Payments',   // required
                    path: '/pwa/payments/introduction',
                    collapsable: false, // optional, defaults to true
                    children: [
                        'payments/introduction',
                        'payments/paymentsapi',
                        'payments/paymentsplugins'
                    ]
                },
                {
                    title: 'Analytics',   // required
                    path: '/pwa/analytics',
                    collapsable: false, // optional, defaults to true
                },
                {
                    title: 'Plugin System',   // required
                    path: '/pwa/pluginsystem',
                    collapsable: false, // optional, defaults to true
                },
                {
                    title: 'Testing',   // required
                    path: '/pwa/testdrivendevelopment',
                    collapsable: false, // optional, defaults to true
                },
                {
                    title: 'Error Handling',   // required
                    path: '/pwa/errorhandling',
                    collapsable: false, // optional, defaults to true
                },
                {
                    title: 'Debugging',   // required
                    path: '/pwa/debugging',
                    collapsable: false, // optional, defaults to true
                },
                {
                    title: 'Logging',   // required
                    path: '/pwa/logging',
                    collapsable: false, // optional, defaults to true
                },
                {
                    title: 'Deployment',   // required
                    path: '/pwa/deployment',
                    collapsable: false, // optional, defaults to true
                },
                {
                    title: 'Backends',   // required
                    path: '/pwa/backends/shopware6',
                    collapsable: false, // optional, defaults to true
                    children: [
                        'backends/shopware6',
                        'backends/magento2',
                        'backends/hubbleDataApi'
                    ]
                },
                {
                    title: 'Miscellaneous Duties',   // required
                    path: '/pwa/miscellaneousduties/optimizingimages',
                    collapsable: false, // optional, defaults to true
                    children: [
                        'miscellaneousduties/optimizingimages'
                    ]
                },
                {
                    title: 'Troubleshooting',   // required
                    path: '/pwa/troubleshooting',
                    collapsable: false, // optional, defaults to true
                },
                {
                    title: 'How Tos',   // required
                    path: '/pwa/howtos/',
                    collapsable: false, // optional, defaults to true
                    children: [
                        'howtos/addinganewfeature',
                        'howtos/addingapage',
                        'howtos/loadingcontentfromlegacy',
                        'howtos/twatogoogleplaystore'
                    ]
                },
                {
                    title: 'API Reference',   // required
                    path: '/pwa/apireference',
                    collapsable: false, // optional, defaults to true
                },
                {
                    title: 'hubble Module',   // required
                    collapsable: false, // optional, defaults to true
                    children: [
                        'sw6Quickstart'
                    ]
                }
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

