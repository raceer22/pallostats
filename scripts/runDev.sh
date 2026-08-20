#!/usr/bin/env bash

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

BACKEND_PID=""
FRONTEND_PID=""

cleanup() {
    trap - SIGINT SIGTERM EXIT
    echo -e "\nShutting down all servers and child processes..."

    [ -n "$BACKEND_PID" ] && kill -- -"$BACKEND_PID" 2>/dev/null
    [ -n "$FRONTEND_PID" ] && kill -- -"$FRONTEND_PID" 2>/dev/null

    wait 2>/dev/null
    exit 0
}
trap cleanup SIGINT SIGTERM EXIT

echo "Starting Backend (test mode) & Frontend (dev mode)..."

(
    cd "$ROOT_DIR/backend" || exit 1
    exec npm run start:test 2>&1 | sed -e 's/^/[BACKEND] /'
) &
BACKEND_PID=$!

(
    cd "$ROOT_DIR/frontend" || exit 1
    exec npm run dev 2>&1 | sed -e 's/^/[FRONTEND] /'
) &
FRONTEND_PID=$!

wait