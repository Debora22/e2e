#!/bin/bash -e

if ! oc project >/dev/null 2>&1; then
    echo "[ERROR] Not logged in to OpenShift (oc login 192.168.87.200:8443 -u admin -p pwd)."
    exit 1
fi

SERVICE_DEPENDENCIES=(
    "https://php-eiam-authnz-server.test.apps.192.168.87.200.xip.io"
    "https://php-eiam-account-manager.test.apps.192.168.87.200.xip.io"
    "https://php-gorgory.test.apps.192.168.87.200.xip.io"
    "https://php-lionelhutz.test.apps.192.168.87.200.xip.io"
    "https://php-scrabble.test.apps.192.168.87.200.xip.io"
    "https://php-rolodex.test.apps.192.168.87.200.xip.io"
    "https://php-search-worker.test.apps.192.168.87.200.xip.io"
)

echo "Checking dependencies..."
for SERVICE in ${SERVICE_DEPENDENCIES[@]} ; do
    echo "Checking... ${SERVICE}"
    SERVICE_STATUS=$(curl --write-out %{http_code} --silent --output /dev/null --insecure -X GET "${SERVICE}/service/ready" || echo 0)
    if [[ $SERVICE_STATUS != "200" ]]; then
        echo "Service is not working"
        exit 1;
    fi
done

REPO_ROOT_DIR="$( cd "$( dirname "$0" )" && pwd )"/../..

"${REPO_ROOT_DIR}"/../AuthNZServer/tools/build/integration-setup.sh
"${REPO_ROOT_DIR}"/../LionelHutz/tools/build/integration-setup.sh
"${REPO_ROOT_DIR}"/../Rolodex/tools/build/integration-setup.sh
"${REPO_ROOT_DIR}"/../Scrabble/tools/build/integration-setup.sh
"${REPO_ROOT_DIR}"/../Gorgory/tools/build/integration-setup.sh

echo
echo ContentEngine-Admin integration setup

MYSQL_DC_NAME="mysql-localbox";
DB_USER='root'
DB_NAME='olapic_adminAPI_test'
DB_PASS='olapic'

"${REPO_ROOT_DIR}"/../Puzzlebox/localbox/run_in_pod.sh "${MYSQL_DC_NAME}" "MYSQL_PWD=${DB_PASS} mysql -u${DB_USER}" < "${REPO_ROOT_DIR}/test/tools/integration-create-db.sql"

for SQL_FILE in "${REPO_ROOT_DIR}/node_modules/olapic-qa-automation-dataset/frontend/sql/contentengine-admin/"*.sql ; do
    echo "Importing ${SQL_FILE#$REPO_ROOT_DIR/}"
    "${REPO_ROOT_DIR}"/../Puzzlebox/localbox/run_in_pod.sh "${MYSQL_DC_NAME}" "MYSQL_PWD=${DB_PASS} mysql -u${DB_USER} ${DB_NAME}" < "${SQL_FILE}"
done

cat <<EOF | "${REPO_ROOT_DIR}"/../Puzzlebox/localbox/run_in_pod.sh php-searchserver
  curl -sS -X DELETE 'http://elasticsearch-searchserver.olapic.svc:9200/customer_v2_*_adminapiv2_test' >/dev/null
  /var/www/app/console index:customer:by_id 218026 --env=admin_apiv2_test --all-statuses=true;
  /var/www/app/console maintenance:aliases:update 218026 --env=admin_apiv2_test;
EOF

echo Flushing REDIS...
"${REPO_ROOT_DIR}"/../Puzzlebox/localbox/run_in_pod.sh redis-localbox "redis-cli flushall"

echo Done
