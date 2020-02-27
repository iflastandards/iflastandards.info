#! /bin/sh

# A useful script to download the latest version of bootstrap and jquery

rm -rf node_modules package-lock.json
npm install

rm -rf _sass/bootstrap
mkdir -p _sass/bootstrap
cp -r node_modules/bootstrap/scss/* _sass/bootstrap
touch _sass/bootstrap/__DO_NOT_MODIFY

rm -rf assets/css
mkdir -p assets/css
mkdir -p assets/css/prettify
mkdir -p assets/css/prettify/styles
cp -r node_modules/datatables.net-bs4/css/dataTables.bootstrap4.min.css assets/css/
cp -r node_modules/datatables.net-dt/css/jquery.dataTables.min.css assets/css/
cp -r node_modules/protip/protip.min.css assets/css/
cp node_modules/code-prettify/src/*.css assets/css/prettify/
cp node_modules/code-prettify/styles/*.css assets/css/prettify/styles/

yes | cp -rf node_modules/datatables.net-dt/images/*.png assets/images/

rm -rf assets/font-awesome
mkdir -p assets/font-awesome
cp -r node_modules/font-awesome assets/

rm -rf assets/javascript/bootstrap
mkdir -p assets/javascript/bootstrap
cp node_modules/bootstrap/dist/js/bootstrap.bundle.min.* assets/javascript/bootstrap/
cp node_modules/jquery/dist/jquery.min.* assets/javascript/bootstrap/
cp node_modules/popper.js/dist/popper.min.* assets/javascript/bootstrap/
cp node_modules/popper.js/dist/popper-utils.min.* assets/javascript/bootstrap/
touch assets/javascript/bootstrap/__DO_NOT_MODIFY

rm -rf assets/javascript/plugins
mkdir -p assets/javascript/plugins
mkdir -p assets/javascript/prettify
cp node_modules/datatables.net-bs4/js/dataTables.bootstrap4.min.js assets/javascript/plugins/
cp node_modules/datatables.net-dt/js/dataTables.dataTables.min.js assets/javascript/plugins/
cp node_modules/datatables.net/js/jquery.dataTables.min.js assets/javascript/plugins/
cp node_modules/protip/protip.min.js assets/javascript/plugins/
cp node_modules/code-prettify/src/*.js assets/javascript/prettify/
touch assets/javascript/plugins/__DO_NOT_MODIFY
