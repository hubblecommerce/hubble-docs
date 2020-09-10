const glob = require('glob');
let componentMarkdownFiles = glob.sync('docs/components/generated/**/*.md').map(f => f.replace('docs/components/', ''));

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
                        'setupinstallationSW6',
                        'setupinstallationHubbleDataAPI',
                        'techstack',
                        'contribution',
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
                        'architectureanddataflow/dataflow',
                        'architectureanddataflow/sessions',
                        'architectureanddataflow/cookies',
                        'architectureanddataflow/state',
                        'architectureanddataflow/serviceworkerandmanifest',
                        'architectureanddataflow/caching',
                        'architectureanddataflow/prefetching',
                        'architectureanddataflow/dynamicimports',
                        'architectureanddataflow/lazyloading',
                        'architectureanddataflow/layouts',
                    ]
                },
                {
                    title: 'Templating',   // required
                    path: '/pwa/templating/introduction',
                    collapsable: false, // optional, defaults to true
                    children: [
                        'templating/introduction'
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
                    title: 'Internationalisierung',   // required
                    path: '/pwa/internationalization',
                    collapsable: false, // optional, defaults to true
                },
                {
                    title: 'SEO',   // required
                    path: '/pwa/seo',
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
                    path: '/pwa/backends/',
                    collapsable: false, // optional, defaults to true
                    children: [
                        'backends/shopware6',
                        'backends/magento2',
                        'backends/hubbleDataApi'
                    ]
                },
                {
                    title: 'How Tos',   // required
                    path: '/pwa/howtos/',
                    collapsable: false, // optional, defaults to true
                    children: [
                        'howtos/addinganewfeature',
                        'howtos/addingapage',
                        'howtos/overridemiddleware',
                        'howtos/overridestore',
                    ]
                },
                {
                    title: 'API Reference',   // required
                    path: '/pwa/apireference',
                    collapsable: false, // optional, defaults to true
                }
            ],
            '/components/': [
                {
                    title: 'Component Library',   // required
                    collapsable: false, // optional, defaults to true
                    children: componentMarkdownFiles
                }
            ],
        },
    },
    markdown: {
        lineNumbers: true
    }
};

