//--- 1. IMPORT WEBPACK PLUGINS
                                // Generates HTML5, and can use hashes in filename
const HtmlWebpackPlugin = require('html-webpack-plugin');
                                // Copies file and folders to build folder
const CopyWebpackPlugin = require('copy-webpack-plugin');

//--- 2. CREATE OBJECT TO BE READ BY WEBPACK
                            // Basically everything inside { } is used by Webpack
module.exports = {

//--- 3. LANE MODE
        mode: 'development',// Use 'production' for Production Lane
//--- 4. ENTRY POINT        
                            // Tells Webpack to begin build bundles with './src/main.ts`
                            // This is the simplest entry point with exactly 1 page.
        entry: './src/main.ts',
                            // After simplest entry comes an Array of entries for multiple pages. Example:
                            // entry: ['main.ts','entry2.ts', 'entry3.js']
                            // The more robust and scalable is Object of entries
                            // entry: {
                            //      entry1: 'main.ts',
                            //        entry2: {
                            //            dependOn: 'main.ts',
                            //            import: 'file1.js'
                            //        }
                            // }
//--- 5. OUTPUT
                            // Tells Webpack to output the bundles to '~/dist'
        output: {
                            // Specifying the folder '~/dist`
            path: __dirname + '/dist',
                            // Specifying the output file '~/dist/app.js`
            filename: 'app.js',
                            // A more advanced ouput dealing with multiple files and hashes
                            // Example where [name] makes automatic reference to Step 4 entry names.
                            // and [fullhash] generates an automatic hash. Both part of Webpack features.
                            // output: {
                            //    filename: '[name].js',
                            //    path: __dirname + '/dist/[fullhash]',
                            //  },
                            //
            clean: true     // Remove all output path files ('/dist') before a new build
        },
//--- 6. SETUP PLUGINS

        plugins: [
                            // Copy Assets .CSS .PNG to ouput specified in 5. 
                            // Copy '~/src/assets` to '~/dist/assets'
            new CopyWebpackPlugin({
                patterns: [
                    { from: 'src/assets', to: 'assets' }
                ]
            }),
                            // This will use information from 5. to: 
            new HtmlWebpackPlugin({
                            // to generate an 'dest/index.html' from template 'src/index.html'
                template: __dirname + '/src/index.html',
                            // and to inject (add) 'app.js' in the generated 'index.html'
                            // exactly in the <head> tag with the following:
                            // <script src="app.js"></script>
                inject: 'head'
            } )
        ]
                            // --- Webpack Object Ends ---
}