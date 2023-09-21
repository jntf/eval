module.exports = {
    src_folders: ['tests/e2e/specs'],
    output_folder: 'tests/e2e/reports',
    custom_commands_path: '',
    custom_assertions_path: '',
    page_objects_path: 'tests/e2e/page-objects',
    globals_path: 'tests/e2e/globals.js',

    selenium: {
        start_process: true,
        server_path: require('selenium-server').path,
        host: '127.0.0.1',
        port: 4444,
        cli_args: {
            'webdriver.chrome.driver': require('chromedriver').path
        }
    },

    test_settings: {
        default: {
            desiredCapabilities: {
                browserName: 'chrome',
                chromeOptions: {
                    args: ['--headless', '--no-sandbox', '--disable-gpu', '--window-size=1920,1080']
                }
            }
        }
    }
};
