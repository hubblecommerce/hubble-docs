// const glob = require('glob');
// let componentMarkdownFiles = glob.sync('docs/components/generated/**/*.md').map(f => f.replace('docs/components/', ''));

module.exports = {
    title: 'hubble Documentation',
    description: 'Documentation',
    head: [
        ['link', { rel: 'icon', href: '/assets/images/apple-icon-57x57.png' }]
    ],
    themeConfig: {
        logo: '/assets/images/hubblelogo.svg',
        logoDark: '/assets/images/hubblelogo-bright.svg',
        navbar: [
            { text: 'PWA', link: '/pwa/architecture' },
            { text: 'Components', link: '/components/' },
            { text: 'Demo', link: 'https://demo.hubblecommerce.io/' },
            { text: 'Website', link: 'https://www.hubblecommerce.io/' },
            { text: 'Github', link: 'https://github.com/hubblecommerce/hubble-frontend-pwa' },
        ],
        sidebar: {
            '/pwa/': [
                {
                    text: 'Architecture',
                    link: '/pwa/architecture',
                    children: [
                        '/pwa/architecture/filebasedinheritance',
                        '/pwa/architecture/routing',
                        '/pwa/architecture/preinstalledmodules',
                        '/pwa/architecture/usersession',
                    ]
                },
                {
                    text: 'Configuration',
                    link: '/pwa/configuration',
                    collapsable: false,
                },
                {
                    text: 'Theme',
                    link: '/pwa/theme',
                    collapsable: false,
                },
                {
                    text: 'Shopware 6',
                    link: '/pwa/shopware',
                    children: [
                        '/pwa/shopware/shopwareplugins',
                        '/pwa/shopware/shopwareemotion',
                    ]
                },
                {
                    text: 'How Tos',
                    link: '/pwa/howtos/',
                    collapsable: false,
                    children: [

                    ]
                },
                {
                    text: 'Contribution',
                    link: '/pwa/contribution/contributionpwa',
                    collapsable: false,
                    children: [
                        '/pwa/contribution/contributionpwa',
                        '/pwa/contribution/codinguidelines'
                    ]
                }
            ]
        },
    },
    extendsMarkdown: md => {
        md.use(require('markdown-it-task-lists'))
    },
    markdown: {
        lineNumbers: true
    }
};

