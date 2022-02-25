#!/bin/bash -e

MYSQL_DC_NAME="mysql-localbox";
DB_USER='root'
DB_NAME='lionelhutz_test'
DB_PASS='olapic'
REPO_ROOT_DIR="$( cd "$( dirname "$0" )" && pwd )"/../../..

"${REPO_ROOT_DIR}"/../Puzzlebox/localbox/run_in_pod.sh "${MYSQL_DC_NAME}" "MYSQL_PWD=${DB_PASS} mysql -u${DB_USER} ${DB_NAME}" < "${REPO_ROOT_DIR}/node_modules/olapic-qa-automation-dataset/frontend/sql/contentengine-admin/lionelhutz/dataset.sql"
