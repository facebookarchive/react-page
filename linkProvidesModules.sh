# export NODE_PATH="${PWD}/node_modules/"
# Build directory:

# Bails out of regex matching after first match, usually at the top of the file,
# for efficiency (true?)
function buildProvidesModuleSymLinks {
  find -L $1 -name '*.js' | grep -v '__tests__' |
    (while read n; do
       fileContents=`cat $n`;
       mod=`echo $fileContents | grep -hoP --max-count=1 '@providesModule [\w\-]+' | awk '{print $2}'`;
      if [ -n "${mod}" ]
      then
        echo "Linking Module: ${mod}"
        unlink node_modules/$mod.js
        ln -s ${PWD}/$n node_modules/$mod.js
      fi
     done);
}

#uncomment to trigger building of core libs.
mkdir -p ./node_modules/
if [ -z $1 ]
then
  echo ""
  echo "------------------------------------"
  echo "Linking: ./public"
  echo "------------------------------------"
  buildProvidesModuleSymLinks public
else
  buildProvidesModuleSymLinks $1
  echo "------------------------------------"
  echo "Linking: ${1}"
fi

echo "------------------------------------"
echo "Linked provided modules"
echo ""
